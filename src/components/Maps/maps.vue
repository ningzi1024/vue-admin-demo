<template>
  <div class="myEchart" ref="myEchart" style="width:100%; height:500px;"></div>
</template>

<script>
import api from '../../services/apiMethods'
import echarts from 'echarts'
export default {
    name: 'myEchart',
    data(){
        return {
            MAIN_MAP: null,
            mapDataList: null
        }
    },

    created(){
    },

    mounted(){
        this.MAIN_MAP = echarts.init(this.$refs.myEchart);
        console.log(echarts);
        // this.test();
    },

    methods:{

        getJson(code){
            return api.get(`/public/ui/map/json/${code}.json`);
        },

        test(){
          this.getJson('china').then(res=>{
            console.log(res);
          })

        }
    }

}
</script>

<style>

</style> 