<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': uploader }"
      :style="`--bg-url: url(${url})`"
    >
      <span class="image-uploader__text">
        {{ statusText }}
      </span>

      <input
        ref="input"
        type="file"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
        @change="onSelect"
        @click="onClick"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
      default: '',
    },
    uploader: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      status: this.preview ? 'success' : 'empty',
      selectedFile: null,
    };
  },
  computed: {
    url () {
      return this.preview || URL.createObjectURL(this.selectedFile);
    },
    statusText() {
      return {
        'load': 'Загрузка...',
        'success': 'Удалить изображение',
        'empty': 'Загрузить изображение'
      }[this.status]
    },
  },
  emits: ['select', 'remove', 'upload', 'error'],
  methods: {
    onClick() {
      if (this.status === 'load') return;

      this.$emit('remove');
      this.remove();
    },
    onSelect(event) {
      const file = event.srcElement.files[0];
      this.$emit('select', file);

      if (!this.uploader) {
        this.status = 'success'
        this.selectedFile = file
        return;
      }

      this.status = 'load'

      this.uploader(file)
        .then((data) => {
          this.$emit('upload', data);
          this.status = 'success'
        })
        .catch((err) => {
          this.remove();
          this.$emit('error', err);
        })
    },
    remove() {
      this.status = 'empty'
      this.$refs['input'].value = null;
      this.selectedFile = null;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
