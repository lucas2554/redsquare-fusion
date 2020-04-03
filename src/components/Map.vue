<template>
    <div class="mapLeaflet">
        <l-map :zoom="zoom" :center="[coords.lat, coords.lng]" draggable="true">
            <l-control-scale
                    position="topright"
                    :imperial="false"
                    :metric="true"
            ></l-control-scale>
            <l-tile-layer :url="url"/>
            <div v-for="user in usersStreaming">
                <l-marker v-if="user._id !== $store.state.userId"
                          :lat-lng="[user.location.lat, user.location.lng]">
                    <l-icon
                            :icon-size="dynamicSize"
                            :icon-anchor="dynamicAnchor"
                            icon-url="images/iconMap2.png"
                    >
                    </l-icon>
                    <l-popup class="popup">
                        <p class="headline font-weight-bold text-center">{{user.nickname}}</p>
                        <ul class="liste-menu">
                            <li>
                                <v-btn icon :to="{name:'Profil', params:{id:user._id}}">
                                    <v-icon>mdi-account</v-icon>
                                </v-btn>
                            </li>
                            <li>
                                <v-btn icon to="/">
                                    <v-icon>mdi-video</v-icon>
                                </v-btn>
                            </li>
                        </ul>
                    </l-popup>
                </l-marker>
            </div>
            <!--            Pour afficher l'utilisateur sur la map même si il stream pas-->
            <l-marker :lat-lng="[coords.lat, coords.lng]">
                <l-icon
                        :icon-size="dynamicSize"
                        :icon-anchor="dynamicAnchor"
                        icon-url="images/iconMap2.png">
                </l-icon>
            </l-marker>
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
                coords: this.$store.state.userCoords,
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
            },
            getCoords() {
                return this.$store.state.userCoords
            }
        },
        mounted() {
            if (navigator.geolocation) {
                axios.get("users/").then((response) => {
                    response.data.forEach(userOnline => {
                        if (userOnline.onAir) {
                            this.usersStreaming.push(userOnline);
                        }
                    });
                    // console.log(this.usersStreaming);
                });
            }
        },

        watch: {
            getCoords: ((newVal) => {
                this.coords = newVal
            })
        }

    }
    ;
</script>
<style lang="scss" scoped>
    .mapLeaflet {
        z-index: 1;
        width: 100%;
        height: 100vh;

        .popup {
            width: 150px;

            .liste-menu {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding-left: 0;
                list-style: none;
            }
        }
    }
</style>