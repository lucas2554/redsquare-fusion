export const outils = {
    methods: {

        getRemotePeerWithId(id) {
            return axios.get("users/user/" + id).then((response) => {
                return response.data.peer_id
            })

        }

    }
}