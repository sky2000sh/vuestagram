<template>
    <div>
        <Post/>
        <Post/>
        <Post/>
    </div>
</template>

<script>
import Post from './Post'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Container',
    components: {
        Post : Post
    }
}
</script>

<style>

</style>