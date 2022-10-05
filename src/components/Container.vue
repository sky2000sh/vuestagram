<template>
    <div>
        <!-- <Post :postData="postData[0]"/>
        <Post :postData="postData[1]"/>
        <Post :postData="postData[2]"/> -->
        <div v-if="step == 0">
            <Post :postData="postData[i]" v-for="(a,i) in postData" :key="i"/>
        </div>

        <div v-if="step == 1">
            <!-- 필터선택페이지 -->
            <div class="upload-image" :style="`background-image:url(${images})`"></div>
            <div class="filters">
                <!-- <div class="filter-1"></div>
                <div class="filter-1"></div>
                <div class="filter-1"></div>
                <div class="filter-1"></div>
                <div class="filter-1"></div> -->

                <FilterBox :filters="filters" :images="images" v-for="(filters,i) in filters" :key="i">
                    <!-- slot 방법으로 부모 -> 자식간 데이터 전송법
                        1. 먼저, 자식 페이지에서는 <slot></slot>으로 구멍을 뚫어놓기
                        2. 다음, 부모 페이지에서는 <component 컴포넌트> 태그 사이에 데이터를 넣기 
                        *** slot 방법은 반드시 태그 안에서 데이터바인딩할 때만 가능하다 -> 그래서 보통 html 내용물을 전달하고 싶을때 유용하다.
                        *** slot 방법은 속성 즉, 예) <div ....... > 이 부분 안에서 slot 사용이 불가능하다.
                        *** 그래서 slot이 props보다 편하고 직관적이지만 각기 사용법이 다르다. -->
                    {{filters}}

                    <!-- slot 여러개 사용하는 법
                        1. 자식 페이지
                        <slot name="a"></slot>
                        <slot name="b"></slot>
                        <slot name="c"></slot>

                        2. 부모 페이지
                        <template v-slot:a> 데이터1 </template>
                        <template v-slot:b> 데이터2 </template> -->
                </FilterBox>
            </div>
        </div>

        <div v-if="step == 2">
            <!-- 글작성페이지 -->
            <div class="upload-image" :style="`background-image:url(${images})`"></div>
            <div class="write">
                <!-- 일단 유저가 입력한 글을 거기 집어넣으려면 일단 유저가 입력한 글은 Container.vue에 있습니다.
                    거기 <textarea>에 입력할 수 있는게 거기 입력한 글을 App.vue로 보내려면
                    저는 다음과 같이 커스텀이벤트 문법으로 App.vue에게 사용자가 입력한 글을 전송했습니다.  -->
                <textarea @input="$emit('write', $event.target.value)"
                            class="write-box"> write! </textarea>
            </div>
        </div>

    </div>
</template>

<script>
import Post from './Post'
import FilterBox from './FilterBox'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Container',
    components: {
        Post : Post,
        FilterBox : FilterBox
    },

    props : {
        postData : Object,
        step : Number,
        images : String,
    },

    data() {
        return {
            filters : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        }
    }
}
</script>

<style>
.upload-image{
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size : cover;
}
.filters{
    overflow-x:scroll;
    white-space: nowrap;
}
.filter-1 {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color : white;
    background-size: cover;
}
.filters::-webkit-scrollbar {
    height: 5px;
}
.filters::-webkit-scrollbar-track {
    background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
.write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
}
</style>