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
  computed: {
    url () {
      return this.preview || URL.createObjectURL(this.selectedFile);
    },
    statusText() {
      let result = 'Загрузить изображение';

      if (this.preview || (this.selectedFile && !this.uploader)) {
        result = 'Удалить изображение';
      } else if (this.isLoad) {
        result = 'Загрузка...';
      }

      return result;
    },
  },
  data() {
    return {
      isLoad: false,
      selectedFile: null,
    };
  },
  emits: ['select', 'remove', 'upload', 'error'],
  methods: {
    onClick() {
      if (this.isLoad) return;

      this.$emit('remove');
      this.remove();
    },
    onSelect(event) {
      const file = event.srcElement.files[0];
      this.$emit('select', file);

      if (!this.uploader) {
        this.selectedFile = file
        return;
      }

      this.isLoad = true;

      this.uploader(file)
        .then((data) => {
          this.$emit('upload', data);
        })
        .catch((err) => {
          this.remove();
          this.$emit('error', err);
        })
        .finally(() => {
          this.isLoad = false;
        });
    },
    remove() {
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
