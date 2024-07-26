from fastapi import APIRouter, Depends, HTTPException, Body, Query, Header, status
from pydantic import BaseModel

from typing import Union, Annotated, List, Literal

from faker import Faker

from app.models.base import ListResponse

fake = Faker("zh_CN")

router = APIRouter()


class FakerUser(BaseModel):
    id: str
    indexId: int
    firstName: str
    lastName: str
    age: int
    visits: int
    progress: int
    status: Literal["relationship", "complicated", "single"]
    subRows: list["FakerUser"] | None = None


def fake_data(len: int):
    """生成假数据

    Args:
        len (int): 长度
    """
    data_list = []
    for i in range(len):
        data_list.append(
            FakerUser(
                id=fake.pystr(min_chars=8, max_chars=8),
                indexId=i + 1,
                firstName=fake.last_name(),
                lastName=fake.first_name(),
                age=fake.random_int(min=18, max=60),
                visits=fake.random_int(min=1, max=1000),
                progress=fake.random_int(min=1, max=100),
                status=fake.random_element(["relationship", "complicated", "single"]),
            )
        )
    return data_list


faker_data = fake_data(1000)


@router.get("/person")
async def faker_user_list(
    pageSize: int = 10,
    pageIndex: int = 0,
) -> ListResponse:
    """
    这个函数的用途是从数据库中检索用户列表

    参数:
    take (int): 表示要检索的用户数量，默认为10
    skip (int): 表示要跳过的用户数量，用于分页，默认为0

    返回值:
    UsersList: 一个包含检索到的用户列表和总用户数的对象
    """
    rows = faker_data[pageSize * pageIndex : pageSize * pageIndex + pageSize]
    return ListResponse(list=rows, total=1000)
