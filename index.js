const apiKey = '43ed6738c20d2ba60cf5ebc75619570c';
let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
let sevenDayUrl = `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&units=metric`

let temp = '&lat={lat}&lon={lon}&exclude={part}';

async function fetchCurrentCoordinates () {
    // capture the cityname.
    let cityName = document.getElementById('cityNameInput').value;
    // if user input is empty then don't fetch any data.
    if(cityName === '' || cityName === null) return;
    const query = `${url}&q=${cityName}`;
    try {
        // making a fetch request to just capture the lat and long of the location.
        let res = await fetch(query);
        let data = await res.json();
        // console.log(data);
        let lat = data.coord.lat
        let lon = data.coord.lon
        // now use the latitude and longitude to fetch current weather data.
        fetchCurrenWeathertData(lat, lon, data.name);
        // displayData(data);

    }
    catch (err) {
        console.log(err);
    }
}

async function fetchCurrenWeathertData(lat, long, name) {
    let query = `${sevenDayUrl}&lat=${lat}&lon=${long}`;
    let res = await fetch(query);
    let data = await res.json();
    data.current.name = name;
    console.log(data);
    displayData(data.current);
    displayFutureData(data.daily);
}

let id;
function debounceFunction (func, delay) {
    if(id) {
        clearTimeout(id);
    }
    id = setTimeout(function(){
        func();
    }, delay);
}

// fetchCurrentCoordinates();

function displayData (weatherData) {
    console.log(weatherData);
    let location = document.getElementById('location');
    location.innerText = weatherData.name;

    let temperature = document.getElementById('temperature');
    temperature.innerText = `${Math.round(weatherData.temp)}ºC`;

    let pressure = document.getElementById('pressure');
    pressure.innerText = `Pressure : ${weatherData.pressure}Pa`
    let wind = document.getElementById('wind');
    wind.innerText = `wind : ${weatherData.wind_speed}m/s`
    let humidity = document.getElementById('humidity');
    humidity.innerText = `humidity : ${weatherData.humidity}%`
    initMap(weatherData.name);
}

function initMap (cityName) {
    // let mapUrl = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    // let mapIframe = document.getElementById('gmap_canvas');
    document.getElementById('gmap_canvas').src = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    // mapIframe.src = mapUrl;
    // console.log(mapIframe);
}

// let daysArr = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.trim().split(',');
let day = {
    "0": "Sun",
    "1": "Mon",
    "2": "Tue",
    "3": "Wed",
    "4": "Thu",
    "5": "Fri",
    "6": "Sat"
}

// function for displaying future data.
function displayFutureData(dailyData) {
    let futureDataRow = document.getElementById('futureDataRow');
    futureDataRow.innerHTML = null;
    console.log(dailyData);
    dailyData.forEach(function (el,index) {
        if (index == 0) return;
        // console.log(el);
        let col = document.createElement('div');
        col.classList = 'col';
        let card = document.createElement('div');
        card.classList = 'card';

        let img = document.createElement('img');
        img.classList = 'card-img-top';
        img.src = `https://openweathermap.org/img/wn/${el.weather[0].icon}@4x.png`;

        let cardBody = document.createElement('div');
        cardBody.classList = 'card-body';


        // Converting timestamp -> Date, Day format.
        let timestamp = el.dt*1000;
        let dateObj = new Date(timestamp);
        let currentDay = day[dateObj.getDay()];
        let currentDate = dateObj.getDate();
        let title = document.createElement('h6');
        title.innerText = `${currentDay} ${currentDate}`;
        // console.log(timestamp);
        
        // collecting temperature data.
        let maxTemp = document.createElement('p');
        maxTemp.innerText = `Max : ${el.temp.max}°C`;
        let minTemp = document.createElement('p')
        minTemp.innerText = `Min : ${el.temp.min}°C`;
        cardBody.append(title,maxTemp,minTemp);

        card.append(img,cardBody);
        col.append(card);
        futureDataRow.append(col);
    })
}

let sample = {
    "lat": 12.9116,
    "lon": 77.6389,
    "timezone": "Asia/Kolkata",
    "timezone_offset": 19800,
    "current": {
        "dt": 1653663534,
        "sunrise": 1653610956,
        "sunset": 1653657052,
        "temp": 27.54,
        "feels_like": 28.19,
        "pressure": 957,
        "humidity": 53,
        "dew_point": 17.11,
        "uvi": 0,
        "clouds": 40,
        "visibility": 6000,
        "wind_speed": 2.57,
        "wind_deg": 270,
        "weather": [
            {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03n"
            }
        ],
        "name": "HSR Layout"
    },
    "minutely": [
        {
            "dt": 1653663540,
            "precipitation": 0
        },
        {
            "dt": 1653663600,
            "precipitation": 0
        },
        {
            "dt": 1653663660,
            "precipitation": 0
        },
        {
            "dt": 1653663720,
            "precipitation": 0
        },
        {
            "dt": 1653663780,
            "precipitation": 0
        },
        {
            "dt": 1653663840,
            "precipitation": 0
        },
        {
            "dt": 1653663900,
            "precipitation": 0
        },
        {
            "dt": 1653663960,
            "precipitation": 0
        },
        {
            "dt": 1653664020,
            "precipitation": 0
        },
        {
            "dt": 1653664080,
            "precipitation": 0
        },
        {
            "dt": 1653664140,
            "precipitation": 0
        },
        {
            "dt": 1653664200,
            "precipitation": 0
        },
        {
            "dt": 1653664260,
            "precipitation": 0
        },
        {
            "dt": 1653664320,
            "precipitation": 0
        },
        {
            "dt": 1653664380,
            "precipitation": 0
        },
        {
            "dt": 1653664440,
            "precipitation": 0
        },
        {
            "dt": 1653664500,
            "precipitation": 0
        },
        {
            "dt": 1653664560,
            "precipitation": 0
        },
        {
            "dt": 1653664620,
            "precipitation": 0
        },
        {
            "dt": 1653664680,
            "precipitation": 0
        },
        {
            "dt": 1653664740,
            "precipitation": 0
        },
        {
            "dt": 1653664800,
            "precipitation": 0
        },
        {
            "dt": 1653664860,
            "precipitation": 0
        },
        {
            "dt": 1653664920,
            "precipitation": 0
        },
        {
            "dt": 1653664980,
            "precipitation": 0
        },
        {
            "dt": 1653665040,
            "precipitation": 0
        },
        {
            "dt": 1653665100,
            "precipitation": 0
        },
        {
            "dt": 1653665160,
            "precipitation": 0
        },
        {
            "dt": 1653665220,
            "precipitation": 0
        },
        {
            "dt": 1653665280,
            "precipitation": 0
        },
        {
            "dt": 1653665340,
            "precipitation": 0
        },
        {
            "dt": 1653665400,
            "precipitation": 0
        },
        {
            "dt": 1653665460,
            "precipitation": 0
        },
        {
            "dt": 1653665520,
            "precipitation": 0
        },
        {
            "dt": 1653665580,
            "precipitation": 0
        },
        {
            "dt": 1653665640,
            "precipitation": 0
        },
        {
            "dt": 1653665700,
            "precipitation": 0
        },
        {
            "dt": 1653665760,
            "precipitation": 0
        },
        {
            "dt": 1653665820,
            "precipitation": 0
        },
        {
            "dt": 1653665880,
            "precipitation": 0
        },
        {
            "dt": 1653665940,
            "precipitation": 0
        },
        {
            "dt": 1653666000,
            "precipitation": 0
        },
        {
            "dt": 1653666060,
            "precipitation": 0
        },
        {
            "dt": 1653666120,
            "precipitation": 0
        },
        {
            "dt": 1653666180,
            "precipitation": 0
        },
        {
            "dt": 1653666240,
            "precipitation": 0
        },
        {
            "dt": 1653666300,
            "precipitation": 0
        },
        {
            "dt": 1653666360,
            "precipitation": 0
        },
        {
            "dt": 1653666420,
            "precipitation": 0
        },
        {
            "dt": 1653666480,
            "precipitation": 0
        },
        {
            "dt": 1653666540,
            "precipitation": 0
        },
        {
            "dt": 1653666600,
            "precipitation": 0
        },
        {
            "dt": 1653666660,
            "precipitation": 0
        },
        {
            "dt": 1653666720,
            "precipitation": 0
        },
        {
            "dt": 1653666780,
            "precipitation": 0
        },
        {
            "dt": 1653666840,
            "precipitation": 0
        },
        {
            "dt": 1653666900,
            "precipitation": 0
        },
        {
            "dt": 1653666960,
            "precipitation": 0
        },
        {
            "dt": 1653667020,
            "precipitation": 0
        },
        {
            "dt": 1653667080,
            "precipitation": 0
        },
        {
            "dt": 1653667140,
            "precipitation": 0
        }
    ],
    "hourly": [
        {
            "dt": 1653660000,
            "temp": 27.6,
            "feels_like": 28.09,
            "pressure": 967,
            "humidity": 51,
            "dew_point": 16.56,
            "uvi": 0,
            "clouds": 41,
            "visibility": 10000,
            "wind_speed": 3.81,
            "wind_deg": 296,
            "wind_gust": 7.57,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.08
        },
        {
            "dt": 1653663600,
            "temp": 27.54,
            "feels_like": 28.19,
            "pressure": 957,
            "humidity": 53,
            "dew_point": 17.11,
            "uvi": 0,
            "clouds": 40,
            "visibility": 10000,
            "wind_speed": 4.1,
            "wind_deg": 252,
            "wind_gust": 7.81,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.06
        },
        {
            "dt": 1653667200,
            "temp": 27.02,
            "feels_like": 27.76,
            "pressure": 968,
            "humidity": 55,
            "dew_point": 17.21,
            "uvi": 0,
            "clouds": 39,
            "visibility": 10000,
            "wind_speed": 5.93,
            "wind_deg": 243,
            "wind_gust": 10.02,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.09
        },
        {
            "dt": 1653670800,
            "temp": 26.1,
            "feels_like": 26.1,
            "pressure": 978,
            "humidity": 59,
            "dew_point": 17.47,
            "uvi": 0,
            "clouds": 40,
            "visibility": 10000,
            "wind_speed": 5.89,
            "wind_deg": 253,
            "wind_gust": 10.2,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.06
        },
        {
            "dt": 1653674400,
            "temp": 25.06,
            "feels_like": 25.32,
            "pressure": 989,
            "humidity": 65,
            "dew_point": 18.02,
            "uvi": 0,
            "clouds": 38,
            "visibility": 10000,
            "wind_speed": 5.27,
            "wind_deg": 247,
            "wind_gust": 9.34,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.06
        },
        {
            "dt": 1653678000,
            "temp": 23.84,
            "feels_like": 24.11,
            "pressure": 999,
            "humidity": 70,
            "dew_point": 18.04,
            "uvi": 0,
            "clouds": 36,
            "visibility": 10000,
            "wind_speed": 5.24,
            "wind_deg": 247,
            "wind_gust": 9.34,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653681600,
            "temp": 22.54,
            "feels_like": 22.86,
            "pressure": 1009,
            "humidity": 77,
            "dew_point": 18.3,
            "uvi": 0,
            "clouds": 58,
            "visibility": 10000,
            "wind_speed": 5.19,
            "wind_deg": 244,
            "wind_gust": 9.22,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.01
        },
        {
            "dt": 1653685200,
            "temp": 22.1,
            "feels_like": 22.43,
            "pressure": 1008,
            "humidity": 79,
            "dew_point": 18.46,
            "uvi": 0,
            "clouds": 72,
            "visibility": 10000,
            "wind_speed": 5.23,
            "wind_deg": 247,
            "wind_gust": 9.31,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653688800,
            "temp": 21.7,
            "feels_like": 22.04,
            "pressure": 1008,
            "humidity": 81,
            "dew_point": 18.45,
            "uvi": 0,
            "clouds": 79,
            "visibility": 10000,
            "wind_speed": 5.49,
            "wind_deg": 246,
            "wind_gust": 9.72,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653692400,
            "temp": 21.45,
            "feels_like": 21.77,
            "pressure": 1008,
            "humidity": 81,
            "dew_point": 18.13,
            "uvi": 0,
            "clouds": 83,
            "visibility": 10000,
            "wind_speed": 4.98,
            "wind_deg": 253,
            "wind_gust": 9.29,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653696000,
            "temp": 21.11,
            "feels_like": 21.37,
            "pressure": 1009,
            "humidity": 80,
            "dew_point": 17.59,
            "uvi": 0,
            "clouds": 83,
            "visibility": 10000,
            "wind_speed": 4.82,
            "wind_deg": 257,
            "wind_gust": 9.24,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653699600,
            "temp": 21.03,
            "feels_like": 21.25,
            "pressure": 1010,
            "humidity": 79,
            "dew_point": 17.41,
            "uvi": 0.18,
            "clouds": 49,
            "visibility": 10000,
            "wind_speed": 4.71,
            "wind_deg": 263,
            "wind_gust": 9.18,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653703200,
            "temp": 22.31,
            "feels_like": 22.42,
            "pressure": 1011,
            "humidity": 70,
            "dew_point": 16.67,
            "uvi": 1.11,
            "clouds": 57,
            "visibility": 10000,
            "wind_speed": 5.53,
            "wind_deg": 269,
            "wind_gust": 8.38,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653706800,
            "temp": 24.05,
            "feels_like": 24.05,
            "pressure": 1011,
            "humidity": 59,
            "dew_point": 15.62,
            "uvi": 3.31,
            "clouds": 63,
            "visibility": 10000,
            "wind_speed": 5.87,
            "wind_deg": 267,
            "wind_gust": 7.82,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653710400,
            "temp": 25.91,
            "feels_like": 25.84,
            "pressure": 1011,
            "humidity": 49,
            "dew_point": 14.52,
            "uvi": 6.6,
            "clouds": 70,
            "visibility": 10000,
            "wind_speed": 5.74,
            "wind_deg": 267,
            "wind_gust": 6.9,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653714000,
            "temp": 27.63,
            "feels_like": 27.48,
            "pressure": 1011,
            "humidity": 42,
            "dew_point": 13.71,
            "uvi": 10.05,
            "clouds": 64,
            "visibility": 10000,
            "wind_speed": 5.48,
            "wind_deg": 269,
            "wind_gust": 6.02,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653717600,
            "temp": 29.03,
            "feels_like": 28.46,
            "pressure": 1009,
            "humidity": 38,
            "dew_point": 13.25,
            "uvi": 12.57,
            "clouds": 57,
            "visibility": 10000,
            "wind_speed": 5.26,
            "wind_deg": 270,
            "wind_gust": 5.54,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653721200,
            "temp": 30.17,
            "feels_like": 29.34,
            "pressure": 1008,
            "humidity": 35,
            "dew_point": 13.05,
            "uvi": 13.41,
            "clouds": 24,
            "visibility": 10000,
            "wind_speed": 4.82,
            "wind_deg": 273,
            "wind_gust": 4.72,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653724800,
            "temp": 30.96,
            "feels_like": 29.99,
            "pressure": 1007,
            "humidity": 33,
            "dew_point": 12.93,
            "uvi": 12.03,
            "clouds": 26,
            "visibility": 10000,
            "wind_speed": 4.45,
            "wind_deg": 275,
            "wind_gust": 4.17,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653728400,
            "temp": 31.45,
            "feels_like": 30.42,
            "pressure": 1006,
            "humidity": 32,
            "dew_point": 12.85,
            "uvi": 9.06,
            "clouds": 29,
            "visibility": 10000,
            "wind_speed": 4.07,
            "wind_deg": 273,
            "wind_gust": 3.65,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653732000,
            "temp": 31.63,
            "feels_like": 30.51,
            "pressure": 1005,
            "humidity": 31,
            "dew_point": 12.68,
            "uvi": 5.49,
            "clouds": 26,
            "visibility": 10000,
            "wind_speed": 3.82,
            "wind_deg": 267,
            "wind_gust": 3.32,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653735600,
            "temp": 31.49,
            "feels_like": 30.36,
            "pressure": 1005,
            "humidity": 31,
            "dew_point": 12.61,
            "uvi": 2.46,
            "clouds": 25,
            "visibility": 10000,
            "wind_speed": 3.93,
            "wind_deg": 259,
            "wind_gust": 3.56,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653739200,
            "temp": 30.91,
            "feels_like": 29.93,
            "pressure": 1006,
            "humidity": 33,
            "dew_point": 12.98,
            "uvi": 0.69,
            "clouds": 25,
            "visibility": 10000,
            "wind_speed": 4.09,
            "wind_deg": 249,
            "wind_gust": 3.96,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653742800,
            "temp": 29.25,
            "feels_like": 28.68,
            "pressure": 1006,
            "humidity": 38,
            "dew_point": 13.75,
            "uvi": 0,
            "clouds": 39,
            "visibility": 10000,
            "wind_speed": 3.99,
            "wind_deg": 240,
            "wind_gust": 6.16,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653746400,
            "temp": 28.2,
            "feels_like": 27.84,
            "pressure": 1007,
            "humidity": 40,
            "dew_point": 13.51,
            "uvi": 0,
            "clouds": 44,
            "visibility": 10000,
            "wind_speed": 4.65,
            "wind_deg": 241,
            "wind_gust": 8.16,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653750000,
            "temp": 27.33,
            "feels_like": 27.28,
            "pressure": 1008,
            "humidity": 43,
            "dew_point": 13.78,
            "uvi": 0,
            "clouds": 48,
            "visibility": 10000,
            "wind_speed": 5.85,
            "wind_deg": 247,
            "wind_gust": 9.89,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653753600,
            "temp": 25.68,
            "feels_like": 25.82,
            "pressure": 1009,
            "humidity": 58,
            "dew_point": 16.67,
            "uvi": 0,
            "clouds": 51,
            "visibility": 10000,
            "wind_speed": 6.98,
            "wind_deg": 253,
            "wind_gust": 10.62,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653757200,
            "temp": 24.33,
            "feels_like": 24.59,
            "pressure": 1010,
            "humidity": 68,
            "dew_point": 18.16,
            "uvi": 0,
            "clouds": 43,
            "visibility": 10000,
            "wind_speed": 6.79,
            "wind_deg": 259,
            "wind_gust": 10.55,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653760800,
            "temp": 23.48,
            "feels_like": 23.76,
            "pressure": 1010,
            "humidity": 72,
            "dew_point": 18.29,
            "uvi": 0,
            "clouds": 36,
            "visibility": 10000,
            "wind_speed": 6.32,
            "wind_deg": 253,
            "wind_gust": 10.65,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653764400,
            "temp": 22.79,
            "feels_like": 23.11,
            "pressure": 1009,
            "humidity": 76,
            "dew_point": 18.34,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 6.3,
            "wind_deg": 245,
            "wind_gust": 10.81,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653768000,
            "temp": 22.15,
            "feels_like": 22.48,
            "pressure": 1009,
            "humidity": 79,
            "dew_point": 18.41,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 6.2,
            "wind_deg": 247,
            "wind_gust": 10.97,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653771600,
            "temp": 21.51,
            "feels_like": 21.86,
            "pressure": 1009,
            "humidity": 82,
            "dew_point": 18.41,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 5.8,
            "wind_deg": 249,
            "wind_gust": 10.4,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653775200,
            "temp": 21.1,
            "feels_like": 21.43,
            "pressure": 1008,
            "humidity": 83,
            "dew_point": 18.23,
            "uvi": 0,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 5.55,
            "wind_deg": 257,
            "wind_gust": 10.05,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653778800,
            "temp": 20.83,
            "feels_like": 21.11,
            "pressure": 1009,
            "humidity": 82,
            "dew_point": 17.74,
            "uvi": 0,
            "clouds": 7,
            "visibility": 10000,
            "wind_speed": 5.56,
            "wind_deg": 263,
            "wind_gust": 10.31,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653782400,
            "temp": 20.52,
            "feels_like": 20.69,
            "pressure": 1009,
            "humidity": 79,
            "dew_point": 16.86,
            "uvi": 0,
            "clouds": 8,
            "visibility": 10000,
            "wind_speed": 5.28,
            "wind_deg": 264,
            "wind_gust": 10.04,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653786000,
            "temp": 20.5,
            "feels_like": 20.59,
            "pressure": 1010,
            "humidity": 76,
            "dew_point": 16.22,
            "uvi": 0.18,
            "clouds": 82,
            "visibility": 10000,
            "wind_speed": 5.12,
            "wind_deg": 267,
            "wind_gust": 9.67,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653789600,
            "temp": 21.72,
            "feels_like": 21.67,
            "pressure": 1011,
            "humidity": 66,
            "dew_point": 15.17,
            "uvi": 1.13,
            "clouds": 58,
            "visibility": 10000,
            "wind_speed": 5.89,
            "wind_deg": 274,
            "wind_gust": 8.79,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653793200,
            "temp": 23.58,
            "feels_like": 23.46,
            "pressure": 1011,
            "humidity": 56,
            "dew_point": 14.38,
            "uvi": 3.34,
            "clouds": 63,
            "visibility": 10000,
            "wind_speed": 5.95,
            "wind_deg": 276,
            "wind_gust": 7.88,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653796800,
            "temp": 25.63,
            "feels_like": 25.45,
            "pressure": 1011,
            "humidity": 46,
            "dew_point": 13.41,
            "uvi": 6.7,
            "clouds": 63,
            "visibility": 10000,
            "wind_speed": 5.75,
            "wind_deg": 276,
            "wind_gust": 6.92,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653800400,
            "temp": 27.56,
            "feels_like": 27.24,
            "pressure": 1010,
            "humidity": 39,
            "dew_point": 12.61,
            "uvi": 10.21,
            "clouds": 59,
            "visibility": 10000,
            "wind_speed": 5.59,
            "wind_deg": 278,
            "wind_gust": 6.23,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653804000,
            "temp": 29.1,
            "feels_like": 28.37,
            "pressure": 1010,
            "humidity": 36,
            "dew_point": 12.53,
            "uvi": 12.76,
            "clouds": 57,
            "visibility": 10000,
            "wind_speed": 5.18,
            "wind_deg": 281,
            "wind_gust": 5.42,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653807600,
            "temp": 30.29,
            "feels_like": 29.37,
            "pressure": 1008,
            "humidity": 34,
            "dew_point": 12.79,
            "uvi": 13.47,
            "clouds": 40,
            "visibility": 10000,
            "wind_speed": 4.58,
            "wind_deg": 283,
            "wind_gust": 4.53,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653811200,
            "temp": 31.06,
            "feels_like": 30.1,
            "pressure": 1007,
            "humidity": 33,
            "dew_point": 13.07,
            "uvi": 12.08,
            "clouds": 46,
            "visibility": 10000,
            "wind_speed": 3.93,
            "wind_deg": 279,
            "wind_gust": 3.49,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653814800,
            "temp": 31.62,
            "feels_like": 30.62,
            "pressure": 1006,
            "humidity": 32,
            "dew_point": 13.1,
            "uvi": 9.1,
            "clouds": 54,
            "visibility": 10000,
            "wind_speed": 3.54,
            "wind_deg": 270,
            "wind_gust": 2.86,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653818400,
            "temp": 31.88,
            "feels_like": 30.8,
            "pressure": 1006,
            "humidity": 31,
            "dew_point": 12.86,
            "uvi": 5.49,
            "clouds": 60,
            "visibility": 10000,
            "wind_speed": 3.43,
            "wind_deg": 257,
            "wind_gust": 2.64,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653822000,
            "temp": 31.77,
            "feels_like": 30.67,
            "pressure": 1006,
            "humidity": 31,
            "dew_point": 12.56,
            "uvi": 2.45,
            "clouds": 63,
            "visibility": 10000,
            "wind_speed": 3.74,
            "wind_deg": 243,
            "wind_gust": 2.91,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653825600,
            "temp": 31.15,
            "feels_like": 30.09,
            "pressure": 1006,
            "humidity": 32,
            "dew_point": 12.62,
            "uvi": 0.69,
            "clouds": 65,
            "visibility": 10000,
            "wind_speed": 4.33,
            "wind_deg": 232,
            "wind_gust": 3.66,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1653829200,
            "temp": 29.31,
            "feels_like": 28.65,
            "pressure": 1007,
            "humidity": 37,
            "dew_point": 13.21,
            "uvi": 0,
            "clouds": 69,
            "visibility": 10000,
            "wind_speed": 4.52,
            "wind_deg": 224,
            "wind_gust": 6.36,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        }
    ],
    "daily": [
        {
            "dt": 1653633000,
            "sunrise": 1653610956,
            "sunset": 1653657052,
            "moonrise": 1653602640,
            "moonset": 1653648060,
            "moon_phase": 0.9,
            "temp": {
                "day": 29.02,
                "min": 21.61,
                "max": 31.41,
                "night": 25.06,
                "eve": 28.96,
                "morn": 21.61
            },
            "feels_like": {
                "day": 29.33,
                "night": 25.32,
                "eve": 28.85,
                "morn": 21.99
            },
            "pressure": 1010,
            "humidity": 47,
            "dew_point": 16.57,
            "wind_speed": 5.93,
            "wind_deg": 243,
            "wind_gust": 10.2,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 29,
            "pop": 0.67,
            "rain": 1.5,
            "uvi": 13.59
        },
        {
            "dt": 1653719400,
            "sunrise": 1653697352,
            "sunset": 1653743470,
            "moonrise": 1653691320,
            "moonset": 1653737400,
            "moon_phase": 0.93,
            "temp": {
                "day": 29.03,
                "min": 21.03,
                "max": 31.63,
                "night": 23.48,
                "eve": 30.91,
                "morn": 21.11
            },
            "feels_like": {
                "day": 28.46,
                "night": 23.76,
                "eve": 29.93,
                "morn": 21.37
            },
            "pressure": 1009,
            "humidity": 38,
            "dew_point": 13.25,
            "wind_speed": 6.98,
            "wind_deg": 253,
            "wind_gust": 10.65,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 57,
            "pop": 0.01,
            "uvi": 13.41
        },
        {
            "dt": 1653805800,
            "sunrise": 1653783749,
            "sunset": 1653829888,
            "moonrise": 1653780060,
            "moonset": 1653826800,
            "moon_phase": 0.96,
            "temp": {
                "day": 29.1,
                "min": 20.5,
                "max": 31.88,
                "night": 23.27,
                "eve": 31.15,
                "morn": 20.52
            },
            "feels_like": {
                "day": 28.37,
                "night": 23.43,
                "eve": 30.09,
                "morn": 20.69
            },
            "pressure": 1010,
            "humidity": 36,
            "dew_point": 12.53,
            "wind_speed": 6.91,
            "wind_deg": 245,
            "wind_gust": 11.76,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 57,
            "pop": 0.04,
            "uvi": 13.47
        },
        {
            "dt": 1653892200,
            "sunrise": 1653870147,
            "sunset": 1653916306,
            "moonrise": 1653869040,
            "moonset": 1653916260,
            "moon_phase": 0,
            "temp": {
                "day": 29.34,
                "min": 20.43,
                "max": 32.19,
                "night": 24.14,
                "eve": 31.74,
                "morn": 20.43
            },
            "feels_like": {
                "day": 29.06,
                "night": 24.36,
                "eve": 30.75,
                "morn": 20.62
            },
            "pressure": 1009,
            "humidity": 41,
            "dew_point": 14.79,
            "wind_speed": 6.15,
            "wind_deg": 250,
            "wind_gust": 10.07,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 18,
            "pop": 0.28,
            "rain": 0.27,
            "uvi": 13.35
        },
        {
            "dt": 1653978600,
            "sunrise": 1653956546,
            "sunset": 1654002724,
            "moonrise": 1653958080,
            "moonset": 1654005840,
            "moon_phase": 0.02,
            "temp": {
                "day": 29.94,
                "min": 21.32,
                "max": 32.7,
                "night": 23.89,
                "eve": 29.36,
                "morn": 21.32
            },
            "feels_like": {
                "day": 29.98,
                "night": 24.24,
                "eve": 29.29,
                "morn": 21.62
            },
            "pressure": 1008,
            "humidity": 43,
            "dew_point": 16.02,
            "wind_speed": 5.62,
            "wind_deg": 258,
            "wind_gust": 9.55,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 62,
            "pop": 0.41,
            "rain": 0.94,
            "uvi": 13.13
        },
        {
            "dt": 1654065000,
            "sunrise": 1654042945,
            "sunset": 1654089142,
            "moonrise": 1654047360,
            "moonset": 1654095300,
            "moon_phase": 0.05,
            "temp": {
                "day": 29.47,
                "min": 21.16,
                "max": 30.56,
                "night": 21.16,
                "eve": 29.74,
                "morn": 21.35
            },
            "feels_like": {
                "day": 29.89,
                "night": 21.47,
                "eve": 29.86,
                "morn": 21.81
            },
            "pressure": 1009,
            "humidity": 47,
            "dew_point": 17.19,
            "wind_speed": 5.86,
            "wind_deg": 240,
            "wind_gust": 10.83,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 81,
            "pop": 0.91,
            "rain": 6.81,
            "uvi": 14
        },
        {
            "dt": 1654151400,
            "sunrise": 1654129346,
            "sunset": 1654175560,
            "moonrise": 1654136820,
            "moonset": 1654184760,
            "moon_phase": 0.09,
            "temp": {
                "day": 28.53,
                "min": 20.79,
                "max": 31.88,
                "night": 23.85,
                "eve": 31.11,
                "morn": 20.79
            },
            "feels_like": {
                "day": 29.29,
                "night": 24.3,
                "eve": 31.06,
                "morn": 21.22
            },
            "pressure": 1009,
            "humidity": 52,
            "dew_point": 17.68,
            "wind_speed": 5.97,
            "wind_deg": 271,
            "wind_gust": 10.31,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 0.96,
            "rain": 8.14,
            "uvi": 14
        },
        {
            "dt": 1654237800,
            "sunrise": 1654215747,
            "sunset": 1654261978,
            "moonrise": 1654226280,
            "moonset": 1654274040,
            "moon_phase": 0.12,
            "temp": {
                "day": 30.2,
                "min": 21.55,
                "max": 32.99,
                "night": 21.98,
                "eve": 32.22,
                "morn": 21.98
            },
            "feels_like": {
                "day": 30.87,
                "night": 22.43,
                "eve": 32.41,
                "morn": 22.48
            },
            "pressure": 1007,
            "humidity": 47,
            "dew_point": 17.67,
            "wind_speed": 6.71,
            "wind_deg": 267,
            "wind_gust": 11.8,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 65,
            "pop": 0.78,
            "rain": 6.63,
            "uvi": 14
        }
    ]
}

async function fetchCurrenWeatherByLatLong(lat,long) {
    let query = `${url}&lat=${lat}&lon=${long}`;
    let response = await fetch (query);
    let data = await response.json();
    // console.log(data);
    fetchCurrenWeathertData(lat, long, data.name)
    // displayData(data);
}

// console.log(sample);
if('geolocation' in navigator) {
    // geolocation is available
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        let coords = position.coords;
        fetchCurrenWeatherByLatLong(coords.latitude,coords.longitude);
    },errorGeoLocation,{enableHighAccuracy:true});
    function errorGeoLocation(err) {
        alert(err);
        console.log(err);
    }
}
else {
    // geolocation is unavailable
    alert('Geo location service is unavailable on your device :(');
}
displayData(sample.current);
displayFutureData(sample.daily);