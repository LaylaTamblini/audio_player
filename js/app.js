import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            // À CHANGER POUR 'accueil'
            pageActive: "audio-player"
        }
    },
    methods: {
        changerPage(page) {
            this.pageActive = page
        }
    },
    mounted() {

    }
}).mount('#app')