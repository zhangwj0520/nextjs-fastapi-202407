from fastapi import APIRouter, Depends, HTTPException
from prisma.models import User
from fastapi.security import OAuth2PasswordRequestForm


from api.core.security import verify_password, create_access_token
from api.models.base import Token
from pydantic import BaseModel
from typing import Annotated, Optional


router = APIRouter()


class LoginModel(BaseModel):
    username: str
    password: str


@router.post("/login-form", response_model=Token)
async def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    print("form_data,scopes", form_data.scopes, form_data.username, form_data.password)

    user = await User.prisma().find_unique(
        where={
            "username": form_data.username,
        },
    )
    if not user:
        raise HTTPException(status_code=400, detail="用户名不存在")
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="密码错误")
    token = create_access_token(user.id)
    return Token(access_token=token)


@router.post("/login", response_model=User)
async def login(body: LoginModel) -> Optional[User]:
    """
    登录

    - **username**: 用户名
    - **password**: 密码
    - **scopes**: 权限

    """

    user = await User.prisma().find_unique(
        where={
            "username": body.username,
        },
    )
    return user
    # if not user:
    #     raise HTTPException(status_code=400, detail="用户名不存在")
    # if not verify_password(body.password, user.hashed_password):
    #     raise HTTPException(status_code=400, detail="密码错误")
    # token = create_access_token(user.id)
    # return Token(access_token=token)
