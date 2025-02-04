import { useQuery } from '@tanstack/react-query';
import { fetchWeatherForecast } from '../../middleware/weatherforecast.fetching';
import { WeatherForecast } from '../../models/weathercast.model';

const WeatherForecastList: React.FC = () => {
  const { data, isLoading, error } = useQuery<WeatherForecast[]>({
    queryKey: ['users'],
    queryFn: fetchWeatherForecast,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((weathercast, idx) => (
        <li key={idx}>
          [{weathercast.date}] {weathercast.temperatureC}°C (
          {weathercast.temperatureF}°F) - {weathercast.summary}
        </li>
      ))}
    </ul>
  );
};

export default WeatherForecastList;
