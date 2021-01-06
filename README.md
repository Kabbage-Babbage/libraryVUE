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

> :warning: numCaptchaVUE uses [Font Awesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome) icons hence please install the neccessary packages. Also, do remember to pass `FontAwesomeIcon` and `fas` as options into the plugin.

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

> The component emits an event called `status` with the value of `success` when the user successfully completed _numCaptcha_ or with the value of `failed` when the user is identified as a bot

```html
<num-captcha @status="success | failed" />
```

---

#### Dependencies

- https://www.npmjs.com/package/@fortawesome/vue-fontawesome

---

#### Others numCAPTCHA Libraries...

If you are using plain _Javascript_, do check out [numCaptchaJS](https://github.com/Kabbage-Babbage/libraryJS) :tada:
