// YouTube网红信息平台数据总览系统
class InfluencerDashboard {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 5;
        this.currentTab = 'overview';
        this.currentDataType = 'fans';
        this.chart = null;
        this.radarChart = null;

        this.initializeElements();
        this.generateMockData();
        this.bindEvents();
        this.initializeChart();
        this.initializeRadarChart();
        // 显示默认页签内容
        this.showTabContent('overview');
        // 延迟初始化工具提示，确保DOM完全加载
        setTimeout(() => {
            this.initializeBarSegmentTooltips();
        }, 100);
    }

    // 初始化受众数据图表
    initializeAudienceCharts() {
        if (this.currentTab !== 'audience') return;

        this.initializeAgeChart();
        this.initializeGenderChart();
        this.initializeMarketingAnalysis();
        this.initializeContentInterestAnalysis();
        this.initializeFanCredibilityCharts();
    }

    // 初始化年龄分布图表
    initializeAgeChart() {
        if (!this.elements.ageChart) return;

        const ctx = this.elements.ageChart.getContext('2d');

        // 销毁现有图表
        if (this.ageChart) {
            this.ageChart.destroy();
        }

        this.ageChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                datasets: [{
                    label: '受众比例',
                    data: [8.2, 24.3, 22.1, 18.7, 14.2, 8.9, 3.6],
                    backgroundColor: [
                        '#FF6B35',
                        '#FF8A65',
                        '#FFB74D',
                        '#81C784',
                        '#64B5F6',
                        '#9575CD',
                        '#F06292'
                    ],
                    borderColor: [
                        '#FF6B35',
                        '#FF8A65',
                        '#FFB74D',
                        '#81C784',
                        '#64B5F6',
                        '#9575CD',
                        '#F06292'
                    ],
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#FF6B35',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return '年龄段: ' + context[0].label;
                            },
                            label: function(context) {
                                const percentage = context.parsed.y;
                                const count = Math.round((percentage / 100) * 1000000); // 假设总数为100万
                                const rankings = ['第一', '第二', '第三', '第四', '第五', '第六', '第七'];
                                const sortedData = [...context.dataset.data].sort((a, b) => b - a);
                                const rank = sortedData.indexOf(percentage) + 1;
                                return [
                                    '占比: ' + percentage + '%',
                                    '估计人数: ' + count.toLocaleString() + '人',
                                    '排名: ' + rankings[rank - 1] || '第' + rank
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            color: '#999',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#999',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // 初始化性别分布图表
    initializeGenderChart() {
        if (!this.elements.genderChart) return;

        const ctx = this.elements.genderChart.getContext('2d');

        // 销毁现有图表
        if (this.genderChart) {
            this.genderChart.destroy();
        }

        this.genderChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['男性', '女性'],
                datasets: [{
                    data: [52.4, 47.6],
                    backgroundColor: [
                        '#4285F4',
                        '#EA4335'
                    ],
                    borderColor: '#fff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#4285F4',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return '性别分布';
                            },
                            label: function(context) {
                                const percentage = context.parsed;
                                const count = Math.round((percentage / 100) * 1000000); // 假设总数为100万
                                return [
                                    context.label + ': ' + percentage + '%',
                                    '估计人数: ' + count.toLocaleString() + '人'
                                ];
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    // 初始化营销分析
    initializeMarketingAnalysis() {
        this.animateProgressBars();
        this.initializeMarketingData();
    }

    // 动画显示进度条
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.feedback-fill');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }, index * 200);
        });
    }

    // 初始化营销数据
    initializeMarketingData() {
        this.marketingData = {
            audienceFeedback: {
                positiveResponse: 61,
                interestedInPromotion: 60
            },
            consumerInfluence: {
                promotionAttractiveness: 3.5, // 3.5/5 stars
                promotionProfessionalism: 1.0  // 1/5 stars
            }
        };
    }

    // 高亮年龄组（点击交互）
    highlightAgeGroup(index) {
        const ageRanges = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
        const percentages = [8.2, 24.3, 22.1, 18.7, 14.2, 8.9, 3.6];

        const selectedRange = ageRanges[index];
        const selectedPercentage = percentages[index];

        // 显示详细信息（可以扩展为模态框或侧边栏）
        console.log(`选中年龄段: ${selectedRange}, 占比: ${selectedPercentage}%`);
    }

    // 初始化内容与兴趣分析
    initializeContentInterestAnalysis() {
        this.initializeContentDistributionChart();
        this.initializeContentData();
    }

    // 初始化内容分布图表
    initializeContentDistributionChart() {
        const canvas = document.getElementById('contentDistributionChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // 销毁现有图表
        if (this.contentChart) {
            this.contentChart.destroy();
        }

        this.contentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['汽车', '手机游戏', '家庭&时尚', '美妆&时尚', 'vlog'],
                datasets: [{
                    data: [32, 18, 17, 17, 17],
                    backgroundColor: [
                        '#4285F4',  // 汽车 - 蓝色
                        '#FF6B35',  // 手机游戏 - 橙色
                        '#34A853',  // 家庭&时尚 - 绿色
                        '#EA4335',  // 美妆&时尚 - 红色
                        '#9C27B0'   // vlog - 紫色
                    ],
                    borderColor: '#fff',
                    borderWidth: 3,
                    hoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const dataset = data.datasets[0];
                                        const value = dataset.data[i];
                                        return {
                                            text: `${label} ${value}%`,
                                            fillStyle: dataset.backgroundColor[i],
                                            strokeStyle: dataset.backgroundColor[i],
                                            lineWidth: 0,
                                            pointStyle: 'circle',
                                            hidden: false,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#4285F4',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return '内容分布';
                            },
                            label: function(context) {
                                const percentage = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const count = Math.round((percentage / 100) * 1000); // 假设总内容数为1000
                                return [
                                    context.label + ': ' + percentage + '%',
                                    '内容数量: ' + count + '个'
                                ];
                            }
                        }
                    }
                },
                cutout: '60%',
                interaction: {
                    intersect: false
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        this.highlightContentCategory(index);
                    }
                }
            }
        });
    }

    // 初始化内容数据
    initializeContentData() {
        this.contentData = {
            categories: [
                {
                    name: '汽车',
                    percentage: 32,
                    description: 'MrBeast的汽车主题内容获得观众高度关注，平均观看时长达7分14秒',
                    color: '#4285F4'
                },
                {
                    name: '手机游戏',
                    percentage: 18,
                    description: 'MrBeast在游戏领域的内容受到观众喜爱，观看完成度达到85%',
                    color: '#FF6B35'
                },
                {
                    name: '家庭&时尚',
                    percentage: 17,
                    description: 'MrBeast的家庭和时尚相关内容获得稳定关注，平均每个视频获得超过7415万次观看',
                    color: '#34A853'
                },
                {
                    name: '美妆&时尚',
                    percentage: 17,
                    description: 'MrBeast的美妆时尚类内容在年轻观众中表现出色，18-24岁观众占比达到71%',
                    color: '#EA4335'
                },
                {
                    name: 'vlog',
                    percentage: 17,
                    description: 'MrBeast的日常vlog内容获得观众真实反馈，观看完成度达94.4%',
                    color: '#9C27B0'
                }
            ]
        };
    }

    // 高亮内容类别（点击交互）
    highlightContentCategory(index) {
        const categories = this.contentData.categories;
        const selectedCategory = categories[index];

        // 高亮对应的详情项
        const detailItems = document.querySelectorAll('.content-detail-item');
        detailItems.forEach((item, i) => {
            item.classList.remove('highlighted');
            if (i === index) {
                item.classList.add('highlighted');
                // 滚动到对应项
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        console.log(`选中内容类别: ${selectedCategory.name}, 占比: ${selectedCategory.percentage}%`);
    }

    // 初始化内容数据图表
    initializeContentCharts() {
        if (this.currentTab !== 'content') return;

        this.initializeMetricCharts();
        this.initializeInteractionTrendsChart();
        this.initializePublishingCalendar();
        this.initializePublishingFrequencyChart();
        this.initializeContentData();
    }

    // 初始化指标图表
    initializeMetricCharts() {
        const metrics = [
            { id: 'interactionRateChart', value: 6.13, max: 10, color: '#FF6B35' },
            { id: 'viewRateChart', value: 94.85, max: 100, color: '#34A853' },
            { id: 'likeRateChart', value: 5.47, max: 10, color: '#4285F4' },
            { id: 'commentRateChart', value: 0.04, max: 1, color: '#EA4335' }
        ];

        metrics.forEach(metric => {
            const canvas = document.getElementById(metric.id);
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [metric.value, metric.max - metric.value],
                        backgroundColor: [metric.color, '#f0f0f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        });
    }

    // 初始化互动趋势图表
    initializeInteractionTrendsChart() {
        const canvas = document.getElementById('interactionTrendsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // 生成模拟数据
        const dates = [];
        const viewsData = [];
        const likesData = [];
        const commentsData = [];

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            dates.push(date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }));

            // 模拟数据，基于参考图片的趋势
            const baseViews = 150 + Math.random() * 100;
            viewsData.push(baseViews);
            likesData.push(baseViews * 0.05 + Math.random() * 2);
            commentsData.push(baseViews * 0.002 + Math.random() * 0.5);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: '观看数',
                        data: viewsData,
                        borderColor: '#4285F4',
                        backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '点赞数',
                        data: likesData,
                        borderColor: '#34A853',
                        backgroundColor: 'rgba(52, 168, 83, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '评论数',
                        data: commentsData,
                        borderColor: '#FF6B35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function(context) {
                                return '日期: ' + context[0].label;
                            },
                            label: function(context) {
                                const value = context.parsed.y;
                                const unit = context.datasetIndex === 0 ? '万' :
                                           context.datasetIndex === 1 ? '万' : '千';
                                return context.dataset.label + ': ' + value.toFixed(1) + unit;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            maxTicksLimit: 8,
                            color: '#999',
                            font: { size: 11 }
                        }
                    },
                    y: {
                        grid: { color: '#f0f0f0' },
                        ticks: {
                            color: '#999',
                            font: { size: 11 }
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }

    // 初始化发布日历
    initializePublishingCalendar() {
        const calendarGrid = document.getElementById('publishingCalendar');
        const monthDisplay = document.getElementById('monthDisplay');
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');

        if (!calendarGrid) return;

        // 当前显示的年月（2025年7月）
        let currentYear = 2025;
        let currentMonth = 6; // 7月（0-based）

        // 模拟发布日期（根据参考图片）
        const publishDates = [1, 2, 11]; // 1号、2号、11号有发布

        const renderCalendar = () => {
            // 更新月份显示
            monthDisplay.textContent = `${currentYear}-${currentMonth + 1}`;

            // 获取当月第一天和最后一天
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());

            calendarGrid.innerHTML = '';

            // 生成6周的日历（42天）
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);

                const dateElement = document.createElement('div');
                dateElement.className = 'calendar-date';
                dateElement.textContent = date.getDate();

                if (date.getMonth() !== currentMonth) {
                    dateElement.classList.add('other-month');
                } else if (publishDates.includes(date.getDate())) {
                    dateElement.classList.add('has-content');
                    dateElement.title = `发布了内容 (${date.getDate()}日)`;
                }

                calendarGrid.appendChild(dateElement);
            }
        };

        // 绑定导航按钮事件
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar();
            });
        }

        // 初始渲染
        renderCalendar();
    }

    // 初始化发布频率图表
    initializePublishingFrequencyChart() {
        const canvas = document.getElementById('publishingFrequencyChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // 根据截图的数据
        const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        const frequencies = [12.1, 15.9, 14.6, 15.5, 15.1, 12.6, 14.2]; // 百分比数据
        const colors = ['#FF6B35', '#FF6B35', '#FF6B35', '#FF6B35', '#FF6B35', '#FF6B35', '#FF6B35'];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weekdays,
                datasets: [{
                    label: '发布频率',
                    data: frequencies,
                    backgroundColor: colors,
                    borderRadius: 4,
                    borderSkipped: false,
                    barThickness: 20
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#FF6B35',
                        borderWidth: 1,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return '发布频率: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#999',
                            font: {
                                size: 10,
                                weight: '500'
                            },
                            maxRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 25,
                        grid: {
                            color: '#f0f0f0',
                            lineWidth: 1
                        },
                        ticks: {
                            display: false // 隐藏Y轴刻度
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 15,
                        bottom: 5,
                        left: 5,
                        right: 5
                    }
                },
                // 在柱状图顶部显示百分比
                animation: {
                    onComplete: function() {
                        const chart = this;
                        const ctx = chart.ctx;

                        ctx.font = '10px Arial';
                        ctx.fillStyle = '#666';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            meta.data.forEach((bar, index) => {
                                const data = dataset.data[index];
                                ctx.fillText(data + '%', bar.x, bar.y - 5);
                            });
                        });
                    }
                }
            }
        });
    }

    // 初始化内容数据
    initializeContentData() {
        this.contentMetrics = {
            interactionRate: { value: 6.13, status: 'moderate', range: '0.59%-2.6%' },
            viewRate: { value: 94.85, status: 'excellent', range: '0.13%-0.79%' },
            likeRate: { value: 5.47, status: 'moderate', range: '1.72%-4.41%' },
            commentRate: { value: 0.04, status: 'moderate', range: '0.04%-0.1%' }
        };

        this.topTags = [
            { name: '#barbarapalvin', percentage: 11.4, usage: '使用频率最高的个人标签' },
            { name: '#barbara', percentage: 11.4, usage: '简化版个人标签' },
            { name: '#foryoupage', percentage: 8.1, usage: '平台推荐标签' },
            { name: '#photoshoot', percentage: 7.3, usage: '摄影相关内容标签' },
            { name: '#fashion', percentage: 6.8, usage: '时尚类内容标签' }
        ];
    }

    // 初始化粉丝可信度图表
    initializeFanCredibilityCharts() {
        this.initializeAudienceTypeChart();
        this.initializeRealAudienceChart();
    }

    // 初始化受众类型饼图
    initializeAudienceTypeChart() {
        const canvas = document.getElementById('audienceTypeChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // 销毁现有图表
        if (this.audienceTypeChart) {
            this.audienceTypeChart.destroy();
        }

        this.audienceTypeChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['普通粉', '可疑粉', '僵尸粉', '网红粉'],
                datasets: [{
                    data: [76.8, 14.3, 6.2, 2.7],
                    backgroundColor: ['#4285F4', '#FF9800', '#4CAF50', '#9C27B0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#FF6B35',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // 初始化真实受众环形图
    initializeRealAudienceChart() {
        const canvas = document.getElementById('realAudienceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // 销毁现有图表
        if (this.realAudienceChart) {
            this.realAudienceChart.destroy();
        }

        this.realAudienceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [79.5, 20.5],
                    backgroundColor: ['#4285F4', '#f0f0f0'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }

    // 初始化DOM元素
    initializeElements() {
        this.elements = {
            dataGrid: document.getElementById('dataGrid'),
            tabBtns: document.querySelectorAll('.tab-button'),
            growthTabs: document.querySelectorAll('.growth-tab'),
            chartCanvas: document.getElementById('growthChart'),
            radarCanvas: document.getElementById('radarChart'),
            fansCount: document.getElementById('fansCount'),
            viewsCount: document.getElementById('viewsCount'),
            commentsCount: document.getElementById('commentsCount'),
            // 页签内容容器
            overviewTabContent: document.getElementById('overviewTabContent'),
            audienceTabContent: document.getElementById('audienceTabContent'),
            contentTabContent: document.getElementById('contentTabContent'),
            // 受众数据相关元素
            ageChart: document.getElementById('ageDistributionChart'),
            genderChart: document.getElementById('genderDistributionChart'),
            contentChart: document.getElementById('contentDistributionChart')
        };
    }
    
    // 生成模拟数据
    generateMockData() {
        this.basicData = [
            {
                title: '平均观看量',
                value: '997.04万',
                subtitle: '近期数据',
                description: '各项指标表现良好，观看量稳定增长'
            },
            {
                title: '平均互动量',
                value: '44.91万',
                subtitle: '近期数据',
                description: '互动率持续提升，用户参与度高'
            },
            {
                title: '内容数量',
                value: '30',
                subtitle: '近期数据',
                description: '内容发布频率稳定'
            },
            {
                title: '观看量/粉丝数',
                value: '14.51%',
                subtitle: '近期数据',
                description: '粉丝转化率表现良好'
            },
            {
                title: '预计曝光量',
                value: '982.61万',
                subtitle: '近期数据',
                description: '预计曝光量持续增长'
            }
        ];

        // 生成增长数据
        this.generateGrowthData();

        // 生成雷达图数据
        this.generateRadarData();
    }

    // 生成增长数据
    generateGrowthData() {
        const dates = [];
        const today = new Date();

        // 生成过去20天的日期
        for (let i = 19; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }));
        }

        this.growthData = {
            dates: dates,
            fans: {
                label: '粉丝数增长',
                data: this.generateCumulativeGrowthData(20, 0.5, 2.5),
                borderColor: '#1890ff',
                backgroundColor: 'rgba(24, 144, 255, 0.1)',
                barColor: '#1890ff'
            },
            views: {
                label: '播放量增长',
                data: this.generateCumulativeGrowthData(20, 0.8, 3.2),
                borderColor: '#52c41a',
                backgroundColor: 'rgba(82, 196, 26, 0.1)',
                barColor: '#52c41a'
            },
            posts: {
                label: '作品数增长',
                data: this.generateCumulativeGrowthData(20, 0.3, 1.8),
                borderColor: '#fa8c16',
                backgroundColor: 'rgba(250, 140, 22, 0.1)',
                barColor: '#fa8c16'
            }
        };
    }

    // 生成累积增长数据（相对于第1天的增长率）
    generateCumulativeGrowthData(count, minGrowth, maxGrowth) {
        const data = [];
        let cumulativeGrowth = 0;

        // 第一天的增长率为0
        data.push(0);

        // 从第二天开始，每天都有一定的增长，累积计算
        for (let i = 1; i < count; i++) {
            const dailyGrowth = Math.random() * (maxGrowth - minGrowth) + minGrowth;
            cumulativeGrowth += dailyGrowth;
            data.push(Math.round(cumulativeGrowth * 100) / 100);
        }
        return data;
    }

    // 生成雷达图数据
    generateRadarData() {
        this.radarData = {
            labels: ['内容质量', '粉丝增长', '互动质量', '发布频率', '品牌安全', '合作态度'],
            datasets: [{
                label: '评分指标',
                data: [85, 92, 78, 65, 88, 90], // 模拟评分数据 (0-100)
                backgroundColor: 'rgba(255, 107, 53, 0.2)',
                borderColor: '#FF6B35',
                borderWidth: 2,
                pointBackgroundColor: '#FF6B35',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#FF6B35'
            }]
        };
    }
    
    // 绑定事件
    bindEvents() {
        // 数据标签切换事件
        this.elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                if (tab) {
                    this.switchTab(tab);
                }
            });
        });

        // 增长数据标签切换事件
        this.elements.growthTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const dataType = e.target.dataset.type;
                if (dataType) {
                    this.switchGrowthDataType(dataType);
                }
            });
        });


    }
    
    // 切换数据标签
    switchTab(tab) {
        this.currentTab = tab;

        // 更新标签状态
        this.elements.tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });

        // 显示/隐藏对应的内容区域
        this.showTabContent(tab);
    }

    // 显示页签内容
    showTabContent(tab) {
        // 隐藏所有页签内容容器
        const allTabContents = [
            this.elements.overviewTabContent,
            this.elements.audienceTabContent,
            this.elements.contentTabContent,
            document.getElementById('brand-data'),
            document.getElementById('comingSoonContainer')
        ];

        allTabContents.forEach(content => {
            if (content) {
                content.style.display = 'none';
            }
        });

        // 显示对应的页签内容
        switch(tab) {
            case 'overview':
                if (this.elements.overviewTabContent) {
                    this.elements.overviewTabContent.style.display = 'block';
                    // 确保数据总览内容正确渲染
                    this.render();
                }
                break;
            case 'audience':
                if (this.elements.audienceTabContent) {
                    this.elements.audienceTabContent.style.display = 'block';
                    // 延迟初始化图表，确保DOM已渲染
                    setTimeout(() => {
                        this.initializeAudienceCharts();
                        // 重新初始化工具提示，确保在页签切换后正常工作
                        this.initializeBarSegmentTooltips();
                    }, 100);
                }
                break;
            case 'content':
                if (this.elements.contentTabContent) {
                    this.elements.contentTabContent.style.display = 'block';
                    // 延迟初始化内容数据图表，确保DOM已渲染
                    setTimeout(() => {
                        this.initializeContentCharts();
                    }, 100);
                }
                break;
            case 'brand':
                const brandDataContent = document.getElementById('brand-data');
                if (brandDataContent) {
                    brandDataContent.style.display = 'block';
                    // 延迟初始化品牌数据图表，确保DOM已渲染
                    setTimeout(() => {
                        this.initializeBrandCharts();
                    }, 100);
                }
                break;
        }
    }

    // 显示敬请期待页面
    showComingSoon(tab) {
        // 创建或获取敬请期待容器
        let comingSoonContainer = document.getElementById('comingSoonContainer');
        if (!comingSoonContainer) {
            comingSoonContainer = document.createElement('div');
            comingSoonContainer.id = 'comingSoonContainer';
            comingSoonContainer.className = 'tab-content';
            comingSoonContainer.style.display = 'none';

            // 将容器添加到主内容区域
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.appendChild(comingSoonContainer);
            }
        }

        // 设置敬请期待内容
        comingSoonContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #999;">
                <i class="fas fa-chart-line" style="font-size: 64px; margin-bottom: 20px; opacity: 0.3;"></i>
                <h3 style="font-size: 24px; margin-bottom: 12px; color: #666;">敬请期待</h3>
                <p style="font-size: 16px;">${this.getTabName(tab)}功能正在开发中</p>
            </div>
        `;

        // 显示敬请期待容器
        comingSoonContainer.style.display = 'block';
    }


    

    
    // 切换增长数据类型
    switchGrowthDataType(dataType) {
        this.currentDataType = dataType;

        // 更新标签状态
        this.elements.growthTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.type === dataType) {
                tab.classList.add('active');
            }
        });

        // 更新图表
        this.updateChart();
    }




    
    // 渲染基本数据卡片
    renderDataCards() {
        if (this.currentTab !== 'overview' || !this.elements.dataGrid) {
            return;
        }
        
        this.elements.dataGrid.innerHTML = this.basicData.map(item => `
            <div class="data-card">
                <h4>${item.title}</h4>
                <div class="data-value">${item.value}</div>
                <div class="data-subtitle">${item.subtitle}</div>
            </div>
        `).join('');
    }
    
    // 获取标签名称
    getTabName(tab) {
        const names = {
            'overview': '数据总览',
            'audience': '受众数据',
            'content': '内容数据',
            'brand': '品牌数据'
        };
        return names[tab] || '数据';
    }
    

    
    // 初始化图表
    initializeChart() {
        if (!this.elements.chartCanvas) return;

        const ctx = this.elements.chartCanvas.getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'line',
            data: this.getChartData(),
            options: this.getChartOptions()
        });
    }

    // 获取图表数据
    getChartData() {
        const currentData = this.growthData[this.currentDataType];

        return {
            labels: this.growthData.dates,
            datasets: [{
                label: currentData.label,
                data: currentData.data,
                borderColor: currentData.borderColor,
                backgroundColor: currentData.backgroundColor,
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
    }

    // 获取图表配置
    getChartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        color: '#999',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: '#f0f0f0'
                    }
                },
                x: {
                    ticks: {
                        color: '#999',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    radius: 3,
                    hoverRadius: 6
                }
            }
        };
    }

    // 更新图表
    updateChart() {
        if (!this.chart) return;

        this.chart.destroy();
        this.chart = new Chart(this.elements.chartCanvas.getContext('2d'), {
            type: 'line',
            data: this.getChartData(),
            options: this.getChartOptions()
        });
    }

    // 初始化雷达图
    initializeRadarChart() {
        if (!this.elements.radarCanvas) return;

        const ctx = this.elements.radarCanvas.getContext('2d');

        this.radarChart = new Chart(ctx, {
            type: 'radar',
            data: this.radarData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        grid: {
                            color: '#f0f0f0'
                        },
                        angleLines: {
                            color: '#f0f0f0'
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            },
                            color: '#666'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // 主渲染方法
    render() {
        this.renderDataCards();

        // 添加页面切换动画
        if (this.elements.dataGrid) {
            this.elements.dataGrid.style.opacity = '0';
            setTimeout(() => {
                this.elements.dataGrid.style.opacity = '1';
            }, 100);
        }
    }

    // 初始化条形图分段的工具提示
    initializeBarSegmentTooltips() {
        const barSegments = document.querySelectorAll('.bar-segment');

        barSegments.forEach(segment => {
            // 创建工具提示元素
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);

            // 鼠标进入事件
            segment.addEventListener('mouseenter', (e) => {
                const region = segment.dataset.region || segment.dataset.language;
                const percentage = segment.dataset.percentage;
                const color = segment.style.backgroundColor;

                // 设置工具提示内容
                tooltip.innerHTML = `
                    <span class="tooltip-icon" style="background-color: ${color};"></span>
                    <strong>${percentage}%</strong> ${region}
                `;

                // 显示工具提示
                tooltip.classList.add('show');
                this.updateTooltipPosition(e, tooltip);
            });

            // 鼠标移动事件
            segment.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e, tooltip);
            });

            // 鼠标离开事件
            segment.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }

    // 更新工具提示位置
    updateTooltipPosition(event, tooltip) {
        const rect = event.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // 计算位置（相对于页面，不是视口）
        let left = rect.left + scrollLeft + (rect.width / 2);
        let top = rect.top + scrollTop - 45; // 向上偏移45px显示在分段上方

        // 获取工具提示尺寸
        const tooltipRect = tooltip.getBoundingClientRect();

        // 防止工具提示超出屏幕左右边界
        if (left - tooltipRect.width / 2 < 10) {
            left = tooltipRect.width / 2 + 10;
        }
        if (left + tooltipRect.width / 2 > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width / 2 - 10;
        }

        // 防止工具提示超出屏幕顶部
        if (top < scrollTop + 10) {
            top = rect.top + scrollTop + rect.height + 10; // 显示在分段下方
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    // 初始化品牌数据图表
    initializeBrandCharts() {
        if (this.currentTab !== 'brand') return;

        this.initializeBrandTrendChart();
    }

    // 品牌合作趋势图表
    initializeBrandTrendChart() {
        const ctx = document.getElementById('brandTrendChart');
        if (!ctx) return;

        // 根据截图的精确数据
        const dates = ['2025-07-03', '2025-07-06', '2025-07-08', '2025-07-12', '2025-07-14'];
        const nonPromotedData = [19.47, 7.15, 21.82, 11.48, 24.14];
        const promotedData = [0, 0, 649.04, 0, 0];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: '推广',
                        data: promotedData,
                        borderColor: '#FF6B35',
                        backgroundColor: '#FF6B35',
                        borderWidth: 3,
                        fill: false,
                        tension: 0,
                        pointBackgroundColor: '#FF6B35',
                        pointBorderColor: '#FF6B35',
                        pointRadius: 4
                    },
                    {
                        label: '非推广',
                        data: nonPromotedData,
                        borderColor: '#4285F4',
                        backgroundColor: '#4285F4',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#4285F4',
                        pointBorderColor: '#4285F4',
                        pointRadius: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1500,
                        ticks: {
                            stepSize: 300,
                            callback: function(value) {
                                return value + '万';
                            },
                            color: '#666',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: '#e0e0e0',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#666',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'start',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12
                            },
                            color: '#333'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '万';
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        borderJoinStyle: 'round'
                    }
                }
            }
        });
    }
}

// 简化版网红搜索页功能类
class InfluencerSearchPage {
    constructor() {
        this.currentOffset = 0;
        this.pageSize = 20;
        this.searchResults = [];
        this.allInfluencers = this.generateMockInfluencers();
        this.isLoading = false;
        this.searchTimer = null;
        
        this.bindEvents();
        this.showEmptyState();
    }

    // 生成模拟网红数据
    generateMockInfluencers() {
        const influencerNames = [
            'MrBeast', 'PewDiePie', 'T-Series', 'Dude Perfect', 'Emma Chamberlain',
            'James Charles', 'David Dobrik', 'Charli D\'Amelio', 'Addison Rae', 'Zach King',
            'Liza Koshy', 'Ryan Kaji', 'Jeffree Star', 'Shane Dawson', 'Jacksepticeye',
            'Markiplier', 'VanossGaming', 'Ninja', 'DanTDM', 'Casey Neistat',
            '李子柒', '薇娅', '李佳琦', '罗永浩', '董宇辉',
            '何同学', '老番茄', '朱一旦', '半佛仙人', '毕导THU'
        ];
        
        const platforms = ['youtube', 'tiktok'];
        const categories = ['entertainment', 'lifestyle', 'gaming', 'beauty', 'tech', 'education', 'music', 'sports', 'food', 'travel'];
        const subCategories = ['vlog', 'tutorial', 'review', 'comedy', 'dance', 'music', 'news', 'kids'];
        const countries = ['美国', '印度', '英国', '加拿大', '澳大利亚', '德国', '法国', '日本', '韩国', '中国'];
        
        return Array.from({length: 200}, (_, i) => {
            const baseName = influencerNames[i % influencerNames.length];
            const name = i < influencerNames.length ? baseName : `${baseName} ${Math.floor(i / influencerNames.length)}`;
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const followers = Math.floor(Math.random() * 50000000) + 100000;
            const totalViews = Math.floor(followers * (5 + Math.random() * 20)); // 5-25倍粉丝数的总观看量
            const videoCount = Math.floor(Math.random() * 2000) + 50;
            const cooperationScore = Math.floor(Math.random() * 10) + 1;
            const engagementRate = (Math.random() * 15).toFixed(1);
            const viewsToFollowersRatio = (totalViews / followers * 100).toFixed(1);
            const estimatedReach = Math.floor(followers * (0.1 + Math.random() * 0.4)); // 10%-50%的预计曝光量
            
            // 随机选择2-4个标签
            const numTags = 2 + Math.floor(Math.random() * 3);
            const allTags = [...categories, ...subCategories];
            const tags = [];
            while (tags.length < numTags) {
                const tag = allTags[Math.floor(Math.random() * allTags.length)];
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            }
            
            return {
                id: i + 1,
                name: name,
                platform: platform,
                followers: followers,
                totalViews: totalViews,
                videoCount: videoCount,
                cooperationScore: cooperationScore,
                engagementRate: parseFloat(engagementRate),
                viewsToFollowersRatio: parseFloat(viewsToFollowersRatio),
                estimatedReach: estimatedReach,
                country: countries[Math.floor(Math.random() * countries.length)],
                tags: tags
            };
        });
    }

    // 绑定事件
    bindEvents() {
        const searchInput = document.getElementById('simple-search-input');
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (searchInput) {
            // 实时搜索（带防抖）
            searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchTimer);
                const query = e.target.value.trim();
                
                if (query === '') {
                    this.hideResultsContainer();
                    return;
                }
                
                this.searchTimer = setTimeout(() => {
                    this.performSearch(query);
                }, 300);
            });
        }
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    }
    
    // 执行搜索
    performSearch(query) {
        this.currentOffset = 0;
        this.searchResults = this.allInfluencers.filter(influencer => 
            influencer.name.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayResults();
    }
    
    // 显示搜索结果
    displayResults() {
        const resultsList = document.getElementById('search-results-list');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const resultsContainer = document.querySelector('.search-results-container');
        
        // 显示结果容器
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
        }
        
        if (this.searchResults.length === 0) {
            resultsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>没有找到匹配的网红</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        const endIndex = Math.min(this.currentOffset + this.pageSize, this.searchResults.length);
        const currentBatch = this.searchResults.slice(this.currentOffset, endIndex);
        
        if (this.currentOffset === 0) {
            resultsList.innerHTML = '';
        }
        
        currentBatch.forEach(influencer => {
            resultsList.insertAdjacentHTML('beforeend', this.createInfluencerCard(influencer));
        });
        
        // 绑定卡片点击事件
        const newCards = resultsList.querySelectorAll('.simple-influencer-card:not([data-bound])');
        newCards.forEach(card => {
            card.setAttribute('data-bound', 'true');
            card.addEventListener('click', () => {
                this.goToInfluencerDetail(card.dataset.influencerId);
            });
        });
        
        // 更新加载更多按钮状态
        if (endIndex < this.searchResults.length) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.disabled = false;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // 创建网红卡片
    createInfluencerCard(influencer) {
        const platformIcon = influencer.platform === 'youtube' ? 'fa-youtube' : 'fa-tiktok';
        const platformClass = influencer.platform;
        
        // 生成标签HTML
        const tagsHtml = influencer.tags.slice(0, 3).map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        
        return `
            <div class="simple-influencer-card" data-influencer-id="${influencer.id}">
                <div class="simple-influencer-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                
                <div class="influencer-basic-info">
                    <div class="simple-influencer-name">${influencer.name}</div>
                    <div class="influencer-tags">
                        ${tagsHtml}
                        ${influencer.tags.length > 3 ? '<span class="tag-more">...</span>' : ''}
                    </div>
                    <div class="basic-stats">
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>${this.formatNumber(influencer.followers)}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-eye"></i>
                            <span>${this.formatNumber(influencer.totalViews)}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-video"></i>
                            <span>${influencer.videoCount}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${influencer.country}</span>
                        </div>
                    </div>
                </div>
                
                <div class="cooperation-info">
                    <div class="cooperation-title">合作倾向</div>
                    <div class="cooperation-metrics">
                        <div class="metric-item">
                            <span class="metric-label">合作倾向</span>
                            <span class="metric-value cooperation-score">
                                <i class="fas fa-heart"></i>
                                ${influencer.cooperationScore}/10
                            </span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">观看量/粉丝数</span>
                            <span class="metric-value">${influencer.viewsToFollowersRatio}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">粉丝互动率</span>
                            <span class="metric-value">${influencer.engagementRate}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">预计曝光量</span>
                            <span class="metric-value">${this.formatNumber(influencer.estimatedReach)}</span>
                        </div>
                    </div>
                </div>
                
            </div>
        `;
    }
    
    // 格式化数字
    formatNumber(num) {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + '亿';
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        }
        return num.toLocaleString();
    }
    
    // 加载更多
    loadMore() {
        this.currentOffset += this.pageSize;
        this.displayResults();
    }
    
    // 显示空状态
    showEmptyState() {
        const resultsList = document.getElementById('search-results-list');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const resultsContainer = document.querySelector('.search-results-container');
        
        // 初始状态隐藏结果容器
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        
        resultsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>输入网红名称开始搜索</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
    }
    
    // 隐藏结果容器
    hideResultsContainer() {
        const resultsContainer = document.querySelector('.search-results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        this.searchResults = [];
        this.currentOffset = 0;
    }
    
    // 跳转到达人详情页
    goToInfluencerDetail(influencerId) {
        // 这里可以实现跳转逻辑
        // 例如：显示详情页面或者跳转到新页面
        const pageManager = window.pageManager;
        if (pageManager) {
            // 先显示达人页面
            pageManager.showPage('dashboard');
            
            // 可以传递参数或触发详情页面的显示
            console.log(`查看网红详情: ID ${influencerId}`);
        }
    }
}

// 页面导航管理器
class PageManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.influencerDashboard = null;
        this.influencerSearchPage = null;
        
        this.bindNavigationEvents();
        this.initializePages();
    }

    // 绑定导航事件
    bindNavigationEvents() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const targetPage = item.dataset.page;
                this.showPage(targetPage);
            });
        });
    }

    // 显示指定页面
    showPage(pageId) {
        // 隐藏所有页面
        document.querySelectorAll('.page-content').forEach(page => {
            page.style.display = 'none';
        });

        // 更新导航状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // 显示目标页面
        const targetPageElement = document.getElementById(`${pageId}-page`);
        if (targetPageElement) {
            targetPageElement.style.display = 'block';
            document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
            this.currentPage = pageId;

            // 如果是搜索页面，确保搜索功能已初始化
            if (pageId === 'influencer-search' && !this.influencerSearchPage) {
                this.influencerSearchPage = new InfluencerSearchPage();
            }
        }
    }

    // 初始化页面
    initializePages() {
        // 默认显示仪表盘
        this.showPage('dashboard');
        
        // 初始化达人详情页
        this.influencerDashboard = new InfluencerDashboard();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.pageManager = new PageManager();
});
