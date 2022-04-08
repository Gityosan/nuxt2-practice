import Vue from 'vue'
import GmapVue from 'gmap-vue'

export default function ({ $config }) {
  Vue.use(GmapVue, {
    load: {
      key: $config.GOOGLE_MAPS_JS_API_KEY,
      libraries: 'places,visualization,drawing'
    },
    installComponents: true
  })
}
