<template>
  <div class="toasts">
    <ui-toast
      v-for="objToast in arrToasts"
      :key="objToast._innerId"
      :type="objToast.type"
      :message="objToast.message"
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
        type: 'success'
      })
    },
    error (message) {
      this.onAddToast({
        message,
        type: 'error'
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
</style>
