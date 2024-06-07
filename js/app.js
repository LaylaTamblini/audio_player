import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            activePage: "audioplayer",
            chansons: [],
            chanson: null,
            tempsActuel: 0,
            tempsRestant: 0,
            joue: false,
            image: "placeholder.jpg",
            audio: "empty.mp3",
            volume: 0.5,
        }
    },
    methods: {
        switchPage(page) {
            this.activePage = page
        },
        formaterTemps(temps) {
            let minutes = (Math.floor(temps / 60) + "").padStart(2, "0")
            let secondes = (Math.floor(temps - minutes * 60) + "").padStart(2,"0")

            return `${minutes}:${secondes}`   
        },
        selectionnerChanson(chanson) {
            // this.$refs.audio.pause()
            this.chanson = chanson
            this.image = this.chanson.image
            this.audio = this.chanson.audio

            this.$nextTick(() => {
                this.$refs.audio.load()
                this.$refs.audio.play()
            })
        },
        jouer() {
            this.$refs.audio.play()
            this.joue = true
        },
        arreter() {
            this.$refs.audio.pause()
            this.joue = false
            this.tempsRestant = 0
        },
        miseAjour() {
            this.tempsActuel = this.$refs.audio.currentTime
            this.tempsRestant = this.chanson.temps - this.tempsActuel
        },
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

        this.$refs.audio.volume = this.volume
    }
}).mount('#app')