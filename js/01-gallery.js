import { galleryItems } from './gallery-items.js';

let modalInstance = null;
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

  initModal(e);

  setModalImage(e.target.dataset.source);

  modalInstance.show();
}

function initModal() {
  modalInstance = basicLightbox.create(`<img src="" width="800" height="600">`, {
    onShow: instance => {
      document.addEventListener('keydown', onKeydown);
    },
    onClose: instance => {
      document.removeEventListener('keydown', onKeydown);
    },
  });

  return modalInstance;
}

function setModalImage(link) {
  const imageInsideModal = modalInstance.element();
  imageInsideModal.querySelector('img').setAttribute('src', `${link}`);
}

function onKeydown(e) {
  if (e.code === 'Escape') {
    modalInstance.close();
  }
}

// ** v2
// import { galleryItems } from './gallery-items.js';

// const gallery = document.querySelector('.gallery');
// const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

// gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);
// gallery.addEventListener('click', onImageClick);

// function createGalleryItemsMarkup(images) {
//   return images.reduce(
//     (acc, { preview, original, description }) =>
//       acc +
//       `<div class="gallery__item">
//           <a class="gallery__link" href="${original}">
//             <img
//               class="gallery__image"
//               src="${preview}"
//               data-source="${original}"
//               alt="${description}"
//             />
//           </a>
//         </div>`,
//     ''
//   );
// }

// function onImageClick(e) {
//   e.preventDefault();

//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }

//   createsBasicLightboxInstance(e);
// }

// function createsBasicLightboxInstance(e) {
//   const instance = basicLightbox.create(
//     `
//     <img src="${e.target.dataset.source}" width="800" height="600">
// `
//   );

//   instance.show(() => document.addEventListener('keydown', onEscapeKeydown));

//   function onEscapeKeydown(e) {
//     if (e.code === 'Escape') {
//       instance.close(() => document.removeEventListener('keydown', onEscapeKeydown));
//     }
//   }
// }
