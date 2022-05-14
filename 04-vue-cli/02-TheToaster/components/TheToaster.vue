<template>
  <div class="toasts">
    <ui-toast
      v-for="(objToast, indexToast) in arrToasts"
      :key="indexToast"
      :icon="objToast.icon"
      :message="objToast.message"
      :class="objToast.class"
    />
  </div>
</template>

<script>
import UiToast from "./UiToast";

export default {
  name: 'TheToaster',
  components: { UiToast },
  data () {
    return {
      arrToasts: []
    }
  },
  methods: {
    randomHash () {
      return Math.random().toString(24).slice(0, 7)
    },
    success (message) {
      this.onAddToast({
        message,
        icon: 'check-circle',
        class: 'toast_success'
      })
    },
    error (message) {
      this.onAddToast({
        message,
        icon: 'alert-circle',
        class: 'toast_error'
      })
    },
    onAddToast (objToast) {
      const RANDOM_HASH = this.randomHash()

      this.arrToasts.push({
        _innerId: RANDOM_HASH,
        ...objToast
      })

      setTimeout(() => {
        this.arrToasts = this.arrToasts.filter(objToast => objToast._innerId !== RANDOM_HASH)
      }, 5000)
    },
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

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

::v-deep(.toast__icon) {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
