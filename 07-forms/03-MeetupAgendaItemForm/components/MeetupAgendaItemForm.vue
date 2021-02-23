<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button> 
    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option v-for="item in itemTypes" :key="item.value" :value="item.value">{{item.text}}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input class="form-control" type="time" placeholder="00:00" 
          :value="agendaItem_.startsAt" @input="updateEndTime($event.target.value)" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.endsAt"/>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{newTitle}}</label>
      <input class="form-control" v-model="agendaItem_.title"/>
    </div>

    <div class="form-group" v-if="agendaItem_.type == 'talk'">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="agendaItem_.speaker"/>
    </div>
    
    <div class="form-group" v-if="isOtherTypes">
      <label class="form-label">Описание</label>
      <textarea class="form-control" v-model="agendaItem_.description"></textarea>
    </div>
    <div class="form-group" v-if="agendaItem_.type == 'talk'">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaItem_.language">
        <option v-for="lang in talkLanguages" :key="lang.value" :value="lang.value">{{lang.text}}</option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const getDateFromStringTime = (val) => {
  const time = val.split(':');
  return new Date(0, 0, 0, time[0], time[1]);
}

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      agendaItem_: { ...this.agendaItem },
      itemTypes: getAgendaItemTypes(),
      talkLanguages: getTalkLanguages(),
    };
  },
  computed: {
    newTitle() {
      switch(this.agendaItem_.type) {
        case 'talk': 
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default: return 'Нестандартный текст (необязательно)';
      }
    },
    isOtherTypes() {
      return (this.agendaItem_.type == 'talk' || this.agendaItem_.type == 'other') ? true : false;
    },
  },

  watch: {
    agendaItem_: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.agendaItem_ });
      },
    },
  },

  methods: {
    updateEndTime(newVal) {
      let curEnd = getDateFromStringTime(this.agendaItem_.endsAt);
      let curStart = getDateFromStringTime(this.agendaItem_.startsAt);
      let diff = new Date(curEnd - curStart);
     
      let newStart = getDateFromStringTime(newVal);

      let hh = newStart.getHours() + diff.getHours() - new Date(0).getHours();
      let mm = newStart.getMinutes() + diff.getMinutes() - new Date(0).getMinutes();

      if(hh > 23) hh = hh - 24;
      if(hh < 10) hh = `0${hh}`;
      
      if(mm > 59) mm = mm - 60;
      if(mm < 10) mm = `0${mm}`;

      this.agendaItem_.endsAt = `${hh}:${mm}`;
      this.agendaItem_.startsAt = newVal;
    }
  }
};
</script>

<style></style>
