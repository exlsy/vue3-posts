<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter v-model:title="params.title_like" v-model:limit="params._limit">
    </PostFilter>

    <hr class="my-4" />

    <AppLoading v-if="loading"></AppLoading>

    <AppError v-else-if="error" :message="error.message"></AppError>

    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      ></AppPagination>
    </template>

    <!-- <AppModal v-model="show" :show="show" title="게시글" @close="closeModal"> -->
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      >
      </PostModal>
    </Teleport>

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostFilter from '@/components/posts/PostFilter.vue'
import PostModal from '@/components/posts/PostModal.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLoading from '@/components/app/AppLoading.vue'

import { useAxios } from '@/hooks/useAxios'

const router = useRouter()

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
})

// pagination
const totalCount = computed(() => response.value.headers['x-total-count'])

const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit)
})

const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params })

// const fectchPosts = async () => {
//   try {
//     loading.value = true
//     // ({ data: posts.value } = await getPosts())
//     const { data, headers } = await getPosts(params.value)
//     posts.value = data
//     // console.dir(data)
//     totalCount.value = headers['x-total-count']
//     // console.log('response: ', response)
//   } catch (err) {
//     console.log('error:', err)
//     error.value = err
//   } finally {
//     loading.value = false
//   }
// }

// 이렇게 하면 fetchPosts함수내의 반응형 데이터가 변경이되면
// 해당 콜백함수 (fetchPosts)를 다시 실행한다.
// watchEffect(fectchPosts)

const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
    query: {
      searchText: 'hello',
    },
    hash: '#world',
  })
}

// modal
const show = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const modalCreatedAt = ref('')
const openModal = ({ title, content, createdAt }) => {
  show.value = true
  ;(modalTitle.value = title),
    (modalContent.value = content),
    (modalCreatedAt.value = createdAt)
}
</script>

<style lang="scss" scoped></style>
