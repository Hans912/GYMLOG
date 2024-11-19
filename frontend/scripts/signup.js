const API_BASE = 'https://gymlog-k2um.onrender.com'; // Replace with your backend URL

document.querySelector('#signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Signup failed');
    }

    alert('Signup successful! You can now log in.');
    window.location.href = 'login.html';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
