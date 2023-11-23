import { fetchBreeds, fetchCatByBreed } from './cat-api';

// DOM
const breedSelectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

// Options
function chooseBreed(data) {
  fetchBreeds(data)
    .then(data => {
      //   console.log(data);
      loaderElement.classList.replace('loader', 'is-hidden');

      let optionsMarkup = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });

      breedSelectElement.insertAdjacentHTML('beforeend', optionsMarkup);
      breedSelectElement.classList.remove('is-hidden'); // Show select element after options are added
    })
    .catch(onError);
}

chooseBreed();

function createMarkup(event) {
  // Show loader while loading
  loaderElement.classList.replace('is-hidden', 'loader');
  // Hide select element and cat info markup while loading
  breedSelectElement.classList.add('is-hidden');
  catInfoElement.classList.add('is-hidden');

  const breedId = event.target.value;
  //   get the option value using event.target.value
  //   console.log(event.target);
  //   console.log(event.target.value);

  fetchCatByBreed(breedId)
    .then(data => {
      loaderElement.classList.replace('loader', 'is-hidden');
      breedSelectElement.classList.remove('is-hidden');

      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoElement.innerHTML = `
      <img src="${url}" alt="${name}" width="400"/>
      <div class="box">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
      `;
      catInfoElement.classList.remove('is-hidden');
    })
    .catch(onError);
}

breedSelectElement.addEventListener('change', createMarkup);

function onError() {
  // Show error Message
  errorElement.classList.remove('is-hidden');
  //   Hide select element
  breedSelectElement.classList.add('is-hidden');
}
