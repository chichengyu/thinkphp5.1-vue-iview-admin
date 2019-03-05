<template>
    <div class="roule">
        <span class="txt">切换角色：</span>
        <ButtonGroup>
            <Button @click="changeRolue">admin</Button>
            <Button @click="changeRolue">editor</Button>
        </ButtonGroup>
        <div style="margin-top: 5%;font-size: 16px;">点击按钮切换角色</div>
        <h3 style="margin-top: 10%">当前角色：{{ rule }}</h3>
    </div>
</template>

<script>
    export default {
        name: "index",
        computed:{
            rule (){
                if (Array.isArray(this.$store.getters.rules)){
                    return this.$store.getters.rules[0]
                }
                return this.$store.getters.rules
            }
        },
        methods:{
            changeRolue (e) {
                var rule = '';
                if (e.target.children.length){
                    rule = e.target.children[0].innerHTML
                }else {
                    rule = e.target.innerHTML
                }
                this.$store.commit('rules',rule)
            }
        }
    }
</script>

<style lang="scss" scoped>
.roule{
    width: 100%;
    hieght:100%;
    padding: 2% 2% 12%;
    background: #fff;
    font-size: 22px;

}
</style>