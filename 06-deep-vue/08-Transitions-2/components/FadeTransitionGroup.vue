<script>
export default {
  name: 'FadeTransitionGroup',

  render(h) {
    let slots = this.$slots.default;
    slots = slots ? slots.map((el) => {
      if (!el.data.staticClass) el.data.staticClass = '';
      el.data.staticClass += ' fade-list-item';
      return el;
      }) : null;

    return h('transition-group', 
      {
        attrs: { ...this.$attrs, name: 'fade-list' },
        class: {
          'fade-list': true,
        },
        on: this.$listeners,
      },
      slots,
    );
  }
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
