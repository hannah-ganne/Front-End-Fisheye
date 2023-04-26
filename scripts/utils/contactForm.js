function openModal() {
  const body = document.getElementById('body');
  const main = document.getElementById('main');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal');
  const modalWrapper = document.querySelector('.modal-wrapper');

  modal.style.display = 'block';
  modalWrapper.style.visibility = 'visible';
  body.classList.add('no-scroll');
  closeBtn.focus();
  main.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const body = document.getElementById('body');
  const main = document.getElementById('main');
  const modal = document.getElementById('contact-modal');
  const modalWrapper = document.querySelector('.modal-wrapper');

  modal.style.display = 'none';
  modalWrapper.style.visibility = 'hidden';
  body.classList.remove('no-scroll');
  main.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
}

function sendForm() {
  const form = document.getElementById('form');
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const contactDetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value,
  };

  console.log(contactDetails);

  closeModal();
}

const modal = document.getElementById('contact-modal');
modal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
