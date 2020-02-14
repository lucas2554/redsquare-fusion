<template>
    <div class="home">
        <Map/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Map from "../components/Map";

    export default {
        name: 'Home',
        components: {
            Map
        },
        methods: {

        },

        mounted() {
            console.log(this.$store.state.token)
        }
    }
</script>

<style lang="css">

    .home {

    }


</style>