<template>
  <div class="el-input-box">
    <el-select class="el-select-box" v-model="select_1" slot="prepend" style="width:140px;" @change="selectchange">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"></el-option>
    </el-select>
    <!-- <el-autocomplete class="inline-input input-with-select" v-model="input3" :fetch-suggestions="querySearch"  placeholder="请输入内容" :trigger-on-focus="false" clearable>
      <el-button
        slot="append"
        type="success"
        icon="el-icon-search"
        @click="query"
      >搜索</el-button>
      </el-autocomplete> -->
      <el-input placeholder="请输入内容" v-model="name_1" class="input-with-select">
        <el-button slot="append" type="success" icon="el-icon-search" @click="getD3Search"></el-button>
      </el-input>
  </div>
</template>

<script>
import {getD3Search} from '@/api/data'
export default {
    props:['type'],
    data(){
        return {
            select_1:'请选择',
            options:[],
            selectcheng:'',
            tag:'',
            // 后台请求到的json数据
            data: require('../data/records.json'),
            results: []
        }
    },
    created(){
      this.type = this.type;
      console.log(this.type)
      if(this.type == 'xy'){
        this.options = [{label:'科普疾病',value:'SickNess'},{label:'医疗疾病',value:'Disease'},{label:'药品',value:'MedicineProduction'},{label:'检查',value:'Inspection'}]
      }
      if(this.type == 'zy'){
        this.options = [{label:'疾病',value:'zySickness'},{label:'中药',value:'CnMedicinalCrop'},{label:'中成药',value:'CnPatentMedicine'},{label:'方剂',value:'Prescription'},{label:'药膳',value:'TonicDiet'}]
      }
    },
    mounted(){
      this.$emit('getData', this.data)
      // this.results = this.loadAll()
    },
    methods:{
      selectchange(e){
          console.log(e)
          this.selectcheng = e;
          this.tag = e;
      },
      getD3Search() {
        let that = this;
        let pearms = {
          'name':that.input_name,
          'tag': that.tag
        }
        this.$emit('getData', this.data)

        getD3Search(pearms).then( res =>{
          if(res.data.code == 0){
            let data = res.data.data;
            that.data = data;
          }else{
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
            console.log(e)
        })
        // if (this.data.length <= 20) {
        //   this.data = require('../data/top5.json')
        // } else {
        //   this.data = require('../data/records.json')
        // }
      },
      // querySearch (queryString, cb) {
      //   console.log(1)
      // },
      // createFilter (queryString) {
      //   return (res) => {
      //     return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      //   }
      // },
      // 模拟加载数据
      // loadAll () {
      //   return [

      //   ]
      // },
    },
    computed:{
      input_name(){
        console.log(this.$store.state.input_name)
        return this.$store.state.input_name
      }
    }

}
</script>

<style scoped>
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .el-input-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-with-select{
    flex: 1;
  }
</style>
