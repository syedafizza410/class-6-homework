const API_BASE_URL = window.API_BASE_URL;

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        messageDiv.style.display = 'none';
        messageDiv.className = 'message-container';

        const name = document.getElementById('name').value.trim();
        const pin_number = document.getElementById('pin_number').value.trim();

        if (!name || pin_number.length !== 4 || !/^\d{4}$/.test(pin_number)) {
            messageDiv.textContent = "Please enter a valid name and 4-digit PIN.";
            messageDiv.classList.add('error-message');
            messageDiv.style.display = 'block';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/authenticate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, pin_number }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store pin_number too for dashboard fetch
                const userData = { ...data, pin_number };
                localStorage.setItem('loggedInUser', JSON.stringify(userData));

                messageDiv.textContent = "Login successful! Redirecting...";
                messageDiv.classList.add('success-message');
                messageDiv.style.display = 'block';

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                messageDiv.textContent = data.detail || 'Authentication failed.';
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
});