## Description
Generate a complete frontend project using **HTML**, **CSS**, and **JavaScript (Vanilla)** that connects to the existing FastAPI banking system.

The frontend should interact with the following backend API endpoints:

### 1) POST /authenticate
    Request:
      - name
      - pin_number
    Response:
      - Validates user credentials
      - Returns the user's bank_balance
      - If invalid, show proper error message

### 2) POST /bank-transfer
    Request:
      - sender_name
      - recepient_name
      - amount
      - pin_number
    Functionality:
      - Deduct the amount from sender’s balance
      - Add the amount to receiver’s balance
      - Validate sender PIN and sufficient balance
    Response:
      - Show updated balances for both sender and receiver

Users should be able to authenticate multiple times.  
After transferring, authenticating the receiver should show the updated bank_balance.

## Requirements
Build the frontend using ONLY:
- **HTML**
- **CSS**
- **Vanilla JavaScript**

The frontend must include:

### **1) login.html**
  - Inputs: name, pin_number (4 digits)
  - On submit → send POST /authenticate
  - On success → save user in localStorage and redirect to dashboard.html
  - Show error messages clearly

### **2) dashboard.html**
  - Load logged-in user from localStorage
  - Call /authenticate again to refresh balance
  - Display:
      - User name
      - Current bank_balance
  - A button to “Transfer Money” → goes to transfer.html

### **3) transfer.html**
  - Auto-fill sender_name from localStorage
  - Inputs: recepient_name, amount (>0), pin_number
  - On submit → POST /bank-transfer
  - On success → show updated balances
  - Button to go back to dashboard.html

### **UI/UX Requirements**
- Mobile responsive layout
- Clean minimal banking UI
- Reusable input + button styles
- Card-style centered layout
- Error + success message components
- Use CSS only (no Tailwind, no frameworks)
- Use fetch() for API calls with JSON

## Files to Generate
Provide full working code for:

- index.html (redirect to login)
- login.html
- dashboard.html
- transfer.html

- style.css (global styles)
- script-login.js
- script-dashboard.js
- script-transfer.js

- README.txt (how to run)

All files must be complete and ready to run by opening them in a browser.

## API Base URL
Use the backend at: http://127.0.0.1:8000