<template>
  <button @click='increment'> {{countLocal}}</button>
</template>

<script>
export default {

  name: 'CounterButton',

  data() {
    return {
      countLocal: this.count,
    }
  },

  props: {
    count: {
      type: Number,
      default: 0,
    }
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  watch: {
    count(newVal) {
      this.countLocal = newVal;
    }
  },
  
  methods: {
    increment() {
      this.$emit('increment', ++this.countLocal);
    },
  }
};
</script>

<style>

</style>
