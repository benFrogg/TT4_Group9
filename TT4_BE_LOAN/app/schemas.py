from ctypes.wintypes import DOUBLE
from datetime import datetime
from tokenize import Double
from typing import Optional
from xmlrpc.client import Boolean
from pydantic import BaseModel, EmailStr, conint

# making use of python's inheritance
# Pydantic model that is used to define the schema of a request or response
# This is different from the SQL model which is used for defining columns in the SQL database

# User Pydantic models
class Loans(BaseModel):
    amount: float
    
class LoansCreate(Loans):
    pass

class LoansResponse(Loans):
    id: int
    created_at: datetime
    customer_id: int
    approved:bool
    class Config:
        orm_mode=True

class Customer():
    id: int
    role: str

class Token(BaseModel):
    access_token:str
    token_type:str
    access:str

    
class TokenData(BaseModel):
    id: Optional[str] = None
    role: str