import galleryItems from "./gallery-items.js";
//Создать галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.

// Получение доступов:
// к родительскому элементу всех лишек галереи
// Получение доступов:
const refs = { 
    // к родительскому элементу всех лишек галереи
    gallery: document.querySelector("ul.js-gallery"),
    // к контейнеру модального окна
    modal: document.querySelector("div.lightbox"),
    // к кнопке закрытия модалки
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    // к элементу изображения в модалке
    imageEl: document.querySelector(".lightbox__image"),
}

// Функция для создания и рендера разметки по массиву данных и по предоставленному шаблону
function createListItemsMarkup(items) {
    return items.map(({ preview, original, description }, index) => {
        return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}" data-index=${index}></img>
            </a>
        </li>` 
    }).join("")
}

// Создание и рендер разметки по массиву данных
const galleryMarkup = createListItemsMarkup(galleryItems);

// Добавление разметки всех лишек галереи в DOM
refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);

// Реализация делегирования на галерее ul.js-gallery
// Функция, которая подменяет пути к оригинальным изображениям в окне модалки
function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  //const originalImageSource = event.target.dataset.source;
  //const originalImageAlt = event.target.alt;
  //const currentImageIndex = event.target.dataset.index;

  refs.imageEl.setAttribute("src", event.target.dataset.source);
  refs.imageEl.setAttribute("alt", event.target.alt);
  refs.imageEl.setAttribute("data-index", event.target.dataset.index);

  refs.modal.classList.add("is-open");

  // Добавление слушателя события на window для закрытия модалки по клавише ESC
  //window.addEventListener("keydown", onPressEscape);
  // Добавление слушателя события на window для перелистования изображение по клавишам "вправо" и "влево"
  //window.addEventListener("keydown", slideImage);
}

// Функция для закрытия модалки по клику на кнопку закрытия
function closeModal() {
  refs.imageEl.setAttribute("src", "");
  refs.imageEl.setAttribute("alt", "");
  refs.imageEl.setAttribute("data-index", "");
  refs.modal.classList.remove("is-open");

  // Удаление слушателей события с window
  //window.removeEventListener("keydown", onPressEscape);
  //window.removeEventListener("keydown", slideImage);
}

// Добавление слушателя события на контейнер галереи
refs.gallery.addEventListener("click", openModal);

// Добавление слушателя события на кнопку закрытия модалки
refs.closeBtn.addEventListener("click", closeModal);