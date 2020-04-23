<template>
    <div>
        <h1>Home</h1>
        <Mapper />
    </div>
</template>

<script>
import Mapper from '../components/Maps/maps'
export default {
    name: 'home',
    components:{
        Mapper
    },
    mounted() {
        console.log(this.$route);
    }
}
</script>

<style lang="stylus">
h1
    font-size 15px
    color blue

</style>