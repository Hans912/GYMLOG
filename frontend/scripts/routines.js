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
                      <input type="number" placeholder="Weight (kg)" class="weight" />
                      <input type="number" placeholder="Reps" class="reps" />
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
      const exercises = [...routineDetailsDiv.querySelectorAll('li')].map((li) => {
        const name = li.querySelector('li').textContent.trim();
        const sets = [...li.querySelectorAll('.set-log')].map((setLog) => ({
          weight: parseInt(setLog.querySelector('.weight').value, 10) || 0, // Default to 0 if empty
          reps: parseInt(setLog.querySelector('.reps').value, 10) || 0, // Default to 0 if empty
        }));
        return { name, sets };
      });

      // Validate user input for sets
      const hasInvalidSets = exercises.some((ex) =>
        ex.sets.some((set) => isNaN(set.weight) || isNaN(set.reps))
      );

      if (hasInvalidSets) {
        alert('Please fill in all weight and reps fields for each set.');
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/workouts/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: sessionStorage.getItem('username'),
            name: routine.name,
            exercises,
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        alert('Workout saved successfully!');
        window.location.href = 'log.html'; // Redirect to past workouts page
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
