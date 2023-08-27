const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
}) 

async function fetchWeather (){
    try{
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const city = 'Atlanta';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        const response = await fetch(url);
        console.log(response);
    //checks if response was not successful; else it will throw an error
        if (!response.ok) {
        throw new Error(`error`);
    }

        const data = await response.json();
        console.log(data);
        
    
    displayWeather(data); // Call the displayWeather function
        } catch (error) {
            console.log(error);
        }
}


function displayWeather(data){
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const iconImage = document.createElement("img");
    iconImage.src = iconUrl;
    
    const iconContainer = document.getElementById('weather');
    iconContainer.appendChild(iconImage);

    const temperature = document.getElementById('weather-temp');
    temperature.textContent = `${data.main.temp} \u00B0`;

    const description = document.getElementById('weather-description');
    description.textContent = data.weather[0].description;
};

fetchWeather();