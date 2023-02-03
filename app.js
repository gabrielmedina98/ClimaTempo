//Interação
const citySearchInput=document.getElementById('city-search-input')
const citySearchButton=document.getElementById('city-search-button')

//Exibição
const currentDate=document.getElementById('current-date')
const cityName=document.getElementById('city-Name')
const weatherIcon=document.getElementById('weather-icon')
const weatherDescription=document.getElementById('weather-description')
const currenteTemp=document.getElementById('current-temp')
const windSpeed=document.getElementById('wind-speed')
const feelsLikeTemperature=document.getElementById('feels-like-temperature')
const currentHumidity=document.getElementById('current-humidity')
const sunriseTime=document.getElementById('sunrise-time')
const sunsetTime=document.getElementById('sunset-time')

//addEventListener O objeto que recebe uma notificação quando um evento do tipo especificado ocorre. 
citySearchButton.addEventListener("click", () => {
 let cityName=citySearchInput.value
 getCityWeather(cityName)
})

//Apertando Enter para realizar a pesquisa

/* Solicita a geolocalização do usuário */
navigator.geolocation.getCurrentPosition (
    (position) => { 
let lat = position.coords.latitude
let lon = position.coords.longitude

getCurrentLocationWeather(lat, lon)
 
},
(err) => { // se da errado apresentar mensagem de erro
    if(err.code===1){
        alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.")
    }
    else{
        console.log(err)
    }
})

function getCurrentLocationWeather(lat, lon){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
.then(( response) => response.json())
.then((data) => displayWeather(data))}

const api_key="8fb078e4713ee69cf16ebd3cb4fcd9d6";

function getCityWeather(cityName){
    //Inserindo wetherIcon estamos deixando ele aparecer enquanto carrega a proxima cidade, para que não mude de um vez, pois dependendo do provedor pode demorar a pesquisa.

    weatherIcon.src=`loading-icon.svg`

    //fectch buscar 
    /* .then = então ou seja depois que essa informação chegar faça iss */
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then(( response) => response.json())
    .then((data) => displayWeather(data))}

    //função anonima que está convertendo para anotação que JS entende ( json )
    
    function displayWeather(data){

      /* Desestrututando o que vai ser usado */  
      let { 
        dt,
        name,
        weather:[{icon,description}],
        main:{temp, feels_like, humidity},
        wind:{speed},
        sys:{sunrise, sunset},
      } = data

    currentDate.textContent = formatDate(dt);
    cityName.textContent=name;
    weatherIcon.src=`${icon}.svg`

    weatherDescription.textContent=description;
    currenteTemp.textContent= `${Math.round(temp)}ºC`;
    windSpeed.textContent=`${Math.round(speed * 3.6)}Km/h`;
    feelsLikeTemperature.textContent=`${Math.round(feels_like)}ºC`;
    currentHumidity.textContent=`${(humidity)}%`;
    sunriseTime.textContent= formatTime (sunrise);
    sunsetTime.textContent=formatTime (sunset);

    }
    function formatDate(epochTime){
        let date = new Date(epochTime*1000)
        let formatteDate = date.toLocaleDateString('pt-BR' , { month: "long", day: 'numeric'})
        return `Hoje, ${formatteDate}`
    }
    
    function formatTime(epochTime){
        let date = new Date(epochTime*1000)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }

    function formatTime(epochTime){
        let date = new Date(epochTime*1000)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }
