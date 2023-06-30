import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import Echo from "laravel-echo"
import Pusher from 'pusher-js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
window.Pusher = Pusher

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_APP_WEBSOCKETS_KEY,
    wsHost: import.meta.env.VITE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    authEndpoint: import.meta.env.VITE_APP_API_URL + '/auth/profile',
    auth: {
        headers: {
            "Cache-Control": null,
            "X-Requested-With": null,
        }
    },

})

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(vuetify)
    .use(store)
    .use(VueSweetalert2)
    .mount('#app')
