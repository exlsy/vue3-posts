<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>

    <hr class="my-4" />
    <!-- <div class="row g-3">
      <div v-for="(item, index) in items" :key="index" class="col-4">
        <AppCard>
          {{ item }}
        </AppCard>
      </div>
    </div> -->

    <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '@/components/AppCard.vue'
import AppGrid from '@/components/AppGrid.vue'

const router = useRouter()
const goAboutPage = () => {
  // router.push('/about')
  router.push({
    name: 'About',
  })
}

const items = ref(['사과', '딸기', '포도', '바나나'])
</script>

<style lang="scss" scoped></style>
