from http import server
from xmlrpc.client import Boolean
from .database import Base
import sqlalchemy as sa
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP, FLOAT
from sqlalchemy.sql.expression import text


class Loan(Base):
    __tablename__ = "loans"
    id = Column(Integer, primary_key=True, nullable=False)
    amount = Column(sa.Float, nullable=False)
    approved = Column(Boolean, server_default='false', nullable=False)
    customer_id = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    
class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer,primary_key=True, nullable=False)
    loan_id = Column(Integer, ForeignKey("loans.id", ondelete="CASCADE"),  nullable=False)
    amount = Column(sa.Float, nullable=False)
    date = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    customer_id = Column(Integer, nullable=False)