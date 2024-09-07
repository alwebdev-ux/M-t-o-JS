document.addEventListener('DOMContentLoaded', function () {

    // Gestion des événements pour les boutons de navigation
    const loaderbtn1 = document.getElementById("loaderbtn1");
    const loaderbtn2 = document.getElementById("loaderbtn2");
    const loaderbtn3 = document.getElementById("loaderbtn3");

    loaderbtn1.addEventListener('click', function() {
        window.location.href = 'html4.html';
    });

    loaderbtn2.addEventListener('click', function() {
        window.location.href = 'html4.html';
    });

    loaderbtn3.addEventListener('click', function() {
        // Ajouter une action pour le troisième bouton si nécessaire
        console.log('Button 3 clicked');
    });

    // Déclaration de la clé API
    const apiKey = '63801f13e9e27be7c5e9f569081df1f0'; // Remplace par ta clé API

 
    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => updateWeatherUI(data))
            .catch(error => console.error('Erreur de récupération des données:', error));
    }

 
    function updateWeatherUI(data) {
        // Mise à jour des informations principales
        document.getElementById('City-input').textContent = data.name;
        document.getElementById('degre-top').textContent = `${Math.round(data.main.temp)}°`;
        document.getElementById('reelfeel').textContent = `${Math.round(data.main.feels_like)}°`;
        document.getElementById('wind-speed').textContent = `${data.wind.speed} Km/h`;
        document.getElementById('chanceofrain').textContent = `${data.clouds.all}%`;
        document.getElementById('UV-INDEX').textContent = 'N/A'; 

       
        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconMap = {
            clear: 'image/clear.png',
            clouds: 'image/cloud.png',
            rain: 'image/rain.png',
            snow: 'image/snow.png',
            mist: 'image/mist.png',
            fog: 'image/mist.png'
        };
        const currentIcon = iconMap[weatherCondition] || 'image/clear.png';
        document.getElementById('img-top').src = currentIcon;

        // Mise à jour des prévisions pour la journée (simulées ici)
        updateDailyForecast();
    }


    function updateDailyForecast() {
        const times = ['12pm', '4am', '8am', '12am', '4pm', '8pm'];
        const temps = ['25°', '22°', '20°', '18°', '26°', '24°'];
        const icons = ['clear', 'clouds', 'mist', 'clear', 'snow', 'rain'];

        times.forEach((time, index) => {
            document.getElementById(`temp${time}`).textContent = temps[index];
            document.getElementById(`img${time}`).src = `image/${icons[index]}.png`;
        });
    }


    document.getElementById('search-input').addEventListener('input', function () {
        const city = this.value.trim(); 
        if (city) {
            fetchWeatherData(city); 
        }
    });

});
