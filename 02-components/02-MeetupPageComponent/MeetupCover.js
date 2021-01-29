export const MeetupCover = {
  template: `<div class="meetup-cover" :style="link? \`--bg-url: url('\${link}')\` : null">
        <h1 class="meetup-cover__title">{{title ? title : ''}}</h1>
    </div>`,

  props: {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  }
};
