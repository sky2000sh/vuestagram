<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <h4> Bonjour, {{ $store.state.name }} </h4>
  <h4> 당신은 {{ $store.state.age }} 세 입니다.</h4>
  <!-- <button @click="$store.state.name = 'PARK' "> 버튼 </button>
  이것도 가능하지만 컴포넌트 안에서 직접 수정 금지 => vuex 국룰   -->

  <button @click="$store.commit('changeName')"> 이름변경 </button>
  <!-- 그래서 store.js 에게 수정부탁을 하려면,
        $store.commit('함수명') 으로 작성가능하다.   -->
  <button @click="$store.commit('changeAge')"> 나이변경 </button>
  <!-- <button @click="$store.commit('changeAge', 10)"> 나이변경 </button> -->
  <!-- 아래 버튼 태그는 ...mapMutations([]) 를 사용했을 때 사용할 수 있는 간단한 함수명 명령법 -->
  <!-- <button @click="changeAge()"> 나이변경 </button> -->
  

  <p> {{ $store.state.more }} </p>
  <button @click="$store.dispatch('getData')">더보기 버튼</button> 


  <Container @write="writings = $event" :images="images" :postData="postData" :step="step" />
  <button @click="more">더보기</button>

  <!-- 22.10.06 <computed:{}와 methods:{}와의 비교 관계> -->
  <!-- now1() => methods:{} 안에 있는 함수는 () 괄호까지 포함해서 기입해주기 -->
  <!-- <p> {{now1()}} {{counter}} </p> -->
  <!-- now2 => computed:{} 안에 있는 함수는 () 괄호는 뺀 함수명만 기입해주기 -->
  <!-- <p> {{now2}} {{counter}} </p> -->
  <!-- <button @click="counter++">now버튼</button> -->
  <!-- <p> {{ name }} </p> -->
  <p> ...mapState의 object으로 넣었을 때 : {{ name }} {{ age }} {{ likes }}</p>
  <p> ...mapState의 object으로 넣고 작명했을 때 : {{ myName }} {{ myAge }} {{ myLikes }}</p>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <!-- @change="upload" multiple => 을 사용하면 이미지를 한개뿐아니라 여러개를 shift를 사용해서 선택할 수 있는 명령어 -->
      <!-- accept="image/*" 이미지만 받겠습니다 => 사실상 모든 파일들을 업로드할 수 있기 때문에 실질적인 해결방법은 아니다. -->
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->

</template>

<script>
import Container from './components/Container'
import postdata from './assets/postdata'

// 2022년 8월 8일 yarn add axios 추가
import axios from 'axios'

// 2022년 10월 5일 yarn add mitt 추가
// 추가 후, main.js에 import 추가해줬음

// vuex 설치
// 2022년 10월 5일 yarn add vuex@next --save 추가해서 vuex4를 설치
// 추가 후, src폴더 안에 store.js 파일을 생성했음 (파일 명은 임의지만 보면 store)
// 추가 후, main.js에 import store 추가해줬음

// 2022년 10월 6일 vuex state를 위한 ...mapState를 사용하기
import {mapMutations, mapState} from 'vuex'


export default {
  name: 'App',
  components: {
    Container : Container
  },

  data() {
    return {
      postData : postdata,
      step : 0,
      images : '',
      writings : '',
      selectedFilter : '',

      counter : 0,
    }
  },

  // methods:{} 처럼 함수들을 만들 때.
  // methods:{} 처럼 함수들 집합이지만 페이지 로딩 후에 한번 함수진행을 하고 두번 다시 결과를 내놓지 않는다.
  // => 계산결과 저장용으로 쓰여지는 함수들의 집합체이다.
  // computed:{} 는 반드시 return 타입을 제시해서 마쳐야한다.
  computed: {
    // 예시
    // now2() {
    //   return new Date()
    //   // new Date() => 현재 시간을 알려준다.
    // },

    name() {
      return this.$store.state.name
    },

    // vuex state를 여러개를 나누지 않고 한번에 꺼내쓰려면
    // ...mapState 를 사용한다.
    // ...mapState를 사용하기 위해선 import가 선행되어야 한다.
    ...mapState(['name', 'age', 'likes', 'pushedLike']),

    // ...mapState() 에는 object 자료를 넣을 수도 있다.
    ...mapState({ myName : 'name', myAge : 'age', myLikes : 'likes'}),
  },

  // 22년 10월 5일 mitt 라이브러리를 활용해 mounted()에 데이터를 넘기기
  mounted() {
    this.emitter.on('sendFilter', (a) => {
      // console.log('여기 app.vue의 a :', a)
      this.selectedFilter = a 
    })
  },

  // 함수들을 만들 때.
  methods: {

    // 2022년 10월 6일 vuex mutations 함수(store.js안에 있음)들을 한번에 꺼내 쓰려면
    // ...mapMutations(['함수명']) 을 기입한다.
    // 이렇게 되면 $store.commit 명령어를 직접 치지 않아도 된다.
    ...mapMutations(['setMore', '좋아요', 'changeAge']),

    more() {
      axios.get('https://codingapple1.github.io/vue/more0.json').then(
        // function(param) {
        //   param
        //   console.log('이 data는? :', param.data)
        // }
        // 위 function 함수와 아래 애로우 함수는 같은 것이다.
        // 애로우 함수의 장점은 소괄호에 들어가는 파라미터가 한 개뿐이라면 괄호 생략이 가능하다. 즉 그저 param =>
        (param)=> {
          param
          console.log('이 data는? :', param.data)
          this.postData.push(param.data)
        }
      )

      // axios 개발 몇가지 더!
      // post() 함수 => 내가 요청한 데이터를 전송하게 해준다.
      let url = 'https://codingapple1.github.io/vue/more0.json'
      axios.post(url, {name : 'kim'})
      .then(
        console.log('여기는 성공!!!')
      )
      .catch(
        // (err)=> {
        //   err
        //   console.log('이 err? :', err)
        // }
        console.log('여기는 실패!!!')
      )
      // 위의 요청이 성공시는 then()   /   실패시는 catch() 함수에 메시지를 담는다.
    },

    upload(e) {
      let fileName = e.target.files

      let url = URL.createObjectURL(fileName[0])
      console.log(url)

      //console.log(fileName[0].type);
      //console.log(fileName);
      //console.log(fileName[0]);
      // FileList {0: File, length: 1}
      //0 : File {name: '스크린샷 2022-07-26 오후 6.58.51.png', lastModified: 1658829533991, lastModifiedDate: Tue Jul 26 2022 18:58:53 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 1592590, …}
      //length : 1
      //[[Prototype]] : FileList

      this.images = url

      // 다음 스텝(이미지 페이지)으로 넘어가기
      this.step++
    },

    publish() {
      let myPosts = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.images,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.writings,
        //filter: "perpetua"
        filter: this.selectedFilter
      }
      this.postData.unshift(myPosts)  // unshift => 왼쪽에 array에 자료를 집어넣어준다.
      this.step = 0
    },

    now1() {
      return new Date()
      // new Date() => 현재 시간을 알려준다.
    },
    
  },

  
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
