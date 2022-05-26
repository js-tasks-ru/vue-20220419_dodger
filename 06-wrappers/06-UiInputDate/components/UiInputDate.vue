<template>
  <ui-input :type="type" v-model="model" @input="$emit('update:modelValue', $event.target.valueAsNumber)">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: [Number, null],
    },
  },

  computed: {
    model() {
      if (!this.modelValue) {
        return '';
      } else if (this.type === 'date') {
        return this.formatDate(this.modelValue);
      } else if (this.type === 'time') {
        return this.formatDate(this.modelValue, 'HH:MM');
      } else if (this.type === 'datetime-local') {
        return new Date(this.modelValue).toISOString().slice(0, 16);
      }
    },
  },

  methods: {
    formatDate(date, format = 'yyyy-mm-dd') {
      const localDate = new Date(date);
      const formatValue = (value) => ('0' + value).slice(-2);

      const piecesDate = {
        yyyy: localDate.getFullYear(),
        mm: formatValue(localDate.getMonth() + 1),
        dd: formatValue(localDate.getDate()),
        HH: formatValue(localDate.getUTCHours()),
        MM: formatValue(localDate.getUTCMinutes()),
      };

      const separator = format.includes('-') ? '-' : ':';
      return format
        .split(separator)
        .map((value) => piecesDate[value])
        .join(separator);
    },
  },
};
</script>
