<template>
    <div class="home-wrap">
        <h1>Home</h1>
        <Mapper />
    </div>
</template>

<script>
import Mapper from '../components/Maps/maps'
import service from '../services/services'
import moment from 'moment'
export default {
    name: 'home',
    components:{
        Mapper
    },
    data(){
        return {
            areas: []
        }
    },
    mounted() {
        console.log(moment().format('X'), moment(1587971590*1000).format('YYYY-MM-DD HH:mm:ss'));
        service.gis().then(data=>{
            console.log(typeof data);
            this.areas = data.data;
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style lang="stylus">
.home-wrap
    width 100%
    height 500px
    background #eee

    h1
        font-size 15px
        color blue

</style>