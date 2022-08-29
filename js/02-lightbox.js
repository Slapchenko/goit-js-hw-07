import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

function createGalleryItemsMarkup(images) {
  return images.reduce(
    (acc, { preview, original, description }) =>
      acc +
      `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
    </li>
    `,
    ''
  );
}
