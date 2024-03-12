// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (fruitsArray) => {
  const fruitsList = document.querySelector('.fruits__list');
  fruitsList.innerHTML = '';

  fruitsArray.forEach((fruit, index) => {
    const li = document.createElement('li');
    li.textContent = `${index}: ${fruit.kind}, ${fruit.color}, ${fruit.weight} кг`;
    fruitsList.appendChild(li);
  });
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// перемешивание массива
const shuffleFruits = () => {
  for (let i = fruits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruits[i], fruits[j]] = [fruits[j], fruits[i]];
  }
  display(fruits);
};

const shuffleButton = document.querySelector('.shuffle__btn');
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
});

/*** ФИЛТРАЦИЯ ***/

const filterButton = document.querySelector('.filter__btn');
filterButton.addEventListener('click', () => {
  const minWeight = parseFloat(document.querySelector('.minweight__input').value);
  const maxWeight = parseFloat(document.querySelector('.maxweight__input').value);

  if (isNaN(minWeight) || isNaN(maxWeight)) {
    alert('Пожалуйста, введите корректные значения для фильтрации по весу.');
    return;
  }

  const filteredFruits = fruits.filter(fruit => fruit.weight >= minWeight && fruit.weight <= maxWeight);
  display(filteredFruits);
});

/*** СОРТИРОВКА ***/

const sortActionButton = document.querySelector('.sort__action__btn');
sortActionButton.addEventListener('click', () => {
  const start = performance.now();
  fruits.sort((a, b) => a.color.localeCompare(b.color));
  const end = performance.now();
  const sortTime = `${(end - start).toFixed(2)} ms`;
  document.querySelector('.sort__time').textContent = sortTime;
  display(fruits);
});

/*** ДОБАВИТЬ ФРУКТ ***/

const addActionButton = document.querySelector('.add__action__btn');
addActionButton.addEventListener('click', () => {
  const kind = document.querySelector('.kind__input').value.trim();
  const color = document.querySelector('.color__input').value.trim();
  const weight = parseFloat(document.querySelector('.weight__input').value.trim());

  if (kind === '' || color === '' || isNaN(weight) || weight <= 0) {
    alert('Пожалуйста, заполните все поля корректно.');
    return;
  }

  fruits.push({ kind, color, weight });
  display(fruits);
});

