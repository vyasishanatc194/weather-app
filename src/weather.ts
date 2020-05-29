import DarkSkyNet from './libs/dark-sky-net'
import Time from './libs/time'

namespace Weather {

  const NOT_FOUND_SYMBOL = '?'
  // main function for app which take parameter and return forcast and temp
  export const main = async (): Promise<void> => {
    // get location in array from the pass arguments
    const args = parseArgs(process.argv)
    // Get Current Time
    const currentTime: string = Time.getCurrentTime()
    // Fetch weatherfor locations
    const weatherData: any[] = await fetchWeatherForLocations(args.locations)
    console.log(`Time: ${currentTime}\n`)
    // Filter weather data avialable or not and log them in console
    weatherData
      .filter(weather => weather.success)
      .map(weather =>
        formatWeatherOutput(
          weather.location,
          weather.forecast,
          weather.temperature.celsius,
          weather.temperature.fahrenheit
        )
      )
      .forEach(weatherString => console.log(weatherString))
    weatherData
      .filter(weather => !weather.success)
      .forEach(weather => console.log(`Could not find location '${weather.location}'`))
  }
  // function which returns array of location
  export const parseArgs = (argsVector: string[]): any => {
    const locations = argsVector
      .slice(2, argsVector.length)
      .join(' ')
      .split(',')
      .map(location => location.trim())
      .filter(location => location.length > 0)
    return {locations}
  }
 // Fetch Weather for locations which passed
  export const fetchWeatherForLocations = async (locations: string[]): Promise<any[]> => {
    return Promise.all(locations.map(async (location) => {
      try {
        // Geting Geo location from the location array  and fetch weather report form it.
        const geoLocation = await DarkSkyNet.fetchGeoCoordinatesForQuery(location)
        const forecastWithCelsius = await DarkSkyNet.fetchWeatherInCelsius(geoLocation.latitude, geoLocation.longitude)
        const forecastWithFahrenheit = await DarkSkyNet.fetchWeatherInFahrenheit(geoLocation.latitude, geoLocation.longitude)
        const forecast = DarkSkyNet.readForecast(forecastWithCelsius)
        const celsius = DarkSkyNet.readTemperature(forecastWithCelsius)
        const fahrenheit = DarkSkyNet.readTemperature(forecastWithFahrenheit)
        return createWeatherDataObject(true, location, forecast, celsius, fahrenheit)
      } catch (e) {
        return createWeatherDataObject(false, location)
      }
    }))
  }

  // Set object to log
  export const formatWeatherOutput = (location: string, forecast: string, celsius: string, fahrenheit: string): string => {
    return `Location: ${location}\n`
      + `Forecast: ${forecast}\n`
      + `Temp: ${celsius}C / ${fahrenheit}F\n`
  }

  // Create weather object and return
  const createWeatherDataObject = (success: boolean,
                                   location: string,
                                   forecast: string = NOT_FOUND_SYMBOL,
                                   celsius: string = NOT_FOUND_SYMBOL,
                                   fahrenheit: string = NOT_FOUND_SYMBOL) => {
    const weatherObject = {
      success,
      location,
      forecast,
      temperature: {
        celsius,
        fahrenheit
      }
    }
    return weatherObject
  }

}

export default Weather

Weather.main().then().catch()
