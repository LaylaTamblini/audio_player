import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            activePage: "home",
            songs: [],
            song: "",
            currentTime: 0,
            remainingTime: 0,
            isPlaying: false,
            volume: 0.5,
            search: "",
            h1: "Aucune chanson sélectionnée 😴",
            audioPath: "",
            volumeIcon: "volume_down"
        }
    },
    computed: {
        /**
         * Filtre les chansons en fonction de la recherche par titre ou artiste.
         * 
         * @returns array 
         */
        filteredSongs() {
            return this.songs.filter(song => {
                const matchTitre = song.titre.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                const matchArtiste = song.artiste.toLowerCase().indexOf(this.search.toLowerCase()) != -1

                return matchTitre || matchArtiste
            })
        }
    },
    methods: {
        /**
         * Change la page active de l'application et arrête la lecture audio au besoin.
         * 
         * @param string page 
         */
        switchPage(page) {
            if(this.isPlaying) {
                this.stop()
                this.activePage = page
            } else {
                this.activePage = page
            }
        },
        /**
         * Formate un temps en secondes en chaîne de caractères.
         * 
         * @param number temps 
         * @returns string
         */
        formatTime(time) {
            let minutes = (Math.floor(time / 60) + "").padStart(2, "0")
            let secondes = (Math.floor(time - minutes * 60) + "").padStart(2,"0")

            return `${minutes}:${secondes}`   
        },
        /**
         * Sélectionne une chanson, met à jour le chemin et démarre la lecture.
         * 
         * @param Object song 
         */
        selectedSong(song) {
            this.song = song
            let url = this.song.audio
            this.audioPath = `data/${url}`
            
            this.$nextTick(() => {
                this.$refs.audio.load()
                this.$refs.audio.play()
            })
        },
        /**
         * Démarre la lecture de la chanson et met à jour l'état de lecture.
         */
        play() {
            if(this.song == "") {
                this.$refs.audio.pause()
            } else {
                this.isPlaying = true
                this.h1 = "Joue maintenant 😎"
                this.$refs.audio.play()
            }
        },
        /**
         * Arrête la lecture de la chanson et met à jour l'état de lecture.
         */
        stop() {
            this.isPlaying = false
            this.h1 = "En pause 😴"
            this.$refs.audio.pause()
        },
        /**
         * Met à jour le temps actuel et le temps restant de la chanson.
         */
        update() {
            if (this.$refs.audio) {
                this.currentTime = this.$refs.audio.currentTime;
                this.remainingTime = this.song.temps - this.currentTime;
    
                if (this.remainingTime <= 0) {
                    this.remainingTime = 0;
                }
            }
        },
        /**
         * Modifie le volume de l'audio et met à jour l'icône du volume.
         */
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
         * Récupération de la liste des chansons.
         */
        fetch("data/chansons.json").then(response => {
            response.json().then(playlist => {
                this.songs = playlist
            })
        })

        /**
         * Cherche si l'élément audio est disponible dans le DOM.
         */
        this.$nextTick(() => {
            // Vérifie si l'audio existe
            if (this.$refs.audio) {
                // Si oui, change la valeur de volume
                this.$refs.audio.volume = this.volume
            }
        })
    }
}).mount('#app')