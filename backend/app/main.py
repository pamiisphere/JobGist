from fastapi import FastAPI
from app.core.supabase import supabase

app = FastAPI(title="JobGist API")

@app.get("/")
def root():
    return {"message": "JobGist API is running"}

@app.get("/test-db")
def test_db():
    response = supabase.table("user_profiles").select("*").execute()
    return {"data": response.data}