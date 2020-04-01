<template>
    <!-- <div class="container">
        <div class="field">
            <div class="control">
                <input v-model="email"
                       v-bind:class="{'is-danger' : missingEmail, 'is-rounded' : enable, 'input' : enable}" type="text"
                       name="email" placeholder="Email">
                <p v-show="missingEmail" class="help is-danger">Le champ doit être rempli</p>
            </div>
        </div>

        <div class="field">
            <label class="label">Mot de passe</label>
            <div class="control">
                <input v-model="password"
                       v-bind:class="{'is-danger' : missingPassword, 'is-rounded' : enable, 'input' : enable}"
                       type="password" name="psswd" placeholder="Mot de passe">
                <p v-if="missingPassword" class="help is-danger">Le champ doit être rempli</p>
                <p v-if="wrongPassword" class="help is-danger">Mauvais mot de passe</p>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button @click="signin()" class="button is-link">Envoyer</button>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <router-link to="/signin">Pas inscrit ?</router-link>
            </div>
        </div>
    </div> -->
    <v-container>
        <v-row>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="8" offset-sm="2" >
                <v-row justify="start">
                    <p class="headline font-weight-bold">Connexion</p>
                </v-row>
            </v-col>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="8" offset-sm="2" >
                <v-text-field
                    label="E-mail"
                    prepend-inner-icon="mdi-at"
                    color="primary"
                ></v-text-field>
            </v-col>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="8" offset-sm="2" >
                <v-text-field
                    label="Mot de passe"
                    prepend-inner-icon="mdi-key"
                    color="primary"
                ></v-text-field>
            </v-col>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="8" offset-sm="2" >
                <span>Pas encore inscrit ? </span><router-link to="/signin" class="link">S'inscrire</router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: "zinni.arthur@gmail.com",
                missingEmail: false,
                password: "1234",
                missingPassword: false,
                wrongPassword: false,
                enable: true,
            }
        },
        methods: {
            signin() {
                if (this.email.length > 0) {
                    if (this.password.length > 0) {
                        let log = {}
                        log.email = this.email
                        log.password = this.password
                        console.log(log)

                        axios.post('users/login', log).then(response => {
                            console.log(response.data)
                            if (response.data.error) {
                                this.wrongPassword = true
                                this.missingPassword = false
                            } else {
                                this.$store.commit('setToken', response.data.token)
                                this.$router.push('/')
                            }
                        });
                    } else {
                        this.missingPassword = true;
                    }
                } else {
                    this.missingEmail = true;
                }
            }
        },
        mounted() {
            console.log('token :  ' + this.$store.state.token)
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    // $color: FF1745;

    // .container {
    //     border: rgb(220, 20, 60) 5px solid;
    //     height: 100vh;
    //     width: 100%;

    //     .field {
    //         .control {
    //             input.log {
    //                 border: 2px solid $color;
	// 			}
    //         }
    //     }
    // }
    .link {
        text-decoration: none;
    }
</style>
