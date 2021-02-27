<template>
  <div>
    <template v-for="item in itemsPage">  
      <slot :item="item"/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    page: Number,
    perPage: Number,
    items: Array,
  },
  computed: {
    itemsPage() {
    let start = (this.page - 1) * this.perPage;
    let end = this.page * this.perPage;
    return this.items ? this.items.slice(start,end) : null;
    //второе решение через filter
      //return this.items ? this.items.filter((el, ind) => {
        //if(Math.ceil((ind + 1) / this.perPage) == this.page) return el}) : null;
    }
  }
};
</script>

<style></style>
