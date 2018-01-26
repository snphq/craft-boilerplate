import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';
import './gallery.scss';

const booleanTypeFn = value => Boolean(Number(value));

const availableSettings = {
  autoplay: booleanTypeFn,
  arrows: booleanTypeFn,
  dots: booleanTypeFn,
};

const parseSettings = settings =>
  Object.entries(settings).reduce((result, [key, value]) => {
    const typeFn = availableSettings[key];

    if (typeFn) {
      return { ...result, [key]: typeFn(value) };
    }

    return result;
  }, {});

const init = () => {
  $('[data-js-gallery]').each((i, el) => {
    const $gallery = $(el);
    const settingsStr = $gallery.attr('data-js-gallery');
    let settings;

    try {
      settings = JSON.parse(settingsStr);
    } catch (error) {
      settings = {};
    }

    $gallery.slick(parseSettings(settings));
  });
};

export default { init };
