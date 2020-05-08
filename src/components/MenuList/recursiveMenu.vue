<template>
<div v-if="item.children">
    <template v-if="item.children.length == 0">
        <el-menu-item :index="item.url">
          <i class="el-icon-menu"></i>
          <span>{{item.name}}</span>
        </el-menu-item>
    </template>
    <el-submenu v-else :index="item.url">
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item.name}}</span>
        </template>
        <template v-for="(child,i) in item.children">
            <RecursiveMenu v-if="child.children && child.children.length>0" :key="child.url+i" :item="child"/>
            <el-menu-item v-else :key="child.url+i" :index="child.url">
                <i class="el-icon-location"></i>
                <span>{{child.name}}</span>
            </el-menu-item>      
        </template>
    </el-submenu>
    
</div>
</template>

<script>
import { MenuItem, Submenu } from 'element-ui'
export default {
    name: 'RecursiveMenu',
    props:{
        item:{
            type: Object,
            required: true
        }
    },
    components:{
        'el-menu-item': MenuItem,
        'el-submenu': Submenu
    }
}
</script>