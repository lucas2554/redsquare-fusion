<template>
    <div class="cam">
        <h1>vue camera</h1>

        <video class="vid" src="" autoplay></video>

    </div>
</template>
<script>
    export default {
        name: 'Camera',
        data() {
            return {}
        },
        methods: {},
        mounted() {

            if (navigator.getUserMedia()) {
                navigator.getUserMedia({video: true, audio: true}, (localStream) => {
                    console.log(localStream)
                })

            }else{
              console.log('hello')
            }

        },
    }
</script>
<style lang="scss">

    .cam {
        width: 100%;
        height: 100vh;

        .vid {
            width: 100%;
            height: 00vh;

        }
    }

</style>
