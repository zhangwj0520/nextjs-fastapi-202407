from fastapi import APIRouter
from app.api.routes import stream, user, login, utils, netdisk, faker, ai, chat
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


api_router = APIRouter()


api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
# api_router.include_router(ai.router, prefix="/chat", tags=["stream"])
api_router.include_router(chat.router, prefix="/chat", tags=["stream"])
api_router.include_router(stream.router, prefix="/stream", tags=["stream"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(netdisk.router, prefix="/netdisk", tags=["netdisk"])
api_router.include_router(faker.router, prefix="/faker", tags=["faker"])
