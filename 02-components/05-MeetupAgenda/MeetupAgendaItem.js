import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
    },
  },

  computed: {
    getPathIcon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },
    getTitle() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.agendaItem.type];
    },
    getTimeSpending() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
    isTalk() {
      return this.agendaItem.type === 'talk';
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="getPathIcon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ getTimeSpending }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ getTitle }}</h3>
        <p class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span v-if="isTalk" class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
