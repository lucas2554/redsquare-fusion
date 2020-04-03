<template>
    <div class="container">
        <ul>
            <li v-for="(user,index) in users">
                <router-link :to="{
                    name: 'Profile', 
                    params: { id: user._id }}">
                    {{index +" :"+ user.first_name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'TestArthur',
        data() {
            return {
                users : "",
            }
        },
        methods: {
        },
        mounted() {
            axios.get('users').then(response => {
                console.log(response.data)
                this.users = response.data
            }).catch(error => {

            })
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
