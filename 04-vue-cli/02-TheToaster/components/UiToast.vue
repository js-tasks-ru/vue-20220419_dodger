<template>
  <div
    class="toast"
    :class="types[type].class"
  >
    <ui-icon
      class="toast__icon"
      :icon="types[type].icon"
    />
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
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      types: {
        success: {
          class: 'toast_success',
          icon: 'check-circle'
        },
        error: {
          class: 'toast_error',
          icon: 'alert-circle'
        }
      }
    }
  }
}
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
