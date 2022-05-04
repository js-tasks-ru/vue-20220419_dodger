import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="agenda">
      <li
        v-for="(item, indexItem) in agenda"
        :key="indexItem"
        class="agenda__item">
        <meetup-agenda-item :agenda-item="item" />
      </li>
    </ul>`,
});
