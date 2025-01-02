<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
    <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType">
    </AppAlert> -->
    <AppAlert :items="alerts"> </AppAlert>
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
import { getPostById, updatePost } from '@/api/posts'
import { ref } from 'vue'
import PostForm from '@/components/posts/PostForm.vue'
import AppAlert from '@/components/AppAlert.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id

const form = ref({
  title: null,
  content: null,
})

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id)
    setForm(data)
  } catch (error) {
    console.log('error: ', error)
    vAlert(error.message, 'error')
  }
}

const setForm = ({ title, content }) => {
  form.value.title = title
  form.value.content = content
}

fetchPost()

const edit = async () => {
  try {
    await updatePost(id, {
      ...form.value,
      // createdAt: Date.now(),
    })
    vAlert('수정이 완료되었습니다.', 'success')
    // router.push({
    //   name: 'PostDetail',
    //   params: {
    //     id,
    //   },
    // })
  } catch (error) {
    console.log('error:', error)
    vAlert('수정 실패하였습니다.', 'error')
  }
}

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
const alerts = ref([])
const vAlert = (message, type = 'success') => {
  alerts.value.push({ message, type })
  // showAlert.value = true
  // alertMessage.value = message
  // alertType.value = type
  setTimeout(() => {
    alerts.value.shift()
    // showAlert.value = false
    // alertMessage.value = ''
    // alertType.value = 'success'
  }, 2000)
}
</script>

<style lang="scss" scoped></style>
