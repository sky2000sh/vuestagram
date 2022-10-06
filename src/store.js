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
        }
    },

    // mutations => state 수정하는 방법을 정의하는 곳
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
    },
})

export default store