'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector('#fortune-text').innerHTML = responseData;
    });
}
// can remove function name
// innerHTML when there are HTML tags
document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;

  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    document.querySelector('#weather-info').innerHTML =
    `${responseJson.forecast}`;
  });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // can do JSON.stringify here
  const formInputs = {
    qty: Number(document.querySelector('#qty-field').value),
    melon_type: document.querySelector('#melon-type-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      document.querySelector('#order-status').innerHTML =
      `${responseJson.code}: ${responseJson.msg}`
// can make document.querySelector as a new variable
      if (responseJson.code === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error');
      } else if (responseJson.code === 'OK') {
        document.querySelector('#order-status').classList.remove('order-error');
      }
    })
}

// add else to remove red close for valid orders, if its not there, nothing happens
// some code bases use a trailing comma
//VS code extensions for JS - prettier is popular

document.querySelector('#order-form').addEventListener('submit', orderMelons);


// FURTHER STUDY

function showDog() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((responseJson) => {
    document.querySelector('#dog-image').
    insertAdjacentHTML('beforeend', `<div><img src=${responseJson.message}></div>`);
  });
}

document.querySelector('#get-dog-image').addEventListener('click', showDog)