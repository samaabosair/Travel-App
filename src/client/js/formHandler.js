// Function to handle adding a new destination
export const addDestination = () => {
    const container = document.getElementById('destinations-container');
    const newDestination = document.createElement('div');
    newDestination.classList.add('destination');
    newDestination.innerHTML = `
        <input type="text" class="city" placeholder="Enter a city" required>
        <input type="date" class="date" required>
    `;
    container.appendChild(newDestination);
};

// Event listener for 'Add Destination' button
const addButton = document.getElementById('add-destination');
if (addButton) {
    addButton.addEventListener('click', addDestination);
}

// Adding isSubmitting flag to prevent multiple submissions
let isSubmitting = false;  // Flag to avoid multiple submissions

// Existing handleSubmit function
export const handleSubmit = async (e) => {
    e.preventDefault();

    // Avoid submitting if the process is already in progress
    if (isSubmitting) {
        return;
    }

    isSubmitting = true;  // Mark the start of the submission process
    console.log('handleSubmit called');

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '<p>Loading...</p>';  // Show loading state

    const destinations = document.querySelectorAll('.destination');

    if (destinations.length === 0) {
        resultContainer.innerHTML = '<p>No destinations added.</p>';
        isSubmitting = false;
        return;
    }

    for (const destination of destinations) {
        const cityInput = destination.querySelector('.city');
        const dateInput = destination.querySelector('.date');

        if (!cityInput || !dateInput) {
            console.error('City or date input not found');
            continue;
        }

        const city = cityInput.value;
        const date = dateInput.value;

        if (!city || !date) {
            resultContainer.innerHTML += `<p>Please fill in both city and date for all destinations.</p>`;
            continue;
        }

        try {
            console.log("Fetching data for:", city);

            const response = await fetch('http://localhost:8000/get-city-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city, date }),
            });

            const data = await response.json();

            if (data.error) {
                resultContainer.innerHTML += `<p>Error: ${data.error}</p>`;
            } else {
                const resultItem = `
                    <div class="result-item">
                        <h3>City: ${data.city}, ${data.country}</h3>
                        <p>Travel Date: ${date}</p>
                        <p>Weather: ${data.weather.description || 'No weather data available'}</p>
                        <p>Temperature: ${data.weather.temperature !== undefined ? data.weather.temperature : 'N/A'}°C</p>
                        <img src="${data.image}" alt="Image of ${data.city}"/>
                    </div>
                `;
                resultContainer.innerHTML += resultItem;
            }
        } catch (error) {
            resultContainer.innerHTML += `<p>Error fetching data for ${city}: ${error.message}</p>`;
        }
    }

    // Reset the flag after the process is done
    isSubmitting = false;
};
