<template>
    <div id="colors" class="section scrollspy">
        <h3>Colors</h3>
        <h6>Shades</h6>
        <div class="center-align">
            <div v-for="color in colors" :class='"flex-row"'>
                <div class="title swatch">
                    {{ color }}
                </div>
                <div v-for="shade in shades" :class="color+' '+shade+' swatch'">
                    {{ shade }}
                </div>
            </div>
        </div>

        <h6>Variants</h6>
        <div class="center-align">
            <div v-for="color in colors" :class='"flex-row"'>
                <div class="title swatch">
                    {{ color }}
                </div>
                <div v-for="variant in variants" :class="color+' '+variant+' swatch'">
                    {{ variant }}
                </div>
            </div>i
        </div>
    </div>
</template>

<script>
 export default {
     data() {
         return {
             colors: [
                 'pink',
                 'red',
                 'purple',
                 'blue',
                 'teal',
                 'green',
                 'yellow',
                 'orange',
                 'tan',
                 'brown',
                 'steel'
             ],

             shades: [
                 'light',
                 'base',
                 'dark'
             ],

             variants: [
                 'accent',
                 'gradient',
                 'mix'                 
             ]
         }
     },
     created() {
         console.log('Colors template created!');
     }
 }
</script>
