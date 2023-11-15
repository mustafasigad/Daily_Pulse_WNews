

$(document).ready(function () {
    {

        let category = 'world'
        const searchInput = document.getElementById('query');

        let value = ''
        // This block of code is dealing with search of a topic to selecting the type of news SPORT / TRAVEL /WORLD NEWS
        $('#btn').on('click', function (event) {
            event.preventDefault();
            value = searchInput.value
            musti()
        });
        $('#btn2').on('click', function (event) {
            event.preventDefault();

            category = 'world'
            musti()
        });

        $('#btn3').on('click', function (event) {
            event.preventDefault();

            category = 'sport'
            musti()
        });

        $('#btn4').on('click', function (event) {
            event.preventDefault();

            category = 'travel'
            musti()
        });
        function musti() {
            var myBreaknew = document.querySelector('.container')
            const url = `https://newsi-api.p.rapidapi.com/api/category?category=${category}&language=en&country=gb&sort=top&page=1&limit=90`;
            console.log(category)
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'b736635cfbmsh2fbb6e7b1ed2647p18f102jsn0c400d84a5fa',
                    'X-RapidAPI-Host': 'newsi-api.p.rapidapi.com'
                }
            };

            fetch(url, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    let myData = []
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
                            newsTitle.classList.add('font-medium', 'text-red-600');

                            let newsImage = data[i].image;
                            sourceNames.textContent = `${'Source'}: ${data[i].sourceName}`
                            console.log(newsImage)
                            imageNews.src = newsImage
                            imageNews.setAttribute('class', 'max-w-lg');

                            newsTitle.textContent = `${'Breaking News'}: ${data[i].title}`
                            sourceNames.classList.add('mb-2.5');

                            myBreaknew.appendChild(newsTitle);
                            myBreaknew.appendChild(imageNews);
                            myBreaknew.appendChild(newsArticle.appendChild(linkText))
                            myBreaknew.appendChild(sourceNames)
                            // }

                            myData.push(data[i].sourceName)
                        }

                        // localStorage.setItem('listoftitle', myData)
                    }
                });

        }

        //let newItems = localStorage.getItem('listoftitle')

        musti()

    };
});