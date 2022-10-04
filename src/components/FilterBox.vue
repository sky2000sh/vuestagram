<template>
    <div :class="filters" class="filter-item" :style="`background-image:url(${images})`"></div>
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