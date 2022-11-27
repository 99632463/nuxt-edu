<template>
  <div id="mse"></div>
</template>

<script setup>
let player = ref(null);

const props = defineProps({
  url: String,
});

onMounted(() => {
  player.value = new Player({
    id: "mse",
    url: props.url,
    width: null,
    height: 450
  });
});

onBeforeUnmount(() => {
  player.value.destroy();
});
</script>