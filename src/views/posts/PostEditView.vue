<template>
  <AppLoading v-if="loading"></AppLoading>

  <AppError v-else-if="error" :message="error.message"></AppError>

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message"></AppError>
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetailPage"
        >
          취소
        </button>
        <!-- <button class="btn btn-primary">수정</button> -->

        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
    <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType">
    </AppAlert> -->
    <!-- <AppAlert :items="alerts"> </AppAlert> -->
    <!-- <form @submit.prevent="edit">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          v-model="form.title"
          type="text"
          class="form-control"
          id="title"
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          v-model="form.content"
          class="form-control"
          id="content"
          rows="3"
        ></textarea>
      </div>
      <div class="pt-4">
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
// import { updatePost } from '@/api/posts'
// import { ref } from 'vue'
import PostForm from '@/components/posts/PostForm.vue'
// import AppAlert from '@/components/app/AppAlert.vue'
import { useAlert } from '@/composables/alert'
import { useAxios } from '@/hooks/useAxios'

const { vAlert, vSuccess } = useAlert()

const route = useRoute()
const router = useRouter()

const id = route.params.id

const {
  // response,
  data: form,
  error,
  loading,
} = useAxios(`/posts/${id}`)

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `/posts/${id}`,
  {
    method: 'patch',
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다.')
      router.push({
        name: 'PostDetail',
        params: { id },
      })
    },
    onError: err => {
      console.log('error:', err)
      vAlert('수정 실패하였습니다.', 'error')
      editError.value = err
    },
  },
)

const edit = async () => {
  execute({
    ...form.value,
    // createdAt: Date.now(),
  })
}

// const editError = ref(null)
// const editLoading = ref(false)

// const edit = async () => {
//   try {
//     editLoading.value = true
//     await updatePost(id, {
//       ...form.value,
//       // createdAt: Date.now(),
//     })
//     vSuccess('수정이 완료되었습니다.')
//     router.push({
//       name: 'PostDetail',
//       params: { id },
//     })
//   } catch (err) {
//     console.log('error:', err)
//     vAlert('수정 실패하였습니다.', 'error')
//     editError.value = err
//   } finally {
//     editLoading.value = false
//   }
// }

const goDetailPage = () => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  })
}

// alert
// const showAlert = ref(false)
// const alertMessage = ref('')
// const alertType = ref('success')
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
