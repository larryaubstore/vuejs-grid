<template>
  <div id="app">

  </div>
</template>

<script>
import Vue                  from 'vue';
import Grid                 from './components/Grid.vue';
import * as axios           from 'axios';
import * as async           from 'async';

export default {
    name: 'app',
    mounted: async function () {

        var saqJson = null;
        
        try {
            saqJson = await axios.get('/saq.json');

            var saqJsonMapped = null;
            await async.map(saqJson.data, function(item, cb) {

                if (item.prix && item.prix.length > 0) {
                    item.prix = parseInt(item.prix); 
                }
                cb(null, item);
            }, function (err, results) {
                saqJsonMapped = results; 
            });
            debugger;

            var instance = new Vue({
              render: function (createElement) {
                return createElement('div',
                    Array.apply(null, { length: 1 }).map(function () {
                        return createElement(Grid, {
                            props: {
                                filterKey: '',
                                columns: ['text', 'code', 'lien', 'waCote', 'prix'],
                                // data: saqJson.data
                                data: saqJsonMapped
                            } 
                        })
                    }));
              },
              mounted: function () {
                  alert('test2');
              }
            });
            instance.$mount('#app');

        } catch(err) {
            alert('err => ' + err);
        }



    }
}
</script>

<style>

</style>
