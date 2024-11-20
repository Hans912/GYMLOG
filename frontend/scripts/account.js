const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
} else {
  document.getElementById('greeting').textContent = `Hello, ${username}!`;
}
