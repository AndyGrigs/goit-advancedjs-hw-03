Нижче наведено детальний план виконання завдання та приклад структури файлів і коду, який допоможе реалізувати усі вимоги домашньої роботи. Орієнтуйся на нього як на загальну схему; звісно, ти можеш доповнювати та змінювати проєкт під свої потреби.

---

## 1. Підготовка проєкту

1. **Створи новий репозиторій** на GitHub, наприклад:  
   ```goit-advancedjs-hw-03```
2. **Зібрати проєкт за допомогою Vite**.  
   - Запусти команду:
     ```bash
     npm create vite@latest goit-advancedjs-hw-03
     ```
   - Обери «Vanilla» чи «Vanilla + SW» (або той варіант, з яким тобі зручно працювати).
   - Перейди у створену папку проєкту:
     ```bash
     cd goit-advancedjs-hw-03
     ```
   - Встанови залежності:
     ```bash
     npm install
     ```
   - Залежно від того, чи будеш ти працювати з axios чи без нього — встанови `axios` (не обов’язково, але зручно).  
     ```bash
     npm install axios
     ```

3. **Структура папок** (приклад):

   ```
   goit-advancedjs-hw-03/
   ├─ index.html
   ├─ package.json
   ├─ vite.config.js
   └─ src/
      ├─ css/
      │  └─ styles.css
      ├─ js/
      │  ├─ main.js
      │  ├─ pixabay-api.js
      │  └─ render-functions.js
      ├─ images/
      └─ loaders/
         └─ (файли для css-loader, якщо потрібні)
   ```

4. **Підключення бібліотек**:
   - [**iziToast**](https://github.com/dolce/iziToast)
   - [**SimpleLightbox**](https://github.com/andreknieriem/simplelightbox)
   - [**css-loader**](https://github.com/raphaelfabeni/css-loader) (за бажанням або будь-який інший)  
   
   У файлі `main.js` (або де тобі зручно) додай імпорти:

   ```js
   import "izitoast/dist/css/iziToast.min.css"; // стильова частина
   import iziToast from "izitoast";            // js бібліотеки

   import "simplelightbox/dist/simple-lightbox.min.css";
   import SimpleLightbox from "simplelightbox";
   ```

   Для css-loader можеш створити окремі стилі/класи й показувати чи ховати індикатор завантаження через додавання класу, або скористатися прикладом із їхнього репозиторію.

---

## 2. Налаштування HTML

У файлі `index.html` (або в `src/index.html`, якщо ти змінив налаштування) підключи основні стилі й підготуй мінімальну розмітку. Наприклад:

```html
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <title>Image Search</title>
  </head>
  <body>
    <header>
      <form id="search-form">
        <input
          type="text"
          name="searchQuery"
          placeholder="Enter your search query..."
        />
        <button type="submit">Search</button>
      </form>
    </header>

    <main>
      <!-- Індикатор завантаження -->
      <div class="loader" id="loader">
        <!-- Додай розмітку з css-loader або будь-який інший -->
        <span class="loader-inner"></span>
      </div>

      <!-- Контейнер для відображення зображень -->
      <ul class="gallery"></ul>
    </main>

    <script type="module" src="./src/js/main.js"></script>
  </body>
</html>
```

> **Увага!** Якщо використовуєш Vite за замовчуванням, шляхи можуть бути `"/js/main.js"`, `"/css/styles.css"` тощо. Переконайся, що все правильно під'єднується.

---

## 3. Модуль `pixabay-api.js`

У цьому файлі зберігатимуться **функції для HTTP-запитів**. Для зручності можна використати `axios`, але можна і через `fetch()`.

### Приклад із `axios`:

```js
import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "YOUR_API_KEY"; // Встав свій ключ

/**
 * 
 * @param {string} query Рядок для пошуку
 * @returns {Promise<object>} Об'єкт відповіді від Pixabay
 */
export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });
  
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
```

### Приклад із `fetch`:

```js
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "YOUR_API_KEY"; // Встав свій ключ

export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
```

---

## 4. Модуль `render-functions.js`

Тут зберігатимуться **функції для відображення елементів інтерфейсу**, зокрема для створення карток зображень на основі масиву даних.

```js
/**
 * Створює розмітку карток зображень
 * @param {Array} images масив об'єктів зображень (data.hits)
 * @returns {string} HTML-рядок
 */
export function createCardsMarkup(images) {
  return images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>
        </a>
      `;
    })
    .join("");
}
```

---

## 5. Головний скрипт `main.js`

У цьому файлі опишемо **всю логіку роботи**:
1. Отримуємо посилання на DOM-елементи: форма, галерея, індикатор завантаження тощо.
2. Вішаємо слухач події на форму.
3. Показуємо індикатор завантаження перед запитом, ховаємо після.
4. Очищаємо галерею перед відмальовуванням нових результатів.
5. Викликаємо повідомлення через `iziToast`, якщо результатів немає.
6. Ініціалізуємо або оновлюємо SimpleLightbox.

```js
import { fetchImages } from "./pixabay-api.js";
import { createCardsMarkup } from "./render-functions.js";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");

let lightbox = null; // для SimpleLightbox

form.addEventListener("submit", onSearch);

async function onSearch(e) {
  e.preventDefault();

  const query = e.currentTarget.elements.searchQuery.value.trim();

  // Перевірка на порожній рядок
  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
    });
    return;
  }

  // Показуємо індикатор завантаження
  showLoader();

  try {
    // Очищаємо попередні результати
    gallery.innerHTML = "";

    const data = await fetchImages(query);
    hideLoader();

    // Перевіряємо, чи є результати
    if (data.hits.length === 0) {
      iziToast.error({
        title: "No Results",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    // Створюємо розмітку і додаємо в галерею
    const markup = createCardsMarkup(data.hits);
    gallery.insertAdjacentHTML("beforeend", markup);

    // Ініціалізуємо або оновлюємо бібліотеку SimpleLightbox
    if (!lightbox) {
      lightbox = new SimpleLightbox(".gallery a", {close: true});
    } else {
      lightbox.refresh();
    }

  } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
    });
  }
}

// Показати індикатор
function showLoader() {
  loader.classList.add("visible");
}

// Сховати індикатор
function hideLoader() {
  loader.classList.remove("visible");
}
```

> Замість `loader.classList.add("visible")`/`loader.classList.remove("visible")` ти можеш міняти `style.display` або інші способи. Головне — **показувати** спінер перед запитом і **ховати**, коли дані отримані чи сталась помилка.

---

## 6. Стилізація та індикатор завантаження

1. Створи файл `styles.css` у папці `src/css` (або назви його на власний розсуд) і підключи в `main.js`:
   ```js
   import "../css/styles.css";
   ```
2. Додай стилі для `.gallery`, `.photo-card`, `.loader`, кнопок, інпутів тощо.  
3. Якщо використовуєш **css-loader** – виконай інструкції з [їхнього репозиторію](https://github.com/raphaelfabeni/css-loader). Зазвичай достатньо взяти один із готових спінерів та додати його HTML/SCSS/CSS-код у свій проєкт, а в `main.js` керувати показом/приховуванням (через `classList.add/remove`).

**Приклад** (спрощений) стилю для лоадера (у styles.css):
```css
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none; /* Приховано за замовчуванням */
  z-index: 999;
}

.loader.visible {
  display: block; /* Показуємо при додаванні .visible */
}

/* Приклад зі звичайною анімацією:
.loader-inner {
  width: 50px;
  height: 50px;
  border: 6px solid #cccccc;
  border-top: 6px solid #00bfff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
} 

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
*/
```

---

## 7. Перевірка та деплой

1. **Запусти дев-сервер**:
   ```bash
   npm run dev
   ```
   Відкрий вказану в консолі адресу (зазвичай http://127.0.0.1:5173/).
2. **Переконайся**, що в консолі немає помилок, усе працює як слід.
3. **Зроби білд**:
   ```bash
   npm run build
   ```
4. **Вивантаж на GitHub Pages** або інший хостинг. Зверни увагу, що для GitHub Pages можливо знадобиться додаткове налаштування шляху (`base` у `vite.config.js`) або використання окремого плагіна.  
   - Покрокова інструкція (англ.): [Deploying Vite Project to GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)

5. **Надішли на перевірку** два посилання:  
   - На **вихідні файли** (GitHub-репозиторій).  
   - На **живу сторінку** (GitHub Pages).

6. Не забудь прикріпити файл у форматі `.zip` з усім репозиторієм, як вимагає завдання.

---

## На що звернути увагу, аби уникнути типових помилок

1. **Перевірка на порожній рядок** — обов'язкова, інакше користувач зможе надсилати запит з `""`.
2. **Виведення повідомлень** через `iziToast` — замість `alert`.
3. **Очищення галереї** перед новим пошуком, щоб результати не змішувалися.
4. **Виклик `lightbox.refresh()`** після рендеру нових карток.
5. **Обробка помилок** через `try ... catch` і/або `then().catch()`, щоб сторінка не «падала».
6. **Наявність/відсутність помилок** у консолі — жодних `console.log` і попереджень.

---

## Підсумок

- У результаті має вийти додаток, де користувач вводить слово для пошуку → натискає «Search» → показується індикатор → надсилається запит до Pixabay → після отримання відповіді індикатор зникає та відображаються картки зображень.  
- Якщо зображень немає — з’являється повідомлення через `iziToast`.
- При кліку на будь-яке зображення відкривається модальне вікно з великою версією за допомогою `SimpleLightbox`.

Так ти продемонструєш роботу з HTTP-запитами, відпрацювання помилок, уміння підключати та використовувати сторонні бібліотеки (зокрема для сповіщень і галерей), а також роботу із завантажувачем (spinner).

Бажаю успіху у виконанні домашньої роботи! Якщо виникатимуть складнощі, перевір кроки ще раз або звернися до документації використовуваних бібліотек.