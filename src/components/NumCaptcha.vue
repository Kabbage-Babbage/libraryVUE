<template>
  <div class="captcha-wrapper">
    <div class="captcha-image">
      <img
        :src="imageSrc"
        alt="Something went wrong :("
        :class="{ blur: blurCaptcha }"
      />
      <div
        class="captcha-reload"
        :class="{ hidden: hideReload }"
        @click="reloadCaptcha"
      >
        <font-awesome-icon icon="redo" :class="{ hidden: hideReload }" />
      </div>
    </div>

    <div class="captcha-content">
      <div class="captcha-header">
        <img
          src="https://numcaptcha.s3.amazonaws.com/static/logo.png"
          alt=""
          class="captcha-logo"
        />
      </div>
      <div class="captcha-body">
        <form class="captcha-form" @submit.prevent="checkCaptcha">
          <input
            type="text"
            class="captcha-input"
            placeholder="Type the answer."
            :disabled="disableInput"
            v-model.trim="userInput"
          />
        </form>

        <div class="captcha-status">
          <font-awesome-icon :icon="statusIcon" :spin="spinningStatus" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { submitCaptcha, getCaptcha } from '../lib/fetch.js';

export default {
  name: 'NumCaptcha',
  data() {
    return {
      hideReload: true,
      blurCaptcha: false,
      disableInput: false,
      spinningStatus: true,
      userInput: '',
      imageSrc: '',
      id: '',
      statusIcon: ['fas', 'circle-notch'],
      forcedReloadTime: 15000,
      showReloadTime: 5000,
      displayTimeoutInstance: null,
      intervalInstance: null,
      errorCount: 0,
      errorThreshold: 3
    };
  },
  async mounted() {
    await this.reloadCaptcha();
  },
  methods: {
    clearInput() {
      this.userInput = '';
    },
    updateImage(image) {
      this.imageSrc = image;
    },
    updateStatus(status) {
      switch (status) {
        case 'success':
          this.statusIcon = ['fas', 'check'];
          this.spinningStatus = false;
          break;
        case 'failed':
          this.statusIcon = ['fas', 'times'];
          this.spinningStatus = false;
          break;
        default:
          this.statusIcon = ['fas', 'circle-notch'];
          this.spinningStatus = true;
      }
    },
    async reloadCaptcha() {
      this.restartIntervalInstance();

      this.blurCaptcha = true;
      this.updateStatus('pending');

      try {
        const { image, id } = await getCaptcha();
        this.id = id;
        this.imageSrc = image;
      } catch (err) {
        // show alt message when error getting Captcha
        this.blurCaptcha = false;
      }

      this.blurCaptcha = false;
      this.clearInput();
      this.disableInput = false;
      this.hideReload = true;

      this.displayTimeoutInstance = setTimeout(() => {
        // show reload button after 5 seconds of inactivity.
        this.hideReload = false;
      }, this.showReloadTime);
    },
    checkCaptcha() {
      const check = this.userInput;
      if (this.id && !!check) {
        this.disableInput = true;

        // prevent setTimeout from firing.
        if (this.displayTimeoutInstance) {
          clearTimeout(this.displayTimeoutInstance);
        }

        submitCaptcha(this.id, check).then(
          () => {
            this.endCaptcha('success');
            this.$emit('status', 'success');
          },
          () => {
            this.errorCount++;

            if (this.errorCount >= this.errorThreshold) {
              this.endCaptcha('failed');
              this.$emit('status', 'failed');
              return;
            }

            this.updateStatus('failed');
            this.hideReload = false;
          }
        );
      }
    },
    restartIntervalInstance() {
      // we need to stop current interval to prevent race condition
      if (this.intervalInstance) {
        clearInterval(this.intervalInstance);
      }

      this.intervalInstance = setInterval(async () => {
        await this.reloadCaptcha();
      }, this.forcedReloadTime);
    },
    endCaptcha(status) {
      if (this.intervalInstance) {
        clearInterval(this.intervalInstance);
      }

      this.updateStatus(status);
      this.hideReload = true;
    }
  }
};
</script>

<style>
.captcha-wrapper {
  height: 75px;
  width: 350px;
  border: 3px solid #000000;
  box-shadow: 4px 4px 2px rgba(220, 220, 220, 0.7);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.captcha-image {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.captcha-image > img {
  height: 53px;
  width: 135px;
}

.captcha-content {
  height: 100%;
  width: 100%;
}

.captcha-body {
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.captcha-logo {
  height: 100%;
  max-width: 80%;
}

.captcha-header {
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3px;
}

.captcha-reload {
  position: absolute;
  top: 3px;
  left: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fa-redo {
  color: blue;
}

.captcha-input {
  border-radius: 10px;
  padding-left: 10px;
  border: 1px solid grey;
  height: 75%;
  width: 89%;
  float: left;
}

.captcha-status {
  float: right;
  height: 80%;
  width: 15%;
}

.fa-circle-notch {
  color: blue;
  font-size: 1.5em;
}

.fa-check {
  color: green;
  font-size: 1.5em;
}

.fa-times {
  color: red;
  font-size: 1.5em;
}

.hidden {
  display: none;
}

.captcha-form {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.blur {
  filter: blur(3px);
}
</style>
