@someone else please prettify this.. make it look professional (actual file is not uploaded to npm YET)

---

<div align="center">
  <img src="./static/logo.png">
</div>

<br />

<div align="center">numCaptchaVUE is a <i>VueJS</i> Plugin that allows you to use <u>numCAPTCHA</u> easily on your website.</div>

<br />

<div align="center">
  <img src="./static/numCaptcha-1.png">
</div>

---

### Usage

In your vue app, install the plugin from [npm](https://www.npmjs.com/get-npm) as a dependency

```
npm i --save numcaptcha-vue
```

<br />

In your `main.js`, call the `Vue.use()` global method to use the plugin.

> :warning: :warning: :warning: numCaptchaVUE uses [Font Awesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome) icons hence please install the neccessary packages. Also, do remember to pass `FontAwesomeIcon` and `fas` as options into the plugin.

```js
// firstly, import and use Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// then, import and use numCaptcha
import NumCaptcha from 'numcaptcha-vue';

Vue.use(NumCaptcha, { FontAwesomeIcon, fas });

/* ... rest of main.js ... */
```

<br />

After importing the plugin, you can use it _anywhere_ in your vue application using the `<num-captcha />` component.

> The component returns a event called `success` when the user successfully completes numCAPTCHA. For eg: You can use it to enable the submit button of the form when the `success` event is emitted.

```html
<num-captcha @success="do_something_when_authentication_is_success" />
```

---

#### Dependencies

- https://www.npmjs.com/package/@fortawesome/vue-fontawesome

---

#### Others numCAPTCHA Libraries...

If you are using plain _Javascript_, do check out [numCaptchaJS](https://github.com/Kabbage-Babbage/libraryJS) :tada:
