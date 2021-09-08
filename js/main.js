window.onload = () => {

  // VARIABLES
  const divForm = document.querySelector('.form');
  const heading = document.querySelector('.heading');
  const headingSub = document.querySelector('.heading-sub');
  const header = document.querySelector('.header');
  const picture = document.querySelector('.picture');
  const form = document.querySelector('.js-form');
  const button = document.querySelector('.form__submit');
  const infoBlock = document.querySelector('.form__info');
  // ANIMATION
  Splitting({
    target: '.heading',
    by: 'words'
  });
  headingSub.classList.remove('heading-sub_active');
  divForm.classList.remove('form_active');
  header.classList.remove('header_active');
  picture.classList.remove('picture_active');

  setTimeout(() => {
    heading.classList.remove('heading_active');
  }, 2)
  const serialize = ({ elements }) => {

    // Setup our serialized data
    let serialized = [];

    // Loop through each field in the form
    for (let i = 0; i < elements.length; i++) {

      let field = elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;


      // Convert field data to a query string
      if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
      }
    }

    return serialized.join('&');

  };
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    console.log(serialize(form), 'ser');

    button.classList.add('state-show-spinner');

    fetch(`${form.action}&${serialize(form)}`, {
      method: form.method,
      mode: 'no-cors',
      body: '',
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      }
    })
        .then(function(res) {
          console.log(res, 'first then');
          infoBlock.classList.add('form__info_success');
          infoBlock.classList.remove('form__info_error');
          infoBlock.classList.remove('form__info_hide');
          button.classList.remove('state-show-spinner');
          setTimeout(function() {
            infoBlock.classList.add('form__info_hide');
          }, 5000);
        })
        .then(function(res) {
          console.log(res, 'second then')
        })
        .catch(function(err) {
          console.log(err);
          infoBlock.innerText = 'Could not connect to the registration server. Please try again later.';
          infoBlock.classList.add('form__info_error');
          infoBlock.classList.remove('form__info_success');
          infoBlock.classList.remove('form__info_hide');
          setTimeout(function() {
            infoBlock.classList.add('form__info_hide');
          }, 5000)
        })
  })
};
