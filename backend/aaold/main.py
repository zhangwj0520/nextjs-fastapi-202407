from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute


from api.core.prisma import lifespan
from api.core.route import api_router
from api.core.config import settings

import sentry_sdk


def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
    generate_unique_id_function=custom_generate_unique_id,
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

print("Starting server...")
