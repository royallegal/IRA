<template>
    <div id='buttons' class='section scrollspy'>
        <h3>Buttons</h3>
        <ul class='tabs'>
            <li class='tab' v-for='(button, name) in buttons'>
                <a
                    :class='{"active": name === activeButtonName }'
                    :href='"#" + button.id '
                    style='text-transform: capitalize;'
                    @click='updateActiveButton( name )'
                >
                    {{ name }}
                </a>
            </li>
        </ul>
        <div  v-for='(button, name) in buttons' :id='button.id'>
            <table class="bordered responsive-table">
                <thead>
                    <tr>
                        <th v-for='value in button.values'>
                            {{ value }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='color in colors'>
                        <td v-for='value in button.values' :class='value+"-buttons"+" "+color+"-buttons"'>
                            <a :class='color+" "+value+" button"' href="#">
                                <i class="material-icons left" v-if='name === "size"'>beenhere</i>
                                {{value}}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
 export default {
     data() {
         return {
             colors:[
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
                 'steel',
                 'gray',
                 'white',
                 'disabled'
             ],
             buttons: {
                 'types': {
                     'id': 'types-buttons',
                     'values':[
                         'default',
                         'raised',
                         'ghost',
                         'rounded',
                     ]
                 },
                 'colors': {
                     'id': 'colors-buttons',
                     'values':[
                         'gradient',
                         'mix',
                         'to-white',
                         'to-blue'
                     ]
                 },
                 'shades': {
                     'id': 'shades-buttons',
                     'values':[
                         'light',
                         'dark',
                         'accent'

                     ]
                 },
                 'size': {
                     'id': 'size-buttons',
                     'values':[
                         'small',
                         'default',
                         'large'
                     ]
                 }
             },
             activeButtonName: 'types',
         }
     },

     methods: {
         updateActiveButton(name) {
             this.activeButtonName = name;
         }

     },
     created() {
         console.log('Buttons template created!');
     }
 }
</script>
