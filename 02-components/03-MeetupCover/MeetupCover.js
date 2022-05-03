import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
      default: '',
    },
    image: {
      default: '',
    },
  },

  computed: {
    styleMeetupCover() {
      return this.image ? `--bg-url: url(${this.image})` : '';
    },
  },

  template: `
    <div class="meetup-cover" :style="styleMeetupCover">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
