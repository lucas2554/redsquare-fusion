<template>
    <div class="mapLeaflet">
        <l-map :zoom="zoom" :center="[latitude, longitude]">
            <l-control-scale
                    position="topright"
                    :imperial="false"
                    :metric="true"
            ></l-control-scale>
            <l-tile-layer :url="url"/>
            <div v-for="user in usersStreaming" :key="user.id">
                <l-marker :lat-lng="[user.location.lat, user.location.lng]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            icon-url="images/iconMap2.png"
                    >
                    </l-icon>
                    <l-popup>
                        <p class="headline font-weight-bold text-center">Hugo</p>
                        <v-btn icon to="/" >
                            <v-icon>mdi-account</v-icon>
                        </v-btn>
                        <v-btn icon to="/" >
                            <v-icon>mdi-camera</v-icon>
                        </v-btn>
                    </l-popup>
                </l-marker>
            </div>
        </l-map>
    </div>
</template>

<script>
    import {latLng} from "leaflet";
    import {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LIcon,
        LControlScale,
        LCircle
    } from "vue2-leaflet";

    export default {
        name: "Example",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LControlScale,
            LIcon,
            LCircle
        },
        data() {
            return {
                addMarker: false,
                latitude: "",
                longitude: "",
                zoom: 18,
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                error: "",
                iconSize: 64,
                circle: {
                    center: [0, 0],
                    radius: 2500,
                    color: "red"
                },
                usersStreaming: []
            };
        },
        methods: {
            showPosition(position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            }
            // openStream() {
            //   this.addMarker = !this.addMarker;
            //   this.circle.center = [this.latitude, this.longitude];
            //   this.circle.radius = 2500;
            // },
            // openUrgence() {
            //   this.addMarker = !this.addMarker;
            //   this.circle.center = [this.latitude, this.longitude];
            //   this.circle.radius = 500;
            // }
        },
        computed: {
            dynamicSize() {
                return [this.iconSize * 1, this.iconSize * 1];
            },
            dynamicAnchor() {
                return [this.iconSize / 2, this.iconSize * 1];
            }
        },
        mounted() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
                axios.get("users/").then(response => {
                    response.data.forEach(userOnline => {
                        if(userOnline.onAir){
                            this.usersStreaming.push(userOnline);
                        }
                    });
                    console.log(this.usersStreaming);
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .mapLeaflet {
        z-index: 1;
        width: 100%;
        height: 100vh;
    }
</style>