<template>
  <div class="container">
    <meetups-view v-bind.sync="queryAttrs"/>
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaultParams = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
}

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      queryAttrs:{
        view: this.$route.query.view,
        date: this.$route.query.date,
        participation: this.$route.query.participation,
        search: this.$route.query.search,
      }
    }
  },
  computed: {
    meetupsViewAttrs: {
      get() {
        return this.$route.query;
      },
      set(newVal) {
        this.queryAttrs.view = newVal.view;
        this.queryAttrs.date = newVal.date;
        this.queryAttrs.participation = newVal.participation;
        this.queryAttrs.search = newVal.search;
      }
    }
  },
  watch: {
    $route(to) {
      this.meetupsViewAttrs = {
        view: to.query.view ? to.query.view : this.queryAttrs.view,
        date: to.query.date ? to.query.date : this.queryAttrs.date,
        participation: to.query.participation ? to.query.participation : this.queryAttrs.participation,
        search: to.query.search ? to.query.search : this.queryAttrs.search,
      };
    },
    queryAttrs: {
      deep: true,
      handler() {
        this.$router
          .push({
            query: {
              view: this.getNewQuery(this.queryAttrs.view, defaultParams.view),
              date: this.getNewQuery(this.queryAttrs.date, defaultParams.date),
              participation: this.getNewQuery(this.queryAttrs.participation, defaultParams.participation),
              search: this.getNewQuery(this.queryAttrs.search, defaultParams.search),
            },
          })
          .catch((err) => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
      }
    }
  },
  methods: {
    getNewQuery(val, defVal) {
      return val === defVal ? undefined : val;
    }
  }
};
</script>

<style scoped></style>
