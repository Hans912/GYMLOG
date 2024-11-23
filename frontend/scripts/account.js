// Set the correct API base URL (backend URL)
const API_BASE = 'https://gymlog-k2um.onrender.com'; // Replace with your actual backend URL

const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
} else {
  document.getElementById('greeting').textContent = `Hello, ${username}!`;

  // Fetch past workouts for the logged-in user
  fetch(`${API_BASE}/workouts?username=${username}`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || `HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    })
    .then((workouts) => {
      console.log('Workouts:', workouts);
      // Render workouts on the page if needed
    })
    .catch((err) => {
      console.error('Error fetching workouts:', err.message);
      alert('Error fetching workouts. Please try again.');
    });
}
