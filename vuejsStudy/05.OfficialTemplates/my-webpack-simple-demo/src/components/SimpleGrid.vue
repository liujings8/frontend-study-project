<template>
  <table>
    <thead>
    <tr>
      <th v-for="col in columns" v-on:click="sortBy(col)">
        {{ col | capitalize }}
        <span class="arrow" v-show="sortKey === col" v-bind:class="sortOrders[sortKey] > 0 ? 'asc' : 'dsc'"></span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="entry in orderBy(filterList)">
      <td v-for="col in columns ">
        {{entry[col]}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      data: Array,
      columns: Array,
      sortOrder: Object,
      filterKey: String
    },
    filters: {
      // 自定义filter
      capitalize: function csapitalize(value) {
        if (!value && value !== 0) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    },
    computed: {
      filterList: function () {
        var data = this.data, columns = this.columns, filterKey = this.filterKey;
        if (filterKey != null && filterKey != '') {
          // 复制对象
          var dataList = Object.assign([], data);
          return dataList.filter(function (item) {
            var result = false;
            columns.forEach(function (col) {
              if (item[col].toString().toLowerCase().indexOf(filterKey.toLowerCase()) != -1) {
                result = true;
              }
            });
            return result;
          })
        }
        return data;
      }
  },
    methods: {
      sortBy: function (col) {
        this.sortKey = col;
        this.sortOrders[col] *= -1;
      },
      orderBy: function (arr) {
        var sortKey = this.sortKey, direction = this.sortOrders[this.sortKey];
        if (sortKey != null && sortKey != '') {
          // 复制对象
          var dataList = Object.assign([], arr);
          if (direction == -1) {
            return dataList.sort(function (o1, o2) {
              return o1[sortKey].toString().localeCompare(o2[sortKey].toString());
            })
          } else if (direction == 1) {
            return dataList.sort(function (o1, o2) {
              return o2[sortKey].toString().localeCompare(o1[sortKey].toString());
            })
          }
        }
        return arr;
      }
    },
    data() {
      var sortOrders = {};
      this.columns.forEach(function (col) {
        sortOrders[col] = 1;
      });
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    }
  }
</script>
