<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
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
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { deletePost, getPostById } from '@/api/posts'
import { ref } from 'vue'

const props = defineProps({
  id: [String, Number],
})

// const route = useRoute()
const router = useRouter()
// const id = route.params.id
// const id = props.id
const post = ref({})

// console.log('getPostById: ', getPostById(id))
/**
 * ref로 선언하면 아래와 같이 구조분해할당 객체할당을 할 수 있다.
 * ref의 장점 : 객체할당 가능
 * ref이 장점 : 일관성
 * ref의 단점 : .value를 붙여줘야 한다. (post.value.title, post.value.content)
 *
 * reactive
 * reactive 장점 : post.title, post.content
 * reactive 단점 : 구조분해할당시 반응성을 잃어버린다.
 */
const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id)
    setPost(data)
    post.value = { ...data }
  } catch (error) {
    console.log('error: ', error)
  }
}

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}

fetchPost()

const remove = async () => {
  try {
    if (confirm('삭제하시겠습니까?')) {
      await deletePost(props.id)

      router.push({
        name: 'PostList',
      })
    }
  } catch (error) {
    console.log('error: ', error)
  }
}

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
