<template>
  <div class="meetups-list">
    <template v-for="item in items">
      <slot :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  
  props: {
    items: Array,
  }
};
</script>

<style scoped>
.meetups-list {
}
</style>
