import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            pageActive: "audio-player",
            chansons: [],
        }
    },
    methods: {
        changerPage(page) {
            this.pageActive = page
        }
    },
    mounted() {
        /**
         * Récupération de la liste des chansons
         */
        fetch("data/chansons.json").then(response => {
            response.json().then(listeChansons => {
                this.chansons = listeChansons
            })
        })
    }
}).mount('#app')