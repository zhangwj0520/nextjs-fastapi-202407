from fastapi import APIRouter, Depends, HTTPException
from prisma.models import User
from fastapi.security import OAuth2PasswordRequestForm


from api.core.security import verify_password, create_access_token
from api.models.base import Token
from pydantic import BaseModel
from typing import Annotated


router = APIRouter()


class LoginModel(BaseModel):
    username: str
    password: str


@router.post("/login-form", response_model=Token)
async def loginForm(
    body: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """
    处理用户登录表单提交

    参数: 包含用户登录信息的表单对象

    返回: 登录成功后生成的访问令牌对象

    异常: 用户名不存在或密码错误时抛出 HTTP 异常

    调用: 通过 FastAPI 路由器进行调度

    用法示例:
    ```python
    form_data = OAuth2PasswordRequestForm(username="your_username", password="your_password")
    token = await loginForm(form_data)
    ```
    """

    user = await User.prisma().find_unique(
        where={
            "username": body.username,
        },
    )
    if not user:
        raise HTTPException(status_code=400, detail="用户名不存在")
    if not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="密码错误")
    token = create_access_token(user)
    return Token(access_token=token)


@router.post("/login", response_model=Token)
async def login(body: LoginModel) -> Token:

    user = await User.prisma().find_unique(
        where={
            "username": body.username,
        },
    )
    if not user:
        raise HTTPException(status_code=400, detail="用户名不存在")
    if not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="密码错误")
    token = create_access_token(user.id)
    return Token(access_token=token)
