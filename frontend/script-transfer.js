const API_BASE_URL = "http://127.0.0.1:8000";

document.addEventListener('DOMContentLoaded', () => {
    const transferForm = document.getElementById('transferForm');
    const senderNameInput = document.getElementById('senderName');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');
    const messageDiv = document.getElementById('message');
    const transferResultDiv = document.getElementById('transferResult');
    const senderNewBalanceSpan = document.getElementById('senderNewBalance');
    const recepientNewBalanceSpan = document.getElementById('recepientNewBalance');

    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || !loggedInUser.name) {
        window.location.href = 'login.html';
        return;
    }

    senderNameInput.value = loggedInUser.name;

    transferForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        messageDiv.style.display = 'none';
        messageDiv.className = 'message-container';
        transferResultDiv.style.display = 'none';

        const sender_name = loggedInUser.name;
        const recepient_name = document.getElementById('recepientName').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const pin_number = document.getElementById('pin_number').value;

        try {
            const response = await fetch(`${API_BASE_URL}/bank-transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sender_name, recepient_name, amount, pin_number }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update local storage with new sender balance
                loggedInUser.bank_balance = data.sender_new_balance;
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                senderNewBalanceSpan.textContent = data.sender_new_balance.toFixed(2);
                recepientNewBalanceSpan.textContent = data.recepient_new_balance.toFixed(2);
                transferResultDiv.style.display = 'block';
                transferResultDiv.classList.add('success-message');
                transferForm.reset(); // Clear form after successful transfer
                senderNameInput.value = loggedInUser.name; // Re-set sender name
            } else {
                messageDiv.textContent = data.detail || 'Transfer failed.';
                messageDiv.classList.add('error-message');
                messageDiv.style.display = 'block';
            }
        } catch (error) {
            messageDiv.textContent = 'Network error or server is unreachable.';
            messageDiv.classList.add('error-message');
            messageDiv.style.display = 'block';
            console.error('Error:', error);
        }
    });

    backToDashboardBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});
