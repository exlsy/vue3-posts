<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message"></AppError>

    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <!-- <button class="btn btn-primary">저장</button> -->

        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>

    <!-- <AppAlert :items="alerts"> </AppAlert> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { createPost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'
import { useAxios } from '@/hooks/useAxios'

const { vAlert, vSuccess } = useAlert()

const router = useRouter()

const form = ref({
  title: null,
  content: null,
})

// const loading = ref(false)
// const error = ref(null)

const { error, loading, execute } = useAxios(
  '/posts',
  {
    method: 'post',
    // data: {
    //   ...form.value,
    //   createdAt: Date.now(),
    // },
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('등록이 완료되었습니다.')
      router.push({
        name: 'PostList',
      })
    },
    onError: err => {
      console.log('error:', err)
      vAlert(err.message, 'error')
      error.value = err
    },
  },
)

const save = async () => {
  execute({
    ...form.value,
    createdAt: Date.now(),
  })
}

// const save = async () => {
//   try {
//     loading.value = true
//     await createPost({
//       ...form.value,
//       createdAt: Date.now(),
//     })
//     vSuccess('등록이 완료되었습니다.')
//     router.push({
//       name: 'PostList',
//     })
//   } catch (err) {
//     console.log('error:', err)
//     vAlert(err.message, 'error')
//     error.value = err
//   } finally {
//     loading.value = false
//   }
// }

const goListPage = () => {
  router.push({
    name: 'PostList',
  })
}

// const alerts = ref([])
// const vAlert = (message, type = 'success') => {
//   alerts.value.push({ message, type })
//   setTimeout(() => {
//     alerts.value.shift()
//   }, 2000)
// }
// const vSuccess = message => vAlert(message, 'success')
</script>

<style lang="scss" scoped></style>
