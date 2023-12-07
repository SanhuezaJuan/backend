import "dotenv/config.js";

const cleanData = async (response) => {
  let { data, location } = response;

  console.log(data.values);
  let {
    temperature,
    humidity,
    temperatureApparent,
    precipitationProbability,
    rainIntensity,
    uvHealthConcern,
    visibility,
    cloudCover,
    cloudCeiling,
    windSpeed,
    windDirection,
    uvIndex,
  } = data.values;
  let { name, lat, lon } = location;

  return {
    temperature,
    humidity,
    temperatureApparent,
    precipitationProbability,
    rainIntensity,
    uvHealthConcern,
    visibility,
    cloudCover,
    cloudCeiling,
    windSpeed,
    windDirection,
    uvIndex,
    name,
    lat,
    lon,
  };
};

export const getWeatherForCity = async (city) => {
  try {
    let path = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${process.env.WEATHER_KEY}`;
    let data = await fetch(path);
    if (!data) {
      throw new Error("Error inseperado");
    }
    let response = await data.json();
    return await cleanData(response);
  } catch (error) {
    throw error;
  }
};
