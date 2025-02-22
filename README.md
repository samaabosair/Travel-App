# FEND Capstone - Travel App

This is a web application designed to help users plan their trips. Users can add destination details, including city and travel date, and the app fetches relevant weather, location data, and images using external APIs.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Testing](#testing)
- [API Information](#api-information)
- [Styling](#styling)
- [Webpack Configuration](#webpack-configuration)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project uses Node.js and Express for the backend and Webpack for bundling the frontend. The app takes city and date inputs, sends them to external APIs, and displays weather data, location information, and images of the destination.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/travel-app.git
```

2. Navigate into the project directory:

```bash
cd travel-app
```

3. Install the dependencies:

```bash
npm install
```

## Usage

1. Start the development server:

```bash
npm run build-dev
```

2. For production mode:

```bash
npm run build-prod
npm start
```

3. Open your browser and go to `http://localhost:8080/`.

## Dependencies

- Node.js
- Express
- Webpack
- Babel
- Jest
- dotenv
- cors
- body-parser
- axios

## Testing

To run the test suite:

```bash
npm run test
```

## API Information

This project uses the following external APIs:

- **GeoNames API**: For fetching geographic data (city name, latitude, longitude, country)
- **Weatherbit API**: For fetching weather forecast data based on geographic coordinates
- **Pixabay API**: For fetching images of the destination city

Make sure to set your API keys in the `.env` file:

```
GEONAMES_USERNAME=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key
```

## Styling

The app uses SCSS for styling with a modular approach:

- `src/client/styles/base.scss`: Base styles and global resets.
- `src/client/styles/header.scss`: Styles for the header section.
- `src/client/styles/form.scss`: Styles for the trip planning form.
- `src/client/styles/footer.scss`: Styles for the footer section.
- `src/client/styles/resets.scss`: CSS resets and normalization.

Destination display is styled as a flexible grid layout that adjusts the number of items per row based on screen size. Cards reduce in number per row as the screen shrinks, providing a responsive design.

## Webpack Configuration

The project uses Webpack for bundling and development:

- `webpack.dev.js`: Configuration for development mode with hot module replacement.
- `webpack.prod.js`: Optimized configuration for production builds.

Both configurations support SCSS loading and JavaScript transpilation via Babel.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

