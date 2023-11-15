

$(document).ready(function () {
    {

        let category = ''
        const searchInput = document.getElementById('query');

        let value = ''
        // This block of code is dealing with search of a topic to selecting the type of news SPORT / TRAVEL /WORLD NEWS
        $('#btn').on('click', function (event) {
            event.preventDefault();
            value = searchInput.value

            loadPage()
        });
        $('#btn2').on('click', function (event) {

            location.reload()
            category = 'world'
            localStorage.setItem('mycategory', category)
            loadPage()
        });

        $('#btn3').on('click', function (event) {

            location.reload()
            category = 'sport'
            localStorage.setItem('mycategory', category)
            loadPage()
        });

        $('#btn4').on('click', function (event) {

            location.reload()
            category = 'travel'
            localStorage.setItem('mycategory', category)
            loadPage()
        });
        function loadPage() {
            var myBreaknew = document.querySelector('.container')
            category = localStorage.getItem('mycategory')

            const url = `https://newsi-api.p.rapidapi.com/api/category?category=${category}&language=en&country=gb&sort=top&page=1&limit=9`;

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
                });

        }



        loadPage()

    };
});