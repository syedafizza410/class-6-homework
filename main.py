from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated database
BANK_DB: Dict[str, Dict] = {
    "Fizza": {"pin_number": "1234", "bank_balance": 1000.0},
    "Asma": {"pin_number": "5678", "bank_balance": 500.0},
}

class AuthRequest(BaseModel):
    name: str
    pin_number: str = Field(..., min_length=4, max_length=4, pattern="^[0-9]{4}$")

class AuthResponse(BaseModel):
    name: str
    bank_balance: float

class TransferRequest(BaseModel):
    sender_name: str
    recepient_name: str
    amount: float = Field(..., gt=0)
    pin_number: str = Field(..., min_length=4, max_length=4, pattern="^[0-9]{4}$")

class TransferResponse(BaseModel):
    sender_name: str
    sender_new_balance: float
    recepient_name: str
    recepient_new_balance: float

class ErrorResponse(BaseModel):
    detail: str

@app.post("/authenticate", response_model=AuthResponse, responses={401: {"model": ErrorResponse}})
async def authenticate(request: AuthRequest):
    user = BANK_DB.get(request.name)
    if not user or user["pin_number"] != request.pin_number:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return AuthResponse(name=request.name, bank_balance=user["bank_balance"])

@app.post("/bank-transfer", response_model=TransferResponse, responses={
    400: {"model": ErrorResponse},
    401: {"model": ErrorResponse},
    404: {"model": ErrorResponse}
})
async def bank_transfer(request: TransferRequest):
    sender = BANK_DB.get(request.sender_name)
    recepient = BANK_DB.get(request.recepient_name)

    if not sender:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sender '{request.sender_name}' not found"
        )
    if not recepient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Recipient '{request.recepient_name}' not found"
        )

    if sender["pin_number"] != request.pin_number:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid PIN for sender"
        )

    if request.amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transfer amount must be positive"
        )

    if sender["bank_balance"] < request.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient funds"
        )

    sender["bank_balance"] -= request.amount
    recepient["bank_balance"] += request.amount

    return TransferResponse(
        sender_name=request.sender_name,
        sender_new_balance=sender["bank_balance"],
        recepient_name=request.recepient_name,
        recepient_new_balance=recepient["bank_balance"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
