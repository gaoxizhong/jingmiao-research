<template>
  <el-container>
    <!-- 主题开始 -->
    <div class="pagecontent-box">
      <div class="inside-content-box" id="inside-content-box">
      <!-- 搜索框模块开始 -->
        <div class="classinput-box">
          <div class="header-input-box">
            <el-input placeholder="请输入内容..." v-model="search" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
              <el-button slot="append" @click="getInputBtn">搜索</el-button>
            </el-input>
          </div>
        </div>
        <!-- 搜索框模块结束 -->
        <div class="content-box1">
          <div class="content-box1-left">
            <div class="title-info-box">
              <a href="javascript:0;" class="title-info-box-1" @click="orderClick()">
                <span style="margin-right:4px;">按年份排序</span>
                <i class="el-icon-sort" style="color:#2D5AFA;"></i>
              </a>
            </div>
            <div href="javascript:0;" class="grid-content bg-purple-dark" v-for="(item,index) in getListInfo" :key="index">
              <!-- 指南 -->
              <div class="guide_text">
                <div class="text_title_box">
                  <h1 class="text_title" :title="item.documentName">{{item.documentName?item.documentName:'无'}}</h1>
                  <a class="text_title_a" href="javascript:0;" @click.stop='openFulltxt(index)'>{{!showFull[index].status?'展开':'收起'}}</a>
                </div>
                <div class="guide_info_list" :class="{ cool: !showFull[index].status }">
                  <div class="one_info clearfix">
                    <label>发布日期：</label>
                    <p>{{item.year?item.year:'无'}}</p>
                  </div>
                  <div class="one_info clearfix">
                    <label>英文标题：</label>
                    <p>{{item.enTitle?item.enTitle:'无'}}</p>
                  </div>
                  <div class="one_info clearfix">
                    <label>数据来源：</label>
                    <p style="color:#2D5AFA;">{{item.source?item.source:'无'}}</p>
                  </div>
                  <div class="one_info clearfix">
                    <label>制定者：</label>
                    <p style="color:#2D5AFA;">{{item.constitutor?item.constitutor:'无'}}</p>
                  </div>
                  <div class="one_info clearfix">
                    <label>中文摘要：</label>
                    <div id="all_content">
                      <p>{{item.abstract_trans?item.abstract_trans:'无'}}</p>
                    </div>
                  </div>
                  <div class="one_info clearfix" style="margin-top:4px;">
                    <label>英文摘要：</label>
                    <div id="all_content">
                      <p>{{item.abstract?item.abstract:'无'}}</p>
                    </div>
                  </div>
                  <div class="asub-box">
                    <!-- <a :href="item.full_text_url?item.full_text_url:'javascript:0;'" :target="item.full_text_url?'_blank':''" :class="item.full_text_url?'asub-zaixian':'no-zaixian'"  @click.stop="goTofullText($event,item.full_text_url)"><i class="el-icon-reading"></i>原文链接</a> -->
                    <a :href="item.url?item.url:'javascript:0;'" :class="item.url?'asub-zaixian':'no-zaixian'" :target="item.url?'_blank':''" @click.stop="goToyuedu($event,item.url)"><i class="el-icon-reading"></i>pdf在线阅读</a>
                  </div>
                </div>
              </div>
            </div>
            <el-empty description="暂无数据"  v-if='!getListInfo || getListInfo.length == 0'></el-empty>
          </div>
        </div>
        <!-- 分页展示 -->
        <div class="pagination-box">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="count"
          :page-size="pageSize"
          :current-page='current_page'>
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 主题结束 -->
  </el-container>
</template>

<script>
  import { getLitgSearch } from "@/api/data"
  export default {
    name: 'DocumentGuidePages',
    components: {
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        is_search:true,
        main_bg:{},
        tag_pages:'Guide',
        id: 0,
        ////  以下文献指南数据
        search:'',
        getListInfo:[],
        current_page:1,
        pageSize: 10,
        active: true,
        count:0,
        cdssWidth: 420,
        cdssHeight: 430,
        tag: '',
        title: '诊断',
        is_show:false,
        is_Atlas:false,
        showFull: [],
        order:'desc',  // 年份排序  asc 正序  desc  倒序
      }
    },
    mounted(){

    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewWidth = getViewportSize.width;
      this.main_bg = this.$root.main_bg;  // 背景图
      this.id = Number(this.$route.query.id);
      // 获取列表
      this.getHomeRightList();
    },

    methods: {
      // 点击分页功能
      handleCurrentChange(val) {
        let that = this;
        that.current_page = val;
        that.getHomeRightList();
        // 回到顶部的方法。
         window.scrollTo(0,0);
      },
      // 回车键点击
      searchEnterFun(e){
        var keyCode = window.event?e.keyCode:e.which;
        if(keyCode == 13){
          this.getInputBtn();
        }
      },
      // 点击搜索
      getInputBtn(){
        let that = this;
        that.current_page = 1;
        that.getHomeRightList();
      },
      // 点击排序
      orderClick(){
        let that = this;
        let order = that.order;
        if(order === 'desc'){
          that.order = 'asc'
        }else if(order === 'asc'){
          that.order = 'desc'
        }
        that.getHomeRightList();
      },
      // 获取列表
      getHomeRightList(){
        let that = this;
        let search = that.search;
        let pearms  = {}
        if(!search || search == ''){
          pearms = {
            order:that.order,
            tag: 'Guide',
            is_search: 'notis',
            pn: that.current_page,
          }
        }else{
          pearms = {
            order: that.order,
            tag: 'Guide',
            is_search: 'is',
            search: that.search,
            pn: that.current_page,
          }
        }

        that.getListInfo = [];
        getLitgSearch(pearms).then( res =>{
          console.log(res.data)
          if(res.data.code == 0){
            let list = res.data.data.list;
            let arr = [];
            for(var key in list){
              arr.push(list[key])
            }
            let showFull =[];
            for (var i = 0; i < arr.length; i++) {
              let obj = {};
              obj.status = false;
              showFull.push(obj);
            }
            that.showFull = showFull;
            that.count = res.data.data.count;
            that.getListInfo= arr;
            console.log(that.getListInfo)
          }
        }).catch(e =>{
            console.log(e)
        })
      },
    //打开全文
    openFulltxt(idx) {
      let index = idx;
      this.showFull[index].status = !this.showFull[index].status
      this.showFull= this.showFull
    },
    // 点击原文链接
    goTofullText(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        // this.$message.error({
        //   message: '暂无数据'
        // });
        return
      }
    },
    // 点击在线阅读
    goToyuedu(event,u){
      let url = u;
      event.stopPropagation();
      if(!url || url == ''){
        // this.$message.error({
        //   message: '暂无数据'
        // });
        return
      }
    },
    setsickNess(){
      this.is_show = false;
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.is_show = true
      })
    },
    },
  }
</script>
<style scoped>
  .el-container{
    height: auto !important;
  }
  /* =================================  搜索框部分  =================================== */
  .inside-content-box{
    padding-top: 20px;
  }
  .classinput-box{
    margin: 0 auto;
  }
  .classinput-box /deep/.el-input-group--append .el-input__inner{
    flex: 1;
    border: 1px solid #bbbbbb;
  }
  .header-input-box{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
  }
  .header-input-box .input-with-select{
    width: 540px;
    display: flex;
    align-items: center;
    height: 35px;
    border-radius: 0px;
  }
  .header-input-box .input-with-select:focus{
    outline:none;
    border: 1px solid#2D5AFA;
  }
   .header-input-box /deep/.el-input-group__append{
    width: auto;
  }
  .header-input-box .el-button{ 
    background: #2D5AFA;
    color: #fff;
    border: 1px solid #2D5AFA;
    border-radius: 0;
    padding: 12px 36px;
  }
  .header-input-box-i{
    flex: 1;
    display: flex;
  }
  /* =================================  搜索框部分  =================================== */
  .pagination-box{
    padding: 30px 0;
  }
  .content-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 10px 12px;
  }
  .content-box1{
    display: flex;
    align-items: flex-start;
    padding-top:10px;
    padding-right:20px;
  }
  .content-box1-left{
    /* flex: 1; */
    width: 100%;
  }
  .content-box1-right{
    width: 420px;
    height: auto;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-input-box{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .el-select-box{
    width: auto;
    min-width: 120px;
  }
  .bg-purple-dark{
    padding: 0 10px;
    display: block;
    padding-bottom: 6px;
    cursor: pointer;
  }
  /* .bg-purple-dark:hover{
    opacity: 0.7;
  } */
  .title-info-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
    padding: 0 10px;
  }
  .title-info-box>div{
    color:#999;
  }
  .title-info-box-1{
    color:#999;
    display: inline-block;
    margin-right: 30px;
    font-size: 16px;
  }
  .title-info-box-1:hover{
    color: #D54B4B;
  }
  .item-title{
    width: auto;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 32px;
    color: #333333;
    opacity: 1;
    text-align: left;
    margin: 8px 0;
  }
  .tag-top-box{
    display: flex;
    align-items: flex-start;
    font-size:14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #777777;
  }
  .zuozhe-box{
    font-size: 14px;
    color: #333;
    width:55px;
    text-align:left;
    min-inline-size: fit-content;
  }
  .tap-top-span{
      display: flex;
      align-items: center;
  }
  .tap-top-span>a{
    margin-right: 4px;
    color: #2D5AFA;
    display: flex;
    flex-wrap: nowrap;
  }
  .tap-top-span>a:hover{
      color: #D54B4B;
  }
  .item-center-box{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    text-align: left;
    color: #707070;
    opacity: 0.8;
    margin: 10px 0;

  }
  .show-box.cool {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .item-center-box>span{
    color: #000;
  }
  .key-box{
    width: 100%;
    padding: 2px 0;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    opacity: 1;
    display: flex;
    align-items: flex-start;
    color: #333;
  }
  .keyspan-box{
    width:auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* -webkit-line-clamp: 1; */
    text-align: left;
    padding-left: 4px;
  }
  .keyspan-box>span{
    text-decoration: underline;
    color: #777777;
    padding: 1px 0;
    margin: 0 6px;
  }
  .keyspan-box>span.active{
    color: #D54B4B;
  }
  .zaixian{
    padding: 9px;
    color: #2D5AFA;
    border: 1px solid #2D5AFA;
    font-size: 14px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    align-items: center;
  }
  .el-icon-reading{
      margin-right: 6px;
  }
  .bubble-box{
    background:#F7F7F7;
    width: 100%;
    height: 440px;
  }
  .atlas-box{
    background:#F7F7F7;
    width: 100%;
    height: 440px;
    margin-top:20px;
  }
  .full_box{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .full_txt{
    width:auto;
    text-align: right;
    font-size: 14px;
    padding: 2px 20px;
  }
  .guide_text {
    padding-top: 6px;
    text-align: left;
    border-bottom: 1px #e9e9e9 solid;
    margin: 5px 0;
  }
  .text_title_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text_title {
    flex: 1;
    font-size: 16px;
    font-family: "微软雅黑";
    line-height: 30px;
    font-weight: normal;
    margin-bottom: 6px;
    position: relative;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    box-orient: vertical;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #313131;
    font-weight: bold;
    word-wrap:break-word;
 	  word-break:normal;
  }
  .text_title_a {
    width: 80px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #2D5AFA;
  }
  .guide_info_list.cool {
    height: 50px;
    overflow: hidden;
  }
  .clearfix {
    display: flex;
  }
  .one_info {
    margin-bottom: 2px;
    overflow: hidden;
  }
  .asub-box {
    width: 100%;
    padding: 8px 10px;
  }
  .one_info label {
    width: 98px;
    font-size: 14px;
    text-align: right;
    float: left;
    padding-right: 10px;
  }
  .one_info p {
    flex: 1;
    line-height: 20px;
    float: left;
    margin-top: 2px;
    font-size: 14px;
    color: #626262;
  }
  .one_info #all_content{
    flex: 1;
  }
  .asub-zaixian {
    color: #2D5AFA;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
  }
  .asub-zaixian .el-icon-reading {
    margin-right: 4px;
  }
  .asub-zaixian:hover{
    color: #2D5AFA;
  }
  .no-zaixian{
    color: #777777;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
    cursor: not-allowed;
  }
</style>
<style scoped>
  @media only screen and (max-width: 1390px){
    .zaixian {
      padding: 6px;
      font-size: 12px;
      margin: 6px 0;
      width: 78px;
    }
    .item-title{
      font-size: 17px;
      line-height: 25px;
      margin: 6px 0;
    }
    .el-icon-reading {
      margin-right: 0px;
    }
    .item-center-box{
      margin:4px 0;
    }
  }
</style>

