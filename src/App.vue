<template>
   
  <div>
      <div id="app">

      </div>
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

                if (item.waCote && item.waCote.length > 0) {
                    item.waCote = parseInt(item.waCote); 
                } else {
                    item.waCote = 0;
                }

                if (item.wsCote && item.wsCote.length > 0) {
                    item.wsCote = parseInt(item.wsCote); 
                } else {
                    item.wsCote = 0;
                }

                cb(null, item);
            }, function (err, results) {
                saqJsonMapped = results; 
            });

            await async.map(saqJsonMapped, function(item, cb) {
                
                var remap = {
                    'description': item.text,
                    'code': item.code,
                    'lien': item.lien,
                    'WA': item.waCote,
                    'WS': item.wsCote,
                    'prix': item.prix
                };
                cb(null, remap);
            }, function (err, results) {
                saqJsonMapped = results; 
            });




            var instance = new Vue({
              render: function (createElement) {
                return createElement('div',
                    Array.apply(null, { length: 1 }).map(function () {
                        return createElement(Grid, {
                            props: {
                                filterKey: '',
                                columns: ['description',  'WS', 'prix'],
                                data: saqJsonMapped
                            } 
                        })
                    }));
              },
              mounted: function () {
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
