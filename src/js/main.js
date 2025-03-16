import { loadImages } from './api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createPthotsHtml } from './render';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('#loader'),
};

let lightbox = null;

refs.form.addEventListener('submit', doSearchPhotos);

async function doSearchPhotos(e) {
  e.preventDefault();

  const query = e.currentTarget.elements.search.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Stop!',
      message: 'The field mast be filled up!!!',
    });
    return;
  }

  showLoader();

  try {
    refs.gallery.innerHTML = '';
    const data = await loadImages(query);
    console.log(data);
    hideLoader();
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No results!',
      });
      return;
    }

    const imagesHtml = createPthotsHtml(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', imagesHtml);
    refs.form.reset();


    if (!lightbox) {
      lightbox = new SimpleLightbox(".gallery a", {close: true});
    } else {
      lightbox.refresh();
    }

  } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
}

function showLoader() {
  refs.loader.classList.add('visible');
}

function hideLoader() {
  refs.loader.classList.remove('visible');
}
