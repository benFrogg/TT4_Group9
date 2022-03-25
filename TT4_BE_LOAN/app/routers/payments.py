from app.oauth2 import get_current_user
from .. import models, schemas, utils, oauth2
from fastapi import Body, FastAPI, Response, status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from typing import Optional, List
from sqlalchemy import func

router = APIRouter(
    prefix="/payments",
    tags=['payments']
)


# Create a Payment entry
# calls the mongoDB API to check balance
@router.post("/new_payment", status_code= status.HTTP_201_CREATED, response_model=schemas.PaymentResponse) 
def create_payment(payment: schemas.Payment, current_user: schemas.Customer = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    # **<classname>.dict will unpack all the contents of the json and put it into our model
    if current_user["role"]=="user":
        query = db.query(models.Loan).filter(models.Loan.id==payment.loan_id)
        dbquery = query.first()
        if dbquery == None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"loan with id={payment.loan_id} was not found")
        if int(dbquery.customer_id) != int(current_user["id"]):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail=f"Not customer that made loan")
        if dbquery.approved != True:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"loan with id={payment.loan_id} has not been approved")
        
        # call other api here to check for balance
        customer_balance = 100000
        if customer_balance<payment.amount:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"Not enough money in customer balance to make payment")
        
        if dbquery.amount<payment.amount:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"Too much payment made for loan id {payment.loan_id}")

        # update the balance with the other api

        
        # updating the loan db
        uloan = vars(dbquery)
        nloan = {'id':uloan['id'], 'created_at':uloan['created_at'],'approved':True,'customer_id':uloan['customer_id'],'amount':uloan['amount']-float(payment.amount)}
        query.update(nloan, synchronize_session=False)
        db.commit()

        # adding to the payments db
        npayment = payment.dict()
        npayment['customer_id']=int(current_user['id'])
        new_payment = models.Payment(**npayment) 
        db.add(new_payment)
        db.commit()
        db.refresh(new_payment) #similar to RETURNINING in normal SQL
        
        return vars(new_payment)
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                        detail=f"Only Normal users can use this")


# Admin user gets ALL payments
@router.get("/", response_model=List[schemas.PaymentResponse]) 
def get_all_payments(current_user: schemas.Customer = Depends(oauth2.get_current_user), db: Session = Depends(get_db), limit:int = 10, skip:int = 0):
    
    if current_user["role"]=="admin":
        loans = db.query(models.Payment).limit(limit).offset(skip).all()
        output =[]
        for i in loans:
            output.append(vars(i))
        return output
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                        detail=f"Only Admin users can use this")