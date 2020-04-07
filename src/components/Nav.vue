<template>
    <div>
        <div class="navigationMenu" :class="{ active: !isActive }">
            <v-btn
                    fixed
                    bottom
                    right
                    color="rgb(220, 20, 60)"
                    fab
                    dark
                    depressed
                    class="btnAlert"

            >
                <v-icon color="white">mdi-alert-rhombus</v-icon>
            </v-btn>
            <button class="navigationBtn" @click="showMenu">
                <span></span>
            </button>
            
            <v-bottom-navigation
                    grow
                    color="white"
                    background-color="rgb(220, 20, 60)"
                    app
                    fixed
            >
           
                <v-btn to="/" exact @click="isActive = !isActive">
                    <span>Accueil</span>
                    <v-icon>mdi-home</v-icon>
                </v-btn>

                <v-btn to="/about" exact @click="isActive = !isActive">
                    <span>Diffusion</span>
                    <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn to="/profil" exact @click="isActive = !isActive">
                    <span>Profil</span>
                    <v-icon>mdi-account</v-icon>
                </v-btn>

                <v-btn @click="logout">
                    <span>Déconnexion</span>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </v-bottom-navigation>
            

        </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                isActive: false,
                isBtnActive: false,
                activeBtn: 1
            };
        },
        methods: {
            showMenu() {
                this.isActive = !this.isActive;
                this.isBtnActive = !this.isBtnActive;
            },

            logout() {
                this.$store.commit('setToken', '')
                this.$router.push("/login")
            }
        }
    };
</script>

<style lang="scss" scoped>
    #app {
        overflow-y: hidden;
        height: 100%;

        .btnAlert {
            z-index: 9999;
            margin-bottom: 20vh;
            transition: 0.75s;
        }

        .navigationMenu {
            z-index: 9999;
            background-color: rgb(220, 20, 60);
            box-sizing: border-box;
            border-radius: 40px 40px 0 0;
            width: 100%;
            height: 150px;
            bottom: 0;
            position: fixed;
            margin: auto;
            transition: 0.75s;
            opacity: 0.9;

            .navigationBtn {
                width: 50%;
                height: 50px;
                margin: auto;
                &:focus {
                    outline: 0;
                }
                span {
                    display: flex;
                    width: 50%;
                    height: 5px;
                    margin: auto;
                    background: white;
                    border-radius: 3px;
                }
            }

            .v-bottom-navigation {
                box-shadow: none;
            }
        }

        .active {
            transform: translateY(100px);
        }

        .activeBtn {
            transform: translateY(-100px);
        }
    }
</style>

