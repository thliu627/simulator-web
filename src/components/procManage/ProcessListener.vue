<template>
  <div>
    ProcessListener
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataList: [],
        currentApplicationId: '',
        applicationList: [{
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        }
        ],
        activeIndex: 0,
        authorityList: [],
        authorityTable: {
          pageSize: 10,
          totalCount: -1,
          currentPage: 1,
        },
        authority: {
          authorityId: '',
          name: '',
          path: '',
          method: '',
          remark: '',
          enabled: ''
        },
        formLoading: '',
        loading: '',
        httpMethod: [],
        enabledStatus: [],
        dialogTitle: '',
        dialogVisible: false,
      }
    },
    mounted: function () {
    },
    methods: {
      createProject () {
        this.$router.replace({
          path: '/config/simSoftware',
        })
      }
    }
  }
</script>
<style>
  .container {
    width: 100%;
    height: 100%;
  }
  .center {
    width: 50%;
    height: 10%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
  .border {
    width: 50%;
    height: 10%;
    overflow: auto;
    margin: auto;
    position: absolute;
    left: 0; bottom: 0; right: 0;
  }
</style>
