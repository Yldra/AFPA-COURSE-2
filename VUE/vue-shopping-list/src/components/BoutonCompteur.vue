<template>
    <div>
        <button @click="Count('Add')" class="action-button">Add</button>
        <button @click="Count('Remove')" class="action-button remove-button">Remove</button>
        <p class="count-text">Count: {{ count }}</p>
        <p class="price-text">Price: {{ calculatePrice() }} €</p>
    </div>
</template>

<script>
export default {
    name: "BoutonCompteur",
    props: {
        productPrice: Number,
        // Ajoutez une propriété pour le type de produit
        productType: String,
    },
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        Count(operation) {
            if (operation === "Add") {
                this.count++;
            } else if (operation === "Remove" && this.count > 0) {
                this.count--;
            }
        },
        calculatePrice() {
            // Utilisez la logique spécifique au type de produit
            let priceMultiplier = 1;

            if (this.productType === "Velo") {
                priceMultiplier = 1;
            } else if (this.productType === "Skate") {
                priceMultiplier = 1;
            } else if (this.productType === "Rollers") {
                priceMultiplier = 1;
            }

            return this.count * (this.productPrice * priceMultiplier);
        },
    },
};
</script>

<style scoped>
.action-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    margin-right: 5px;
    cursor: pointer;
}

.remove-button {
    margin-left: 5px;
}

.count-text,
.price-text {
    font-size: 18px;
}
</style>
