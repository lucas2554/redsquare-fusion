<template>
    <div class="v-container">
        <v-card class="mt-12 mx-auto" raised max-width="344" height="400">
            <v-avatar class="mt-n8" size="72">
                <v-gravatar :email="user.email"/>
            </v-avatar>
            <v-card-text class="overlay-header">
                <div class="mt-4">{{user.first_name}} {{user.last_name}}</div>
                <p class="display-1 text--primary">{{user.nickname}}</p>
            </v-card-text>
            <v-card-text class="overlay">
                {{user.email}}<br>
                 <v-icon dark class="mr-1">mdi-calendar</v-icon>{{(user.birth_date).substring(0,10)}}
                <v-divider class="mx-4 mt-4 mb-4"></v-divider>       
                <div class="grid">
                    <div class="font-weight-bold title">{{user.age}}</div>
                    <div class="font-weight-bold title">00</div>
                    <div class="font-weight-bold title">00</div>

                    <div class="font-weight-thin subtitle-2">Age</div>
                    <div class="font-weight-thin subtitle-2">Abonnés</div>
                    <div class="font-weight-thin subtitle-2">Abonnements</div>
                </div>
                 <v-btn class="ma-2 mt-8" tile outlined color="white">
                    <v-icon left>mdi-pencil</v-icon> Modifier
                </v-btn>
            </v-card-text>
        </v-card>
        <div v-if="this.user.user_id == this.refID">
            {{this.user.user_id}}
        </div>
    </div>
</template>

<script>
    import VueJwtDecode from 'vue-jwt-decode'
    export default {
        name: 'TestArthur',
        data() {
            return {
                user : {'birth_date': "0"},
                refID: "",
            }
        },
        methods: {
        },
        mounted() {
            axios.get('users/user/'+ this.$route.params.id).then(response => {
                console.log(response.data)
                this.user = response.data
            }).catch(error => {
              
            }) 

            let decoded = VueJwtDecode.decode(this.$store.state.token)
            this.refID = decoded._id
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    
    .grid{
        display: grid;
        width: 300px;
        grid-template-columns: 100px 100px 100px;
        align-items: start;
        justify-content: space-between;
    }
    

    .v-card{
        background-color: crimson !important;
        border-radius: 10px !important;
    }
    .v-avatar{
        position: absolute !important;
        right: 10px;
        border-radius: 50% !important;
        border: 2px solid white !important;
        -webkit-box-shadow: 0 0 10px 3px  rgba(220, 20, 60, 0.3) ;
    }

    div.overlay-header {
        background-color: white !important;
        border-radius: 0 0 45% 45% !important;
        height: 150px !important;
    }
    div.overlay{
        height: 63% !important;
        color: white !important;
    }
</style>
>
