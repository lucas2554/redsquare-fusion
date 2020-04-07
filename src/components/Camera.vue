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
                video: null,
            }
        },
        methods: {
            stream(state) {
                console.log('stream start')
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;

                if (navigator.getUserMedia) {
                    navigator.getUserMedia({audio: true, video: {width: '100%', height: '100vh'}},
                        (localstream) => {
                            let video = document.querySelector('.vid')
                            if (state === true) {
                                video.srcObject = localstream
                                video.play();
                                this.$peer.on('call', (call) => {
                                    call.answer(localstream)
                                    console.log(call)
                                })
                            } else if (state === false) {
                                localstream.getTracks().forEach((track) => {
                                    track.stop()
                                });
                                localstream = null
                                this.$peer.on('call', (call) => {
                                    call.close()
                                })
                                window.location.reload()
                            }
                        },
                        function (err) {
                            console.log("The following error occurred: " + err.name);
                        }
                    );
                } else {
                    console.log("getUserMedia not supported");

                }
            },


            stopCam() {
                if (this.localStream !== null) {
                    this.localStream
                }

            }


        },
        mounted() {
            this.$bus.$on('start-stream', (() => {
                this.stream(true)
            }))

            this.$bus.$on('stop-stream', (() => {
                this.stream(false)
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
