export const MeetupDescription = {
  template: `<p class="meetup-description">{{description ? description : '' }}</p>`,

  props: {
    description: {
      type: String,
    }
  }
};
