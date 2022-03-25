from os import access
from .. import models, schemas, utils
from fastapi import Body, FastAPI, Response, status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from typing import Optional, List
from .. import oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/login",
    tags=['Authentication']
)

@router.post("/", response_model=schemas.Token)
def login(user_creds:OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    access = ""
    if user_creds.username =="admin":
        token = oauth2.create_access_token(data={"jwtpayload":{"customer_id": int(user_creds.password), "role": "admin"}})
        access="admin"
    # create token
    else:
        token = oauth2.create_access_token(data={"jwtpayload":{"customer_id": int(user_creds.password), "role": "user"}})
        access="user"
    # return token
    return {"access_token":token, "token_type":"bearer", "access":access}
    