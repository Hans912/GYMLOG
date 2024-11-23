// Set the correct API base URL (backend URL)
const API_BASE = 'https://gymlog-k2um.onrender.com'; // Replace with your actual backend URL

const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
} else {
  document.getElementById('greeting').textContent = `Hello, ${username}!`;

  document.addEventListener('DOMContentLoaded', async () => {
    const logContainer = document.getElementById('log-container');
  
    try {
      const response = await fetch(`${API_BASE}/workouts?username=${username}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const workouts = await response.json();
      console.log('Workouts:', workouts); // Debugging log
  
      if (workouts.length === 0) {
        logContainer.innerHTML = '<p>No workouts found. Start your first workout today!</p>';
      } else {
        workouts.forEach((workout) => {
          const workoutDiv = document.createElement('div');
          workoutDiv.className = 'workout';
  
          workoutDiv.innerHTML = `
            <h2>${workout.name} (${new Date(workout.date).toLocaleDateString()})</h2>
            <ul>
              ${workout.exercises
                .map(
                  (ex) => `
                    <li>
                      <strong>${ex.name}:</strong> ${ex.sets.length} sets
                    </li>
                  `
                )
                .join('')}
            </ul>
          `;
          logContainer.appendChild(workoutDiv);
        });
      }
    } catch (err) {
      console.error('Error loading workouts:', err.message);
      logContainer.innerHTML = '<p>Error loading workouts. Please try again later.</p>';
    }
  });
}
