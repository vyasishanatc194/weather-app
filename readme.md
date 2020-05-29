# Weather App

A Weather App that displays the following:
- Current time (hh\:mm\:ss)
- Temperature in Celsius for each specified location
- Temperature in Fahrenheit for each specified location
- Weather forecast for each specified location

## Running the App

1. Set up local environment

- node v11.9.0
- npm v6.5.0

2. Install Dependencies
```
npm install
```

3. Build the App
```
npm run build
```

4. Run the App
The app takes comma-separated values of location names or postal codes.
You can run the app on the command line using `node`.

Example: Get the weather in Vancouver, Toronto, and New York
```
node dist/lib/weather.js Vancouver, Toronto, New York
```

## Credit

Initially created using the `typescript-library-starter`
repository: https://github.com/alexjoverm/typescript-library-starter
