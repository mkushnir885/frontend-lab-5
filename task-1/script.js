const form = document.getElementById('form');

const regexes = {
  fullName: /^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/,
  group: /^[А-ЯІЇЄ]+-[0-9]+$/,
  number: /^\([0-9]{3}\)-[0-9]{3}(-[0-9]{2}){2}/,
  faculty: /^[а-яіїєА-ЯІЇЄ' -]+$/,
  address: /^м\.\s[а-яіїєА-ЯІЇЄ' -]+$/,
};

const stringTemplates = {
  fullName: 'ТТТТТТ Т.Т.',
  group: 'ТТ-ЧЧ',
  number: '(ЧЧЧ)-ЧЧЧ-ЧЧ-ЧЧ',
  faculty: 'ТТТТ',
  address: 'м. ТТТТТТ',
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = form.querySelectorAll('input');
  let areInputsValid = true;
  inputs.forEach((input) => {
    const id = input.id;
    if (id) {
      const isInputValid = regexes[id].test(input.value.trim());
      if (!isInputValid) {
        input.value = '';
        input.placeholder = `Очікуваний формат: ${stringTemplates[id]}`;
        areInputsValid = false;
      } else {
        input.style.setProperty('border-color', 'black');
      }
      document.getElementById(`${id}Output`).textContent = input.value;
    }
  });
  if (areInputsValid) {
    document.getElementById('data').style.display = 'inline';
  }
});

const checkInputValidity = (input) => {
  if (regexes[input.id].test(input.value.trim())) {
    input.style.setProperty('border-color', 'greenyellow');
  } else {
    input.style.setProperty('border-color', 'red');
  }
};
