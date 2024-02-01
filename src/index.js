import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener("DOMContentLoaded", function () {
  const breedSelect = new SlimSelect({
    select: '.breed-select',
    placeholder: 'Select a breed',
  });

  const selectElement = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  const createCatInfoElement = (tagName) => {
    const element = document.createElement(tagName);
    catInfo.appendChild(element);
    return element;
  };

  const catImage = createCatInfoElement('img');
  const catName = createCatInfoElement('p');
  const catDescription = createCatInfoElement('p');
  const catTemperament = createCatInfoElement('p');

  loader.style.display = 'none';
  error.style.display = 'none';
  catInfo.style.display = 'flex';

  if (selectElement) {
    selectElement.addEventListener('change', function () {
      const selectedOption = breedSelect.getData()[0];
      const selectedBreedId = selectedOption.value;

      loader.style.display = 'block';
      error.style.display = 'none';
      catInfo.style.display = 'none';

      fetchCatByBreed(selectedBreedId)
        .then(function (catData) {
          const [cat] = catData;

          catImage.src = cat.url;
          catName.textContent = `Breed: ${cat.breeds[0].name}`;
          catDescription.textContent = `Description: ${cat.breeds[0].description}`;
          catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

          loader.style.display = 'none';
          catInfo.style.display = 'block';
        })
        .catch(function () {
          loader.style.display = 'none';
          error.style.display = 'block';
        });
    });
  } else {
    console.error('Select element is not found.');
  }

  fetchBreeds()
    .then(function (breeds) {
      breedSelect.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
    })
    .catch(function () {
      error.style.display = 'block';
    });
});
