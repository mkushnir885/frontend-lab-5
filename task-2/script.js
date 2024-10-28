const VARIANT = 1; // (73 - 1) % 36 + 1
const TABLE_SIZE = 6;

const table = document.getElementById('table');
let singleClickTimer;
let isDoubleClick = false;

const createTable = () => {
  for (let i = 0; i < TABLE_SIZE; i++) {
    const row = table.insertRow();
    for (let j = 0; j < TABLE_SIZE; j++) {
      const cell = row.insertCell();
      const cellNumber = i * TABLE_SIZE + j + 1;
      cell.textContent = cellNumber;
      if (cellNumber === VARIANT) {
        cell.addEventListener('mouseover', () => afterMouseover(cell));
        cell.addEventListener('click', () => afterClick(cell));
        cell.addEventListener('dblclick', afterDblclick);
      }
    }
  }
};

const afterMouseover = (cell) => {
  cell.style.backgroundColor = generateColor();
  cell.style.color = generateColor();
};

const afterClick = (cell) => {
  const colorPicker = document.getElementById('colorPicker');
  singleClickTimer = setTimeout(() => {
    if (!isDoubleClick) {
      colorPicker.click();
    }
    colorPicker.addEventListener('input', (event) => {
      cell.style.backgroundColor = event.target.value;
    });
    isDoubleClick = false;
  }, 350);
};

const afterDblclick = () => {
  clearTimeout(singleClickTimer);
  isDoubleClick = true;
  for (let і = 0; і < TABLE_SIZE; і++) {
    const diagCell = table.rows[і].cells[і];
    diagCell.style.backgroundColor = generateColor();
  }
};

const generateColor = () => {
  const hexArray = '0123456789ABCDEF';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 16)];
  }
  return `#${code}`;
};

createTable();
