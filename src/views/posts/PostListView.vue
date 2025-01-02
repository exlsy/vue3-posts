<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter v-model:title="params.title_like" v-model:limit="params._limit">
    </PostFilter>

    <hr class="my-4" />
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
    <!-- <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div> -->

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="page => (params._page = page)"
    ></AppPagination>

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
// import AppCard from '@/components/app/AppCard.vue'
// import AppPagination from '@/components/app/AppPagination.vue'
// import AppGrid from '@/components/app/AppGrid.vue'
// import AppModal from '@/components/AppModal.vue'
import PostFilter from '@/components/posts/PostFilter.vue'
import PostModal from '@/components/posts/PostModal.vue'
import { getPosts } from '@/api/posts'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const posts = ref([])
const router = useRouter()
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
})

// pagination
const totalCount = ref(0)

const pageCount = computed(() => {
  return Math.ceil(totalCount.value / params.value._limit)
})

const fectchPosts = async () => {
  try {
    // ({ data: posts.value } = await getPosts())
    const { data, headers } = await getPosts(params.value)
    posts.value = data
    // console.dir(data)
    totalCount.value = headers['x-total-count']

    // console.log('response: ', response)
  } catch (error) {
    console.log('error:', error)
  }
}

// 이렇게 하면 fetchPosts함수내의 반응형 데이터가 변경이되면
// 해당 콜백함수 (fetchPosts)를 다시 실행한다.
watchEffect(fectchPosts)

const goPage = id => {
  // router.push(`/posts/${id}`)
  // http://localhost:5173/posts/2?searchText=hello#world
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
// const closeModal = () => {
//   show.value = false
// }
</script>

<style lang="scss" scoped></style>
