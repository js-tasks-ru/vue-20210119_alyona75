//получение кол-ва дней
function getMonthDays(date, i) {
  return new Date(date.getFullYear(), date.getMonth() + i, 0);
};

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
          <div>{{dateCalendar.month}} {{dateCalendar.year}}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in calendar" class="rangepicker__cell"
        :class="day.state == 'cur'  ? '' : 'rangepicker__cell_inactive'">
          {{day.day}}
          <a v-for="meetup in day.meetups" class="rangepicker__event">
          {{meetup}}
          </a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    }
  }, 

  data: () => ({
    date: new Date(),
  }),

  computed: {
    //получение текущего года, месяца
    //получение кол-ва дней в текущем месяце, дней до текущего месяца, кол-ва дней в предыдущем месяце 
    dateCalendar() {
      return {
        year: this.date.getFullYear(),
        month: this.date.toLocaleString(navigator.language, {month: 'long' }),
        monthDays: getMonthDays(this.date,1).getDate(),
        daysBefore: getMonthDays(this.date,0).getDay(),
        prevMonthDays: getMonthDays(this.date,0).getDate(),
      }
    },
    
    //создание календаря предыдущие + текущие + следующие дни
    calendar() {
      let days = [];

      for(let i = 0; i < this.getDaysMonthBefore().length; i++){
        days.push({
          day: this.getDaysMonthBefore()[i],
          state: 'prev',
        });
      }
      
      for(let i = 1; i <= this.dateCalendar.monthDays; i++) {
        days.push({
          day: i,
          state: 'cur',
          meetups: this.getMeetupsOnDays(i),
        });
      }

      for(let i = 1; i <= this.daysNextMonth(); i++) {
        days.push({
          day: i,
          state: 'next',
        });
      }

      return days;
    }
  },

  methods: {
    //переключение месяца вперед
    nextMonth() {
      let newMonth = this.date.getMonth() + 1;
      this.date = new Date(this.date.setMonth(newMonth, 1));
    },

    //переключение месяца назад
    prevMonth() {
      let prevMonth = this.date.getMonth() - 1;
      this.date = new Date(this.date.setMonth(prevMonth, 1));
    },

    //получение днец предыдущего месяца в обратном порядке (для отображения)
    getDaysMonthBefore() {
      this.prevMonthDays = [];
      for(let i = 0; i < this.dateCalendar.daysBefore; i++) {
        this.prevMonthDays.push(this.dateCalendar.prevMonthDays - i); 
      }
      return this.prevMonthDays.reverse();
    },

    //определение кол-ва дней в следующем месяце до конца недели
    daysNextMonth() {
      let weekDay = new Date(this.dateCalendar.year, this.date.getMonth(), this.dateCalendar.monthDays);
      if(weekDay.getDay() != 0) return 7 - weekDay.getDay();
    },

    //получение названий митапов по дням (для отображения)
    getMeetupsOnDays(dayNum) {
      let meetupTitles = [];
      const curDate = new Date(this.date);
      curDate.setDate(dayNum);
      curDate.setHours(0, 0, 0, 0);

      this.meetups.forEach((meetup) => {
        const meetupDate = new Date(meetup.date);
        meetupDate.setHours(0, 0, 0, 0);
        if (meetupDate.getTime() === curDate.getTime()) {
          meetupTitles.push(meetup.title);
        }
      });
      return meetupTitles;
    },
  },
};
