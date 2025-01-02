<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>

    <!-- <AppAlert :items="alerts"> </AppAlert> -->

    <!-- <form @submit.prevent="save">
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
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </div>
    </form> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'

const { vAlert, vSuccess } = useAlert()

const router = useRouter()

const form = ref({
  title: null,
  content: null,
})

const save = async () => {
  try {
    await createPost({
      ...form.value,
      createdAt: Date.now(),
    })
    vSuccess('등록이 완료되었습니다.')
    router.push({
      name: 'PostList',
    })
  } catch (error) {
    console.log('error:', error)
    vAlert(error.message, 'error')
  }
}

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
