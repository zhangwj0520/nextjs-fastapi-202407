from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
import os

from app.core.deps import CurrentUser, DB, TokenDep, QiniuBucket

# 引入相关类及函数
from qiniu import Auth, put_data, put_file, BucketManager

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
            print("key", item)
            if prefix is not None:
                key = key.replace(prefix, "")
            dirList = [x for x in key.split("/") if x]
            if len(dirList) == 1:
                if key.endswith("/"):
                    list.append(
                        QiniuFileInfo(
                            id=item.get("hash") + key,
                            fsize=0,
                            putTime=int(item.get("putTime") / 10000),
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
                            putTime=int(item.get("putTime") / 10000),
                            name=key,
                            type="file",
                        )
                    )
        marker = ret.get("marker")
        if marker is not None:
            continue
        break
    return sorted(list, key=lambda x: x.type)
