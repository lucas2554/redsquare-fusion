<template>
    <div class="watch">
        <div>
            <video class="vid" autoplay controls="controls"></video>
        </div>
    </div>
</template>
<script>


    export default {
        name: 'Watch',
        data() {
            return {
                remotePeer: null,
                remotePeerId: ''
            }
        },
        methods: {

            watchStream(remotePeerId) {
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({audio: true, video: {width: '100%', height: '100vh'}},
                        (localstream) => {
                            let video = document.querySelector('.vid');
                            // video.srcObject = localstream
                            let call = this.$peer.call(remotePeerId, localstream)
                            call.on('stream', (remoteStream) => {
                                video.srcObject = remoteStream
                                video.play();
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
            this.remotePeer = this.getRemotePeerWithId(this.$route.params.id)
            this.remotePeer.then((value => {
                this.remotePeerId = value

                if (this.remotePeerId !== '') {
                    this.watchStream(value)
                }


            }))


        },

    }
</script>
<style lang="scss">

    .camera {
        width: 100%;
        height: 100vh;

        .vid {
            width: 100%;
            height: 100vh;

        }
    }

</style>
