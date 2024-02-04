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
    /*catInfo.appendChild(element);*/
    return element;
  };

  const catImage = createCatInfoElement('img');
  const catTextContainer = createCatInfoElement('div')
  catInfo.appendChild(catImage);
  catInfo.appendChild(catTextContainer);
  catTextContainer.classList.add('cat-text-container')
  const catName = createCatInfoElement('p');
  const catDescription = createCatInfoElement('p');
  const catTemperament = createCatInfoElement('p');
  catTextContainer.appendChild(catName);
  catTextContainer.appendChild(catDescription);
  catTextContainer.appendChild(catTemperament);
  catName.classList.add('cat-name')
  catDescription.classList.add('cat-description')
  catTemperament.classList.add('cat-temperament')
  loader.style.display = 'none';
  error.style.display = 'none';
  catInfo.style.display = 'flex';

  if (selectElement) {
    selectElement.addEventListener('change', function () {
      const selectedBreedId = breedSelect.getSelected();

      loader.style.display = 'block';
      error.style.display = 'none';
      catInfo.style.display = 'none';

      fetchCatByBreed(selectedBreedId)
        .then(function (catData) {
          
          const [cat] = catData;

          catImage.src = cat.url;
          catName.textContent = `${cat.breeds[0].name}`;
          catDescription.textContent = `${cat.breeds[0].description}`;
          catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

          loader.style.display = 'none';
          catInfo.style.display = 'flex';
          catInfo.style.justifyContent = 'space-between';
      

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
