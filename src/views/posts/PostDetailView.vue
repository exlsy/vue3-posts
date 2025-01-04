<template>
  <AppLoading v-if="loading"></AppLoading>

  <AppError v-else-if="error" :message="error.message"></AppError>

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
    </p>
    <!-- <hr class="my-4" /> -->
    <!-- <p>params: {{ $route.params }}</p>
    <p>query: {{ $route.query.searchText }}</p>
    <p>hash: {{ $route.hash }}</p> -->
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message"></AppError>
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
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
// import { deletePost } from '@/api/posts'
// import { ref } from 'vue'
import { useAxios } from '@/hooks/useAxios'
import { useAlert } from '@/composables/alert'
import { computed, toRefs } from 'vue'
import { useNumber } from '@/composables/number'

const { vAlert, vSuccess } = useAlert()

const props = defineProps({
  id: [String, Number],
})

const router = useRouter()

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
// const idRef = toRef(props, 'id')
const { id: idRef } = toRefs(props)
const { isOdd } = useNumber(idRef)
const url = computed(() => `/posts/${props.id}`)

const {
  // response,
  data: post,
  error,
  loading,
} = useAxios(url)

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  {
    method: 'delete',
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.')
      router.push({
        name: 'PostList',
      })
    },
    onError: err => {
      vAlert(err.message, 'error')
      console.log('error:', err)
      removeError.value = err
    },
  },
)

const remove = async () => {
  if (confirm('삭제하시겠습니까?') === false) {
    return
  }
  execute()
}

// const removeError = ref(null)
// const removeLoading = ref(false)
// const remove = async () => {
//   try {
//     if (confirm('삭제하시겠습니까?') === false) {
//       return
//     }
//     removeLoading.value = true
//     await deletePost(props.id)

//     router.push({
//       name: 'PostList',
//     })
//   } catch (err) {
//     console.log('error: ', err)
//     removeError.value = err
//   } finally {
//     removeLoading.value
//   }
// }

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
