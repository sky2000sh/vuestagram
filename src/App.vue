<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li>Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :postData="postData"/>
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from './components/Container'
import postdata from './assets/postdata'

// 2022년 8월 8일 yarn add axios 추가
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Container : Container
  },

  data() {
    return {
      postData : postdata
    }
  },

  methods: {

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
      let url = 'https://codingapple1.github.io/vue/more0.jso'
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
    }
    
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
