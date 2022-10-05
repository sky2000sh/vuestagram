import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            // 데이터(= state)를 보관하고 싶다면 여기에 변수명 줘서 저장하면 된다.
            // 예) name : 'kim'
            name : 'LEE'

        }
    },
})

export default store