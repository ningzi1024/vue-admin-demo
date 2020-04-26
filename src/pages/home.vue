<template>
    <div>
        <h1>Home</h1>
        <Mapper />
    </div>
</template>

<script>
import Mapper from '../components/Maps/maps'
import service from '../services/services'
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
h1
    font-size 15px
    color blue

</style>