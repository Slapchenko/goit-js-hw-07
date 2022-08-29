import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);
gallery.addEventListener('click', onImageClick);

function createGalleryItemsMarkup(images) {
  return images.reduce(
    (acc, { preview, original, description }) =>
      acc +
      `<div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>`,
    ''
  );
}

function onImageClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  createsBasicLightboxInstance(e);

  checkEscapeKeydown();
}

function createsBasicLightboxInstance(e) {
  basicLightbox
    .create(
      `
    <img src="${e.target.dataset.source}" width="800" height="600">
`
    )
    .show();
}

function checkEscapeKeydown() {
  document.addEventListener('keydown', onEscapeKeydown);

  function onEscapeKeydown(e) {
    if (e.code === 'Escape') {
      document.querySelector('.basicLightbox')?.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  }
}
