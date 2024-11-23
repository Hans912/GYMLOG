const API_BASE = 'https://gymlog-k2um.onrender.com'; // Replace with your actual backend URL

const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  const savedRoutinesDiv = document.getElementById('saved-routines');

  try {
    const response = await fetch(`${API_BASE}/routines?username=${username}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const routines = await response.json();

    if (routines.length === 0) {
      savedRoutinesDiv.innerHTML = '<p>You have no saved routines yet. Create one above!</p>';
    } else {
      routines.forEach((routine) => {
        const routineDiv = document.createElement('div');
        routineDiv.className = 'routine';
        routineDiv.innerHTML = `
          <h3>${routine.name}</h3>
          <ul>
            ${routine.exercises.map((ex) => `<li>${ex.name}: ${ex.sets} sets</li>`).join('')}
          </ul>
          <button onclick="startRoutine('${routine._id}')">Start Routine</button>
        `;
        savedRoutinesDiv.appendChild(routineDiv);
      });
    }
  } catch (err) {
    console.error('Error loading routines:', err.message);
    alert('Error loading routines. Please try again later.');
  }
});

// Add a new exercise to the routine form
function addExercise() {
  const exerciseList = document.getElementById('exercise-list');
  const exerciseDiv = document.createElement('div');
  exerciseDiv.innerHTML = `
    <input type="text" class="exercise-name" placeholder="Exercise Name" required />
    <input type="number" class="exercise-sets" placeholder="Sets" required />
  `;
  exerciseList.appendChild(exerciseDiv);
}

// Save a new routine
document.getElementById('routine-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('routine-name').value;
  const exercises = [...document.querySelectorAll('#exercise-list div')].map((div) => {
    return {
      name: div.querySelector('.exercise-name').value,
      sets: parseInt(div.querySelector('.exercise-sets').value, 10),
    };
  });

  try {
    const response = await fetch(`${API_BASE}/routines/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name, exercises }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    alert('Routine saved successfully!');
    location.reload();
  } catch (err) {
    console.error('Error saving routine:', err.message);
    alert('Failed to save routine. Please try again.');
  }
});

// Function to start a routine
function startRoutine(routineId) {
    // Redirect to the workout page with the routine ID in the query string
    window.location.href = `workout.html?routineId=${routineId}`;
  }
  