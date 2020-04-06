<template>
    <div class="stream">
        <v-container class="container" v-if="onAir === false" fill-height fluid>
            <v-row align="center"
                   justify="center">
                <v-col>
                    <v-btn color="rgb(220, 20, 60)" rounded outlined @click="startStream">
                        <v-icon color="rgb(220, 20, 60)" left>mdi-video</v-icon>
                        Lancer une diffusion
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <div v-else>
            <v-btn right absolute color="rgb(220, 20, 60)" rounded fab class="close mt-5" @click="stopStream">
                <v-icon color="white" leftl>mdi-close-circle-outline</v-icon>
            </v-btn>
            <Camera/>
        </div>
    </div>
</template>
<script>


    import Camera from "../components/Camera";

    export default {
        name: 'Stream',
        components: {Camera},
        data() {
            return {
                onAir: false
            }
        },
        methods: {
            startStream() {
                this.onAir = true;
                this.$nextTick(() => {
                    this.$bus.$emit('start-stream')
                })

                if (this.$store.state.userId !== '') {

                    let param = {
                        onAir: true
                    }
                    axios.put('users/user/' + this.$store.state.userId + '/stream', param).then((response) => {
                        console.log(response.status)
                    })
                }
            },

            stopStream() {
                this.onAir = false;
                this.$nextTick(() => {
                    this.$bus.$emit('stop-stream')
                })
                if (this.$store.state.userId !== '') {
                    let param = {
                        onAir: false
                    }
                    axios.put('users/user/' + this.$store.state.userId + '/stream', param).then((response) => {
                        console.log(response.status)
                    })
                }
            }


        },
        mounted() {


        },

    }
</script>
<style lang="scss">

    .stream {
        width: 100%;
        height: 100vh;

        .container {
            height: 100vh;

            .row {
                max-width: 107% !important;
            }
        }

        .vid {
            width: 100%;
            height: 50vh;


        }
    }

</style>
