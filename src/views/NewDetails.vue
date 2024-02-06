<template>
  <div class="pages-b">
    <!-- 主题开始 -->
    <div class="yp-position-box">
      <div class="col-left-title">
        <p :title="name">{{ name?name:'暂无' }}</p>
        <div>
          <a href="javascript:0;" class="cjyp-table-tr-r" style="font-weight: 100;font-size:13px;" @click.stop="clickCktp(name)">
            <i class="el-icon-share" style="color: #2D5AFA; margin-right: 6px"></i>查看图谱
          </a>
        </div>
       
      </div>
      <div class="info-box">
        <div class="yp-position-nbox" :class="is_nofr ?'':'is-nofr'" id="scrollBox">
          <div class="yp-info-box applications-content">
            <div class="activi-1">
              <div v-for="(item, index) in getinfo" :key="index" class="do-jump">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-text" v-if="item.tag != '' && item.is_list == 1">
                  <!-- <a class="item-text-a" @click="medicine_click(item.tag,items.kgid?items.name:items,items.kgid?items.kgid:'')" href="javascript:0;" v-for="(items,index) in item.text" :key="index">{{items.kgid?items.name:items}}</a> -->
                  <span class="item-text-a" v-for="(items, index) in item.text" :key="index">{{ items.kgid ? items.name : items }}</span>
                </div>
                <div class="item-text" style="white-space:pre-line" v-html='item.text ? item.text : "暂无数据"' v-else></div>
              </div>
            </div>
            <div v-if="getinfo.length <= 0" style="color: #999;">暂无数据...</div>
          </div>
        </div>
        <div class="fr" v-if="is_nofr">
          <div class="src-components-PushItems-DetailsModal-N686B">
            <div class="src-components-PushItems-DetailsModal-24j2q">
              <div class="src-components-PushItems-DetailsModal-1SgDc">
                <div class="src-components-PushItems-DetailsModal-31MMP" v-for="(item, index) in getinfo" :key="item.id" @click="jump(index)">
                  <div>
                    <span class="src-components-PushItems-DetailsModal-2NyER" :class="[index===activeMenu?'active':'']">
                      <div class="src-components-PushItems-DetailsModal-3KPN8">
                        <img v-if="index===activeMenu" class="src-components-PushItems-DetailsModal-1xqmn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAAb0lEQVQoU2O0nn9xK8P//14MxABGxv+MDAxrWBj44g4kKv5A1sJoPe/Cf2LMQNHEyLiThYEvANkwsgwCGcqIZhjZBqEbRpFBYO8yMc45mqCfSrFBjIyMs48k6qdRZBByOJFtEFUCG90QcMBTK0ECANYqQAtl57OTAAAAAElFTkSuQmCC" alt="" />
                        <span v-else class="src-components-PushItems-DetailsModal-2Fz4c"></span>
                      </div>
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主题结束 -->


    <!-- 点击图谱弹窗 -->
    <div class="casePop-mask" v-show="is_casePop"></div>
    <div class="casePop-module-box" v-show="is_casePop">
      <div class="close-box" @click="click_close">
        <i class="el-icon-circle-close"></i>
      </div>
      <div class="main-box">
        <!-- main 右侧图谱 -->
        <div class="main-box-left">
          <div class="main-box-left-t">
            <div style="font-weight: 600;text-align: left;">
              <i class="el-icon-share"></i> 疾病图谱
            </div>
          </div>
          <div class="atlas-box" id='atlas'>
            <!-- <d3Atlas
              :data="data"
              :labels="labels"
              :linkTypes="linkTypes"
              :width="cdssWidth"
              :height="cdssHeight"
              v-if="data.nodes.length > 0"/>
            <el-empty description="暂无数据..." v-if="!data.nodes || data.nodes.length <= 0"></el-empty> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 点击左侧病例弹窗结束 -->
  </div>
</template>

<script>
  // import DetailsMask from '../components/WesternMedicineCdss/DetailsMask';
  import References from "../components/References"; // 文献指南
  import d3Atlas from "../components/d3Atlas";
  import { getNewBaseDetail,getD3Search } from "@/api/data"
  export default {
    // provide(){
    //   return {
    //     setsickNess: this.setsickNess
    //   }
    // },
    name: 'NewDetails',
    components: {
      References,
      d3Atlas
      // DetailsMask
    },
    data(){
      return {
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        main_bg:{},
        tag_pages:'xyzsk',
        is_pages:'',
        name:'',
        tag:'',
        kgid:'',
        dabutes:[], //疾病的属性类数组
        li_index: 0,
        a_idx: 0,
        properties_name:'',
        data_type:'',  // 数据格式
        infoDetail_text:'',  // 字符串数据
        guide_list: [],  // 指南数组数据
        infoDetail_image:'', // 图像数据
        img_name:'',// 图像数据名称
        is_casePop:false,
        data: { //  图谱数据
          nodes: [],
          likes: [],
        },
        labels: [],
        linkTypes: [],
        cdssWidth: 800,
        cdssHeight: 600,
        id: 0,
        showFull: [],
        getinfo:[],
        is_nofr: true,
        activeMenu: 0,
        scrollBox:'',
        hot_name:'',
      }
    },
    mounted(){
      let that = this;
      // 获取滚动dom元素
      that.scrollBox = document.getElementById('scrollBox')
      const jump = $('.do-jump');
      const topArr = [];
      for (let i = 0; i < jump.length; i++) {
        topArr.push(jump.eq(i).position().top)
      }
    },
    created(){
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.main_bg = this.$root.main_bg;  // 背景图
      // 中西医页面进来 xyzsk：西医知识库页、zyzsk: 中医知识库页
      // this.tag_pages = this.$route.query.tag_pages;
      this.name = this.$route.query.name;
      this.tag = this.$route.query.tag?this.$route.query.tag:'';
      this.kgid = this.$route.query.kgid?this.$route.query.kgid:'';
      this.id = Number(this.$route.query.id);
      document.title = this.name;
      this.getNewBaseDetail();
    },

    methods: {
      setsickNess(){
        this.is_view = false;
        this.$nextTick(() => {
          this.is_view = true
          console.log(this.is_view)
        })
      },
      jump(i){
        let that = this;
        that.activeMenu = i; // 当前导航
        let jump = $('.do-jump').eq(i);
        let jumpTop = jump.position().top;
        let scrollBoxTop = that.scrollBox.scrollTop;
        // ==========================================
        let scrollTop = 0;
        if(scrollBoxTop < jumpTop){
          scrollTop = jumpTop + scrollBoxTop;
        }else{
          scrollTop = jumpTop;
        }
        // ==========================================

        // let scrollTop = jumpTop + scrollBoxTop;
        // Chrome
        that.scrollBox.scrollTo({
          top: scrollTop,
          behavior: 'smooth' // 平滑滚动
        })
      },
      //获取西医知识库详情页数据
      getNewBaseDetail(){
        let that = this;
        let params = {
          tag: that.tag,
          name: that.name
        };
        if(that.tag_pages == 'xyzsk'){
          params.type = '';
        }
        getNewBaseDetail(params).then(res =>{
          if(res.data.code == 0){
            let getinfo = res.data.data;
            that.name = getinfo.name.text;
            // let kgid = getinfo.kgid?getinfo.kgid.text:'';
            let getinfo_arr = [];
            for (let key in getinfo) {
              let is_list = 0;
              if (getinfo[key].text.name) {
                is_list = 1;
              }
              if (
                getinfo[key].name != "疾病名称" &&
                getinfo[key].text != "" &&
                getinfo[key].text != "[]" &&
                getinfo[key].name != "kgid"
              ) {
                getinfo_arr.push({
                  is_list,
                  name: getinfo[key].name,
                  text: getinfo[key].text.name
                    ? getinfo[key].text.name
                    : getinfo[key].text,
                  tag: getinfo[key].text.name ? getinfo[key].text.tag : "",
                });
              }
            }
            that.getinfo = getinfo_arr;
            console.log(that.getinfo)
          }
        }).catch( e =>{
          console.log(e)
        })
      },
      // 点击图谱弹窗关闭按钮
      click_close() {
        this.is_casePop = false;
      },
      // 点击疑似病例---  查看图谱
      clickCktp(){
        let that = this;
        that.is_casePop = true;
        that.getEacharts();
        // that.getD3Search(name,that.d3jsonParser);
      },
      // 获取图谱数据
      getD3Search(n,f) {
        let that = this;
        let name_1 = n;
        let pearms = {
          'name':name_1,
          'tag': that.tag
        }
        that.is_casePop = true;
        return
        getD3Search(pearms).then( res =>{
          if(res.data.code == 0){
            let data = res.data.data;
            // that.update(this.json);
            if( typeof(f) == "function"){
              that.is_casePop = true;
              return f(data);
            }
          }else{
            this.$message.error({
                message: res.data.msg
            });
          }
        }).catch(e =>{
          console.log(e)
          // that.update(this.json);
        })
      },
      // 解析图谱数据
      d3jsonParser(data) {
        let that = this;
        let _name = that.hot_name;
        const labels = [];
        const linkTypes = [""];
        const nodes = []; // 存放节点
        const links = []; // 存放关系
        const nodeSet = []; // 存放去重后nodes的id
        // 重新更改data格式
        for (let segment of data) {
          if (nodeSet.indexOf(segment.start.identity) == -1) {
            nodeSet.push(segment.start.identity);
            nodes.push({
              id: segment.start.identity,
              label: segment.start.labels[1],
              tag: segment.start.tag,
              properties: segment.start.properties,
            });
          }
          if (nodeSet.indexOf(segment.end.identity) == -1) {
            nodeSet.push(segment.end.identity);
            nodes.push({
              id: segment.end.identity,
              label: segment.end.labels[1],
              tag: segment.end.tag,
              properties: segment.end.properties,
            });
          }
          links.push({
            source: segment.relationship.start,
            target: segment.relationship.end,
            type: segment.relationship.type,
            properties: segment.relationship.properties,
          });
          if (labels.indexOf(segment.end.labels[1]) == -1) {
            labels.push(segment.end.labels[1]);
          }
          if (linkTypes.indexOf(segment.relationship.type) == -1) {
            linkTypes.push(segment.relationship.type);
          }

          if (labels.indexOf(segment.start.labels[1]) == -1) {
            labels.push(segment.start.labels[1]);
          }
        }
        labels.push("Att");
        linkTypes.push("att");
        that.linkTypes = linkTypes;
        that.labels = labels;
        that.data = { nodes, links };
        console.log(that.data.nodes);
      },
      // 点击原文链接
      goTofullText(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      // 点击在线阅读
      goToyuedu(event,u){
        let url = u;
        event.stopPropagation();
        if(!url || url == ''){
          return
        }
      },
      //打开全文
      openFulltxt(idx) {
        let index = idx;
        this.showFull[index].status = !this.showFull[index].status
        this.showFull= this.showFull
      },
      // 知识库相关图谱
      getEacharts(){
        let that = this;
        let newData = that.getinfo;
        let myChart = that.$echarts.init(document.getElementById('atlas'));
        var mWidth = $("#atlas").width();  // 获取父节点宽高
        var mHeight = $("#atlas").height();
        console.log(mWidth + ':' + mHeight)
        myChart.resize({width:mWidth, height:mHeight});  // 动态设置容器宽高
        console.log(newData)
        var baseName = that.name;
        var lines = [];
        var datas = [
          {
            name: baseName || "",
            draggable: true,
          },
        ];
        newData.forEach(ele =>{
          if(ele.name != baseName){
            datas.push({
              name: ele.name,
              target: ele.text,
              draggable: true,
            })
            lines.push({  // 关系连线
              source: baseName, // 起始节点
              target: ele.name, // 终止节点
              value: '', // 关系连线名称
            });
          }
        })
        
        var option = {
          title: {
            text: "",
          },
          tooltip: {
            show: true,
            trigger: 'item', // 触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发
            textStyle: {
              color: "#333",
            },
            borderWidth: 1,
            confine: true,
            width:'200',
            formatter: function (params) {
              var tipString = params.data.target;
              var arrText = [];
              var num = 70;
              for (let i = 0; i < tipString.length; i += num){
                // 分割总数据，每个子数组里包含个数为num
                arrText.push(tipString.slice(i, i + num))
              }
              var stringText = '';
              arrText.forEach(ele =>{
                stringText += ( ele + '</br>')
              })
              return  '<div style="text-align:left;">' + stringText + '</div>';
            }
          },
          animationDurationUpdate: 1500,
          toolbox: {
            show: true,
            itemSize: 14,
            right:-4,
            top: -4,
            feature: {
              saveAsImage: {}  // 导出图片
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
            },
          },
          series: [
            {
              type: "graph",
              layout: "force", //采用力引导布局
              symbolSize: 45,  // 球大小
              legendHoverLink: false, //启用图例 hover 时的联动高亮。
              focusNodeAdjacency: true, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
              roam: true,
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  textStyle: {
                    fontSize: 12,
                  },
                },
              },
              force: {
                repulsion: 400,
              },
              edgeSymbolSize: [4, 50],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10,
                  },
                  formatter: "{c}",
                },
              },
              categories: [
                {
                  itemStyle: {
                    normal: {
                      color: "#333",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#333",
                    },
                  },
                },
                {
                  itemStyle: {
                    normal: {
                      color: "#333",
                    },
                  },
                },
              ],
              data: datas,
              links: lines,
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 1,
                  curveness: 0,
                },
              },
            },
          ],
        };


        myChart.setOption(option);
      }


    },
  }
</script>
<style lang="scss" scoped>
  .el-container{
    height: auto !important;
  }
  /* ==============  滚动条样式   ==================== */
  ::-webkit-scrollbar { 
    width:8px; 
    height:10px; 
    background-color:#dfdbdb; 
  }
  /* 滚动条上的滚动滑块. */
  ::-webkit-scrollbar-thumb { 
    background-color:#2D5AFA; 
    border-radius: 50px;
  }
  /* ==============  滚动条样式   ==================== */
  .pagecontent-box{
    height: auto;
    background: #FFFFFF;
    padding: 12px;
  }
  .diseaseAttributes-box{
    width: 100%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #2D5AFA;
    padding-bottom: 6px;
    overflow: hidden;
  }
 .diseaseAttributes-title{
    height: 50px;
    line-height: 50px;
    background: linear-gradient(to bottom, #EEFFFA, #fff);
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px dashed #bdbdbd;
  } 
  .dabutes-c-box{
    width: 100%;
    padding: 0 10px;
  }
  .dabutes-centent-box{
    padding: 10px 0;
    height: auto;
    overflow-x: auto;
  }
  .dabutes-items-box{
    display: flex;
    white-space: nowrap;
  }
  .chapter{
    font-size: 16px;
    list-style: none;
    display: inline-block;
    padding-left: 10px;
    padding-bottom: 15px;
    text-align: center;
  }
  .chapter-title{
    width: 126px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    background: #AFE1D3;
    border-radius: 7px;
  }
  .chapter-li-box{
    margin-top: 10px;
    width: 126px;
    height: auto;
    background: #afe1d32e;
    border-radius: 0px 0px 7px 7px;
    text-align: center;
    padding: 4px 0;
  }
  .chapter-li-box>a{
    display: inline-block;
    width: 100%;
    font-size: 15px;
    padding: 4px 6px;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    box-orient: vertical;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .chapter-li-a:hover{
    color: #2D5AFA;
  }
  .cktp-span:hover{
    color: #2D5AFA;
  }
  .chapterA-active{
    color: #2D5AFA;
  }
  .attributeValue-box{
    margin-top:10px;
    padding:10px 0;
  }
  .infoDetail-box{
    width: 100%;
    padding: 0 10px;
  }
  .infoDetail-centent-box{
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #EAEAEA;
  }
  .close-box {
    position: absolute;
    top: -20px;
    right: -15px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: #333000;
  }
  .main-box {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .main-box-left {
    padding: 10px;
    width: 100%;
    height:100%;
  }
  .atlas-box {
    width: 760px;
    height:500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }

  .content-box1{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .content-box1>div.listItems-div{
    width: 25%;
    padding: 5px;
  }
  .listItems-n-div{
    width: 100%;
    height: auto;
    border: 1px solid #d4d4d4;
    display: inline-block;
    padding: 5px;
  }
  a.listItems-n-div:hover{
    color: #333;
  }
    .lower-img{
    width: 100%;
    height: 200px;
  }
  .lower-content{
    padding: 4px 0px 0px 0px;
  }
  .lower-content h6{
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .sj-sx-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
// ========================  图谱弹窗 ===========================

  .casePop-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: #33300080;
  }
  .casePop-module-box {
    width: 800px;
    height: 550px;
    background: #fff;
    border-radius: 6px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    padding: 10px;
  }
  .results_block {
    border-bottom: 1px solid #ececec;
    padding: 10px 20px;
    font-size: 12px;
    line-height: 24px;
    color: #666;
    display: block;
  }
  .results_name {
    float: left;
    width: 100%;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: left;
  }
  .clear {
    clear: both;
  }
  .results_time {
    width: 80px;
    float: right;
    text-align: right;
  }
  .results_infor{
    text-align: left;
  }
// =======================指南列表===========================
  .guide_text {
    padding-top: 6px;
    text-align: left;
    border-bottom: 1px #e9e9e9 solid;
    margin: 5px 0;
  }
  .text_title_box{
    display: flex;
  }
  .text_title_a{
    width: 80px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: rgb(250, 100, 0);
  }
  .text_title {
    flex:1;
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
  }
  .clearfix {
    display: flex;
  }
  .one_info {
    margin-bottom: 2px;
    overflow: hidden;
  }
  .one_info label {
    width: 98px;
    font-size: 14px;
    // font-weight: bold;
    text-align: right;
    float: left;
    padding-right: 10px;
  }
  .one_info p {
    flex: 1;
    // width: 595px;
    line-height: 20px;
    float: left;
    margin-top: 2px;
    font-size: 14px;
    color: #626262;
  }
  .clearfix:after {
    clear: both;
    content: ".";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }
  .one_info>div{
    flex: 1;
  }
  .editor_mirror {
    flex: 1;
    font: 14px/1.5 "宋体",Arial,Helvetica,sans_serif;
    background: #FFF;
    margin: 0 auto;
    width: 621px;
    border: none;
    height: auto;
    overflow: auto;
    margin: 0 auto;
    padding: 4px 12px;
  }
  .asub-box{
    width: 100%;
    padding: 8px 10px;
  }
  .zaixian{
    color: #2D5AFA;
    align-items: center;
    padding: 6px;
    font-size: 13px;
    margin: 4px;
    width: 64px;
  }
  .zaixian .el-icon-reading{
    margin-right: 4px;
  }
  .zaixian:hover{
    color: rgb(250, 100, 0);
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
  .guide_info_list.cool{
    height: 50px;
    overflow: hidden;
  }
// =======================指南列表===========================

  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
 
    .diseaseAttributes-title{
      height: 40px;
      line-height: 40px;
    }
    .chapter-title{
      width: 108px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
    }
    .chapter-li-box{
      width: 108px;
    }
    .chapter-li-box>a{
      font-size: 13px;
    }
    
  }


.yp-position-box {
  height: 100%;
  background: #fff;
  border-radius: 6px;
  // transform: translate(-50%, -50%);
  padding: 0 10px 10px;
  display: flex;
  flex-direction: column;
}
.info-box{
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 10px;
}
.yp-position-nbox{
  flex: 1;
  // min-height: 520px;
  // max-height: 680px;
  height: calc(100vh - 240px);
  padding: 0 10px;
  overflow-y: auto;
  position: relative; 
}
.fr{
  width: 300px;
  overflow: hidden;
}
.yp-position-nbox.is-nofr{
  padding: 0 10px 0 10px;
}
  .yp-info-box {
    width: 100%;
    height: auto;
    padding: 0 10px;
    font-size: 15px;
    text-align: left;
    position: relative;
  }
  .col-left-title {
    width: 100%;
    display: flex;
    align-items: center;

  }
  .col-left-title>div{
    width: 300px;
    text-align: right;
    padding-right: 15px;
  } 
  .col-left-title>div a{
    width: auto;
    padding: 10px 0;
  }
  .col-left-title>p{
    flex: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    line-height: 35px;
    color: #191919;
    cursor: pointer;
  }
  .activi-1{
    height: auto;
  }
  .item-name {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 30px;
    color: #1E1E1E;
    opacity: 1;
    text-align: left;
    padding-left: 0;
  }
  .item-text {
    font-size: 15px;
    font-family: Source Han Sans CN;
    line-height: 20px;
    color: #707070;
    opacity: 0.8;
    padding: 4px 10px 4px 10px;
    box-sizing: border-box;
    text-align: left;
    margin:4px 0;
  }
  .item-text-a{
    padding:4px 6px;
  }

.src-components-PushItems-DetailsModal-N686B {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.src-components-PushItems-DetailsModal-24j2q {
  background: #F5F6F7;
  border: 1px solid #F5F6F7;
  width: 100%;
  padding: 15px 20px;
  height: 100%;
}
.src-components-PushItems-DetailsModal-1SgDc {
  border-left: 2px solid #E0E2E3;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.src-components-PushItems-DetailsModal-31MMP {
  padding: 0 4px 0 20px;
  position: relative;
  text-align: left;
  flex: 1;
}
.src-components-PushItems-DetailsModal-2NyER {
  position: relative;
  color: #777777;
  font-size: 14px;
  cursor: pointer;
  line-height: 19px;
}
.src-components-PushItems-DetailsModal-2NyER.active{
  color: #2D5AFA;
}
.src-components-PushItems-DetailsModal-3KPN8 {
  display: inline-block;
  position: absolute;
  left: -25px;
  background: #F5F6F7;
}
.src-components-PushItems-DetailsModal-2Fz4c {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  margin-top: 5px;
  background-color: #E0E2E3;
  margin-right: 10px;
}
.src-components-PushItems-DetailsModal-1xqmn {
  position: relative;
  z-index: 20;
  left: -3px;
  top: 0;
}
.src-components-PushItems-DetailsModal-29LoG img {
  max-width: 100%;
}

</style>
