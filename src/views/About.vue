<template>
    <div class="cam">
        <h1>vue camera</h1>
        <div>
            <video class="vid" src="" autoplay></video>
        </div>
    </div>
</template>
<script>


    export default {
        name: 'Camera',
        data() {
            return {}
        },
        methods: {

            startstream() {
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({audio: true, video: {width: '100%', height: '100vh'}},
                        (localstream) => {
                            let video = document.querySelector('.vid');
                            video.srcObject = localstream
                            video.play();

                            let localPeer = new Peer()
                            localPeer.on('open', (id) => {
                                console.log(id)
                            })

                            localPeer.on('call', (call) => {
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
            this.startstream()


        },

    }
</script>
<style lang="scss">

    .cam {
        width: 100%;
        height: 100vh;

        .vid {
            width: 100%;
            height: 50vh;


        }
    }

</style>
