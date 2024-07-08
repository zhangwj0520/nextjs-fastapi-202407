from fastapi import APIRouter, Depends
from pydantic import BaseModel

# from pydantic.networks import EmailStr

from api.models.base import Message
from api.utils.email import generate_test_email, send_email

router = APIRouter()


class SendEmail(BaseModel):
    email_to: str


@router.post(
    "/test-email",
    status_code=201,
)
def test_email(body: SendEmail) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=body.email_to)
    send_email(
        email_to=body.email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="测试邮件发送成功!")
