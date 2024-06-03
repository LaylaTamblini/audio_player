import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            pageActive: "audio-player",
            chansons: [],
            chanson: null,
            tempsActuel: 0,
            tempsRestant: 0,
            joue: false,
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
        },
        selectionnerChanson(chanson) {
            this.tempsActuel = 0
            this.tempsRestant = 0
            this.chanson = chanson
            this.joue = false
        },
        jouer() {
            this.$refs.audio.play()
            this.joue = true
        },
        arreter() {
            this.$refs.audio.pause()
            this.joue = false
        },
        miseAjour() {
            this.tempsActuel = this.$refs.audio.currentTime
            this.tempsRestant = this.chanson.temps - this.tempsActuel
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