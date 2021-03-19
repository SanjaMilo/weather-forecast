let homePage = document.getElementById("home-page");
let detailsPage = document.getElementById("details-page");
let listOfDays = document.querySelector('.list-of-days');

// Create card for all days in the week (for Home Page)
let drawDayHolder = (day) => {
    let dayHolder = document.createElement('div');
    dayHolder.classList.add('day-card');
    let dayName= document.createElement('h3');
    dayName.innerText = day.day;
    dayHolder.appendChild(dayName);
    let icon = document.createElement('span');
    icon.innerHTML = day.icon;
    dayHolder.appendChild(icon);
    let temp = document.createElement('p');
    temp.classList.add('temp');
    temp.innerHTML = `${day.temp} &#176;C`;
    dayHolder.appendChild(temp);

    return dayHolder;
}

// Create card for specified day, showing all weather details (on details page)
let drawDayForecast = (data, day) => {
    let dayDetailCard = document.createElement('div');
    dayDetailCard.classList.add('day-details');
    let name = document.createElement('h3');
    name.innerText = day.name;
    dayDetailCard.appendChild(name);
    let icon = document.createElement('span');
    icon.innerHTML = day.icon;
    dayDetailCard.appendChild(icon);
    let type = document.createElement('p');
    type.innerText = day.type;
    dayDetailCard.appendChild(type);
    let tempInfo = document.createElement('p');
    tempInfo.innerHTML = `Temperature: ${day.temp } &#176;${data.tempUnit} or ${day.kelvin} ${data.tempUnitKelvin}`;
    dayDetailCard.appendChild(tempInfo);
    let windDirect = document.createElement('p');
    windDirect.innerHTML = `Wind direction: ${day.arrow} ${day.windDirection}`;
    dayDetailCard.appendChild(windDirect);
    let windSpeed = document.createElement('p');
    windSpeed.innerHTML = `Wind speed: ${day.windSpeed} ${data.windSpeedUnit} or ${day.windSpeed2} ${data.windSpeedUnit2}`;
    dayDetailCard.appendChild(windSpeed);

    return dayDetailCard;
}

// Create all Day in the week cards and make it link  that redirects to details-page
weatherData.days.forEach(day => {
    let dayCard = drawDayHolder(day);
    listOfDays.appendChild(dayCard);
    dayCard.addEventListener('click', function() {
        location.hash = `#details/${day.id}`;
        console.log('click');
    });
});

// Function to handle routing and displaying content on the Home page and Details page// 
function handelRoutes(e) {
    e.preventDefault();
    let _hash = location.hash;

    if (_hash.indexOf("details") > -1) {
        _hash = "details";
      };

    switch(_hash) {
        case "":
            homePage.style.display = 'block';
            detailsPage.style.display = 'none';
            break;
        case "details":
            homePage.style.display = 'none';
            detailsPage.style.display = 'block';
            detailsPage.innerHTML = "";
            let dayId = location.hash.split("/")[1];
            let dayToShow = weatherData.days.find(elem => elem.id == dayId);
            let dayDetail = drawDayForecast(weatherData, dayToShow);
            detailsPage.appendChild(dayDetail);
            break;
        default:
            location.hash = "";
            break;     
    };
};

// Event listeners
window.addEventListener("hashchange", handelRoutes);
window.addEventListener("load", handelRoutes);



