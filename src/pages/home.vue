<template>
    <div>
        <h1>Home</h1>
        <Mapper />
    </div>
</template>

<script>
import Mapper from '../components/Maps/maps'
import service from '../services/apiBase'
export default {
    name: 'home',
    components:{
        Mapper
    },
    mounted() {
        console.log(service);
    }
}
</script>

<style lang="stylus">
h1
    font-size 15px
    color blue

</style>