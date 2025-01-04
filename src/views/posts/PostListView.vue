<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading"></AppLoading>

    <AppError v-else-if="error" :message="error.message"></AppError>

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
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

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
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

const previewId = ref(null)
const selectPreview = id => {
  previewId.value = id
}

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
})

const changeLimit = value => {
  params.value._limit = value
  params.value._page = 1
}

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

const isExist = computed(() => {
  return posts.value && posts.value.length > 0
})

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
