import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: ` <div id="app">
  <MeetupView v-if="currentMeetup" :meetup="currentMeetup"/>
</div>`,

  components: {MeetupView},

  data() {
    return {
      currentMeetup: null,
    }
  },

  mounted() {
    fetchMeetup(MEETUP_ID).then(meetup => {
      this.currentMeetup = meetup;
    })
  },
};
