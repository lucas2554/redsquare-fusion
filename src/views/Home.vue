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
        data() {
            return {
                lat: this.$store.state.userCoords.lat,
                lng: this.$store.state.userCoords.lng,
            }
        },
        methods: {


            updateUserCoords() {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.$store.commit('setUserCoords', position.coords)
                    });
                }

                let param = {
                    location: {
                        lat: this.lat,
                        lng: this.lng
                    }
                }


                if (this.$store.state.userId !== '') {
                    axios.put('users/user/' + this.$store.state.userId + '/location', param).then((response) => {
                        console.log(response.data)
                    }).catch((err => {
                        console.log(err)
                    }))
                }
            },

            update() {
                this.updateUserCoords()
                setInterval(() => {
                    this.updateUserCoords()
                }, 100000)
            },


        },

        mounted() {
            this.update()
        }
    }
</script>

<style lang="css">

    .home {

    }


</style>