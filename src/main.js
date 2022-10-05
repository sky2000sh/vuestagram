import { createApp } from 'vue'
import App from './App.vue'
// mitt 라이브러리를 추가해주기 (22/10/05) => mitt 라이브러리 setting
import mitt from 'mitt'
let emitter = mitt()
let app = createApp(App)
app.config.globalProperties.emitter = emitter
// app.config.globalProperties.  =>  글로벌한 광역 변수보관함

// 이런 곳에, 자주쓰는 axios 이런것도 보관하면 편리하다. import 안해와도 axios.get을 할 수 있다.
// => app.config.globalProperties.axios = axios
// 다만 this.axios.get 이렇게 명령어를 쳐야한다.
// => 즉, 부모/형제 vue 파일에서 import axios 할 필요 없이 this.axios.get / this.axios 로 사용이 가능하다.

// vuex 라이브러리를 추가해주기 (22/10/05) => vuex 라이브러리 setting
import store from './store.js'

// createApp(App).mount('#app') => 맨 밑에 있던 이거 대신 (22/10/05)
// app.mount('#app')  // 이렇게 바꾼 이유는 line 6에 createApp속성을 변수로 담았기 때문.
app.use(store).mount('#app')
