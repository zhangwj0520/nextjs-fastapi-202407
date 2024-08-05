from fastapi import APIRouter, Depends
from numpy import number
from pydantic import BaseModel
from typing import List
import os
import requests
from datetime import datetime
import hmac
import hashlib
from datetime import datetime, timedelta


from app.core.deps import CurrentUser, DB, TokenDep, QiniuBucket, get_qiniu_auth

# 引入相关类及函数
from qiniu import Auth, put_data, put_file, BucketManager, utils

from app.core.config import settings
from app.models.common import QiniuFileInfo


router = APIRouter()


@router.get(
    "/listlimit",
    response_model=list[QiniuFileInfo],
    description="七牛云存储空间下的文件limit=1000",
)
async def list_files(
    # token: CurrentUser,
    bucket: QiniuBucket,
    prefix=None,  # 前缀
    marker=None,  # 标记
) -> list[QiniuFileInfo]:
    bucket_name = settings.QINIU_BUCKET
    list: List[QiniuFileInfo] = []
    # 列举条目
    # limit = 10
    limit = 1000
    # 列举出除'/'的所有文件以及以'/'为分隔的所有前缀
    delimiter = None
    ret, eof, info = bucket.list(bucket_name, prefix, marker, limit, delimiter)

    if ret is None:
        return []

    for item in ret["items"]:
        key = item.get("key").replace(prefix, "")
        dirList = [x for x in key.split("/") if x]
        if len(dirList) == 1:
            if key.endswith("/"):
                list.append(
                    QiniuFileInfo(
                        id=item.get("hash") + key,
                        fsize=0,
                        putTime=int(item.get("putTime") / 1000),
                        name=dirList[-1] + "/",
                        path=item.get("key"),
                        type="dir",
                    )
                )
            else:
                list.append(
                    QiniuFileInfo(
                        id=item.get("hash") + key,
                        fsize=item.get("fsize"),
                        mimeType=item.get("mimeType"),
                        putTime=int(item.get("putTime") / 1000),
                        name=key,
                        type="file",
                    )
                )

    # return list
    return sorted(list, key=lambda x: x.type)


@router.get(
    "/list",
    response_model=list[QiniuFileInfo],
    description="七牛云存储空间下的文件",
)
async def list_all_files_with_marker(
    bucket: QiniuBucket,
    limit=10,
    prefix=None,  # 前缀
    # marker=None,  # 标记
) -> list[QiniuFileInfo]:
    bucket_name = settings.QINIU_BUCKET

    list: List[QiniuFileInfo] = []

    marker = None
    # 列举出除'/'的所有文件以及以'/'为分隔的所有前缀
    delimiter = None
    while True:
        ret, eof, info = bucket.list(
            bucket_name,
            prefix,
            marker,
            limit,
            delimiter,
        )

        if ret is None:
            return []
        for item in ret["items"]:
            key = item.get("key")
            if prefix is not None:
                key = key.replace(prefix, "")
            dirList = [x for x in key.split("/") if x]
            if len(dirList) == 1:
                if key.endswith("/"):
                    list.append(
                        QiniuFileInfo(
                            id=item.get("hash") + key,
                            fsize=0,
                            putTime=int(item.get("putTime") / 1_000_0),
                            name=dirList[-1] + "/",
                            path=item.get("key"),
                            type="dir",
                        )
                    )
                else:
                    list.append(
                        QiniuFileInfo(
                            id=item.get("hash") + key,
                            fsize=round(item.get("fsize") / 1024, 2),
                            mimeType=item.get("mimeType"),
                            putTime=int(item.get("putTime") / 1_000_0),
                            name=key,
                            type="file",
                        )
                    )
        marker = ret.get("marker")
        if marker is not None:
            continue
        break
    return sorted(list, key=lambda x: x.type)


class QiniuOverview(BaseModel):
    fileCount: int
    spaceSize: float
    flowSize: int
    hits: int
    sizeTrend: dict[str, list[int | float]]


async def getFileCount():
    QINIU_BUCKET = settings.QINIU_BUCKET
    QINIU_API = settings.QINIU_API
    QINIU_HOST = settings.QINIU_HOST
    now = datetime.now()
    end_date = now.strftime("%Y%m%d%H%M%S")
    url = f"{QINIU_API}/v6/count?bucket={QINIU_BUCKET}&g=day&begin=20240101112205&end={end_date}"
    # https://developer.qiniu.com/kodo/1201/access-token
    signingStr = f"GET /v6/count?bucket={QINIU_BUCKET}&g=day&begin=20240101112205&end={end_date}\nHost: {QINIU_HOST}\nContent-Type: application/x-www-form-urlencoded\n\n"
    q = get_qiniu_auth()
    token = q.token(signingStr)
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Qiniu {token}",
    }

    response = requests.get(url, headers=headers)
    try:
        json_data = response.json()
        return json_data["datas"][-1]
    except ValueError as e:
        print(f"Error parsing JSON: {e}")
        print(f"Response Content: {response.text}")
        return 0


async def getSpace() -> dict[str, list[int | float]]:  # -> dict[str, list[Any]]:
    QINIU_BUCKET = settings.QINIU_BUCKET
    QINIU_API = settings.QINIU_API
    QINIU_HOST = settings.QINIU_HOST
    now = datetime.now()
    first_day_of_month = datetime(now.year, now.month, 1)
    begin = first_day_of_month.strftime("%Y%m%d%H%M%S")

    end_date = now.strftime("%Y%m%d%H%M%S")
    url = (
        f"{QINIU_API}/v6/space?bucket={QINIU_BUCKET}&g=day&begin={begin}&end={end_date}"
    )
    # https://developer.qiniu.com/kodo/1201/access-token
    signingStr = f"GET /v6/space?bucket={QINIU_BUCKET}&g=day&begin={begin}&end={end_date}\nHost: {QINIU_HOST}\nContent-Type: application/x-www-form-urlencoded\n\n"
    q = get_qiniu_auth()
    token = q.token(signingStr)
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Qiniu {token}",
    }

    response = requests.get(url, headers=headers)
    try:
        json_data = response.json()
        times = [x * 1000 for x in json_data["times"]]
        datas = [round(x / 1024 / 1024, 2) for x in json_data["datas"]]
        print("json_data", datas)
        return {"times": times, "datas": datas}
    except ValueError as e:
        print(f"Error parsing JSON: {e}")
        print(f"Response Content: {response.text}")
        return {"times": [], "datas": []}


async def getFlow():
    QINIU_BUCKET = settings.QINIU_BUCKET
    QINIU_API = settings.QINIU_API
    QINIU_HOST = settings.QINIU_HOST
    now = datetime.now()
    end_date = now.strftime("%Y%m%d%H%M%S")
    url = f"{QINIU_API}/v6/blob_io?$bucket={QINIU_BUCKET}&g=day&begin=20240101112205&end={end_date}&$src=origin&select=flow"
    # https://developer.qiniu.com/kodo/1201/access-token
    signingStr = f"GET /v6/blob_io?$bucket={QINIU_BUCKET}&g=day&begin=20240101112205&end={end_date}&$src=origin&select=flow\nHost: {QINIU_HOST}\nContent-Type: application/x-www-form-urlencoded\n\n"
    q = get_qiniu_auth()
    token = q.token(signingStr)
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Qiniu {token}",
    }

    response = requests.get(url, headers=headers)
    try:
        json_data = response.json()
        return json_data[0]["values"]["flow"]
    except ValueError as e:
        print(f"Error parsing JSON: {e}")
        print(f"Response Content: {response.text}")
        return 0


async def getHits():
    QINIU_BUCKET = settings.QINIU_BUCKET
    QINIU_API = settings.QINIU_API
    QINIU_HOST = settings.QINIU_HOST
    now = datetime.now()
    end_date = now.strftime("%Y%m%d%H%M%S")
    url = f"{QINIU_API}/v6/blob_io?$bucket={QINIU_BUCKET}&g=day&begin=20240101112205&end={end_date}&$src=origin&select=hits"
    # https://developer.qiniu.com/kodo/1201/access-token
    signingStr = f"GET /v6/blob_io?$bucket={QINIU_BUCKET}&g=day&begin=20240101112205&end={end_date}&$src=origin&select=hits\nHost: {QINIU_HOST}\nContent-Type: application/x-www-form-urlencoded\n\n"
    q = get_qiniu_auth()
    token = q.token(signingStr)
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Qiniu {token}",
    }

    response = requests.get(url, headers=headers)
    try:
        json_data = response.json()
        return json_data[0]["values"]["hits"]
    except ValueError as e:
        print(f"Error parsing JSON: {e}")
        print(f"Response Content: {response.text}")
        return 0


@router.get(
    "/overview",
    response_model=QiniuOverview,
    description="七牛云存储空间下的文件",
)
async def qiniu_bucket_overview(bucket: QiniuBucket):
    fileCount = await getFileCount()
    sizeTrend = await getSpace()
    spaceSize = sizeTrend["datas"][-1]
    flowSize = await getFlow()
    hits = await getHits()
    return QiniuOverview(
        fileCount=fileCount,
        spaceSize=spaceSize,
        flowSize=flowSize,
        hits=hits,
        sizeTrend=sizeTrend,
    )
