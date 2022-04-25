import { createApp } from './vendor/vue.esm-browser.js';

const objRoot = {
  name: 'App',
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    increment() {
      this.value++;
    },
  },
};

const app = createApp(objRoot);

app.mount('#app');
