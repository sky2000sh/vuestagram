<template>
    <div class="post">
        <div class="post-header">
            <!-- 프로필 사진 -->
            <div class="profile"></div>
            <span class="profile-name">{{postData.name}}</span> <!-- ChanKim --> 
        </div>
        <!-- 포스팅 사진 -->
        <!-- :style=" ~~ " 집어넣을 때 object 자료도 가능 -->
        <!-- 백틱( `` ) 기호로 문자를 만들면 `문자${변수}문자`  가 가능해진다. -->
        <div class="post-body" :style="{ backgroundImage : `url(${postData.postImage})` }"></div>
        <div class="post-content">
            <p>{{postData.likes}}</p>
            <p><strong>{{postData.name}}</strong> {{postData.content}}</p>
            <p class="date">{{postData.date}}</p>
        </div>
    </div> 
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: 'Post',
    components: {

    },

    props : {
        postData : Object
    }
}
</script>

<style>
.post {
    width: 100%;
}
.profile {
    background-image: url("https://placeimg.com/100/100/arch");
    width: 30px;
    height: 30px;
    background-size: 100%;
    border-radius: 50%;
    float: left;
}
.profile-name {
    display: block;
    float: left;
    padding-left: 10px;
    padding-top: 7px;
    font-size: 14px;
}
.post-header {
    height: 30px;
    padding: 10px;
}
.post-body {
    background-image: url("https://placeimg.com/640/480/animals");
    height: 450px;
    background-position: center;
    background-size: cover;
}
.post-content {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
}
.date {
    font-size: 11px;
    color: grey;
    margin-top: -8px;
}
</style>