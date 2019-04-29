<template>
<div class="add" @click="handleClick">
+   
</div>    
</template>
<script>
export default {
    name:'addNews',
    methods:{
        handleClick(){
            // 进入发布动态页面
                  this.$router.push('/addnews');

        }
    }
}
</script>
<style scoped>
    .add{
        height: 50px;
        width: 50px;
        border-radius: 30px;
        background-color: #55efc4;
        color:#fff;
        text-align: center;
        line-height: 50px;
        position:absolute;
        z-index: 10;
        right:10px;
        bottom: 20px;
        font-size:36px;
    }
</style>
