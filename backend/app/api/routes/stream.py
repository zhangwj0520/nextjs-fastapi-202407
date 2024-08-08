from fastapi import APIRouter, Depends, HTTPException

from fastapi import FastAPI, Response, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import json, uvicorn
from asyncio import sleep
import os
from pathlib import Path


router = APIRouter()


async def waypoints_generator():
    waypoints = [
        {"lat": 22.09769, "lng": 87.24068},
        {"lat": 22.09776, "lng": 87.24075},
        {"lat": 22.09784, "lng": 87.24082},
        {"lat": 22.09811, "lng": 87.24098},
    ]
    for waypoint in waypoints[0:10]:
        data = json.dumps(waypoint)
        # yield f"event: locationUpdate\ndata: {data}\n\n"
        yield f"data: {data}\n\n"
        await sleep(1)


@router.get("")
async def root():
    return StreamingResponse(waypoints_generator(), media_type="text/event-stream")
    # return StreamingResponse(function_calling_demo(), media_type="text/event-stream")


@router.get("/tts", response_model=bytes)
async def getTTS(
    request: Request,
) -> StreamingResponse:
    request_range = request.headers.get("Range")
    # range = int(request_range[request_range.find("=") + 1 : request_range.find("-")])
    video_path = Path(__file__).parent / "../../assets/voideo"
    video_name = f"yunjian.mp3"
    file_name = f"{video_path}/{video_name}"
    file_size = os.path.getsize(file_name)
    # file_like = open(file_name, mode="rb")
    headers = {
        "Accept-Ranges": "bytes",
        "Content-Length": f"{file_size}",
        "Content-Type": "audio/mp3",
        "Content-Disposition": f"attachment;file_name={video_name}",
        # "Content-Range": f"{range + file_size - 1}",
    }

    def iterfile():  #
        with open(file_name, mode="rb") as file_like:  #
            yield from file_like  #

    # return StreamingResponse(iterfile(), media_type="audio/mp3")
    return StreamingResponse(iterfile(), headers=headers)
