<template>
  <div class='page peage_meetup-forms container'>
    <h2>{{title}}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

  props:{
    title: String,
  }
};
</script>

<style scoped>
.page.page_meetup-forms {
    padding: 70px 0;
}
</style>
