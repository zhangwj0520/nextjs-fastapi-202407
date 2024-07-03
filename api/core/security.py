from passlib.context import CryptContext
from prisma.models import User
from api.utils.str import generate_random_string

seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-"
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    salt = generate_random_string(22)
    return pwd_context.hash(password, salt=salt), salt


async def authenticate_user(username: str, password: str):
    user = await User.prisma().find_unique(
        where={
            "username": username,
        },
    )
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
