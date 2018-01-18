import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';
import './gallery.scss';

const init = () => $('[data-js-gallery').slick();

export default { init };
