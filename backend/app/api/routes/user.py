from fastapi import APIRouter, Depends, status, HTTPException, Security
from prisma import Prisma

from pydantic import BaseModel
from prisma.models import User
from prisma.types import (
    UserUpdateInput,
    UserCreateInput,
)
from prisma.partials import UserWithoutRelations, UserWihoutPassword

from typing import Optional

from app.models.user import UsersList
from app.core.security import get_password_hash
from app.core.deps import CurrentUser, DB, TokenDep
from app.models.base import ListResponse

router = APIRouter()


class UserCreate(BaseModel):
    username: str
    password: str
    email: str


@router.get("/me", response_model=User)
async def read_users_me(current_user: CurrentUser) -> User:
    return current_user


@router.get("/me/items")
async def read_own_items(
    current_user: CurrentUser,
) -> list[dict[str, str]]:
    return [{"item_id": "Foo", "owner": current_user.username}]


@router.get("", response_model=ListResponse[User])
async def list_users(
    token: CurrentUser,
    take: int = 10,
    skip: int = 0,
) -> ListResponse[User]:
    """
    这个函数的用途是从数据库中检索用户列表

    参数:
    take (int): 表示要检索的用户数量，默认为10
    skip (int): 表示要跳过的用户数量，用于分页，默认为0

    返回值:
    UsersList: 一个包含检索到的用户列表和总用户数的对象
    """
    list = await User.prisma().find_many(take=take, skip=skip)
    total = await User.prisma().count()
    return ListResponse(list=list, total=total, newSikp=skip + take)


@router.get(
    "/{user_id}",
    response_model=UserWihoutPassword | None,
)
async def get_user(user_id: str, db: DB) -> Optional[UserWihoutPassword]:

    user = await UserWihoutPassword.prisma().find_unique(
        where={
            "id": user_id,
        },
    )
    if not user:
        raise HTTPException(status_code=403, detail="未发现用户信息")
    return user


@router.post("", status_code=status.HTTP_201_CREATED, response_model=User)
async def create_user(user: UserCreate) -> User:
    print("user", user)
    u = await User.prisma().find_unique(
        where={
            "username": user.username,
        }
    )
    if u is not None:
        raise HTTPException(
            status_code=400,
            detail="用户已存在",
        )

    hashed_password = get_password_hash(user.password)
    create_user: UserCreateInput = {
        "username": user.username,
        "hashed_password": hashed_password,
        "email": user.email,
    }

    return await User.prisma().create(create_user, include={"posts": False})


@router.put(
    "/{user_id}",
    response_model=UserWithoutRelations,
)
async def update_user(user_id: str, user: UserUpdateInput):
    return await User.prisma().update(
        where={
            "id": user_id,
        },
        data=user,
    )


@router.delete(
    "/{user_id}",
    response_model=User,
)
async def delete_user(user_id: str):
    print("user_id", user_id)
    return await User.prisma().delete(
        where={
            "id": user_id,
        },
        include={
            "posts": True,
        },
    )
