<template>
    <div class="sidebar-container">
        <RadioGroup v-model="isCollapse" style="margin-bottom: 20px;">
            <RadioButton :label="false">展开</RadioButton>
            <RadioButton :label="true">收起</RadioButton>
        </RadioGroup>
        <el-menu
            default-active="overview.html"
            @select="handleSelect"
            mode="vertical"
            background-color="#304156"
            text-color="#bfcbd9"
            @open="handleOpen"
            @close="handleClose"
            :default-openeds="default_openeds_array"
            active-text-color="#ffd04b">
            <RecursiveMenu v-for="(menu,index) in menuList" :key="menu.url+index" :item="menu"/>
        </el-menu>
    </div>
</template>

<script>
import {RadioGroup, RadioButton, Menu} from 'element-ui'
import RecursiveMenu from './recursiveMenu'
export default {
    name: 'MenuList',
    props:{
        menuList:{
            type: Array,
            require: true
        }
    },
    components:{
        RadioGroup, RadioButton,
        [Menu.name]:Menu,
        RecursiveMenu
    },
    data(){
      return {
          isCollapse: false,
          default_openeds_array: ['overview.html']
      }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted(){
        this.$emit('callBack', ['a','b']);
    }
}
</script>

<style lang="stylus">
.sidebar-container
    height 6rem

    .scrollbar-wrapper
        height 100%
        overflow-x hidden

</style>