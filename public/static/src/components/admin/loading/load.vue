<template>
    <div class="loading" v-if="isSshow" >
        <Spin size="large" fix></Spin>
        <div class="loading-txt" align="center" fix>Loading</div>
    </div>
</template>

<script>
    export default {
        name: "load",
        props:['isSshow'],
    }
</script>

<style lang="stylus" scoped>
.loading-txt{
    position: absolute;
    top: 53%;
    width: 100%;
    color: #5a89f3;
    z-index: 999;
}
</style>