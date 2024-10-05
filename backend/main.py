from fastapi import FastAPI
from src.routes import *

app = FastAPI()


app.include_router(model1_r)
app.include_router(model2_r)

