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
      return this.items ? this.items.filter((el, ind) => {
        if(Math.ceil((ind + 1) / this.perPage) == this.page) return el}) : null;
    }
  }
};
</script>

<style></style>
