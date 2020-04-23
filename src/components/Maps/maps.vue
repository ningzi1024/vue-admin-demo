<template>
    <div class="map_wrap">
        <div ref="myEchart" style="width:100%; height:420px;" ></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'

export default {
    name: 'map',
    data(){
        return {
            chart: null
        }
    },
    mounted() {
       this.initEchartMap();
    },
    methods:{
        initEchartMap(){
            let myChart = echarts.init(this.$refs.myEchart);
            window.onresize = myChart.resize;
            myChart.setOption({
                backgroundColor: '#0b1225',
                tooltip:{
                    trigger: 'item'
                }
            })
        }
    }
}
</script>

<style lang="stylus">

</style>