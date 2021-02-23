<template>
  <AppInput  
    :type="type" 
    v-bind="$attrs"
    v-on="listeners"
    :value="newValue">
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    valueAsNumber: Number,
    valueAsDate: Date,
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
  },

  computed: {
    date(){
      return (this.valueAsNumber ? new Date(this.valueAsNumber) : null) || this.valueAsDate;
    },

    newDate(){
      const YYYY = this.date.getUTCFullYear();
      const MM = (this.date.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = this.date.getUTCDate().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}`;
    },

    newTime() {
      const HH = this.date.getUTCHours().toString().padStart(2, '0');
      const mm = this.date.getUTCMinutes().toString().padStart(2, '0');
      const ss = this.date.getUTCSeconds().toString().padStart(2, '0');
      if(!+this.$attrs['step'] % 60) return `${HH}:${mm}`;
      else return `${HH}:${mm}:${ss}`;
    },

    newDateTimeLocal(){
      return `${this.newDate}T${this.newTime}`;
    },
    newValue() {
      if(this.valueAsDate || this.valueAsNumber) {
        switch(this.type){
          case 'date':
            return this.newDate;
          case 'time':
            return this.newTime;
          case 'datetime-local':
            return this.newDateTimeLocal;
        }
      } else return this.value;
    },
    listeners() {
      return {
        ...this.$listeners,

        change: ($event) => {
          this.$emit('change', $event.target.value);
          this.$emit('update:valueAsNumber', $event.target.valueAsNumber);
          this.$emit('update:valueAsDate', this.type !== 'datetime-local' ? $event.target.valueAsDate
          : new Date($event.target.valueAsNumber));
        },
      }
    },
  }
};
</script>

<style scoped></style>
