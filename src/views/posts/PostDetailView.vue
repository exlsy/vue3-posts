<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
    <!-- <hr class="my-4" /> -->
    <!-- <p>params: {{ $route.params }}</p>
    <p>query: {{ $route.query.searchText }}</p>
    <p>hash: {{ $route.hash }}</p> -->
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getPostById } from '@/api/posts'
import { ref } from 'vue'

const props = defineProps({
  id: Number,
})

// const route = useRoute()
const router = useRouter()
// const id = route.params.id
// const id = props.id
const form = ref({})

// console.log('getPostById: ', getPostById(id))
/**
 * ref로 선언하면 아래와 같이 구조분해할당 객체할당을 할 수 있다.
 * ref의 장점 : 객체할당 가능
 * ref이 장점 : 일관성
 * ref의 단점 : .value를 붙여줘야 한다. (form.value.title, form.value.content)
 *
 * reactive
 * reactive 장점 : form.title, form.content
 * reactive 단점 : 구조분해할당시 반응성을 잃어버린다.
 */
const fetchPost = () => {
  const data = getPostById(props.id)
  form.value = { ...data }
}

fetchPost()

const goListPage = () => {
  router.push({
    name: 'PostList',
  })
}

const goEditPage = () => {
  router.push({
    name: 'PostEdit',
    params: {
      id: props.id,
    },
  })
}
</script>

<style lang="scss" scoped></style>
