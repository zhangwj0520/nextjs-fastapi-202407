from contextlib import asynccontextmanager

from fastapi import FastAPI

from prisma import Prisma

db = Prisma(auto_register=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    # Clean up the ML models and release the resources
    if db.is_connected():
        await db.disconnect()
