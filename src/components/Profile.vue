<template>
    <div class="container">
        <div v-if="this.user.user_id == this.refID">
            {{this.user.user_id}}
        </div>
        <div>
            {{user.nickname}}
            {{user.first_name}}
            {{user.last_name}}
            {{user.email}}
            {{user.birth_date}}
            {{user.age}}
            {{user_created_at}}
        </div>
    </div>
</template>

<script>
    import VueJwtDecode from 'vue-jwt-decode'
    export default {
        name: 'TestArthur',
        data() {
            return {
                user : "",
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
    $color: FF1745;

    .container {
        border: rgb(220, 20, 60) 5px solid;
        height: 100vh;
        width: 100%;

        .field {
            .control {
                input.log {
                    border: 2px solid $color;
				}
            }
        }
    }

</styl
>
