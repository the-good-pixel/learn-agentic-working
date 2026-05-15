import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import GitHubStar from './GitHubStar.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(GitHubStar),
    })
  },
}
