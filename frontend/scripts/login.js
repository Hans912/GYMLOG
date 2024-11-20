const API_BASE = 'https://gymlog-k2um.onrender.com'; // Replace with your backend URL

document.querySelector('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      const data = await response.json().catch(() => null); // Avoid parsing non-JSON errors
      throw new Error(data?.error || `HTTP error ${response.status}`);
    }
  
    const data = await response.json();
    alert('Login successful!');
    sessionStorage.setItem('username', username);
    window.location.href = 'account.html';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
