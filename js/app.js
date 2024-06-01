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
        },
        formaterTemps(temps) {
            let minutes = (Math.floor(temps / 60) + "").padStart(2, "0")
            let secondes = (Math.floor(temps - minutes * 60) + "").padStart(2,"0")

            return `${minutes}:${secondes}`   
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