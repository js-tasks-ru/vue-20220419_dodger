import { createApp } from './vendor/vue.esm-browser.js';

const objRoot = {
  name: 'App',
  data() {
    return {
      a: 0,
      b: 0,
      symbol: 'sum',
    };
  },
  computed: {
    result() {
      switch (this.symbol) {
        case 'sum':
          return this.a + this.b;
        case 'subtract':
          return this.a - this.b;
        case 'multiply':
          return this.a * this.b;
        case 'divide':
          return this.a / this.b;
      }
    },
  },
};

const app = createApp(objRoot);
app.mount('#app');
