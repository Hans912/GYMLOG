const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
} else {
  document.getElementById('greeting').textContent = `Hello, ${username}!`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('log-container');

  try {
    const response = await fetch(`/workouts?username=${username}`);
    const workouts = await response.json();

    workouts.forEach((workout) => {
      const workoutDiv = document.createElement('div');
      workoutDiv.className = 'workout';

      workoutDiv.innerHTML = `
        <h2>${workout.name} (${new Date(workout.date).toLocaleDateString()})</h2>
        <ul>
          ${workout.exercises
            .map(
              (ex) => `<li>${ex.name}: ${ex.sets.length} sets</li>`
            )
            .join('')}
        </ul>
      `;

      container.appendChild(workoutDiv);
    });
  } catch (err) {
    console.error(err);
    alert('Error loading workouts');
  }
});