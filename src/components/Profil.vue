<template>
    <div class="v-container">
        <v-card class="mt-12 mx-auto user_profile" raised max-width="344" height="400">
            <v-avatar class="mt-n8" size="72">
                <v-gravatar :email="user.email"/>
            </v-avatar>
            <v-card-text class="overlay-header">
                <div class="mt-4">{{user.first_name}} {{user.last_name}}</div>
                <p class="display-1 text--primary">{{user.nickname}}</p>
            </v-card-text>
            <v-card-text class="overlay">
                {{user.email}}<br>
                <v-icon dark class="mr-1">mdi-calendar</v-icon>
                {{(user.birth_date).substring(0,10)}}
                <v-divider class="mx-4 mt-4 mb-4"></v-divider>
                <div class="grid">
                    <div class="font-weight-bold title">{{user.age}}</div>
                    <div class="font-weight-bold title">00</div>
                    <div class="font-weight-bold title">00</div>

                    <div class="font-weight-thin subtitle-2">Age</div>
                    <div class="font-weight-thin subtitle-2">Abonnés</div>
                    <div class="font-weight-thin subtitle-2">Abonnements</div>
                </div>
                <v-btn @click="openUpdate" v-if="this.user.user_id == this.refID" class="ma-2 mt-8" outlined
                       color="white">
                    <v-icon left>mdi-pencil</v-icon>
                    Modifier
                </v-btn>
                <v-btn class="ma-2 mt-8" outlined color="white" v-else>
                    <v-icon left>mdi-heart</v-icon>
                    Suivre
                </v-btn>
            </v-card-text>

            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card class="profile_update">
                        <v-card-title>
                            <span class="headline">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="first_name" label="Prénom" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="last_name" label="Nom" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="nickname" label="Pseudo" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field v-model="email" label="Email*" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-dialog
                                                ref="dialog"
                                                v-model="modal"
                                                :return-value.sync="date"
                                                persistent
                                                width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                        v-model="date"
                                                        label="Choisir une date"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="crimson" @click="modal = false">Cancel</v-btn>
                                                <v-btn text color="crimson" @click="$refs.dialog.save(date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*champ requis</small>
                            <v-btn color="crimson darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="crimson darken-1" text @click="updateData">Save</v-btn>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-card>
        <v-btn class="mt-5" text small color="primary" to="/">retour à la map</v-btn>
    </div>
</template>

<script>
    import VueJwtDecode from 'vue-jwt-decode'

    export default {
        name: 'Profil',
        data() {
            return {
                user: {'birth_date': "0"},
                refID: "",
                dialog: false,
                date: null,
                menu: false,
                modal: false,
                menu2: false,
                age: 0,
                first_name: "",
                last_name: "",
                nickname: "",
                email: "",
                currentDate: new Date(),
            }
        },
        methods: {
            openUpdate() {
                this.dialog = true
                this.first_name = this.user.first_name
                this.last_name = this.user.last_name
                this.nickname = this.user.nickname
                this.email = this.user.email
                this.date = (this.user.birth_date).substring(0, 10)
            },

            updateData() {
                this.getAge()
                this.dialog = false
                let data = {
                    "first_name": this.first_name,
                    "last_name": this.last_name,
                    "nickname": this.nickname,
                    "email": this.email,
                    "birth_date": this.date,
                    "age": this.age

                }
                axios.put('users/user/' + this.$route.params.id, data).then(response => {
                    console.log(response.data)
                    this.getData()
                })
            },

            getData() {
                axios.get('users/user/' + this.$route.params.id).then(response => {
                    console.log(response.data)
                    this.user = response.data
                }).catch(error => {
                    console.log('API pas disponnible')
                })
            },

            getAge() {
                this.age = new Date(this.date)
                let diff = (this.currentDate - this.age)
                let ageDif = new Date(diff)
                console.log(this.currentDate)
                console.log(this.age)
                this.age = Math.abs(ageDif.getUTCFullYear() - 1970)
                console.log(this.age)
            }
        },
        mounted() {
            this.getData()
            let decoded = VueJwtDecode.decode(this.$store.state.token)
            this.refID = decoded._id
        }
    }

</script>
<style lang="scss">

    .grid {
        display: grid;
        width: 300px;
        grid-template-columns: 100px 100px 100px;
        align-items: start;
        justify-content: space-between;
    }

    .container {
        border: none;
        height: inherit;
    }

    .user_profile {
        background-color: crimson !important;
        border-radius: 10px !important;
    }

    #app > div:nth-child(5) > div > div > div.v-picker__title.primary {
        background-color: crimson !important;
        border-color: crimson !important;
    }

    #app .v-btn--active {
        background-color: crimson !important;
        border-color: crimson !important;
    }

    .v-avatar {
        position: absolute !important;
        right: 10px;
        border-radius: 50% !important;
        border: 2px solid white !important;
        -webkit-box-shadow: 0 0 10px 3px rgba(220, 20, 60, 0.3);
    }

    div.overlay-header {
        background-color: white !important;
        border-radius: 0 0 45% 45% !important;
        height: 150px !important;
    }

    div.overlay {
        height: 63% !important;
        color: white !important;
    }
</style>
>
