<template>
    <ul class="hide-on-small-only table-of-contents">
        <li v-for='anchor in anchors'>
            <a :href='"#" + anchor'
               :class='{"active": activeListName === anchor}'
               style='text-transform: capitalize;'
               @click='updateActiveListName(anchor)'
            >{{ anchor }}</a>
        </li>
    </ul>
</template>

<script>
 export default {
     data() {
         return {
             anchors: [
                 'colors',
                 'gradients',
                 'helpers',
                 'articles',
                 'buttons',
                 'collections',
                 'heros',
                 'panels',
                 'quizzes',
                 'sidebars',
                 'sliders',
                 'documentation'
             ],
             activeListName: 'colors'
         }
     },
     methods: {
         updateActiveListName(anchor) {
             this.activeListName = anchor;
         }

     },
     created() {
         console.log('Table of contents template created!');
     }
 }
</script>
