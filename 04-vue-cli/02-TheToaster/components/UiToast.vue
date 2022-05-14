<template>
  <div class="toast">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: "UiToast",
  components: {
    UiIcon
  },
  props: {
    message: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
