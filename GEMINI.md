## Description
Generate a Python FastAPI project that implements a simple banking system. The API should have:

    Request: Accepts `name` and `pin_number`.
    Response: Validates user credentials and returns the user's `bank_balance`.
    If invalid, return proper error message.

    Request: Accepts `sender_name`, `recepient_name`, `amount`, and `pin_number`.
    Functionality:
      Deduct the amount from sender’s balance.
      Add the amount to receiver’s balance.
      Validate sender PIN and sufficient balance.
    Response: Show updated balances for both sender and receiver.

    Users should be able to authenticate multiple times.
    After transferring, authenticating the receiver shows the updated `bank_balance`.

## Requirements
 Use **FastAPI**.
 Use **Pydantic models** for request bodies.
 Simulate database using a Python dictionary.
 Include proper error handling for:
   Invalid credentials
   Insufficient funds
   Invalid amount
   Non-existent users
 Provide fully functional, ready-to-run Python code.

## Example 
 Fizza: `pin_number = "1234"`, `bank_balance = 1000`
 Asma: `pin_number = "5678"`, `bank_balance = 500`

Generate a **complete Python FastAPI script** with all imports and endpoints ready to run.