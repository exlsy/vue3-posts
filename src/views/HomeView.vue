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

    <hr class="my-4" />
    <!-- <h2>{{ $person.name }}</h2>

    <button class="btn btn-primary" @click="person.say">click person</button> -->
    <h2>{{ position }}</h2>
    <h2>x: {{ x }}</h2>
    <h2>y: {{ y }}</h2>
  </div>
</template>

<script>
export default {
  created() {
    // console.log('$person.name: ', this.$person.name)
    // this.$person.say()
  },
}
</script>

<script setup>
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
// import AppCard from '@/components/app/AppCard.vue'
// import AppGrid from '@/components/app/AppGrid.vue'

const router = useRouter()
const goAboutPage = () => {
  // router.push('/about')
  router.push({
    name: 'About',
  })
}

const items = ref(['사과', '딸기', '포도', '바나나'])

// const person = inject('person')
// console.log('person.name: ', person.name)

const position = reactive({
  x: 100,
  y: 1000,
})

// const x = position.x
// const { x, y } = position
// const x = ref(position.x)
// const y = ref(position.y)
// console.log('x: ', typeof x.value)
// console.log('y: ', typeof y.value)
// const x = toRef(position, 'x')
// const y = toRef(position, 'y')
const { x, y } = toRefs(position)
</script>

<style lang="scss" scoped></style>
