from openai import OpenAI
from app.core.config import settings

# Typhoon 2 client (OpenAI-compatible endpoint)
typhoon_client = OpenAI(
    api_key=settings.TYPHOON_API_KEY,
    base_url="https://api.opentyphoon.ai/v1"
)

# GPT-4o-mini client (OpenAI ปกติ)
openai_client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def call_typhoon(prompt: str) -> str:
    response = typhoon_client.chat.completions.create(
        model="typhoon-v2.5-30b-a3b-instruct",
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content


def call_gpt4o_mini(prompt: str) -> str:
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content