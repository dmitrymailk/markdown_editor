<template>
  <div>
    <button @click="increaseWidth">test</button>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1280px-Cat03.jpg"
      ref="image"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageW: 100,
    };
  },
  methods: {
    increaseWidth() {
      //   console.log(this.$refs.image.style);
      this.$refs.image.width = this.imageW;
      this.imageW += 10;
    },
  },
};
</script>
