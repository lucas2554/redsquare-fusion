<template>
    <v-container>
        <v-row>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
                <v-row justify="start">
                    <p class="headline font-weight-bold">Connexion</p>
                </v-row>
            </v-col>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
                <v-text-field
                        label="E-mail"
                        shaped
                        outlined
                        clearable
                        append-icon="mdi-at"
                        color="primary"
                        :rules="[rules.required, rules.email]"
                        v-model="email"
                        v-on:keyup.enter="login"
                ></v-text-field>
            </v-col>
            <v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
                <v-text-field
                        label="Mot de passe"
                        shaped
                        outlined
                        color="primary"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        :rules="[rules.required]"
                        @click:append="showPassword = !showPassword"
                        v-model="password"
                        v-on:keyup.enter="login"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" offset-md="3" sm="8" offset-sm="2">
                <v-alert
                        type="error"
                        :value="showError"
                        transition="scale-transition"
                >
                    {{ error }}
                </v-alert>
            </v-col>
            <v-col cols="12" md="6" offset-md="3" sm="8" offset-sm="2">
                <v-btn color="primary" @click="login">Se connecter</v-btn>
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
                showPassword: false,
                showError: false,
                error: "",
                password: "",
                email: "",
                emailPattern: "",
                rules: {
                    required: value => !!value || "Ce champs est requis",
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        this.emailPattern = pattern.test(value);
                        return pattern.test(value) || "E-mail invalide";
                    }
                }
            }
        },
        methods: {
            setError(message) {
                this.error = message;
                this.showError = true;
                setTimeout(() => {
                    this.error = "";
                    this.showError = false;
                }, 2000);
            },
            login(){
                let parameters = {
                    email: this.email,
                    password: this.password
                }
                if(parameters.email === "" || parameters.password === "") {
                    this.setError("Les champs sont vides");
                }else if(!this.emailPattern){
                    this.setError("L'adresse mail n'est pas correcte.");
                }else {
                    axios.post("users/login", parameters).then(response => {
                        if(response.data.error){
                            this.setError(response.data.error);
                        }else{
                            this.$store.commit('setToken', response.data.token);
                            this.$router.push("/");
                        }

                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .link {
        text-decoration: none;
    }
</style>