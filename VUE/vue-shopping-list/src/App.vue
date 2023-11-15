<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<ListeProduits />
</template>

<script>
	import ListeProduits from "./components/ListeProduits.vue";

	export default {
		name: "App",
		components: {
			ListeProduits,
		}
	};

  
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
