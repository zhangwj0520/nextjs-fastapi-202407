from fastapi import APIRouter
from api.routes import demo, stream, user, login


from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


api_router = APIRouter()


api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(stream.router, prefix="/stream", tags=["stream"])
# api_router.include_router(demo.router, prefix="/demo", tags=["demo"])
# api_router.include_router(prisma.router, prefix="/prisma", tags=["prisma"])
