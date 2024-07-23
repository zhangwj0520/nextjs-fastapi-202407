from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from app.core.deps import CurrentUser, DB, TokenDep, QiniuBucket

# 引入相关类及函数
from qiniu import Auth, put_data, put_file, BucketManager

from app.core.config import settings
from app.models.common import QiniuFileInfo


router = APIRouter()


@router.get(
    "/list",
    response_model=list[QiniuFileInfo],
    summary="列出存储空间下的文件",
    description="七牛云存储空间下的文件",
)
async def list_files(
    token: CurrentUser,
    bucket: QiniuBucket,
    prefix=None,  # 前缀
    marker=None,  # 标记
) -> list[QiniuFileInfo]:
    bucket_name = settings.QINIU_BUCKET

    list: List[QiniuFileInfo] = []

    # 创建一个空set
    dirSet = set()
    # 列举条目
    # limit = 10
    limit = None

    # 列举出除'/'的所有文件以及以'/'为分隔的所有前缀
    delimiter = None
    ret, eof, info = bucket.list(bucket_name, prefix, marker, limit, delimiter)

    if ret is None:
        return []

    for item in ret["items"]:
        print("item", item)
        type = item.get("mimeType")
        if "/" not in item.get("key"):
            list.append(
                QiniuFileInfo(
                    id=item.get("hash"),
                    fsize=item.get("fsize"),
                    mimeType=item.get("mimeType"),
                    putTime=item.get("putTime"),
                    name=item.get("key"),
                    type="file",
                )
            )
        else:
            dirList = item.get("key").split("/")
            dirName = dirList[0]
            if dirName not in dirSet:
                dirSet.add(dirName)
                list.append(
                    QiniuFileInfo(
                        id=item.get("hash"),
                        fsize=0,
                        putTime=item.get("putTime"),
                        name=dirName,
                        type="dir",
                    )
                )
    return list


@router.get(
    "/listwithlimit",
    response_model=list[QiniuFileInfo],
    summary="列出存储空间下的文件",
    description="七牛云存储空间下的文件",
)
async def list_all_files_with_marker(
    token: CurrentUser,
    bucket: QiniuBucket,
    limit=10,
    prefix=None,  # 前缀
    # marker=None,  # 标记
) -> list[QiniuFileInfo]:
    bucket_name = settings.QINIU_BUCKET

    list: List[QiniuFileInfo] = []

    # 创建一个空set
    dirSet = set()
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
            if "/" not in item.get("key"):
                list.append(
                    QiniuFileInfo(
                        id=item.get("hash"),
                        fsize=item.get("fsize"),
                        mimeType=item.get("mimeType"),
                        putTime=item.get("putTime"),
                        name=item.get("key"),
                        type="file",
                    )
                )
            else:
                dirList = item.get("key").split("/")
                dirName = dirList[0]
                if dirName not in dirSet:
                    dirSet.add(dirName)
                    list.append(
                        QiniuFileInfo(
                            id=item.get("hash"),
                            fsize=0,
                            putTime=item.get("putTime"),
                            name=dirName,
                            type="dir",
                        )
                    )
        marker = ret.get("marker")
        if marker is not None:
            continue
        break
    return list
