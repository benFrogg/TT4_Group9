from .. import models, schemas, utils, oauth2
from fastapi import Body, FastAPI, Response, status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from typing import Optional, List
from sqlalchemy import func

router = APIRouter(
    prefix="/loans",
    tags=['loans']
)

#current_user: schemas.Customer = Depends(oauth2.get_current_user),


@router.post("/newloan", status_code= status.HTTP_201_CREATED, response_model=schemas.LoansResponse) 
def create_loan(loan: schemas.LoansCreate, current_user: schemas.Customer = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    # **<classname>.dict will unpack all the contents of the json and put it into our model
    print(current_user)
    nloan = loan.dict()
    nloan["customer_id"]=current_user["id"]
    new_loan = models.Loan(**nloan) 
    db.add(new_loan)
    db.commit()
    db.refresh(new_loan) #similar to RETURNINING in normal SQL
    return new_loan


@router.get("/myloans", response_model=List[schemas.LoansResponse]) 
def get_all_loans_of_user(current_user: schemas.Customer = Depends(oauth2.get_current_user), db: Session = Depends(get_db), limit:int = 10, skip:int = 0):

    loans = db.query(models.Loan).filter(models.Loan.customer_id == current_user["id"]).limit(limit).offset(skip).all()
    return loans

@router.get("/", response_model=List[schemas.LoansResponse]) 
def get_all_loans(current_user: schemas.Customer = Depends(oauth2.get_current_user), db: Session = Depends(get_db), limit:int = 10, skip:int = 0):
    
    if current_user["role"]=="admin":
        loans = db.query(models.Loan).limit(limit).offset(skip).all()
        return loans
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                        detail=f"Only Admin users can use this")

@router.get("/unapprovedloans", response_model=List[schemas.LoansResponse]) 
def get_all_loans_of_user(current_user: schemas.Customer = Depends(oauth2.get_current_user), db: Session = Depends(get_db), limit:int = 10, skip:int = 0):

    loans = db.query(models.Loan).filter(models.Loan.approved == False).limit(limit).offset(skip).all()
    return loans