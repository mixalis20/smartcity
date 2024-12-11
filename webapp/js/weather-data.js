
const apiKey = 'ab1bb8942c19a355d0744cbc078f6648';


const city = 'Athens';

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


fetch(url)
  .then(response => {
   
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  })
  .then(data => {
    
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    console.log(`Temperature: ${temperature}°C`);
    console.log(`Weather: ${description}`);
    console.log(`Humidity: ${humidity}%`);
    console.log(`Wind speed: ${windSpeed} m/s`);
  })
 
