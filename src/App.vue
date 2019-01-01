<template>
  <div id="app">

  </div>
</template>

<script>
import Vue                  from 'vue';
import Grid                 from './components/Grid.vue'

export default {
    name: 'app',
    mounted: function () {

        var instance = new Vue({
          render: function (createElement) {
            return createElement('div',
                Array.apply(null, { length: 1 }).map(function () {
                    return createElement(Grid, {
                        props: {
                            filterKey: '',
                            columns: ['name', 'power'],
                            data: [
                              { name: 'Chuck Norris', power: Infinity },
                              { name: 'Bruce Lee', power: 9000 },
                              { name: 'Jackie Chan', power: 7000 },
                              { name: 'Jet Li', power: 8000 }
                            ] 
                        } 
                    })
                }));
          },
          mounted: function () {
              alert('test2');
          }
        });

        instance.$mount('#app');

    }
}
</script>

<style>

</style>
