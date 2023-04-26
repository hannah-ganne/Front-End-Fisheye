let isOpen = false;
const dropDown = document.querySelector('.dropdown');
const dropDownBtn = document.querySelector('.dropdown-toggle');
const dropDownMenu = document.querySelector('.dropdown-menu');

function toggle() {
  if (!isOpen) {
    dropDownMenu.style.visibility = 'visible';
    isOpen = true;
  } else {
    dropDownMenu.style.visibility = 'hidden';
    isOpen = false;
  }
}

function setValue(value) {
  dropDownBtn.textContent = value;
}

dropDown.addEventListener('click', toggle);
[...dropDownMenu.children].forEach((list) => {
  list.addEventListener('click', () => {
    const value = list.getAttribute('data-value');
    setValue(value);
  });
});
