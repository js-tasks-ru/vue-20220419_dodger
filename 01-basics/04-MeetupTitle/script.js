import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const objRoot = {
  name: 'App',
  data() {
    return {
      arrIdMeetups: [1, 2, 3, 4, 5],
      meetupId: '',
      objMeetup: {},
    };
  },
  watch: {
    async meetupId(newValue) {
      this.objMeetup = await this.fetchMeetupById(newValue);
    },
  },
  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    },
  },
};

const app = createApp(objRoot);
app.mount('#app');
