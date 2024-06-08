import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            activePage: "audioplayer",
            songs: [],
            song: "",
            tempsActuel: 0,
            tempsRestant: 0,
            isPlaying: false,
            volume: 0.5,
            search: "",
            h1: "Aucune chanson sélectionnée 😴",
            audioPath: "",
            volumeIcon: "volume_down"
        }
    },
    computed: {
        filteredSongs() {
            return this.songs.filter(song => {
                const matchTitre = song.titre.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                const matchArtiste = song.artiste.toLowerCase().indexOf(this.search.toLowerCase()) != -1

                return matchTitre || matchArtiste
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
        selectedSong(song) {
            this.song = song
            let url = this.song.audio
            this.audioPath = `data/${url}`
            
            this.$nextTick(() => {
                this.$refs.audio.load()
                this.$refs.audio.play()
            })
        },
        jouer() {
            if(this.song == "") {
                this.$refs.audio.pause()
            } else {
                this.isPlaying = true
                this.h1 = "Joue maintenant 😎"
                this.$refs.audio.play()
            }
        },
        arreter() {
            this.isPlaying = false
            this.h1 = "En pause 😴"
            this.$refs.audio.pause()
        },
        miseAjour() {
            this.tempsActuel = this.$refs.audio.currentTime
            this.tempsRestant = this.song.temps - this.tempsActuel

            if(this.tempsRestant <= 0) {
                this.tempsRestant = 0
            }
        },
        changeVolume() {
            this.$refs.audio.volume = this.volume
            if(this.volume == 0) {
                this.volumeIcon = "volume_off"
            } else if(this.volume > 0.5) {
                this.volumeIcon = "volume_up"
            } else if(this.volume < 0.5) {
                this.volumeIcon = "volume_down"
            }
        }
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