from typing import TypeVar, Generic
from pydantic import BaseModel

from prisma.models import User


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User


class TokenPayload(BaseModel):
    sub: str


class Message(BaseModel):
    message: str


T = TypeVar("T")  # 定义类型变量 T


class ListResponse(BaseModel, Generic[T]):
    list: list[T]
    total: int
