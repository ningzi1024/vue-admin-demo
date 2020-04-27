<template>
    <div class="map-wrap">
        <div ref="myEchart" style="width:100%; height:500px;" ></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import services from '../../services/services'


export default {
    name: 'map',
    data(){
        return {
            chinaMap: null,
            chart: null,
            echarts:echarts,
            myChart: null,
            point : {
                name: '坐标点',
                type: 'scatter',
                zlevel: 5,
                symbol: 'pin',
                symbolSize: 30,
                coordinateSystem: 'geo',
                hoverAnimation: true,
                silent: false,
                rippleEffect: { scale: 5, brushType: 'stroke' },
                label: { normal: { show: false, position: 'right', formatter: '{b}' } },
                tooltip: { formatter: '{b}' },
                coordinateList:'',
                mapData: '',
            },
            mapData: [],
            positionList: []
        }
    },
    created(){        
        this.getChinaJson();
        this.initMap();
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.myEchart);
        

        if(this.chinaMap)
            this.test();
        //    this.initEchartMap();
    },
    watch:{
        chinaMap(newVal){
            if(newVal)
                this.test();
        }
    },
    methods:{
        getChinaJson(){
            let url = 'https://data.jianshukeji.com/geochina/china.json';
            axios.get(url).then(res=>{
                let data = res.data;
                // console.log(data);
                this.chinaMap = data;
            });
        },    
        initMap(){
            let _this = this;
            services.hostgroup().then(res=>{   
                //res = {"msg":"\u83b7\u53d6\u6570\u636e\u6210\u529f","status":true,"code":200,"data":[{"Id":3,"Name":"\u4e00\u53f7\u697c","Location":false,"Longitude":0,"Latitude":0,"Hosts":[{"Id":1186,"Name":"\u683c\u529b"},{"Id":841,"Name":"\u58f0\u5149\u62a5\u8b66"},{"Id":1203,"Name":"\u7535\u91cf\u4eea2"},{"Id":1204,"Name":"\u7535\u91cf\u4eea1"},{"Id":1213,"Name":"scanter"},{"Id":1217,"Name":"\u65b0\u5efa\u4e3b\u673a1"},{"Id":1238,"Name":"\u914d\u7535\u67dc"},{"Id":1287,"Name":"\u4f9d\u7c73\u5eb7\u7cbe\u5bc6\u7a7a\u8c03"},{"Id":1298,"Name":"APC"},{"Id":1303,"Name":"AIRC8002"},{"Id":1317,"Name":"KR3120"},{"Id":1309,"Name":"EA99"},{"Id":1299,"Name":"MD82N"},{"Id":1270,"Name":"\u52a8\u73af\u4e3b\u673a"},{"Id":1313,"Name":"\u79d1\u534e\u7cbe\u5bc6\u7a7a\u8c03"},{"Id":1278,"Name":"\u6052\u6e7f\u673a"},{"Id":1279,"Name":"AIRC800"},{"Id":1292,"Name":"\u65b0\u98ce\u673a"}]},{"Id":4,"Name":"\u4e09\u53f7\u697c","Location":false,"Longitude":0,"Latitude":0,"Hosts":[{"Id":839,"Name":"\u6e29\u6e7f\u5ea6"},{"Id":1295,"Name":"\u65b0\u5efa\u4e3b\u673a3"},{"Id":1294,"Name":"\u65b0\u5efa\u4e3b\u673a2"}]},{"Id":5,"Name":"\u4e8c\u53f7\u697c","Location":false,"Longitude":0,"Latitude":0,"Hosts":[{"Id":840,"Name":"\u4e3b\u673a"}]},{"Id":6,"Name":"\u7ba1\u7406\u4e2d\u5fc3","Location":false,"Longitude":0,"Latitude":0,"Hosts":[{"Id":842,"Name":"\u8bed\u97f3\u62a5\u8b66"}]},{"Id":7,"Name":"\u516d\u53f7\u697c","Location":false,"Longitude":0,"Latitude":0},{"Id":8,"Name":"\u4e94\u53f7\u697c","Location":false,"Longitude":0,"Latitude":0},{"Id":9,"Name":"10KV8#7-1-1\u914d\u7535","Location":false,"Longitude":0,"Latitude":0,"Hosts":[{"Id":1200,"Name":"\u65e0\u7ebf\u6e29\u6e7f\u5ea6"},{"Id":1199,"Name":"\u53d8\u538b\u5668"}]}]};             
                let data = res.data;
                _this.mapData = data.map(item=>{
                    return {
                        name: item.Name, 
                        value:[item.Longitude, item.Latitude] 
                    }
                })
                console.log(this.mapData)
            })
            // services.realtime().then(res=>{               
            //     let data = res.data;
            //     const statusList = data.hostgroups;
            //     let x = [];
            //     _this.mapData.forEach(v => x[v.name]=v );
            //     statusList.forEach(v => x[v.name] && (x[v.name].status = v.hosts_has_not_acknowledged));
            //     x = null;
            // })
            if(Object.keys(this.$route.query).length!=0){
                this.positionList.push({
                    code: 'china',//data.top, 
                    name: '中国'//data.name
                })
                setTimeout(() => this.renderMap(this.positionList[0], this.linkEvent), 500);
            }else{
                services.status().then(res=>{
                    let data = res.data;
                    let nameList, codeList;
                    data.funcs.filter(v => {
                        if(v.Key=='gis_top_name') {
                            if(v.StrValue=="")
                                nameList = null;
                            else
                                nameList = v.StrValue;
                        }
                        if(v.Key=='gis_top_code') {
                            if(v.StrValue=="")
                                codeList = null;
                            else
                                codeList = v.StrValue;
                        }
                    });
                    if(nameList!==null||codeList!==null) {
                        nameList = nameList.split('_');
                        codeList = codeList.split('_');
                        for(let i=0; i<codeList.length; i++)
                            _this.positionList.push({code: codeList[i], name: nameList[i]});

                        if(codeList.length===1)
                            setTimeout(() => this.renderMap(this.positionList[0], this.linkEvent), 500);
                        else
                            setTimeout(() => this.renderMap(this.positionList[1], this.linkEvent), 500);
                    }else{
                        _this.positionList.push({code: 'china', name:'中国'});
                        setTimeout(() => this.renderMap(this.positionList[0], this.linkEvent), 500);
                    }
                })
            }
            

        },   

        renderMap({ name, code, features }, linkEvent) {
            // console.time();
            if(code) {
                return axios.get(`/public/ui/map/json/${code}.json`).then(res => {
                    // console.timeEnd();
                    echarts.registerMap(name, res);
                    const series = this.createSeries(this.mapData, this.isWarning);
                    const option = this.createOption(name, series);
                    this.myChart.setOption(option, true);
                    this.coordinateList = res;
                    if(code==this.positionList[0].code&&linkEvent===0) {
                        linkEvent=this.linkEvent;
                        this.positionList.splice(1);
                    }

                    // console.log(code, linkEvent);
                    typeof linkEvent ==='function' && linkEvent(res);
                    (typeof linkEvent ==='number'||typeof linkEvent ==='string') && this.positionList.splice(linkEvent + 1);
                });
            }
                const b = {
                    type: 'FeatureCollection',
                    features: []
                };
                b.features.push(features);
                const series = this.createSeries(this.mapData, this.isWarning);
                const option = this.createOption(name, series);
                echarts.registerMap(name, b);
                this.myChart.setOption(option, true);
        },
        linkEvent({ features }) {
            this.myChart.off('click');
            this.myChart.on('click', params => {
                    const {name} = params;
                    if(params.hasOwnProperty('marker'))
                        window.location.href = '/public/templates/groupmap.html?roomName='+encodeURI(name);

                    let info;
                    const { id } = features.find(item => item.properties.name === name) || {};
                    if(!id && id !== 0) {
                        if(this.coordinateList.features) {
                            const features = this.coordinateList.features.find(item => item.properties.name===name);
                            this.coordinateList = features;
                            info = {name, features};
                        }else
                            return;
                    }else
                        info = { name, code: id };


                    this.renderMap(info);
                    this.positionList.push(info);
            });

            window.onresize = () => this.myChart.resize();
        },
        linkEvent({ features }) {
            this.myChart.off('click');
            this.myChart.on('click', params => {
                    const {name} = params;
                    if(params.hasOwnProperty('marker'))
                        window.location.href = '/public/templates/groupmap.html?roomName='+encodeURI(name);

                    let info;
                    const { id } = features.find(item => item.properties.name === name) || {};
                    if(!id && id !== 0) {
                        if(this.coordinateList.features) {
                            const features = this.coordinateList.features.find(item => item.properties.name===name);
                            this.coordinateList = features;
                            info = {name, features};
                        }else
                            return;
                    }else
                        info = { name, code: id };


                    this.renderMap(info);
                    this.positionList.push(info);
            });

            window.onresize = () => this.myChart.resize();
        },
        createSeries(data, isWarn) {
            const vm =this;
            const series = [
                _.extend(
                    true,
                    { data },
                    _point,
                    {
                        itemStyle: {
                            normal: {
                                color(params) {
                                    const c = params.data.status > 0 ? 1:0;
                                    const levelColorMap = ['#39E639', '#FF0700'];
                                    return levelColorMap[c];
                                },
                            }
                        }
                    }
                )
            ];
            return series;
        },
        createOption(name, series) {
            const option = {
                title: { text: '', subtext: '', left: 'center', textStyle: { color: '#fff' } },
                tooltip: { trigger: 'item' },
                geo: {
                    map: name,
                    type: name,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13
                            }
                        },
                        emphasis: { show: false }
                    },
                    zoom: 1,
                    roam: true,
                    itemStyle: {
                        shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowBlur: 30,
                        shadowOffsetX: 50,
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 0.5,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 2,
                                colorStops: [
                                    { offset: 0, color: 'rgba(147, 235, 248, 0)' },
                                    { offset: 1, color: 'rgba(147, 235, 248, 1)' }
                                ],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 20
                        },
                        emphasis: { areaColor: '#389bb7', borderWidth: 0 }
                    }
                },
                series
            };
            return option;
        },

        test(){                       
            this.echarts.registerMap('china', this.chinaMap);
            const myChart = echarts.init(this.$refs.myEchart);
            // const myChart = echarts.init(document.getElementById('myEchart'));
            const optionMap = {
              tooltip: {},
                 legend: {
                            orient: 'vertical',
                            left: 'left',
                            data:['']
                        },
                 visualMap: {
                            min: 0,
                            max: 5000,
                            left: '10%',
                            top: 'bottom',
                            text: ['高','低'],
                            calculable : true,
                            color:['#0b50b9','#c3e2f4']
                        },
                 selectedMode: 'single',
                 series : [
                        {
                            name: '',
                            type: 'map',
                            mapType: 'china',
                            roam: true,
                            itemStyle: {
                                normal:{
                                    borderColor: 'rgba(0, 0, 0, 0.2)'
                                },
                                emphasis:{
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            showLegendSymbol: true,
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                    {name: '北京',value: this.randomData() },
                                    {name: '天津',value: this.randomData() },
                                    {name: '上海',value: this.randomData() },
                                    {name: '重庆',value: this.randomData() },
                                    {name: '河北',value: this.randomData() },
                                    {name: '河南',value: this.randomData() },
                                    {name: '云南',value: this.randomData() },
                                    {name: '辽宁',value: this.randomData() },
                                    {name: '黑龙江',value: this.randomData() },
                                    {name: '湖南',value: this.randomData() },
                                    {name: '安徽',value: this.randomData() },
                                    {name: '山东',value: this.randomData() },
                                    {name: '新疆',value: this.randomData() },
                                    {name: '江苏',value: this.randomData() },
                                    {name: '浙江',value: this.randomData() },
                                    {name: '江西',value: this.randomData() },
                                    {name: '湖北',value: this.randomData() },
                                    {name: '广西',value: this.randomData() },
                                    {name: '甘肃',value: this.randomData() },
                                    {name: '山西',value: this.randomData() },
                                    {name: '内蒙古',value: this.randomData() },
                                    {name: '陕西',value: this.randomData() },
                                    {name: '吉林',value: this.randomData() },
                                    {name: '福建',value: this.randomData() },
                                    {name: '贵州',value: this.randomData() },
                                    {name: '广东',value: this.randomData() },
                                    {name: '青海',value: this.randomData() },
                                    {name: '西藏',value: this.randomData() },
                                    {name: '四川',value: this.randomData() },
                                    {name: '宁夏',value: this.randomData() },
                                    {name: '海南',value: this.randomData() },
                                    {name: '台湾',value: this.randomData() },
                                    {name: '香港',value: this.randomData() },
                                    {name: '澳门',value: this.randomData() }
                            ]
                        }
                    ]
               }
               myChart.setOption(optionMap);

        },
        randomData(){
            
            return 200;
        },
    }
}
</script>

<style lang="stylus">
.map-wrap
    width 1000px
</style>