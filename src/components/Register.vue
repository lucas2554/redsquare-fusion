<template>
	<v-container>
		<v-row>
			<v-col cols="2" offset="1">
				<v-row justify="start">
					<v-btn icon to="/login">
						<v-icon>mdi-arrow-left</v-icon>
					</v-btn>
				</v-row>
			</v-col>
			<v-col cols="8">
				<v-row justify="start">
					<p class="headline font-weight-bold">Inscription</p>
				</v-row>
			</v-col>
			<v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
				<v-text-field
					label="Prénom"
					shaped
					outlined
					clearable
					append-icon="mdi-account"
					color="primary"
					:rules="[rules.required]"
					v-model="firstname"
					v-on:keyup.enter="register"
				></v-text-field>
			</v-col>
			<v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
				<v-text-field
					label="Nom"
					shaped
					outlined
					clearable
					append-icon="mdi-account"
					color="primary"
					:rules="[rules.required]"
					v-model="lastname"
					v-on:keyup.enter="register"
				></v-text-field>
			</v-col>
			<v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
				<v-text-field
					label="Nom d'utilisateur"
					shaped
					outlined
					clearable
					append-icon="mdi-account"
					color="primary"
					:rules="[rules.required]"
					v-model="pseudo"
					v-on:keyup.enter="register"
				></v-text-field>
			</v-col>
			<v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
				<v-text-field
					label="Age"
					shaped
					outlined
					clearable
					append-icon="mdi-numeric"
					type="number"
					color="primary"
					:rules="[rules.required]"
					v-model="age"
					v-on:keyup.enter="register"
				></v-text-field>
			</v-col>
			<v-col cols="10" offset="1" md="6" offset-md="3" sm="6" offset-sm="3" >
				<v-text-field
					label="Date de naissance"
					shaped
					outlined
					clearable
					append-icon="mdi-calendar"
					type="date"
					color="primary"
					:rules="[rules.required]"
					v-model="birthdate"
					v-on:keyup.enter="register"
				></v-text-field>
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
					v-on:keyup.enter="register"
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
					v-on:keyup.enter="register"
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
                <v-btn color="primary" @click="register">S'inscrire</v-btn>
            </v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name : 'Register',
		data() {
			return {
				showPassword: false,
				showError: false,
				error: "",
				lastname: "",
				firstname: "",
				pseudo: "",
				age: "",
				birthdate: "",
				password: "",
				email: "",
				emailPattern: "",
				latitude: "",
                longitude: "",
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
		methods : {
			showPosition(position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            },
			setError(message) {
				this.error = message;
				this.showError = true;
				setTimeout(() => {
					this.error = "";
					this.showError = false;
				}, 2000);
			},
			register(){
				let parameters = {
					first_name: this.firstname,
					last_name: this.lastname,
					nickname: this.pseudo,
					age: this.age,
					location: {
						lat: this.latitude,
						lng: this.longitude
					},
					birth_date: this.birthdate,
					email: this.email,
					password: this.password
				}

				if(parameters.first_name === "" || parameters.last_name === "" || parameters.nickname === "" || parameters.age === ""
				|| parameters.birth_date === "" || parameters.email === "" || parameters.password === ""){
					this.setError("Les champs sont vides");
				}else if(!this.emailPattern){
					this.setError("L'adresse mail n'est pas correcte.")
				}else{
					axios.post('users/register', parameters).then(response => {
						if(response.data.error){
							this.setError("Le nom d'utilisateur est déjà pris.");
						}else{
							this.$router.push("/login");
						}
					}).catch(error =>{
						this.setError(error.errmsg);
					});
				}
				
			}
		},
		mounted(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(this.showPosition);
			}
		}
	}
</script>