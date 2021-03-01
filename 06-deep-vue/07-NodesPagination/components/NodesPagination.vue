<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number,
  },

  render(h) {
    let slots = this.$slots.default;
    let start = (this.page - 1) * this.perPage;
    let end = this.page * this.perPage;
    return h('div', slots ? slots.slice(start,end) : null);
    //второй вариант решения, через filter
    // return h('div', slots ? slots.filter((el, ind) => {
    //   if(Math.ceil((ind + 1) / this.perPage) == this.page) return el}) : null) 
  },
};
</script>

<style scoped></style>
