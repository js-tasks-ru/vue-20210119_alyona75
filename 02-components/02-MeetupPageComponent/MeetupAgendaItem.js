import { agendaItemIcons, agendaItemTitles} from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="getAgendaInfo.icon" />
      </div>
      <div class="meetup-agenda__item-col">{{getAgendaInfo.timeline}}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{getAgendaInfo.title}}</h5>
        <p v-if="agendaItem.type=='talk'">
          <span >{{agendaItem.speaker}}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{agendaItem.language}}</span>
        </p>
        <p v-if="agendaItem.description">{{agendaItem.description}}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
   getAgendaInfo() {
      return {
        ...this.agendaItem,
        icon: `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`,
        title: this.agendaItem.title || agendaItemTitles[this.agendaItem.type],
        timeline: `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`
      };
    }
  },
};
