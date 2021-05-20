let homePage = document.getElementById('home-page');
let detailsPage = document.getElementById('details-page');
let listOfDays = document.querySelector('.list-of-days');
let btnChangeTempUnit = document.querySelector('.change-temp-unit');
let btnChangeSpeedUnit = document.querySelector('.change-speed-unit');
let changeUnitsInfo = document.querySelector('.change-units');
let body = document.querySelector('body');
let toggleTemp = false;
let toggleSpeed = false;

// Create card for all days in the week (for Home Page)
let drawDayHolder = (day) => {
	let dayHolder = document.createElement('div');
	dayHolder.classList.add('day-card');
	let dayName = document.createElement('h3');
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
};

// Create card for specified day, showing all weather details (on details page)
let drawDayForecast = (data, day) => {
	let dayDetailCard = document.createElement('div');
	dayDetailCard.classList.add('day-details');
	let name = document.createElement('h3');
	name.innerText = day.name;
	dayDetailCard.appendChild(name);
	let icon = document.createElement('span');
	icon.classList.add('icon');
	icon.innerHTML = day.icon;
	dayDetailCard.appendChild(icon);
	let type = document.createElement('p');
	type.innerText = day.type;
	type.classList.add('type');
	dayDetailCard.appendChild(type);
	let tempInfo = document.createElement('p');
	tempInfo.innerHTML = `Temperature: <span class="colored">${day.temp} &#176;${data.tempUnit} </span>`;
	dayDetailCard.appendChild(tempInfo);
	let windDirect = document.createElement('p');
	windDirect.innerHTML = `Wind direction: ${day.arrow} ${day.windDirection}`;
	dayDetailCard.appendChild(windDirect);
	let windSpeed = document.createElement('p');
	windSpeed.innerHTML = `Wind speed: <span class="colored">${day.windSpeed} ${data.windSpeedUnit}</span>`;
	dayDetailCard.appendChild(windSpeed);

	return dayDetailCard;
};

// Create all Days in the week cards and make it link that redirects to details-page
weatherData.days.forEach((day) => {
	let dayCard = drawDayHolder(day);
	listOfDays.appendChild(dayCard);
	dayCard.addEventListener('click', function() {
		location.hash = `#details/${day.id}`;
		console.log('click');
	});
});

// Function for changing temperature unit
let changeTempUnit = () => {
	toggleTemp = !toggleTemp;

	if (toggleTemp) {
		btnChangeTempUnit.innerHTML = '&#176;K';
		weatherData.tempUnit = 'K';
		weatherData.days.forEach((day) => (day.temp = day.temp + 273.15));
	} else {
		btnChangeTempUnit.innerHTML = '&#176;C';
		weatherData.tempUnit = 'C';
		weatherData.days.forEach((day) => (day.temp = Math.round(day.temp - 273.15)));
	};

	renderDayDetails();
};

// Function for changing wind speed unit
let changeSpeedUnit = () => {
	toggleSpeed = !toggleSpeed;

	if (toggleSpeed) {
		btnChangeSpeedUnit.innerHTML = 'KM/H';
		weatherData.windSpeedUnit = 'km/h';
		weatherData.days.forEach((day) => (day.windSpeed = day.windSpeed * 18 / 5));
	} else {
		btnChangeSpeedUnit.innerHTML = 'M/S';
		weatherData.windSpeedUnit = 'm/s';
		weatherData.days.forEach((day) => (day.windSpeed = day.windSpeed * 5 / 18));
	};
	
	renderDayDetails();
};

// Function to handle routing and displaying content on the Home page and Details page//
function handelRoutes(e) {
	e.preventDefault();
	let _hash = location.hash;
	// check if the url route includes 'details', for example in the route #details/3
	if (_hash.indexOf('details') > -1) {
		_hash = 'details';
	};
	switch (_hash) {
		case '':
			homePage.style.display = 'block';
			detailsPage.style.display = 'none';
			btnChangeTempUnit.style.display = 'none';
			btnChangeSpeedUnit.style.display = 'none';
            changeUnitsInfo.style.display = 'none';
			break;
		case 'details':
			homePage.style.display = 'none';
			detailsPage.style.display = 'block';
			btnChangeTempUnit.style.display = 'block';
			btnChangeSpeedUnit.style.display = 'block';
            changeUnitsInfo.style.display = 'block';
			// render element's details (day details)
			renderDayDetails();
			break;
		default:
			location.hash = '';
			break;
	};
};
// Function to be called on page load and every change in the data (temperature units and wind speed units) to re-render day details element
function renderDayDetails() {
	detailsPage.innerHTML = '';
	let dayId = location.hash.split('/')[1];
	let dayToShow = weatherData.days.find((elem) => elem.id == dayId);
	let dayDetail = drawDayForecast(weatherData, dayToShow);
	detailsPage.appendChild(dayDetail);
};

// Function to change background image for diferent urls 
let changeBackgroundImg = (e) => {
	e.preventDefault();
	let dayId = location.hash.split('/')[1];
	dayId ? body.style.backgroundImage = (`linear-gradient(rgba(0,0,0,0.2), rgba(0, 0, 0, 0.2)), url(./assets/images/${dayId}.jpg)`) : body.style.backgroundImage = (`linear-gradient(rgba(0,0,0,0.3), rgba(0, 0, 0, 0.3)), url(./assets/bg.jpg)`)
};

// Event listeners
window.addEventListener('hashchange', (e) => {
	handelRoutes(e);
	changeBackgroundImg(e);
});
window.addEventListener('load', (e) => {
	handelRoutes(e);
	changeBackgroundImg(e);
});
btnChangeTempUnit.addEventListener('click', changeTempUnit);
btnChangeSpeedUnit.addEventListener('click', changeSpeedUnit);
