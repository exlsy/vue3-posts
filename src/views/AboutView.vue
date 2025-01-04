<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
    <h2>Store</h2>
    <p>counter: {{ counter }}</p>
    <!-- <p>counter2: {{ counter }}</p> -->
    <p>doubleCount: {{ doubleCount }}</p>
    <button @click="increment()">store.increment</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/store/counter'
import { storeToRefs } from 'pinia'

const route = useRoute()

console.log('route.path: ', route.path)

const store = useCounterStore()
console.log('store: ', store)

const { counter, doubleCount } = storeToRefs(store)
const { increment } = store
</script>

<style lang="scss" scoped></style>
