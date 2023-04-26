async function getPhotographers() {
  try {
    const res = await fetch('/data/photographers.json');
    const data = await res.json();
    const {photographers} = data;
    return {
      photographers: [...photographers]
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.map((photographer) => {
    const photographerModel = new photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
