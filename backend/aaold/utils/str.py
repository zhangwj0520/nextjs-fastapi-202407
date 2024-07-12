import random
import string


def generate_random_string(length: int = 10) -> str:
    """随机生成指定长度的字符串。

    Args:
      length: 字符串的长度。

    Returns:
      生成的随机字符串。
    """
    letters = string.ascii_letters + string.digits
    return "".join(random.choice(letters) for _ in range(length))


# 生成长度为10的随机字符串
