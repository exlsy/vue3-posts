<script setup>
import TheHeader from '@/layouts/TheHeader.vue'
import TheView from '@/layouts/TheView.vue'
</script>

<template>
  <TheHeader></TheHeader>
  <TheView></TheView>
  <!-- <AppAlert :items="alerts"></AppAlert> -->
  <AppAlert></AppAlert>
</template>

<style scoped>
.container {
  max-width: 940px;
}
</style>
