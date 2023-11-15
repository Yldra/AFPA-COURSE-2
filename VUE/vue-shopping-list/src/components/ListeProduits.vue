<template>
    <div>
        <h2>{{ ProductTitle }}</h2>
        <ul>
            <li v-for="(produit, index) in produits" :key="index" class="product-item">
                {{ produit.nom }}
                <BoutonCompteur :productPrice="produit.prix" productType="Velo" />
            </li>
        </ul>
    </div>


    <div>
        <h2>{{ CustomerTitle }}</h2>
        <h3>Our most faithful customers !</h3>
        <button @click="recup">CUSTOMER LIST</button>
        <br><hr>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Address</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(utilisateur, index) in utilisateurs" :key="index">
                    <a v-bind:href="'/detail/'+utilisateur.id">{{ utilisateur.name }}</a>
                    <td>{{ utilisateur.name }}</td>
                    <td>{{ utilisateur.username }}</td>
                    <td>{{ utilisateur.email }}</td>
                    <td>{{ utilisateur.phone }}</td>
                    <td>{{ utilisateur.website }}</td>
                    <td>
                    Street :{{ utilisateur.address.street }}<br>
                    Suite :{{ utilisateur.address.suite }}<br>
                    City :{{ utilisateur.address.city }}<br>
                    Zipcode :{{ utilisateur.address.zipcode }}
                    </td>
                </tr>
            </tbody>
        </table>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from "axios";
import BoutonCompteur from "@/components/BoutonCompteur.vue";

export default {
    name: "ListeProduits",
    components: {
        BoutonCompteur
    },
    data() {
        return {
            ProductTitle: "SHOPPING LIST",
            CustomerTitle: "CUSTOMER LIST",
            produits: [
                { nom: "Velo", prix: 360 },
                { nom: "Skate", prix: 90 },
                { nom: "Rollers", prix: 45 }
            ],
            utilisateurs: [],
        };
    },
    methods: {
        recup() {
            axios
                .get("https://jsonplaceholder.typicode.com/users")
                .then((response) => {
                    this.utilisateurs = response.data;
                })
                .catch((err) => console.log(err));
        },
    }
};
</script>

<style scoped>
h2 {
    color: white;
    background-color: black;
    padding: 10px;
}

ul li {
    margin-left: -40px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    text-transform: uppercase;
}

.product-item {
    background-color: #000000;
    padding: 10px;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

th {
    background-color: green;
    color: white;
    text-align: center;
}
</style>
