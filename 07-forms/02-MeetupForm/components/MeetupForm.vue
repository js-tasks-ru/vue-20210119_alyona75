<template>
  <form class="form meetup-form" @submit.prevent="submitForm">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title"/>
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model='meetupDate'/>
        </div> 
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place"/>
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea class="form-control" rows="3" v-model="meetup_.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetup_.imageId"/>
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, idx) in meetup_.agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem(idx, $event)"
        @remove="removeAgendaItem(idx)"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
          
        >
          {{submitText}}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';
import {cloneDeep, isEqual} from 'lodash';

const getDateToString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: String,
  },

  data() {
    return {
      meetup_: null,
    };
  },
  watch: {
    meetup: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (!isEqual(newValue, this.meetup_)) {
          this.meetup_ = cloneDeep(this.meetup);
        }
      },
    },
    meetup_: {
      deep: true,
      handler(newValue) {
        this.$emit('update:meetup', cloneDeep(newValue));
      },
    },
  },
  computed: {
    meetupDate: {
      get() {
        return getDateToString(new Date(this.meetup_.date));
      },
      set(newValue) {
        this.meetup_.date = getDateToString(new Date(newValue));
      }

    }
  },
  methods: {
    addAgendaItem() {
      const newItem = buildAgendaItem();
      const len = this.meetup_.agenda.length;
      if(len != 0){
        newItem.startsAt = this.meetup_.agenda[len-1].endsAt;
        this.meetup_.agenda.push(newItem);
      }
      else this.meetup_.agenda.push(newItem);
    },
    updateAgendaItem(idx, newItem) {
      this.meetup_.agenda.splice(idx, 1, newItem);
    },
    removeAgendaItem(idx) {
      this.meetup_.agenda.splice(idx, 1);
    },
    submitForm() {
      this.$emit('submit', cloneDeep(this.meetup_));
    }
  },
  
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
