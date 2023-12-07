import { ClientError } from "../utils/ClientError.js";
import { getWeatherForCity } from "../services/getWeather.js";
export const weatherController = async (req, res) => {
  if (!req.user.city || !req.user.username) {
    throw new ClientError("Error not found credentials");
  }

  const { city, username } = req.user;

  const data = await getWeatherForCity(city);

  res.status(200).json({
    error: false,
    data,
    username,
  });
};
