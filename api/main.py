from fastapi import FastAPI, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from api.core.prisma import lifespan
from api.core.route import api_router
from api.core.db import get_db


async def verify_token(x_token: str = Header()):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def verify_key(x_key: str = Header()):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key


app = FastAPI(
    title="Gen UI Backend",
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
    lifespan=lifespan,
    # dependencies=Depends(get_db),
    # dependencies=[Depends(verify_token), Depends(verify_key)],
)


# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:8910",
    "http://localhost:8100",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

print("Starting server...")
