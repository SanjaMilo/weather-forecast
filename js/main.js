let homePage = document.getElementById("home-page");
let detailsPage = document.getElementById("details-page");
let listOfDays = document.querySelector('.list-of-days');

let drawDayHolder = (day) => {
    let dayHolder = document.createElement('div');
    let dayName= document.createElement('h3');
    dayName.innerText = day.day;
    dayHolder.appendChild(dayName);
    let icon = document.createElement('span');
    icon.innerHTML = day.icon;
    dayHolder.appendChild(icon);
    let temp = document.createElement('p');
    temp.innerHTML = `${day.temp}C`;
    dayHolder.appendChild(temp);
    return dayHolder;
}

weatherData.days.forEach(day => {
    let dayCard = drawDayHolder(day);
    listOfDays.appendChild(dayCard);
    dayCard.addEventListener('click', function() {
        location.hash = `#details/${day.id}`;
        console.log('click');
    });
});

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
            let dayDetail = drawDayHolder(dayToShow);
            detailsPage.appendChild(dayDetail);
            break;
        default:
            location.hash = "";
            break;     
    };
};

window.addEventListener("hashchange", handelRoutes);
window.addEventListener("load", handelRoutes);


