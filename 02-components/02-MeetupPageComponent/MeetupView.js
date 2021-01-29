import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',
  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },
  template: `
    <div>
      <MeetupCover :link="getCoverLink" :title="meetup.title" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />

            <h3>Программа</h3>
            <MeetupAgenda :agenda="meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="new Date(meetup.date)" />
          </div>
        </div>
      </div>
    </div>`,

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    getCoverLink() {
      return getMeetupCoverLink(this.meetup);
    },
  },
};
