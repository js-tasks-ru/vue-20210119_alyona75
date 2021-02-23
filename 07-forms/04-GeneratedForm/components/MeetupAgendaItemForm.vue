<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button class="form-control" title="Тип" 
      :options="$options.agendaItemTypes" v-model="agendaItem_.type" />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input type="time" placeholder="00:00" 
          :value="agendaItem_.startsAt" @input.native="updateEndTime($event.target.value)" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input type="time" placeholder="00:00"  v-model="agendaItem_.endsAt"/>
        </div>
      </div>
    </div>

    <form-group 
      class="form-group" 
      v-for="data in generatedFormData" 
      :key="data.title" 
      :label="data.title"
    >
      <component 
        :is='data.component' 
        v-bind='data.props'
        v-model='agendaItem_[data.field]'  
      />
    </form-group>

  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';

import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

const getDateFromStringTime = (val) => {
  const time = val.split(':');
  return new Date(0, 0, 0, time[0], time[1]);
}

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      agendaItem_: { ...this.agendaItem },
    };
  },
  computed: {
    generatedFormData() {
      return this.$options.fieldSpecifications[this.agendaItem_.type];
    }
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
    },
  }
};
</script>

<style></style>
