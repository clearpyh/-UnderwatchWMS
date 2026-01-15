<template>
  <div class="app-container home">
    <div class="refresh-time">数据刷新时间：{{ nowTime }}</div>
    <div class="station-top">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="6">
          <el-tooltip placement="top" effect="light">
            <template #content>
              <div class="tooltip-list">
                <div>待入库：15</div>
                <div>待质检：15</div>
                <div>待上架：2</div>
                <div>待完成：1</div>
              </div>
            </template>
            <div class="top-item-box item-box-inbound" @click="goReceipt">
              <div class="item-left">
                <div class="item-title">入库</div>
                <div class="item-number">33</div>
              </div>
              <div class="item-right">
                <div>待入库：15</div>
                <div>待质检：15</div>
                <div>待上架：2</div>
                <div>待完成：1</div>
              </div>
            </div>
          </el-tooltip>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-tooltip placement="top" effect="light">
            <template #content>
              <div class="tooltip-list">
                <div>待配货：5</div>
                <div>待拣货：5</div>
                <div>待拣货：5</div>
                <div>待出库：5</div>
              </div>
            </template>
            <div class="top-item-box item-box-outbound" @click="goShipment">
              <div class="item-left">
                <div class="item-title">出库</div>
                <div class="item-number">20</div>
              </div>
              <div class="item-right">
                <div>待配货：5</div>
                <div>待拣货：5</div>
                <div>待拣货：5</div>
                <div>待出库：5</div>
              </div>
            </div>
          </el-tooltip>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-tooltip placement="top" effect="light">
            <template #content>
              <div class="tooltip-list">
                <div>待截单：5</div>
                <div>异常单：5</div>
                <div>今日到货：5</div>
              </div>
            </template>
            <div class="top-item-box item-box-other" @click="goWarehouse">
              <div class="item-left">
                <div class="item-title">其他</div>
                <div class="item-number">15</div>
              </div>
              <div class="item-right">
                <div>待截单：5</div>
                <div>异常单：5</div>
                <div>今日到货：5</div>
              </div>
            </div>
          </el-tooltip>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <el-tooltip placement="top" effect="light">
            <template #content>
              <div class="tooltip-list">
                <div>闽侯县：1</div>
                <div>鼓楼区：2</div>
                <div>仓山区：2</div>
              </div>
            </template>
            <div class="top-item-box item-box-warning" @click="goWarehouse">
              <div class="item-left">
                <div class="item-title">库存预警</div>
                <div class="item-number">5</div>
              </div>
              <div class="item-right">
                <div>闽侯县：1</div>
                <div>鼓楼区：2</div>
                <div>仓山区：2</div>
              </div>
            </div>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
    <div class="charts-grid">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div class="card-title">仓库货物占比</div>
            <div class="card-body">
              <StationPie height="100%" :pieData="pieData" legend-position="right" legend-orient="vertical"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card" shadow="never">
            <div class="card-header">
              <div class="card-title">生产入库趋势</div>
              <el-radio-group v-model="dateTab" @change="dateChange">
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">本年</el-radio-button>
              </el-radio-group>
            </div>
            <div class="card-body">
              <StationLine height="100%" :chartData="barChartData" :xName="barXName" yName="件" seriesName="入库数量" itemColor="#3671e8"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="showBottomCharts" :gutter="12">
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">仓库库存结构占比</div>
            <div class="card-body">
              <StationPie height="100%" :pieData="pieData" legend-position="right" legend-orient="vertical"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日每日订单量趋势</div>
            <div class="card-body">
              <StationBar height="100%" :chartData="ordersChart" :xName="'日'" :setting="{seriesName:'订单量', yName:'件'}" :barColor="['#75c7f7','#3671e8']" :showAvg="true"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日客户访问量趋势</div>
            <div class="card-body">
              <StationLine height="100%" :chartData="visitsChart" yName="人" seriesName="访问人数" itemColor="#5470c6" :tooltipFormatter="visitTooltipFormatter"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">近7日售后问题趋势</div>
            <div class="card-body">
              <StationMultiLine height="100%" :chartData="afterSaleChart" yName="件"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  </template>

<script setup name="Index">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import StationPie from '@/views/dashboard/components/StationPie.vue'
import StationBar from '@/views/dashboard/components/StationBar.vue'
import StationLine from '@/views/dashboard/components/StationLine.vue'
import StationMultiLine from '@/views/dashboard/components/StationMultiLine.vue'

const router = useRouter()
const nowTime = ref('')
const dateTab = ref('month')
const showBottomCharts = ref(false)
const barXName = ref('日')
const barChartData = ref({ xData: [], yData: [] })
const pieData = ref([
  { value: 40, name: '闽侯县' },
  { value: 30, name: '鼓楼区' },
  { value: 20, name: '仓山区' },
  { value: 10, name: '晋江区' },
  { value: 6, name: '高新区' }
])
const ordersChart = ref({ xData: [], yData: [] })
const visitsChart = ref({ xData: [], yData: [] })
const afterSaleChart = ref({
  xData: [],
  series: [
    { name: '退货', color: '#c7a428', data: [] },
    { name: '投诉', color: '#ee4368', data: [] },
    { name: '换货', color: '#5470c6', data: [] }
  ]
})

function updateRefreshTime() {
  nowTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
}

function dateChange(val) {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const x = []
  const y = []
  if (val === 'year') {
    for (let i = 0; i < month; i++) {
      x.push(moment().subtract(i, 'months').format('YYYY-MM'))
      y.push(Math.floor(Math.random() * (180 - 120 + 1)) + 120)
    }
    barXName.value = '月'
  } else {
    for (let i = 0; i < day; i++) {
      x.push(moment().subtract(i, 'days').format('MM-DD'))
      y.push(Math.floor(Math.random() * (30 - 15 + 1)) + 15)
    }
    barXName.value = '日'
  }
  barChartData.value = { xData: x.reverse(), yData: y }
  updateRefreshTime()
}

function initLineX() {
  const x = []
  for (let i = 0; i < 7; i++) {
    x.push(moment().subtract(i, 'days').format('MM-DD'))
  }
  const dx = x.reverse()
  ordersChart.value.xData = dx
  visitsChart.value.xData = dx
  afterSaleChart.value.xData = dx
  // 模拟数据
  ordersChart.value.yData = [50, 72, 45, 66, 38, 77, 59]
  visitsChart.value.yData = [120, 180, 90, 150, 130, 160, 175]
  afterSaleChart.value.series[0].data = [15, 12, 18, 22, 9, 16, 13]
  afterSaleChart.value.series[1].data = [6, 4, 9, 7, 5, 8, 6]
  afterSaleChart.value.series[2].data = [8, 10, 12, 6, 11, 9, 7]
}

const visitTooltipFormatter = (params) => {
  const p = Array.isArray(params) ? params[0] : params
  return `${p.axisValue}<br/>访问人数：${p.data}`
}

function goReceipt() {
  router.push('/warehouse/receipt')
}
function goShipment() {
  router.push('/warehouse/shipment')
}
function goWarehouse() {
  router.push('/warehouse')
}

onMounted(() => {
  updateRefreshTime()
  dateChange('month')
  initLineX()
})
</script>

<style scoped lang="scss">
.app-container {
  min-height: calc(100vh - 84px);
  padding: 12px 12px 0 12px;
}
.refresh-time {
  text-align: right;
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}
.station-top .top-item-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #ebeef5;
  transition: all 0.3s;
  cursor: pointer;
}
.station-top .top-item-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.item-left {
  flex: 2;
}
.item-right {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.item-title {
  font-size: 16px;
  color: #303133;
}
.item-number {
  text-align: center;
  margin-top: 30px;
  font-size: 26px;
  font-weight: bold;
}
.item-box-inbound {
  border-top: 4px solid #1a94db;
}
.item-box-inbound .item-number { color: #1a94db; }
.item-box-outbound {
  border-top: 4px solid #f56c6c;
}
.item-box-outbound .item-number { color: #f56c6c; }
.item-box-other {
  border-top: 4px solid #9177f1;
}
.item-box-other .item-number { color: #9177f1; }
.item-box-warning {
  border-top: 4px solid #f56c6c;
  background: #ffeaea;
}
.item-box-warning .item-number { color: #f56c6c; }
.box-card {
  height: 400px;
  margin-bottom: 12px;
  background-color: #fff;
  border-color: #ebe6f5;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}
.card-title {
  font-weight: bold;
  height: 30px;
  display: flex;
  align-items: center;
  color: #303133;
}
.card-title::before {
  content: '';
  height: 70%;
  width: 5px;
  background: #3671e8;
  margin-right: 8px;
  border-radius: 2px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-body {
  height: calc(100% - 30px);
}
.tooltip-list {
  font-size: 12px;
  line-height: 20px;
}
html.dark .station-top .top-item-box {
  background: #1d1e1f;
  color: #e5eaf3;
  border-color: #363637;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
html.dark .box-card {
  background-color: #1d1e1f;
  border-color: #363637;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
html.dark .item-box-warning {
  background: rgba(245, 108, 108, 0.1);
}
</style>
