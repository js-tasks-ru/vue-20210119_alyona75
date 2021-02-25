<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number,
  },

  render(h) {
    let slots = this.$slots.default;
    return h('div', slots ? slots.filter((el, ind) => {
      if(Math.ceil((ind + 1) / this.perPage) == this.page) return el}) : null) 
  },
};
</script>

<style scoped></style>
