const username = sessionStorage.getItem('username');
if (!username) {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  const savedRoutinesDiv = document.getElementById('saved-routines');

  try {
    const response = await fetch(`/routines?username=${username}`);
    const routines = await response.json();

    if (routines.length === 0) {
      // Show a message when there are no routines
      savedRoutinesDiv.innerHTML = '<p>You have no saved routines yet. Create one above!</p>';
    } else {
      routines.forEach((routine) => {
        const routineDiv = document.createElement('div');
        routineDiv.className = 'routine';
        routineDiv.innerHTML = `
          <h3>${routine.name}</h3>
          <ul>
            ${routine.exercises
              .map((ex) => `<li>${ex.name}: ${ex.sets} sets</li>`)
              .join('')}
          </ul>
          <button onclick="startRoutine('${routine._id}')">Start Routine</button>
        `;
        savedRoutinesDiv.appendChild(routineDiv);
      });
    }
  } catch (err) {
    console.error(err);
    alert('Error loading routines');
  }
});

// Add exercise function remains the same
function addExercise() {
  const exerciseList = document.getElementById('exercise-list');
  const exerciseDiv = document.createElement('div');
  exerciseDiv.innerHTML = `
    <input type="text" class="exercise-name" placeholder="Exercise Name" required />
    <input type="number" class="exercise-sets" placeholder="Sets" required />
  `;
  exerciseList.appendChild(exerciseDiv);
}

// Routine form submission
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
    const response = await fetch('/routines/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name, exercises }),
    });

    if (response.ok) {
      alert('Routine saved successfully!');
      location.reload();
    } else {
      alert('Failed to save routine. Please try again.');
    }
  } catch (err) {
    console.error(err);
    alert('Error saving routine');
  }
});
