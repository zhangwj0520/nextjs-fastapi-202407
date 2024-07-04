from fastapi import APIRouter, Depends, status, HTTPException
from prisma import Prisma
from pydantic import BaseModel
from prisma.models import User
from prisma.types import (
    UserUpdateInput,
    UserCreateInput,
)
from prisma.partials import UserWithoutRelations, UserWihoutPassword

from typing import Optional

from api.models.user import UsersList

from api.core.db import get_db

from api.core.security import get_password_hash

router = APIRouter()


class UserCreate(BaseModel):
    username: str
    password: str
    email: str | None = None


@router.get("", response_model=UsersList)
async def list_users(
    take: int = 10,
    skip: int = 0,
) -> UsersList:
    list = await UserWihoutPassword.prisma().find_many(take=take, skip=skip)
    total = await UserWihoutPassword.prisma().count()
    return UsersList(list=list, total=total)


@router.get(
    "/{user_id}",
    response_model=UserWihoutPassword | None,
)
async def get_user(
    user_id: int, db: Prisma = Depends(get_db)
) -> Optional[UserWihoutPassword]:

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

    [hashed_password, salt] = get_password_hash(user.password)
    create_user: UserCreateInput = {
        "username": user.username,
        "hashed_password": hashed_password,
        "email": user.email,
        "salt": salt,
    }

    return await User.prisma().create(create_user, include={"posts": False})


@router.put(
    "/{user_id}",
    response_model=UserWithoutRelations,
)
async def update_user(user_id: int, user: UserUpdateInput):
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
async def delete_user(user_id: int):
    print("user_id", user_id)
    return await User.prisma().delete(
        where={
            "id": user_id,
        },
        include={
            "posts": True,
        },
    )
