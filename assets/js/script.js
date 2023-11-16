document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById("news-container");
    const weatherContainer = document.getElementById("weather-container");

    function getNews() {
        const url = 'https://newsi-api.p.rapidapi.com/api/category?category=world&language=en&country=us&sort=top&page=1&limit=100';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd3df6e72f5msh0abcfec439681abp18c4d8jsn251ed9143e49',
                'X-RapidAPI-Host': 'newsi-api.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const breakingNewsTitle = document.createElement("p");
                newsContainer.appendChild(breakingNewsTitle);
                breakingNewsTitle.textContent = data[3].title;

                const breakingNewsImage = document.createElement("img");
                breakingNewsImage.src = data[3].image;
                newsContainer.appendChild(breakingNewsImage);
                breakingNewsImage.setAttribute("class", "border-2 max-h-96 max-w-2xl rounded-md border-indigo-500/75");
            });
    }
    getNews();


    function getWeather() {
        const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Birmingham&days=3';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd3df6e72f5msh0abcfec439681abp18c4d8jsn251ed9143e49',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data && data.forecast && data.forecast.forecastday.length > 0) {
                    for (let i = 0; i < data.forecast.forecastday.length; i++) {

                        const forecast = data.forecast.forecastday[i];
                        const location = data.location.name;
                        const date = forecast.date;
                        const minTemp = forecast.day.mintemp_c;
                        const avgTemp = forecast.day.avgtemp_c;
                        const maxTemp = forecast.day.maxtemp_c;

                        const daysWeatherBox = document.createElement("object")
                        locationBox = document.createElement("p")
                        locationBox.textContent = location;
                        dateBox = document.createElement("p")
                        dateBox.textContent = date;
                        avgtempBox = document.createElement("p")
                        avgtempBox.textContent = `Avg Temp: ${avgTemp}°C`;
                        maxtempBox = document.createElement("p")
                        maxtempBox.textContent = `Max Temp: ${maxTemp}°C`;
                        mintempBox = document.createElement("p")
                        mintempBox.textContent = `Min Temp: ${minTemp}°C`;

                        daysWeatherBox.appendChild(locationBox);
                        daysWeatherBox.appendChild(dateBox);
                        daysWeatherBox.appendChild(avgtempBox);
                        daysWeatherBox.appendChild(maxtempBox);
                        daysWeatherBox.appendChild(mintempBox);
                        daysWeatherBox.setAttribute("class", "border-2 rounded-md border-indigo-500/75");
                        weatherContainer.appendChild(daysWeatherBox);
                    }
                } else {
                    console.log("Failed to fetch weather information.");
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }


    getWeather();


    function saveToLocalStorage() {
        // Retrieve input values
        const firstNameInput = document.getElementById("first-name");
        const lastNameInput = document.getElementById("second-name");
        const emailInput = document.getElementById("email");
        const phoneNumberInput = document.getElementById("number");

        // Get values
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const phoneNumber = phoneNumberInput.value;

        // Check if values are not empty
        if (firstName && lastName && email && phoneNumber) {
            // Save to local storage
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("email", email);
            localStorage.setItem("phoneNumber", phoneNumber);


        } else {
            alert("Please fill in all fields.");
        }
        console.log(phoneNumber);
    };


    const submitBtn = document.getElementById("submit-btn");

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveToLocalStorage();
    });

    // Mustafa's code
    // 
    // 
    {
        // set API category field
        let category = 'world';
        let value = '';
        // respond to user search button record the seacrh value and remove prepare for the result to load 

        const searchInput = document.getElementById('query');
        $('#btn').on('click', function (event) {
            event.preventDefault();
            newsContainer.style.display = "none";
            weatherContainer.style.display = "none";
            value = searchInput.value
            console.log(value)
            NewsAPIupdate()
        });
        // create a 
        var myBreaknews = document.querySelector('.container')
        const url = `https://newsi-api.p.rapidapi.com/api/category?category=${category}&language=en&country=gb&sort=top&page=1&limit=50`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b736635cfbmsh2fbb6e7b1ed2647p18f102jsn0c400d84a5fa',
                'X-RapidAPI-Host': 'newsi-api.p.rapidapi.com'
            }
        };
        // create the DOM element to log the news headline , pictures , and link to the articles
        function NewsAPIupdate() {
            fetch(url, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    for (let i = 0; i < data.length; i++) {
                        let nameSearch = data[i].title;
                        if (value == '') {
                        }
                        else if (nameSearch.toLowerCase().includes(`${value}`)) {
                            console.log("this is the value after the if" + value)
                            let newsArticle = document.createElement('div');
                            let newsTitle = document.createElement('p');
                            let sourceNames = document.createElement('p');
                            let linkText = document.createElement('a');
                            let imageNews = document.createElement('img');
                            linkText.href = `${data[i].link}`
                            linkText.textContent = `${'Link'}: ${"Read More"}`
                            linkText.classList.add('cursor-pointer', 'hover:font-serif');
                            newsTitle.classList.add('font-medium', 'text-red-600', 'text-justify');
                            let newsImage = data[i].image;
                            sourceNames.textContent = `${'Source'}: ${data[i].sourceName}`
                            imageNews.src = newsImage
                            imageNews.setAttribute('class', 'max-w-lg');
                            newsTitle.textContent = `${'Breaking News'}: ${data[i].title}`
                            sourceNames.classList.add('mb-2.5');
                            myBreaknews.appendChild(newsTitle);
                            myBreaknews.appendChild(imageNews);
                            myBreaknews.appendChild(newsArticle.appendChild(linkText))
                            myBreaknews.appendChild(sourceNames)
                        }

                    }
                });
        }

        NewsAPIupdate()
    };

});

