<template>
  <div class="app-container home">
    <div class="station-top">
      <el-row :gutter="12" class="mt5">
        <el-col :span="6">
          <div class="top-item-box item-box-one" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>入库</div>
              <div style="text-align:center;margin-top:30px;"><span class="item-highlight" style="font-size:26px;font-weight:bold;">{{ stats.inbound.total }}</span>
              </div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>待入库：{{ stats.inbound.pending }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top-item-box item-box-two" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>出库</div>
              <div style="text-align:center;margin-top:30px;"><span class="item-highlight" style="font-size:26px;font-weight:bold;"
              >{{ stats.outbound.total }}</span></div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>待配货：{{ stats.outbound.pending }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top-item-box item-box-three" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>其他</div>
              <div style="text-align:center;margin-top:30px;"><span class="item-highlight" style="font-size:26px;font-weight:bold;"
              >{{ stats.other.todayArrival }}</span></div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>今日到货：{{ stats.other.todayArrival }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top-item-box item-box-four" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>库存预警</div>
              <div style="text-align:center;margin-top:30px;"><span class="item-highlight" style="font-size:26px;font-weight:bold;">0</span>
              </div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>暂无数据</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="station-online">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card class="box-card" shadow="never">
            <div class="card-title">在线用户</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%" :chartData="onlineUserData" yName="人数" itemColor="#3ba272"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="station-capacity">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card class="box-card" shadow="never">
            <div class="card-title">仓库容量利用率</div>
            <div style="height: calc(100% - 30px);">
              <StationPie
                height="100%"
                :pieData="capacityData"
                unit="%"
                legend-position="right"
                legend-orient="vertical"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="station-inbound-status">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card class="box-card" shadow="never">
            <div class="card-title">通知公告</div>
            <div class="notice-list">
              <div
                class="notice-item"
                v-for="item in noticeList"
                :key="item.noticeId"
              >
                <div class="notice-title">
                  <dict-tag :options="sys_notice_type" :value="item.noticeType" style="margin-right: 5px; display: inline-block; vertical-align: middle;" />
                  <span :title="item.noticeTitle">{{ item.noticeTitle }}</span>
                </div>
                <div class="notice-time">{{ parseTime(item.createTime, '{y}-{m}-{d}') }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="station-middle" v-if="showCharts">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">仓库货物占比</div>
            <div style="height: calc(100% - 30px);">
              <StationPie height="100%"></StationPie>
              <div></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card class="box-card" shadow="never">
            <div style="display:flex;justify-content: space-between;align-items: center;">
              <div class="card-title">生产入库趋势</div>
              <el-radio-group v-model="tabPosition" @change="dateChange">
                <!-- <el-radio-button label="day">当日</el-radio-button> -->
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">今年</el-radio-button>
              </el-radio-group>
            </div>
            <div style="height: calc(100% - 30px);">
              <StationBar height="100%" :chartData="barChartData" :xName="barXName"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="station-bottom" v-if="showCharts">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日销售出库</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%" itemColor="#ee4368" yName="件" :chartData="lineDataOne"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日领料出库</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%" :chartData="lineDataTwo" yName="件" itemColor="#5470c6"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日移库</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%"  :chartData="lineDataThree" yName="件"
                           itemColor="#c58bea"
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日退货入库</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%" yName="件" :chartData="lineDataFour"
                           itemColor="#c7a428"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import StationPie from './components/StationPie.vue'
import StationLine from './components/StationLine.vue'
import StationBar from './components/StationBar.vue'
import { onMounted, ref, getCurrentInstance } from 'vue'
import moment from 'moment';
import { listNotice } from "@/api/system/notice";
import { listReceiptOrder } from "@/api/wms/receiptOrder";
import { listShipmentOrder } from "@/api/wms/shipmentOrder";
import { parseTime } from "@/utils/ruoyi";

const { proxy } = getCurrentInstance();
const { sys_notice_type } = proxy.useDict("sys_notice_type");
const noticeList = ref([]);

const stats = ref({
  inbound: { total: 0, pending: 0 },
  outbound: { total: 0, pending: 0 },
  other: { todayArrival: 0 },
  warning: { total: 0 }
});

function getStats() {
  // Inbound Total (Pending)
  listReceiptOrder({ orderStatus: 0, pageSize: 1 }).then(response => {
    stats.value.inbound.pending = response.total;
    stats.value.inbound.total = response.total;
  });

  // Outbound Total (Pending)
  listShipmentOrder({ orderStatus: 0, pageSize: 1 }).then(response => {
    stats.value.outbound.pending = response.total;
    stats.value.outbound.total = response.total;
  });

  // Other: Today's Arrival
  const now = new Date();
  const dateStr = parseTime(now, '{y}-{m}-{d}');
  const query = {
    pageNum: 1,
    pageSize: 1,
    params: {
      beginTime: dateStr + ' 00:00:00',
      endTime: dateStr + ' 23:59:59'
    }
  };
  listReceiptOrder(query).then(response => {
    stats.value.other.todayArrival = response.total;
  });
}

function getNoticeList() {
  listNotice({ pageNum: 1, pageSize: 6 }).then(response => {
    noticeList.value = response.rows;
  });
}

const tabPosition = ref('month')
const showCharts = ref(false)
const onlineUserData = ref({
  xData: [],
  yData: []
})
const capacityData = ref([
  { value: 35, name: '闽侯县' },
  { value: 22, name: '鼓楼区' },
  { value: 18, name: '仓山区' },
  { value: 15, name: '晋江区' },
  { value: 10, name: '高新区' }
])
const barChartData = ref({
  yData: [79, 68, 56, 72, 51, 63, 67, 71, 58, 81, 64, 77, 56, 69]
})
const barXName = ref('日')
const lineDataOne = ref({
  yData: [79, 65, 21, 67, 21, 89, 56],
})
const lineDataTwo = ref({
  yData: [45, 72, 16, 37, 64, 28, 46],
})
const lineDataThree = ref(
  {
    yData: [16, 27, 37, 16, 27, 21, 11],
  }
)
const lineDataFour = ref({
  yData: [134, 107, 94, 173, 37, 143, 86],
})

onMounted((()=>{
  initTime();
  dateChange('month');
  initOnlineUsers();
  getNoticeList();
  getStats();
}))

// 时间类型选择
function dateChange(value) {
  let date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let barXData = []
  let barYData = []
  if(value === 'year') {
    for(let i = 0; i < month; i++) {
      barXData.push(moment().subtract(i, 'months').format('YYYY-MM'))
      barYData.push(Math.floor(Math.random()*(180-120+1))+120)
    }
    barXName.value = '月'
  } else {
    for(let i = 0; i < day; i++) {
      barXData.push(moment().subtract(i, 'days').format('MM-DD'))
      barYData.push(Math.floor(Math.random()*(30-15+1))+15)
    }
    barXName.value = '日'
  }
  barChartData.value = {
    xData: barXData.reverse(),
    yData: barYData
  }
}
// 初始化时间模拟数据
function initTime() {
  let lineXData = []
  for(let i = 0; i < 7; i++) {
    lineXData.push(moment().subtract(i, 'days').format('MM-DD'))
  }
  lineXData = lineXData.reverse()
  lineDataOne.value.xData = lineXData
  lineDataTwo.value.xData = lineXData
  lineDataThree.value.xData = lineXData
  lineDataFour.value.xData = lineXData
}

function initOnlineUsers() {
  const x = []
  const y = []
  for (let i = 11; i >= 0; i--) {
    x.push(moment().subtract(i, 'hours').format('HH:mm'))
    y.push(Math.floor(Math.random() * (120 - 20 + 1)) + 20)
  }
  onlineUserData.value = {
    xData: x,
    yData: y
  }
}


</script>


<style scoped>
.app-container {
  min-height: calc(100vh - 84px);
  padding: 12px 12px 0 12px;
}

.top-item-box {
  height: 160px;
  background: #fff;
  margin-bottom: 12px;
  border-radius: 12px;
  color: #606266; /* 深色文字 */
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05); /* 柔和阴影 */
  transition: all 0.3s;
  border: 1px solid #ebeef5;
}

html.dark .top-item-box {
  background: #1d1e1f;
  color: #e5eaf3;
  border-color: #363637;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.top-item-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

html.dark .top-item-box:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

/* 移除原有渐变背景，改为顶部边框或左侧装饰以保留颜色标识 */
.item-box-one {
  /* background: linear-gradient(30deg, #1a94db, #4db1eb, #7acaf9); */
  border-top: 4px solid #1a94db;
}
.item-box-one .item-highlight { color: #1a94db; }

.item-box-two {
  /* background: linear-gradient(30deg, #c7a327, #d5ba47, #e3cf65); */
  border-top: 4px solid #d5ba47;
}
.item-box-two .item-highlight { color: #d5ba47; }

.item-box-three {
  /* background: linear-gradient(30deg, #6365f7, #9177f1, #cd8ee9); */
  border-top: 4px solid #9177f1;
}
.item-box-three .item-highlight { color: #9177f1; }

.item-box-four {
  /* background: linear-gradient(30deg, #ed3a60, #f1557a, #f67da0); */
  border-top: 4px solid #f1557a;
}
.item-box-four .item-highlight { color: #f1557a; }

.box-card {
  height: 400px;
  margin-bottom: 12px;
  background-color: #fff;
  border-color: #ebe6f5;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

html.dark .box-card {
  background-color: #1d1e1f;
  border-color: #363637;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}

.box-card >>> .el-card__body {
  height: 100%;
}

.station-inbound-status .box-card {
  height: 280px;
}
.station-inbound-status .notice-list {
  padding: 8px 4px 0 4px;
}
.station-inbound-status .notice-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  border-bottom: 1px dashed #ebeef5;
}
.station-inbound-status .notice-item:last-child {
  border-bottom: 0;
}
.station-inbound-status .notice-title {
  font-size: 14px;
  color: #303133;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 10px;
}
.station-inbound-status .notice-time {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
}

.card-title {
  font-weight: bold;
  height: 30px;
  display: flex;
  align-items: center;
  color: #303133;
}

html.dark .card-title {
  color: #e5eaf3;
}

.card-title::before {
  content: '';
  height: 70%;
  width: 5px;
  background: #3671e8;
  margin-right: 8px;
  border-radius: 2px;
}

.station-online .box-card {
  height: 320px;
}
.station-online .card-title {
  font-size: 16px;
  letter-spacing: 0.5px;
}
.station-online .card-title::before {
  background: #3ba272;
  width: 6px;
  border-radius: 3px;
}

.station-capacity .box-card {
  height: 360px;
}
.station-capacity .card-title::before {
  background: #75c7f7;
}

</style>
