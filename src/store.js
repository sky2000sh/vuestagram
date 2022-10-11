import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            // 데이터(= state)를 보관하고 싶다면 여기에 변수명 줘서 저장하면 된다.
            // state 변경은 오직 store.js에서만 한다. => 이제 state가 이상하다면 store.js만 살펴봐도 된다.
            // 예) name : 'kim'
            name : 'LEE',
            age : 20,
            likes : 30,
            likesPlurial : [30, 40, 50],
            pushedLike : false,  // 현재 상태를 저장하는 곳
            pushedLikePlurial : [false, false, false],  // 현재 상태를 저장하는 곳
            more : {},
        }
    },

    // mutations => state 수정(변경)하는 방법을 정의하는 곳!
    mutations : {
        changeName(state) {
            state.name = 'PARK'
        },

        changeAge(state) {
            // state.age = '40'
            // state.age = state.age + 1
            state.age++
        },
        // changeAge(state, index) {
        //     // state.age = '40'
        //     // state.age = state.age + 1
        //     state.age += index  //  => 이러면 나이변경하는 10만큼씩 계속 증가한다.
        // },

        like(state) {
            if(state.pushedLike == false) {
                state.likes++
                state.pushedLike = true
            } else {
                state.likes--
                state.pushedLike = false
            }
        },

        setMore(state, param) {
            state.more = param
        },
    },

    // actions => 서버에서 ajax를 통해 전달되는 곳!
    // 다른 vue 파일에 ...mapActions()를 사용할 수도 있다. => 한개씩 주고받는게 아닌 여러개를 꺼내쓰기 위함임.
    actions : {
        getData(context) {
            axios.get('https://codingapple1.github.io/vue/more0.json')
            .then( (a) => {
                console.log('여기 a.data는 : ', a.data)
                //a.data

                // commit을 쓰기 위해서는 getData() 함수의 파라미터 안에 context를 기입해준다.
                context.commit('setMore', a.data)

            })
        },
    }
})

export default store