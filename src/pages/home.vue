<template>
    <div class="home-wrap">
        <div class="sider">
            <RadioGroup v-model="isCollapse" style="margin-bottom: 20px;">
                <RadioButton :label="false">展开</RadioButton>
                <RadioButton :label="true">收起</RadioButton>
            </RadioGroup>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="tabs">

        </div>
    </div>
</template>

<script>
//import Mapper from '../components/Maps/maps'
import service from '../services/services'
import { RadioGroup, RadioButton, Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
import cache from '../utils/cache'

export default {
    name: 'home',
    components:{
        RadioGroup, RadioButton,
        'el-menu': Menu,
        'el-submenu': Submenu,
        'el-menu-item-group': MenuItemGroup,
        'el-menu-item': MenuItem
    },
    data(){
        return {
            areas: [],
            isCollapse: false
        }
    },
    mounted() {
        service.menus().then(res=>{
            console.log(res);
            //{"list":[{"name":"总览","url":"overview.html","icon":"home","target":"main","children":[]},{"name":"站点管理","url":"station.html","icon":"cabinet","target":"main","children":[]},{"name":"站点分布","url":"map.html","icon":"map","target":"main","children":[]},{"name":"能耗管理","url":"energy.html","icon":"data-pie","target":"main","children":[]},{"name":"工单管理","url":"","icon":"data-table","target":"main","children":[{"name":"工单统计","url":"workorder_statistics.html","icon":"","target":"main","children":[]},{"name":"工单报表","url":"workorder_report.html","icon":"","target":"main","children":[]}]},{"name":"智能控制","url":"http://demo.gd3n.com/api/v1/redirect?token=MjFmNzg2YWFlN2FlZmEzOWEzNDA3MjIwOGI2NWYwNTU=&url=/public/ui/control/index.html","icon":"monitor","target":"main","children":[]},{"name":"资产管理","url":"http://demo.gd3n.com/asset/tp5/public/index/asset/index.html","icon":"asset-management","target":"main","children":[]},{"name":"安防","url":"","icon":"camera","target":"main","children":[{"name":"门禁","url":"access_control.html","icon":"","target":"main","children":[]},{"name":"视频","url":"video_live.html?modules=systemSetting&child=videolive_spe","icon":"","target":"main","children":[]}]},{"name":"数据报表","url":"","icon":"data-bar","target":"main","children":[{"name":"实时报表","url":"data_list.html","icon":"","target":"main","children":[]},{"name":"历史报表","url":"history_list.html","icon":"","target":"main","children":[]}]},{"name":"告警处理","url":"alarm.html","icon":"tool","target":"main","children":[]},{"name":"日志管理","url":"","icon":"host","target":"main","children":[{"name":"用户操作记录","url":"system_log_user.html","icon":"","target":"main","children":[]},{"name":"通知日志","url":"system_log_notification.html","icon":"","target":"main","children":[]},{"name":"告警日志","url":"system_log_alarm.html","icon":"","target":"main","children":[]}]},{"name":"配置","url":"","icon":"setup","target":"main","children":[{"name":"设备管理","url":"","icon":"","target":"main","children":[{"name":"站点","url":"table_tem.html?modules=settingManagement&child=device_groups","icon":"","target":"main","children":[]},{"name":"设备","url":"table_tem.html?modules=settingManagement&child=devices","icon":"","target":"main","children":[]},{"name":"监控项","url":"table_tem.html?modules=settingManagement&child=items","icon":"","target":"main","children":[]}]},{"name":"人员管理","url":"","icon":"","target":"main","children":[{"name":"登录用户","url":"table_tem.html?modules=personnelManagement&child=users","icon":"","target":"main","children":[]},{"name":"用户组","url":"setting_user_ground.html?modules=personnelManagement&child=user_groups","icon":"","target":"main","children":[]},{"name":"权限组","url":"table_tem.html?modules=personnelManagement&child=authority_groups","icon":"","target":"main","children":[]},{"name":"联系人组","url":"table_tem.html?modules=personnelManagement&child=contact_groups","icon":"","target":"main","children":[]},{"name":"联系人","url":"table_tem.html?modules=personnelManagement&child=contacts","icon":"","target":"main","children":[]}]},{"name":"时间管理","url":"","icon":"","target":"main","children":[{"name":"服务器时间","url":"server_time.html?modules=timeManagement&child=server_time","icon":"","target":"main","children":[]},{"name":"时间段","url":"table_tem.html?modules=timeManagement&child=week_time","icon":"","target":"main","children":[]}]},{"name":"端口管理","url":"","icon":"","target":"main","children":[{"name":"网络接口","url":"setting_IP.html?modules=portManagement&child=network_port","icon":"","target":"main","children":[]},{"name":"硬件串口","url":"table_tem.html?modules=portManagement&child=serial_Port","icon":"","target":"main","children":[]}]},{"name":"系统管理","url":"","icon":"","target":"main","children":[{"name":"备份还原","url":"setting_restore.html?modules=systemSetting&child=restore","icon":"","target":"main","children":[]},{"name":"后台服务","url":"setting_service.html?modules=systemSetting&child=service","icon":"","target":"main","children":[]},{"name":"系统信息","url":"","icon":"","target":"main","children":[]},{"name":"系统语言","url":"setting_global.html?modules=systemSetting&child=global_setting","icon":"","target":"main","children":[]}]},{"name":"告警管理","url":"","icon":"","target":"main","children":[{"name":"告警参数","url":"setting_alarm_param.html?modules=systemSetting&child=warning_param","icon":"","target":"main","children":[]},{"name":"告警等级","url":"table_tem.html?modules=systemSetting&child=warning_level","icon":"","target":"main","children":[]}]},{"name":"扩展功能","url":"","icon":"","target":"main","children":[{"name":"自定义菜单","url":"table_tem.html?modules=extensionsManagement&child=custom_menu","icon":"","target":"main","children":[]},{"name":"能耗参数","url":"setting_energy_consumption.html?modules=extensionsManagement&child=energy_consumption_params","icon":"","target":"main","children":[]},{"name":"GIS参数","url":"setting_GIS.html?modules=extensionsManagement&child=GIS_param","icon":"","target":"main","children":[]},{"name":"门禁集成","url":"","icon":"","target":"main","children":[]},{"name":"视频集成","url":"","icon":"","target":"main","children":[]},{"name":"大屏参数","url":"/examples/grapheditor/www/index.html","icon":"","target":"main","children":[]},{"name":"二次开发","url":"","icon":"","target":"main","children":[]},{"name":"软件版本信息","url":"software_version.html?modules=extensionsManagement&child=software_version","icon":"","target":"main","children":[]}]},{"name":"联动管理","url":"table_tem.html?modules=systemSetting&child=linkage","icon":"","target":"main","children":[]},{"name":"动作管理","url":"table_tem.html?modules=systemSetting&child=action_setting","icon":"","target":"main","children":[]},{"name":"定时任务","url":"table_tem.html?modules=systemSetting&child=setting_time","icon":"","target":"main","children":[]}]},{"name":"知识库","url":"","icon":"reader","target":"","children":[{"name":"使用文档","url":"/public/files/Manual.pdf","icon":"","target":"main","children":[]},{"name":"常见问题","url":"/static/knowledge_base/#/zh/","icon":"","target":"main","children":[]}]},{"name":"大屏展示","url":"","icon":"big-screen","target":"main","children":[{"name":"档案库房展示","url":"/static/datacenter/index.html","icon":"","target":"_blank","children":[]},{"name":"IDC机房展示","url":"/static/devicemanger/index.html","icon":"","target":"_blank","children":[]}]}]}
            cache.user = JSON.stringify(res);
            this.$store.state.menuList = res.list;
        })
    },
    methods:{
        handleOpen(){},
        handleClose(){}
    }
}
</script>

<style lang="stylus">
.home-wrap
    width 100%
    height 500px
    background #eee

    .sider
        width 200px;

</style>