<template>
    <div :class="filters" class="filter-item" :style="`background-image:url(${images})`">
        <!-- :class="filters + ' filter-item'" => 이것도 역시 같은 명령어 -->
        <slot></slot>
        <!-- slot 방법으로 부모 -> 자식간 데이터 전송법
            1. 먼저, 자식 페이지에서는 <slot></slot>으로 구멍을 뚫어놓기
            2. 다음, 부모 페이지에서는 <component 컴포넌트> 태그 사이에 데이터를 넣기 
            *** slot 방법은 반드시 태그 안에서 데이터바인딩할 때만 가능하다 -> 그래서 보통 html 내용물을 전달하고 싶을때 유용하다.
            *** slot 방법은 속성 즉, 예) <div ....... > 이 부분 안에서 slot 사용이 불가능하다.
            *** 그래서 slot이 props보다 편하고 직관적이지만 각기 사용법이 다르다. -->

        <!-- slot 여러개 사용하는 법
            1. 자식 페이지
            <slot name="a"></slot>
            <slot name="b"></slot>
            <slot name="c"></slot>

            2. 부모 페이지
            <template v-slot:a> 데이터1 </template>
            <template v-slot:b> 데이터2 </template> -->
    </div>
    
</template>

<script>
export default {
    name: 'FilterBox',

    props: {
        images : String,
        filters : Object,
    }
}
</script>

<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color : white;
    background-size: cover;
    background-position : center;
}
</style>