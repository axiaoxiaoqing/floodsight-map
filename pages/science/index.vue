<template>
  <view class="container">
    <view class="header">
      <text class="header-title">防汛科普知识</text>
      <text class="header-subtitle">掌握防汛知识，提升防灾能力</text>
    </view>

    <view class="content">
      <view class="knowledge-list">
        <view class="knowledge-card" v-for="item in knowledgeData" :key="item.id">
          <view class="card-header">
            <view class="card-icon">
              <text class="icon-text">{{ item.icon }}</text>
            </view>
            <view class="card-title-section">
              <text class="knowledge-title">{{ item.title }}</text>
              <view class="card-meta">
                <text class="meta-item">📅 {{ item.publishTime }}</text>
                <text class="meta-item">🏷️ {{ getCategoryName(item.categoryId) }}</text>
              </view>
            </view>
            <view class="card-toggle" @click="toggleCard(item.id)">
              <text class="toggle-icon">{{ expandedCards[item.id] ? '▼' : '▶' }}</text>
            </view>
          </view>

          <view class="card-content" v-show="expandedCards[item.id]">
            <!-- 预警信号等级详解 -->
            <view v-if="item.id === '1'" class="details-section">
              <view class="section-group">
                <text class="section-title">预警等级详解：</text>
                <view class="warning-grid">
                  <view 
                    v-for="level in item.details.levels" 
                    :key="level.name"
                    class="warning-item"
                    :style="{borderLeft: `6rpx solid ${level.color}`}"
                  >
                    <text class="warning-name">{{ level.name }}</text>
                    <view class="warning-info">
                      <text class="info-item">📊 {{ level.rainfall }}</text>
                      <text class="info-item">⚠️ {{ level.meaning }}</text>
                      <text class="info-item">⏰ {{ level.time }}</text>
                    </view>
                    <view class="action-list">
                      <text 
                        v-for="(action, index) in level.actions" 
                        :key="index"
                        class="action-item"
                      >
                        • {{ action }}
                      </text>
                    </view>
                  </view>
                </view>
              </view>

              <view class="section-group">
                <text class="section-title">发布标准：</text>
                <view class="standard-list">
                  <view 
                    v-for="standard in item.details.standards" 
                    :key="standard"
                    class="standard-item"
                  >
                    <text class="bullet">•</text>
                    <text class="standard-text">{{ standard }}</text>
                  </view>
                </view>
              </view>

              <view class="section-group">
                <text class="section-title">获取渠道：</text>
                <view class="channel-grid">
                  <view 
                    v-for="channel in item.details.channels" 
                    :key="channel"
                    class="channel-item"
                  >
                    {{ channel }}
                  </view>
                </view>
              </view>

              <view class="section-group">
                <text class="section-title">重要提醒：</text>
                <view class="reminder-list">
                  <view 
                    v-for="reminder in item.details.reminders" 
                    :key="reminder"
                    class="reminder-item"
                  >
                    <text class="reminder-icon">💡</text>
                    <text class="reminder-text">{{ reminder }}</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 暴雨应急准备 -->
            <view v-else-if="item.id === '2'" class="details-section">
              <view class="section-group">
                <text class="section-title">应急物资准备：</text>
                <view class="supply-categories">
                  <view 
                    v-for="supply in item.details.supplies" 
                    :key="supply.category"
                    class="supply-category"
                  >
                    <text class="category-title">{{ supply.category }}：</text>
                    <view class="supply-items">
                      <view 
                        v-for="supplyItem in supply.items" 
                        :key="supplyItem"
                        class="supply-item"
                      >
                        <text class="item-icon">✓</text>
                        <text class="item-text">{{ supplyItem }}</text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>

              <view class="section-group">
                <text class="section-title">家居安全措施：</text>
                <view class="safety-list">
                  <view 
                    v-for="safety in item.details.homeSafety" 
                    :key="safety"
                    class="safety-item"
                  >
                    <text class="safety-icon">🔒</text>
                    <text class="safety-text">{{ safety }}</text>
                  </view>
                </view>
              </view>

              <view class="section-group">
                <text class="section-title">信息与联络：</text>
                <view class="info-grid">
                  <view 
                    v-for="info in item.details.information" 
                    :key="info"
                    class="info-item"
                  >
                    <text class="info-icon">📱</text>
                    <text class="info-text">{{ info }}</text>
                  </view>
                </view>
              </view>

              <view class="section-group">
                <text class="section-title">特殊人群准备：</text>
                <view class="special-grid">
                  <view 
                    v-for="special in item.details.specialNeeds" 
                    :key="special"
                    class="special-item"
                  >
                    <text class="special-icon">👥</text>
                    <text class="special-text">{{ special }}</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 洪水安全转移 -->
            <view v-else-if="item.id === '3'" class="details-section">
              <view class="transfer-phase">
                <text class="phase-title">📝 转移前准备：</text>
                <view class="phase-content">
                  <view 
                    v-for="prep in item.details.preparation" 
                    :key="prep"
                    class="transfer-item"
                  >
                    <text class="transfer-icon">🔍</text>
                    <text class="transfer-text">{{ prep }}</text>
                  </view>
                </view>
              </view>

              <view class="transfer-phase">
                <text class="phase-title">🚶 转移安全措施：</text>
                <view class="safety-grid">
                  <view 
                    v-for="measure in item.details.safetyMeasures" 
                    :key="measure"
                    class="safety-card"
                  >
                    <text class="safety-bullet">•</text>
                    <text class="safety-text">{{ measure }}</text>
                  </view>
                </view>
              </view>

              <view class="transfer-phase">
                <text class="phase-title">🗺️ 转移路线选择：</text>
                <view class="route-list">
                  <view 
                    v-for="route in item.details.routes" 
                    :key="route"
                    class="route-item"
                  >
                    <text class="route-icon">📍</text>
                    <text class="route-text">{{ route }}</text>
                  </view>
                </view>
              </view>

              <view class="transfer-phase">
                <text class="phase-title">⚠️ 特殊情况处理：</text>
                <view class="emergency-grid">
                  <view 
                    v-for="situation in item.details.specialSituations" 
                    :key="situation"
                    class="emergency-item"
                  >
                    <text class="emergency-icon">🆘</text>
                    <text class="emergency-text">{{ situation }}</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 预警信号颜色含义 -->
            <view v-else-if="item.id === '4'" class="details-section">
              <view class="color-section">
                <text class="section-title">颜色含义详解：</text>
                <view class="color-grid">
                  <view 
                    v-for="color in item.details.colorMeanings" 
                    :key="color.colorName"
                    class="color-card"
                    :style="{borderColor: color.color}"
                  >
                    <view class="color-header">
                      <text class="color-name" :style="{color: color.color}">{{ color.colorName }}预警</text>
                      <text class="color-symbol">{{ color.emotion }}</text>
                    </view>
                    <text class="color-meaning">{{ color.meaning }}</text>
                    <text class="color-desc">{{ color.description }}</text>
                  </view>
                </view>
              </view>

              <view class="color-section">
                <text class="section-title">响应措施对比：</text>
                <view class="response-table">
                  <view class="table-row header">
                    <text class="table-cell">预警级别</text>
                    <text class="table-cell">政府响应</text>
                    <text class="table-cell">公众行动</text>
                  </view>
                  <view 
                    v-for="response in item.details.responseComparison" 
                    :key="response.level"
                    class="table-row"
                  >
                    <text class="table-cell level">{{ response.level }}</text>
                    <text class="table-cell">{{ response.government }}</text>
                    <text class="table-cell">{{ response.public }}</text>
                  </view>
                </view>
              </view>

              <view class="color-section">
                <text class="section-title">预警响应原则：</text>
                <view class="principle-grid">
                  <view 
                    v-for="principle in item.details.responsePrinciples" 
                    :key="principle"
                    class="principle-item"
                  >
                    <text class="principle-icon">⭐</text>
                    <text class="principle-text">{{ principle }}</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 城市内涝成因与预防 -->
            <view v-else-if="item.id === '5'" class="details-section">
              <view class="cause-section">
                <text class="section-title">内涝成因分析：</text>
                <view class="cause-types">
                  <view 
                    v-for="cause in item.details.causes" 
                    :key="cause.type"
                    class="cause-type"
                  >
                    <text class="type-title">{{ cause.type }}</text>
                    <view class="factors">
                      <view 
                        v-for="factor in cause.factors" 
                        :key="factor"
                        class="factor-item"
                      >
                        <text class="factor-bullet">•</text>
                        <text class="factor-text">{{ factor }}</text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>

              <view class="cause-section">
                <text class="section-title">防治措施：</text>
                <view class="measure-categories">
                  <view 
                    v-for="measure in item.details.preventionMeasures" 
                    :key="measure.category"
                    class="measure-category"
                  >
                    <text class="category-header">{{ measure.category }}</text>
                    <view class="measure-list">
                      <view 
                        v-for="m in measure.measures" 
                        :key="m"
                        class="measure-item"
                      >
                        <text class="measure-icon">🛠️</text>
                        <text class="measure-text">{{ m }}</text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>

              <view class="cause-section">
                <text class="section-title">个人防范要点：</text>
                <view class="personal-grid">
                  <view 
                    v-for="point in item.details.personalProtection" 
                    :key="point"
                    class="personal-item"
                  >
                    <text class="personal-icon">👤</text>
                    <text class="personal-text">{{ point }}</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 特大洪水应对案例 -->
            <view v-else-if="item.id === '6'" class="details-section">
              <view class="case-section">
                <text class="section-title">案例基本信息：</text>
                <view class="case-info">
                  <view class="info-row">
                    <text class="info-label">📍 发生地点：</text>
                    <text class="info-value">{{ item.details.caseInfo.location }}</text>
                  </view>
                  <view class="info-row">
                    <text class="info-label">📅 发生时间：</text>
                    <text class="info-value">{{ item.details.caseInfo.time }}</text>
                  </view>
                  <view class="info-row">
                    <text class="info-label">🌧️ 降雨强度：</text>
                    <text class="info-value">{{ item.details.caseInfo.rainfall }}</text>
                  </view>
                  <view class="info-row">
                    <text class="info-label">👥 转移人数：</text>
                    <text class="info-value">{{ item.details.caseInfo.transfer }}</text>
                  </view>
                </view>
              </view>

              <view class="case-section">
                <text class="section-title">应对过程：</text>
                <view class="process-stages">
                  <view 
                    v-for="stage in item.details.responseProcess" 
                    :key="stage.stage"
                    class="process-stage"
                  >
                    <text class="stage-title">{{ stage.stage }}</text>
                    <view class="stage-actions">
                      <view 
                        v-for="action in stage.actions" 
                        :key="action"
                        class="action-item"
                      >
                        <text class="action-bullet">→</text>
                        <text class="action-text">{{ action }}</text>
                      </view>
                    </view>
                    <text class="stage-result">效果：{{ stage.effectiveness }}</text>
                  </view>
                </view>
              </view>

              <view class="case-section">
                <text class="section-title">成功经验：</text>
                <view class="experience-grid">
                  <view 
                    v-for="experience in item.details.successExperiences" 
                    :key="experience"
                    class="experience-item"
                  >
                    <text class="experience-icon">✅</text>
                    <text class="experience-text">{{ experience }}</text>
                  </view>
                </view>
              </view>

              <view class="case-section">
                <text class="section-title">数据统计：</text>
                <view class="data-grid">
                  <view class="data-item">
                    <text class="data-value">{{ item.details.statistics.economicLoss }}</text>
                    <text class="data-label">经济损失</text>
                  </view>
                  <view class="data-item">
                    <text class="data-value">{{ item.details.statistics.preventedLoss }}</text>
                    <text class="data-label">避免损失</text>
                  </view>
                  <view class="data-item">
                    <text class="data-value">{{ item.details.statistics.rescueCount }}</text>
                    <text class="data-label">救援力量</text>
                  </view>
                  <view class="data-item">
                    <text class="data-value">{{ item.details.statistics.materialUsed }}</text>
                    <text class="data-label">物资投入</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="card-footer">
            <text class="footer-summary">{{ item.summary }}</text>
            <text class="footer-extra">{{ item.extraInfo }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 分类映射
const categoryMap = {
  '1': '预警系统',
  '2': '应急准备',
  '3': '安全转移',
  '4': '预警详解',
  '5': '内涝防治',
  '6': '案例分析'
}

// 卡片展开状态管理
const expandedCards = ref({})

// 切换卡片展开状态
const toggleCard = (cardId) => {
  expandedCards.value[cardId] = !expandedCards.value[cardId]
}

// 获取分类名称
const getCategoryName = (id) => {
  return categoryMap[id] || '防汛知识'
}

// 科普知识数据 - 详细内容
const knowledgeData = ref([
  {
    id: '1',
    title: '防汛预警信号等级详解',
    categoryId: '1',
    publishTime: '2024-06-01',
    summary: '了解不同颜色预警信号的具体含义和应对要求',
    icon: '🚨',
    extraInfo: '预警信号由气象和水文部门根据实时监测数据发布，请及时关注官方信息',
    details: {
      levels: [
        {
          name: '蓝色预警',
          color: '#1890ff',
          rainfall: '预计未来12小时降雨量50毫米以上',
          meaning: '可能发生洪水',
          actions: [
            '关注天气预报和预警信息',
            '检查家中排水设施是否通畅',
            '低洼地区居民注意防范',
            '避免前往河道、山区等危险区域'
          ],
          time: '未来12小时内可能发生'
        },
        {
          name: '黄色预警',
          color: '#faad14',
          rainfall: '预计未来6小时降雨量50毫米以上',
          meaning: '可能发生较重洪水',
          actions: [
            '做好防范准备工作',
            '检查应急物资是否齐全',
            '尽量避免外出活动',
            '山区注意防范山洪地质灾害'
          ],
          time: '未来6小时内可能发生'
        },
        {
          name: '橙色预警',
          color: '#fa8c16',
          rainfall: '预计未来3小时降雨量50毫米以上',
          meaning: '可能发生严重洪水',
          actions: [
            '启动应急预案',
            '组织危险区域人员转移准备',
            '停止户外作业和活动',
            '建筑工地停止施工'
          ],
          time: '未来3小时内可能发生'
        },
        {
          name: '红色预警',
          color: '#f5222d',
          rainfall: '预计未来3小时降雨量100毫米以上',
          meaning: '可能发生特别严重洪水',
          actions: [
            '立即停止所有户外活动',
            '迅速转移到安全地带',
            '听从指挥有序撤离',
            '相关部门全力组织抢险救援'
          ],
          time: '未来3小时内可能发生'
        }
      ],
      standards: [
        '蓝色预警：降雨量达50毫米/12小时',
        '黄色预警：降雨量达50毫米/6小时',
        '橙色预警：降雨量达50毫米/3小时',
        '红色预警：降雨量达100毫米/3小时'
      ],
      channels: [
        '电视、广播应急频道',
        '手机短信预警系统',
        '气象部门官方网站和APP',
        '社区广播、警报器',
        '社交媒体官方账号'
      ],
      reminders: [
        '预警信号升级很快，请保持关注最新信息',
        '不同地区的预警标准可能有所不同',
        '收到预警后要立即采取相应措施',
        '不要抱有侥幸心理，宁可十防九空'
      ]
    }
  },
  {
    id: '2',
    title: '暴雨来临前的应急准备清单',
    categoryId: '2',
    publishTime: '2024-05-28',
    summary: '详细列出暴雨前必须完成的准备工作',
    icon: '⚡',
    extraInfo: '建议每季度检查一次应急物资的有效期，确保随时可用',
    details: {
      supplies: [
        {
          category: '饮用水',
          items: ['每人每天至少3升', '储备3天量', '密封保存', '定期更换']
        },
        {
          category: '食品',
          items: ['方便面、压缩饼干', '罐头食品', '高能量零食', '婴儿特殊食品']
        },
        {
          category: '医疗用品',
          items: ['常用药品', '急救包', '消毒用品', '口罩、手套']
        },
        {
          category: '照明设备',
          items: ['手电筒', '头灯', '蜡烛', '火柴、打火机']
        },
        {
          category: '电源设备',
          items: ['充电宝', '应急电源', '备用电池', '太阳能充电器']
        }
      ],
      homeSafety: [
        '检查门窗密封性，加固薄弱部位',
        '清理阳台、屋顶排水口杂物',
        '将贵重物品、重要文件移至高处',
        '准备沙袋、挡水板等防水设施',
        '检查电路安全，准备绝缘工具',
        '固定室外易倒物品，防止被风吹落'
      ],
      information: [
        '保存当地防汛指挥部电话：12345',
        '了解最近避难场所位置及路线',
        '制定家庭紧急联络方案',
        '准备纸质地图（防止手机没信号）',
        '关注气象部门官方发布渠道',
        '安装防汛预警APP并开启通知'
      ],
      specialNeeds: [
        '为老人准备常用药品和保暖衣物',
        '为儿童准备足够的食物和玩具',
        '为孕妇准备产检资料和待产包',
        '为宠物准备足够的食物和水',
        '为行动不便者准备辅助设备'
      ]
    }
  },
  {
    id: '3',
    title: '洪水安全转移指南',
    categoryId: '2',
    publishTime: '2024-05-20',
    summary: '掌握正确的转移路线和注意事项',
    icon: '🚑',
    extraInfo: '转移时优先帮助老人、儿童和行动不便者',
    details: {
      preparation: [
        '保持冷静，不要惊慌失措',
        '收听官方信息，了解最新情况',
        '检查应急包，确保物资齐全',
        '确定家庭成员集合地点',
        '给手机充满电，备好充电宝',
        '告知亲友转移计划和目的地'
      ],
      safetyMeasures: [
        '听从统一指挥，有序撤离',
        '优先帮助老人、儿童、残疾人',
        '穿防滑鞋和颜色鲜艳的衣服',
        '随身携带应急包和重要物品',
        '使用木棍探路，避开急流',
        '避开电线杆、变压器等电力设施',
        '不要冒险涉水通过积水区域',
        '集体行动，互相照应'
      ],
      routes: [
        '选择高地、坚固建筑物作为目的地',
        '避开河道、低洼地区',
        '选择宽阔、平坦的道路',
        '避开桥梁、隧道等危险区域',
        '提前规划多条备用路线',
        '注意观察周围环境变化'
      ],
      specialSituations: [
        '如被洪水围困，立即拨打求救电话',
        '向高处转移，如屋顶、大树',
        '利用漂浮物进行自救',
        '发出求救信号（挥动衣物、使用哨子）',
        '保存体力，等待救援',
        '夜间打开手电筒或手机闪光灯'
      ]
    }
  },
  {
    id: '4',
    title: '预警信号的颜色含义',
    categoryId: '3',
    publishTime: '2024-05-15',
    summary: '不同颜色对应的灾害严重程度和响应措施',
    icon: '🎯',
    extraInfo: '红色预警发布时，应立即停止户外活动，迅速转移到安全地带',
    details: {
      colorMeanings: [
        {
          color: '#1890ff',
          colorName: '蓝色',
          meaning: '低风险警戒',
          description: '表示可能发生一般性洪水灾害',
          emotion: '保持警惕，正常生活'
        },
        {
          color: '#faad14',
          colorName: '黄色',
          meaning: '中度风险警告',
          description: '表示可能发生较重洪水灾害',
          emotion: '提高警惕，做好准备'
        },
        {
          color: '#fa8c16',
          colorName: '橙色',
          meaning: '高风险警报',
          description: '表示可能发生严重洪水灾害',
          emotion: '高度警惕，随时行动'
        },
        {
          color: '#f5222d',
          colorName: '红色',
          meaning: '最高风险紧急警报',
          description: '表示可能发生特别严重洪水灾害',
          emotion: '立即行动，确保安全'
        }
      ],
      responseComparison: [
        {
          level: '蓝色预警',
          government: '发布预警信息，加强值班值守',
          public: '关注天气预报，检查排水设施',
          special: '低洼地区居民注意防范'
        },
        {
          level: '黄色预警',
          government: '启动应急预案，组织巡查检查',
          public: '避免外出，做好应急准备',
          special: '山区注意防范山洪地质灾害'
        },
        {
          level: '橙色预警',
          government: '组织危险区域人员转移准备',
          public: '停止户外作业，准备转移',
          special: '建筑工地停止施工'
        },
        {
          level: '红色预警',
          government: '组织大规模人员转移和抢险救援',
          public: '立即转移到安全地带',
          special: '所有户外活动立即停止'
        }
      ],
      responsePrinciples: [
        '及时性原则：第一时间接收和响应预警',
        '针对性原则：根据不同级别采取相应措施',
        '协同性原则：政府、社会、个人共同行动',
        '预防性原则：宁可十防九空，不可失防万一',
        '科学性原则：基于数据和事实进行决策'
      ]
    }
  },
  {
    id: '5',
    title: '城市内涝成因与预防',
    categoryId: '1',
    publishTime: '2024-05-10',
    summary: '分析内涝原因并提出有效防范建议',
    icon: '🏙️',
    extraInfo: '海绵城市建设是解决城市内涝的重要措施',
    details: {
      causes: [
        {
          type: '气候因素',
          factors: [
            '极端降雨事件频发且强度增大',
            '短时强降雨超出排水系统设计能力',
            '气候变化导致降雨分布不均',
            '台风、暴雨等极端天气增多'
          ]
        },
        {
          type: '城市发展因素',
          factors: [
            '城市硬化地面比例过高（超过70%）',
            '自然渗水能力严重下降',
            '城市建设侵占河道、湖泊等蓄水空间',
            '地下空间开发影响排水系统'
          ]
        }
      ],
      preventionMeasures: [
        {
          category: '工程措施',
          measures: [
            '建设海绵城市：透水铺装、雨水花园',
            '升级排水管网：提高设计标准',
            '修建蓄滞洪区：缓解排水压力',
            '建设深层隧道：分流雨水'
          ]
        },
        {
          category: '管理措施',
          measures: [
            '完善应急预案体系',
            '建立智慧防汛系统',
            '加强跨部门协调联动',
            '定期演练和培训'
          ]
        }
      ],
      personalProtection: [
        '关注天气预报和内涝预警信息',
        '车辆不要停放在低洼地带',
        '地下室做好防水处理',
        '准备挡水板、沙袋等防水设施',
        '了解小区排水系统情况',
        '避免在暴雨期间外出'
      ]
    }
  },
  {
    id: '6',
    title: '特大洪水应对案例解析',
    categoryId: '4',
    publishTime: '2024-05-05',
    summary: '通过实际案例学习有效的应对策略',
    icon: '📊',
    extraInfo: '案例中的成功经验值得各地借鉴学习',
    details: {
      caseInfo: {
        location: '某长江中游省份',
        time: '2023年7月',
        rainfall: '24小时降雨量350毫米（突破历史极值）',
        affected: '12个市州、89个县市区受灾',
        transfer: '转移群众35万余人',
        duration: '整个应对过程持续15天'
      },
      responseProcess: [
        {
          stage: '预警阶段（提前48小时）',
          actions: [
            '气象部门提前48小时发布暴雨预警',
            '省防指立即启动四级应急响应',
            '向重点区域预置救援力量和物资',
            '通过全媒体平台发布预警信息'
          ],
          effectiveness: '为后续防灾工作争取了宝贵时间'
        },
        {
          stage: '响应阶段（暴雨期间）',
          actions: [
            '应急响应等级提升至一级',
            '派出工作组深入一线指导',
            '启用直升机进行空中侦察和救援',
            '专业救援队伍全力营救被困群众'
          ],
          effectiveness: '成功营救被困群众1.2万人'
        }
      ],
      successExperiences: [
        '预警及时准确，为防灾赢得了时间',
        '指挥体系高效，各部门协同有力',
        '救援力量专业，装备现代化程度高',
        '社会动员充分，志愿者作用显著',
        '信息发布透明，有效稳定社会情绪'
      ],
      statistics: {
        economicLoss: '约85亿元',
        preventedLoss: '估计避免经济损失120亿元',
        rescueCount: '出动救援力量3.2万人次',
        materialUsed: '投入防汛物资价值1.5亿元'
      }
    }
  }
])
</script>

<style scoped>
.container {
  padding: 20rpx;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 30rpx 0;
  margin-bottom: 20rpx;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #1a73e8;
  display: block;
  margin-bottom: 10rpx;
}

.header-subtitle {
  font-size: 26rpx;
  color: #666;
}

.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.knowledge-card {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 87, 255, 0.1);
  border: 1rpx solid #e0e0e0;
  transition: all 0.3s ease;
}

.knowledge-card:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 12rpx 40rpx rgba(0, 87, 255, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 25rpx;
  border-bottom: 2rpx solid #f0f0f0;
  padding-bottom: 20rpx;
}

.card-icon {
  background: rgb(194, 218, 255);
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.icon-text {
  font-size: 40rpx;
}

.card-title-section {
  flex: 1;
}

.card-toggle {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
  margin-left: 20rpx;
  transition: all 0.3s ease;
}

.card-toggle:active {
  background: #e0e0e0;
  transform: scale(0.95);
}

.toggle-icon {
  font-size: 24rpx;
  color: #666;
  transition: transform 0.3s ease;
}

.knowledge-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.card-meta {
  display: flex;
  gap: 20rpx;
}

.meta-item {
  font-size: 24rpx;
  color: #888;
}

/* 通用样式 */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 25rpx;
}

.section-group {
  margin-bottom: 20rpx;
}

.section-title {
  font-weight: bold;
  color: #1a73e8;
  font-size: 28rpx;
  display: block;
  margin-bottom: 15rpx;
}

/* 预警信号样式 */
.warning-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15rpx;
}

.warning-item {
  background: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
  border-left: 6rpx solid;
}

.warning-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.warning-info {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
  margin-bottom: 12rpx;
}

.info-item {
  font-size: 24rpx;
  color: #666;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 5rpx;
}

.action-item {
  font-size: 22rpx;
  color: #888;
  line-height: 1.4;
}

.standard-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.standard-item {
  display: flex;
  align-items: flex-start;
  gap: 10rpx;
}

.bullet {
  color: #1a73e8;
  font-size: 28rpx;
}

.standard-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.channel-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.channel-item {
  background: #e6f7ff;
  padding: 16rpx;
  border-radius: 8rpx;
  text-align: center;
  font-size: 26rpx;
  color: #1890ff;
}

.reminder-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.reminder-item {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
}

.reminder-icon {
  color: #52c41a;
  font-size: 28rpx;
}

.reminder-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

/* 应急准备样式 */
.supply-categories {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.supply-category {
  background: #fff7e6;
  border-radius: 12rpx;
  padding: 20rpx;
  border-left: 4rpx solid #faad14;
}

.category-title {
  font-weight: bold;
  font-size: 28rpx;
  color: #d48806;
  display: block;
  margin-bottom: 12rpx;
}

.supply-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rpx;
}

.supply-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.item-icon {
  color: #52c41a;
  font-size: 24rpx;
}

.item-text {
  font-size: 26rpx;
  color: #555;
}

.safety-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.safety-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: #f6ffed;
  border-radius: 8rpx;
}

.safety-icon {
  font-size: 28rpx;
}

.safety-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: #e6f7ff;
  border-radius: 8rpx;
}

.info-icon {
  font-size: 28rpx;
}

.info-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.special-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.special-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: #fff0f6;
  border-radius: 8rpx;
}

.special-icon {
  font-size: 28rpx;
}

.special-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

/* 安全转移样式 */
.transfer-phase {
  background: #f6ffed;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 15rpx;
}

.phase-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #389e0d;
  display: block;
  margin-bottom: 15rpx;
}

.phase-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.transfer-item {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
}

.transfer-icon {
  font-size: 28rpx;
  color: #389e0d;
}

.transfer-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.safety-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.safety-card {
  background: white;
  padding: 16rpx;
  border-radius: 8rpx;
  border-left: 4rpx solid #389e0d;
  display: flex;
  gap: 8rpx;
}

.safety-bullet {
  color: #389e0d;
}

.safety-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.route-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.route-icon {
  font-size: 28rpx;
  color: #389e0d;
}

.route-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.emergency-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.emergency-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: #fff1f0;
  border-radius: 8rpx;
}

.emergency-icon {
  font-size: 28rpx;
  color: #f5222d;
}

.emergency-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

/* 颜色含义样式 */
.color-section {
  margin-bottom: 20rpx;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15rpx;
}

.color-card {
  background: #fafafa;
  border-radius: 12rpx;
  padding: 20rpx;
  border: 2rpx solid;
  text-align: center;
}

.color-display {
  width: 100%;
  height: 60rpx;
  border-radius: 8rpx;
  margin-bottom: 15rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.1);
}

.color-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.color-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.color-symbol {
  font-size: 24rpx;
  color: #888;
}

.color-meaning {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 8rpx;
}

.color-desc {
  font-size: 24rpx;
  color: #888;
}

.response-table {
  border: 1rpx solid #e8e8e8;
  border-radius: 8rpx;
  overflow: hidden;
}

.table-row {
  display: flex;
  border-bottom: 1rpx solid #e8e8e8;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.header {
  background: #fafafa;
  font-weight: bold;
}

.table-cell {
  flex: 1;
  padding: 16rpx;
  font-size: 26rpx;
  color: #333;
  text-align: center;
}

.table-cell.level {
  font-weight: bold;
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.principle-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: #f6ffed;
  border-radius: 8rpx;
}

.principle-icon {
  font-size: 28rpx;
  color: #52c41a;
}

.principle-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

/* 内涝防治样式 */
.cause-types {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15rpx;
}

.cause-type {
  background: #f0f5ff;
  border-radius: 12rpx;
  padding: 20rpx;
  border-left: 4rpx solid #1a73e8;
}

.type-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #1a73e8;
  display: block;
  margin-bottom: 12rpx;
}

.factors {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.factor-item {
  display: flex;
  align-items: flex-start;
  gap: 8rpx;
}

.factor-bullet {
  color: #1a73e8;
}

.factor-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.measure-categories {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.measure-category {
  background: #fff7e6;
  border-radius: 12rpx;
  padding: 20rpx;
  border-left: 4rpx solid #faad14;
}

.category-header {
  font-size: 28rpx;
  font-weight: bold;
  color: #d48806;
  display: block;
  margin-bottom: 12rpx;
}

.measure-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.measure-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.measure-icon {
  font-size: 28rpx;
  color: #faad14;
}

.measure-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.personal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.personal-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: #e6f7ff;
  border-radius: 8rpx;
}

.personal-icon {
  font-size: 28rpx;
  color: #1890ff;
}

.personal-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

/* 案例分析样式 */
.case-info {
  background: #f0f5ff;
  border-radius: 12rpx;
  padding: 20rpx;
}

.info-row {
  display: flex;
  margin-bottom: 12rpx;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: bold;
  color: #1a73e8;
  font-size: 26rpx;
  min-width: 140rpx;
}

.info-value {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.process-stages {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.process-stage {
  background: #f6ffed;
  border-radius: 12rpx;
  padding: 20rpx;
  border-left: 4rpx solid #52c41a;
}

.stage-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #389e0d;
  display: block;
  margin-bottom: 15rpx;
}

.stage-actions {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  margin-bottom: 15rpx;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 10rpx;
}

.action-bullet {
  color: #389e0d;
  font-size: 24rpx;
}

.action-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.stage-result {
  font-size: 26rpx;
  color: #666;
  font-style: italic;
  padding-top: 10rpx;
  border-top: 1rpx dashed #d9d9d9;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.experience-item {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  padding: 16rpx;
  background: #f6ffed;
  border-radius: 8rpx;
}

.experience-icon {
  font-size: 28rpx;
  color: #52c41a;
}

.experience-text {
  font-size: 26rpx;
  color: #555;
  flex: 1;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15rpx;
}

.data-item {
  background: #e6f7ff;
  border-radius: 12rpx;
  padding: 20rpx;
  text-align: center;
}

.data-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #1a73e8;
  display: block;
  margin-bottom: 8rpx;
}

.data-label {
  font-size: 24rpx;
  color: #666;
}

/* 页脚样式 */
.card-footer {
  margin-top: 15rpx;
  padding-top: 15rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.footer-summary {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
}

.footer-extra {
  font-size: 24rpx;
  color: #666;
  font-style: italic;
}
</style>