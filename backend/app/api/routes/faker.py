from fastapi import APIRouter, Depends, HTTPException, Body, Query, Header, status
from pydantic import BaseModel

from typing import Union, Annotated, List, Literal

from prisma.models import Faker

# from prisma.types import F

from app.models.base import ListResponse

from app.core.deps import CurrentUser


router = APIRouter()


@router.get("/person")
async def faker_user_list(
    token: CurrentUser,
    pageSize: int = 10,
    pageIndex: int = 0,
) -> ListResponse[Faker]:
    """
    这个函数的用途是从数据库中检索用户列表

    参数:
    take (int): 表示要检索的用户数量，默认为10
    skip (int): 表示要跳过的用户数量，用于分页，默认为0

    返回值:
    UsersList: 一个包含检索到的用户列表和总用户数的对象
    """
    skip = pageSize * pageIndex
    list = await Faker.prisma().find_many(
        take=pageSize, skip=skip, order={"indexId": "asc"}
    )
    total = await Faker.prisma().count()
    return ListResponse(list=list, total=total, newSikp=skip + pageSize)
