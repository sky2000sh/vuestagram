<template>
    <div>
        <!-- <Post :postData="postData[0]"/>
        <Post :postData="postData[1]"/>
        <Post :postData="postData[2]"/> -->
        <Post :postData="postData[i]" v-for="(a,i) in postData" :key="i"/>
    </div>
</template>

<script>
import Post from './Post'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Container',
    components: {
        Post : Post
    },

    props : {
        postData : Object,
    }
}
</script>

<style>

</style>