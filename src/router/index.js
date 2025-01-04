import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PostCreateView from '@/views/posts/PostCreateView.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostListView from '@/views/posts/PostListView.vue'
import PostEditView from '@/views/posts/PostEditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NestedView from '@/views/nested/NestedView.vue'
import NestedHomeView from '@/views/nested/NestedHomeView.vue'
import NestedOneView from '@/views/nested/NestedOneView.vue'
import NestedTwoView from '@/views/nested/NestedTwoView.vue'
import MyPage from '@/views/MyPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    // 동적 라우팅
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true,
    // props: route => {
    //   return {
    //     id: parseInt(route.params.id),
    //     other: route.query.searchText,
    //   }
    // },
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/nested',
    name: 'Nosted',
    component: NestedView,
    children: [
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView,
      },
      {
        path: 'one',
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
    ],
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
    // beforeEnter: (to, from) => {
    //   // console.log('to: ', to)
    //   // console.log('from: ', from)
    //   // return false
    //   // return { name: 'Home' }
    //   console.log('to.query: ', to.query)
    //   return removeQueryString(to)
    // },
    beforeEnter: [removeQueryString],
  },
]

function removeQueryString(to) {
  if (Object.keys(to.query).length > 0) {
    console.log('to.query: ', to.query)
    return { path: to.path, query: {} }
  }
}

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHistory('/base'),
  // history: createWebHashHistory(),
  routes: routes,
})

// 네비게이션 가드 : 전역가드
// router.beforeEach((to, from) => {
//   console.log('to: ', to)
//   console.log('from: ', from)

// 선택적으로 다음 값 중 하나를 반환할 수 있습니다.
// false: 현재 라우팅(네비게이션)을 취소합니다.
// 경로 위치를 반환하여 다른 위치로 리다이렉션할 수 있습니다.
// 이때 전달될 값은 `router.push()`를 호출할 때와 같은 값을 내보내면 됩니다.
// if (to.name === 'MyPage') {
// return false
// router.push({name: 'Home'})
// return { name: 'Home' }
// return '/posts'
// }
// })

export default router
