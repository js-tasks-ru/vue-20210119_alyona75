import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

function fetchMeetup(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then(res => res.json());
}

// const fetchMeetup = () => fetch(`${API_URL}/meetups/${MEETUP_ID}`).then(res => res.json());

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

export const app = new Vue({
  el: '#app',

  data: {
    currentMeetup: null,
  },

  mounted() {
    fetchMeetup(MEETUP_ID).then(meetup => {
      this.currentMeetup = meetup;
    })
  },

  computed: {
    meetup() {
      if(!this.currentMeetup) return null;
      return {
        ...this.currentMeetup,
        coverStyle: this.currentMeetup.imageId ? {
              '--bg-url': `url('${getMeetupCoverLink(this.currentMeetup)}')`,
            } : null,
        localDate: new Date(this.currentMeetup.date).toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        dateOnlyString: getDateOnlyString(new Date(this.currentMeetup.date)),
      }
    },

    meetupAgenda() {
      return this.currentMeetup.agenda.map((agenda) => ({
        ...agenda,
        icon: `/assets/icons/icon-${agendaItemIcons[agenda.type]}.svg`,
        title: agenda.title || agendaItemTitles[agenda.type],
        timeline: `${agenda.startsAt} - ${agenda.endsAt}`
      }));
    }
  },

});
