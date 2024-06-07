import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            activePage: "audioplayer",
            songs: [],
            song: null,
            tempsActuel: 0,
            tempsRestant: 0,
            isPlaying: false,
            img: "placeholder.jpg",
            audio: "empty.mp3",
            volume: 0.5,
            search: "",
        }
    },
    computed: {
        filteredSongs() {
            return this.songs.filter(song => {
                return song.titre.toLowerCase().indexOf(this.search.toLowerCase()) != -1
            })
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
            this.song = chanson
            this.image = this.song.image
            this.audio = this.song.audio

            this.$nextTick(() => {
                this.$refs.audio.load()
                this.$refs.audio.play()
            })
        },
        jouer() {
            this.$refs.audio.play()
            this.isPlaying = true
        },
        arreter() {
            this.$refs.audio.pause()
            this.isPlaying = false
            this.tempsRestant = 0
        },
        miseAjour() {
            this.tempsActuel = this.$refs.audio.currentTime
            this.tempsRestant = this.song.temps - this.tempsActuel
        },
    },
    mounted() {
        /**
         * Récupération de la liste des chansons
         */
        fetch("data/chansons.json").then(response => {
            response.json().then(playlist => {
                this.songs = playlist
            })
        })

        this.$refs.audio.volume = this.volume
    }
}).mount('#app')