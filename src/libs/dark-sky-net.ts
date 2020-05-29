import Request from './request'
// DarkSkyNet is used for getting weather report for the location
namespace DarkSkyNet {
  const HTML_SELECTOR_FOR_WEATHER_STRING = '#title .currently .desc .swap'
  //Url use for get geo location for given city and postal code same for forecast in celsius and fahrenheit
  const URL_GEO_QUERY: string = 'https://darksky.net/geo?q=%'
  const URL_FORECAST_IN_CELSIUS = 'https://darksky.net/forecast/%/ca12/en'
  const URL_FORECAST_IN_FAHRENHEIT = 'https://darksky.net/forecast/%/us12/en'
  
  //Check temprature detail available if yes then retur it
  export const readTemperature = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(/\s/, 1)
    return weatherStringParts.length > 0 ? weatherStringParts[0] : '?'
  }
//Check forecast detail available if yes then retur it
  export const readForecast = (weatherString: string): string => {
    weatherString = weatherString.replace('.', '')
    const weatherStringParts = weatherString.split(/\s/)
    let forecast = '?'
    if (weatherStringParts.length > 1) {
      forecast = weatherString.substr(weatherStringParts[0].length + 1, weatherString.length)
    }
    return forecast
  }

  //Fetch geo Location 
  export const fetchGeoCoordinatesForQuery = async (query: string): Promise<any> => {
    const geoQueryUrl = URL_GEO_QUERY.replace('%', query)
    const geoLocationJsonString = await Request.get(geoQueryUrl)
    return JSON.parse(geoLocationJsonString)
  }

  //Fetch Weather report in celsius
  export const fetchWeatherInCelsius = async (latitude: number, longitude: number): Promise<any> => {
    const geoLocationUrlParam = `${latitude},${longitude}`
    const celsiusForecastUrl = URL_FORECAST_IN_CELSIUS.replace('%', `${geoLocationUrlParam}`)
    return Request.fetchTextFromHtmlPage(celsiusForecastUrl, HTML_SELECTOR_FOR_WEATHER_STRING)
  }
  //Fetch Weather report in Fahrenheit
  export const fetchWeatherInFahrenheit = async (latitude: number, longitude: number): Promise<any> => {
    const geoLocationUrlParam = `${latitude},${longitude}`
    const fahrenheitForecastUrl = URL_FORECAST_IN_FAHRENHEIT.replace('%', `${geoLocationUrlParam}`)
    return Request.fetchTextFromHtmlPage(fahrenheitForecastUrl, HTML_SELECTOR_FOR_WEATHER_STRING)
  }
}

export default DarkSkyNet
