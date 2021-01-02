// import { VueConstructor } from 'vue';
import NumCaptcha from './components/NumCaptcha.vue';
export default {
  install(Vue, options) {
    if (
      !options ||
      !('faCircleNotch' in options.fas) ||
      !('faTimes' in options.fas) ||
      !('faCheck' in options.fas) ||
      !options.FontAwesomeIcon
    ) {
      throw new Error(
        'Please initialise numCAPTCHA plugin with {FontAwesomeIcon, fas} as options'
      );
    }
    Vue.component('num-captcha', NumCaptcha);
  }
};
