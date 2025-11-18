const API_BASE_URL = window.API_BASE_URL;

document.addEventListener('DOMContentLoaded', async () => {
    const userNameSpan = document.getElementById('userName');
    const bankBalanceSpan = document.getElementById('bankBalance');
    const transferMoneyBtn = document.getElementById('transferMoneyBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const messageDiv = document.getElementById('message');

    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || !loggedInUser.name || !loggedInUser.pin_number) {
        window.location.href = 'login.html';
        return;
    }

    userNameSpan.textContent = loggedInUser.name;

    const fetchBalance = async () => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message-container';
        try {
            const response = await fetch(`${API_BASE_URL}/authenticate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: loggedInUser.name,
                    pin_number: loggedInUser.pin_number
                }),
            });

            const data = await response.json();

            if (response.ok) {
                loggedInUser.bank_balance = data.bank_balance;
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                bankBalanceSpan.textContent = loggedInUser.bank_balance.toFixed(2);
            } else {
                messageDiv.textContent = data.detail || 'Failed to refresh balance.';
                messageDiv.classList.add('error-message');
                messageDiv.style.display = 'block';
                setTimeout(() => {
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'login.html';
                }, 1500);
            }
        } catch (error) {
            messageDiv.textContent = 'Network error or server is unreachable.';
            messageDiv.classList.add('error-message');
            messageDiv.style.display = 'block';
            console.error('Error:', error);
        }
    };

    await fetchBalance();

    transferMoneyBtn.addEventListener('click', () => {
        window.location.href = 'transfer.html';
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});