# Weatherapp

A modern and responsive weather application built using **React.js**, which allows users to check real-time weather for any city. It fetches data from the **OpenWeatherMap API** and displays temperature, humidity, wind speed, and other weather details with animated icons.

---

## 1. Project Description

The Weatherapp provides:

- Search functionality to get weather information for any city.
- Displays temperature, humidity, visibility, and wind speed.
- Animated weather icons for visual representation of conditions.
- Responsive design optimized for desktop and mobile devices.

---

## 2. Setup & Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/BoinaRavikiran/Weatherapp.git
cd Weatherapp
Install dependencies:

npm install


Obtain an API key from OpenWeatherMap
.

Create a file src/apiKeys.js:

const apiKeys = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "YOUR_API_KEY_HERE",
};

export default apiKeys;
Start the development server:

npm start


Open your browser and navigate to http://localhost:3000.

3. Running Test Cases

Currently, no pre-written test cases exist. To add tests:

Install testing dependencies (if not installed):

npm install --save-dev jest @testing-library/react


Run the test suite:

npm test


You can write tests for components like Forcast.js to test rendering, API calls, and dropdown functionality.

4. Assumptions & Design Choices

City search suggestions are fetched when input length ≥ 3 characters to avoid unnecessary API calls.

Default city is set to Delhi on initial load.

Dropdown suggestions show city, country using OpenWeatherMap Geocoding API.

Separate apiKeys.js file is used to store API keys and is ignored in .gitignore.

Responsive design: works on both desktop and mobile devices.

Animated weather icons used via ReactAnimatedWeather for better user experience.
