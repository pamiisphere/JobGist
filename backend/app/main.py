from fastapi import FastAPI
from app.core.supabase import supabase
from app.services.llm_service import call_typhoon, call_gpt4o_mini

app = FastAPI(title="JobGist API")

@app.get("/")
def root():
    return {"message": "JobGist API is running"}

@app.get("/test-db")
def test_db():
    response = supabase.table("employers").select("*").execute()
    return {"data": response.data}

@app.get("/test-llm")
def test_llm(prompt: str = "แนะนำอาหารไทยที่ควรลองสัก 3 อย่าง"):
    typhoon_response = call_typhoon(prompt)
    gpt_response = call_gpt4o_mini(prompt)
    return {
        "prompt": prompt,
        "typhoon": typhoon_response,
        "gpt4o_mini": gpt_response
    }