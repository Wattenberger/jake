import "babel-core/register"
import "babel-polyfill"
import "./styles/style.less"
import Vue from "vue"
import App from "./components/app.vue"
import Home from "./components/Home.vue"
import Publications from "./components/Publications.vue"
import Page404 from "./components/404.vue"
import CV from "./components/CV.vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
  { path: '/', 			   component: Home,			name: "home" },
  { path: '/publications', component: Publications, name: "publications" },
  { path: '/cv',           component: CV          , name: "cv"           },
  { path: '*', 			   redirect: "/" },
]


const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next();
})

new Vue({
  el: '#app',
  components: {App},
  router,
})

// import {questions} from "./questions"
//
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
//
// const routes = [
//   { path: '/foo', component: Foo, name: "foo" },
//   { path: '/bar', component: Bar, name: "bar" }
// ]
//
// const router = new VueRouter({
//   routes
// })
//
// var app = new Vue({
//   router,
//   el: '#app',
//   data: {
//     questions
//   },
//   components: {
//   }
// })
//
//
// Vue.component('qa-question', {
//   props: ['question'],
//   data: () => ({
//     showing: false,
//   }),
//   methods: {
//   },
//   template: '<li v-on:click="showing = !showing">{{ question.q }}<div v-if="!!showing">{{ question.a }}</div></li>'
// })
//
// Vue.component('qa', {
//   props: ['questions'],
//   data: () => ({
//   }),
//   methods: {
//   },
//   template: '<qa v-for="q in questions" :question="q" />'
// })
//
// Vue.component('app-nav', {
//   props: [],
//   template: '<div>nav</div>'
// })
//
// Vue.component('app-content', {
//   props: [],
//   template: '<div>content<slot /></div>'
// })
//
// Vue.component('app-view', {
//   props: [],
//   template: '<div>view<slot /></div>'
// })
