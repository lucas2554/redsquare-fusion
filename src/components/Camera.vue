<template>
    <div class="camera">
        <div>
            <video ref="video" class="vid" autoplay controls="controls"></video>
        </div>
    </div>
</template>
<script>


    export default {
        name: 'Camera',
        data() {
            return {
                video: null
            }
        },
        methods: {
            stream() {
                console.log('stream start')
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;


                if (navigator.getUserMedia) {
                    navigator.getUserMedia({audio: true, video: {width: '100%', height: '100vh'}},
                        (localstream) => {
                            let video = document.querySelector('.vid')
                            // console.log(video)
                            video.srcObject = localstream
                            video.play();
                            this.$peer.on('call', (call) => {
                                call.answer(localstream)
                                console.log(call)
                            })


                        },
                        function (err) {
                            console.log("The following error occurred: " + err.name);
                        }
                    );
                } else {
                    console.log("getUserMedia not supported");
                }
            },


        },
        mounted() {


        }, created() {
            this.$bus.$on('start-stream', (() => {
                this.stream()
            }))
        }

    }
</script>
<style lang="scss">

    .camera {
        width: 100%;
        height: 100vh;

        .vid {
            width: 100%;
            height: 50vh;

        }
    }

</style>
