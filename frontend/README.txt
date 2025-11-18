To run the Banking Application:

1.  **Start the Backend (FastAPI):**
    Open your terminal or command prompt, navigate to the project directory, and run the following command:
    ```bash
    python main.py
    ```
    This will start the FastAPI server, typically on `http://127.0.0.1:8000`.

2.  **Open the Frontend:**
    Open the `index.html` file in your web browser. This file will automatically redirect you to `login.html`.

    You can simply double-click `index.html` in your file explorer, or drag and drop it into your browser.

**Pre-configured Users:**

*   **Fizza:** `pin_number = "1234"`, `bank_balance = 1000`
*   **Asma:** `pin_number = "5678"`, `bank_balance = 500`

**Usage:**

*   **Login:** Use the provided credentials on `login.html`.
*   **Dashboard:** After successful login, you'll see your current balance on `dashboard.html`.
*   **Transfer:** Click "Transfer Money" to go to `transfer.html`, where you can initiate transfers between users.
*   **Logout:** Use the "Logout" button on the dashboard to clear your session.
