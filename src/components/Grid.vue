<template>
  <div class="gridSaq">
    <div>
        <form id="search">
          Chercher <input name="query" v-model="filterKey">
        </form>


        <table>
            <thead>
              <tr>
                <th v-for="key in columns"
                  @click="sortBy(key)"
                  :class="{ active: sortKey == key }">
                  {{ key | capitalize }}
                  <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in filteredData">



                  
                <td v-for="key in columns">

                      
                    <div v-if="key === 'description'"  :id="entry['code'] | code"  :inner-html.prop="entry[key] | linkFilter(entry['lien'], entry['code'])" :ref="entry['code'] | code" @click="pushState(entry['code'], entry['lien'])">
                    </div>

                    <div v-if="key === 'code'" :inner-html.prop="entry[key] | code" :ref.prop="entry[key] | code">
                    </div>


                    <div v-if="key !== 'lien' && key !== 'code' && key !== 'description'"> 
                      {{ entry[key] | removeZero }}
                    </div>
                </td>
              </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },

  mounted: function () {
      debugger;
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;

      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    removeZero: function (value) {
        if (value === 0) {
            return "--";
        } else {
            return value;
        }
    },
    linkFilter: function (description, value, code) {
        if (typeof (code) === 'string') {
            code = code.replace('Code SAQ :', '').trim();
        } 
        var anchor = '#'  + code;
        return "<a href='" + anchor + "'>" + description + "</a>";
    },
    code: function (value) {
        if (typeof (value) === 'string') {
            return value.replace('Code SAQ :', '').trim();
        } else {
            return value;
        }
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    pushState: function (code, href) {
        this.$emit('linkClicked');
        if (typeof (code) === 'string') {
            code = code.replace('Code SAQ :', '').trim();
        }
        localStorage.setItem('lastClick', code);
        location.href = href;
    }
  }
}
</script>

<style>

    body {
      font-family: Helvetica Neue, Arial, sans-serif;
      font-size: 14px;
      color: #444;
    }

    .gridSaq {
        text-align: center
    }

    .gridSaq > div {
        display: inline-block;
    }

    table {
      border: 2px solid #42b983;
      border-radius: 3px;
      background-color: #fff;
    }

    th {
      background-color: #42b983;
      color: rgba(255,255,255,0.66);
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    td {
      background-color: #f9f9f9;
    }

    th, td {
      min-width: 120px;
      padding: 10px 20px;
    }

    th.active {
      color: #fff;
    }

    th.active .arrow {
      opacity: 1;
    }

    .arrow {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 0;
      margin-left: 5px;
      opacity: 0.66;
    }

    .arrow.asc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid #fff;
    }



</style>
