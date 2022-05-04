import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isLoading: false,
      error: null,
    };
  },

  watch: {
    meetupId() {
      this.fetchMeetup();
    },
  },

  created() {
    this.fetchMeetup();
  },

  methods: {
    fetchMeetup() {
      this.isLoading = true;
      this.meetup = null;
      this.error = null;

      fetchMeetupById(this.meetupId)
        .then((data) => {
          this.meetup = data;
        })
        .finally(() => {
          this.isLoading = false;
        })
        .catch((err) => (this.error = err));
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view
        v-if="meetup && !isLoading"
        :meetup="meetup"
      />

      <ui-container v-else-if="isLoading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="error">
        <ui-alert>{{ error.message }}</ui-alert>
      </ui-container>
    </div>`,
});
