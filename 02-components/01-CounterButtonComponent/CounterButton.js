export const CounterButton = {
  template: '<button type="button" @click="increment">{{count}}</button>',

  data() {
    return {
    curCount: this.count,
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

  methods: {
    increment() {
      this.$emit('increment', ++this.curCount);
    }
  },
};
