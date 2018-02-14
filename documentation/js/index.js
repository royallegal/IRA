import Vue         from 'vue';
import DocsMenu    from './components/docs-menu.vue';
import Colors      from './components/colors.vue';
import Buttons     from './components/buttons.vue';
import Articles    from './components/articles.vue';
import Collections from './components/collections.vue';
import Helpers     from './components/helpers.vue';
import Heroes      from './components/heroes.vue';
import Panels      from './components/panels.vue';
import Quizzes     from './components/quizzes.vue';
import Sidebars    from './components/sidebars.vue';
import Sliders     from './components/sliders.vue';


new Vue({
    el: '#documentation',
    components: {
        DocsMenu,
        Colors,
        Buttons,
        Articles,
        Collections,
        Helpers,
        Heroes,
        Panels,
        Quizzes,
        Sidebars,
        Sliders
    }
});
