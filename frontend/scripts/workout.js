const API_BASE = 'https://gymlog-k2um.onrender.com'; // Replace with your backend URL

document.addEventListener('DOMContentLoaded', async () => {
  // Parse routineId from the query string
  const params = new URLSearchParams(window.location.search);
  const routineId = params.get('routineId');
  if (!routineId) {
    alert('Routine ID not found. Redirecting back to routines page.');
    window.location.href = 'routines.html';
    return;
  }

  try {
    // Fetch routine details from the backend
    const response = await fetch(`${API_BASE}/routines/${routineId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const routine = await response.json();

    // Display routine details
    const routineDetailsDiv = document.getElementById('routine-details');
    routineDetailsDiv.innerHTML = `
      <h2>${routine.name}</h2>
      <ul>
        ${routine.exercises
          .map(
            (ex) =>
              `<li>
                ${ex.name} - ${ex.sets} sets
                <div class="set-logs">
                  ${Array.from({ length: ex.sets }, (_, i) => `
                    <div class="set-log">
                      <label>Set ${i + 1}: </label>
                      <input type="number" placeholder="Weight (kg)" aria-label="Weight" class="weight" />
                      <input type="number" placeholder="Reps" aria-label="Reps" class="reps" />
                    </div>
                  `).join('')}
                </div>
              </li>`
          )
          .join('')}
      </ul>
    `;

    // Add event listener for finishing the workout
    document.getElementById('finish-workout').addEventListener('click', async () => {
        const routineDetailsDiv = document.getElementById('routine-details');
        const exercises = [...routineDetailsDiv.querySelectorAll('li')].map((li) => {
          // Extract the name directly from the <li>'s text content
          const name = li.textContent.split('-')[0].trim(); // "Squats - 2 sets" => "Squats"
          
          const sets = [...li.querySelectorAll('.set-log')].map((setLog) => ({
            weight: parseInt(setLog.querySelector('.weight')?.value, 10) || 0,
            reps: parseInt(setLog.querySelector('.reps')?.value, 10) || 0,
          }));
      
          return { name, sets };
        });

      // Validate exercises before sending to backend
    const invalidExercises = exercises.filter((ex) => !ex.name || ex.name.trim() === '');
    if (invalidExercises.length > 0) {
        alert('All exercises must have a name. Please review your inputs.');
        return;
    }

    const payload = {
        username: sessionStorage.getItem('username'),
        name: document.querySelector('h2').textContent.trim(),
        exercises,
    };

    console.log('Payload:', payload);

    try {
        const response = await fetch(`${API_BASE}/workouts/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    alert('Workout saved successfully!');
    window.location.href = 'account.html'; // Redirect to past workouts page
      } catch (err) {
        console.error('Error saving workout:', err.message);
        alert('Failed to save workout. Please try again.');
      }
    });
  } catch (err) {
    console.error('Error loading routine details:', err.message);
    alert('Error loading routine details. Please try again later.');
    window.location.href = 'routines.html';
  }
});
