from fastapi import APIRouter, Body

router = APIRouter()

@router.get("/users/")
def read_users():
  return [{"user_id": 1, "name": "Alice"}, {"user_id": 2, "name": "Bob"}]

@router.get("/users/{user_id}")
def read_user(user_id: int):  
  return {"user_id": user_id, "name": "User {}".format(user_id)}  

@router.post  ("/text/")
def greet_user(body: dict = Body(...)):
  name = body.get("name", "desconocido")
  return {"message": f"Hola {name}"}