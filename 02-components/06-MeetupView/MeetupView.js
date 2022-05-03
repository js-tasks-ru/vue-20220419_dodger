import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from '../02-MeetupDescription/MeetupDescription';
import MeetupCover from '../03-MeetupCover/MeetupCover';
import MeetupInfo from '../04-MeetupInfo/MeetupInfo';
import MeetupAgenda from '../05-MeetupAgenda/MeetupAgenda';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <meetup-cover :title="meetup.title" :image="meetup.image" />

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description" />

            <h3>Программа</h3>
            <meetup-agenda
              v-if="meetup.agenda.length"
              :agenda="meetup.agenda"
            />
            <ui-alert v-else>
              Программа пока пуста...
            </ui-alert>
          </div>
          <div class="meetup__aside">
            <meetup-info
              :place="meetup.place"
              :organizer="meetup.organizer"
              :date="meetup.date"
            />
          </div>
        </div>
      </ui-container>
    </div>`,
});
