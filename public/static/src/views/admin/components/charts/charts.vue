<template>
	<div class="charts">
		<!-- 统计图 -->
		<div class="container">
			<div id="chartsLine"></div>
			<div class="echarts-box">
				<!-- <div id="charts3" class="charts"></div> -->
				<div id="charts1" class="charts"></div>
				<div id="charts2" class="charts"></div>
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts'
const animationDuration = 6000

export default {
	name:'Charts',
	data () {
		return {
			chartsZero:null,
			chartsOne:null,
			chartsTwo:null,
		}
	},
	mounted () {
		this.chartsline();
		this.initChartsOne();
		this.initChartsTwo();
		// this.initChartsThree();

		this.__resizeHandler = () => {
			if (this.chartsZero && this.chartsOne && this.chartsTwo && this.chartsThree) {
				this.chartsZero.resize();
		        this.chartsOne.resize();
		        this.chartsTwo.resize();
		        // this.chartsThree.resize();
		      }
		};
		window.addEventListener('resize', this.__resizeHandler)
	},
	beforeDestroy () {
		if (!this.chartsZero && !this.chartsOne && !chartsTwo && !this.chartsThree) {
			return;
		}
		window.removeEventListener('resize', this.__resizeHandler)
		this.chartsZero.dispose();
		this.chartsOne.dispose();
		this.chartsTwo.dispose();
		// this.chartsThree.dispose();
		this.chartsZero = null;
		this.chartsOne = null;
		this.chartsTwo = null;
		// this.chartsThree = null;
	},
	methods:{
		chartsline () {
			this.chartsZero = echarts.init(document.getElementById('chartsLine'));
			var option = {
			    title: {
			        text: '折线',
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			    },
			    grid: {
			        left: '10px',
			        right:'20px',
			        bottom: '5px',
			        containLabel: true,
			        padding:[0,20,0,0]
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        splitNumber:10,
			        data: ['周一','周二','周三','周四','周五','周六','周日',''],
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [
			        {
			            name:'邮件营销',
			            type:'line',
			            stack: '总量',
			            data:[320, 532, 480, 534, 490, 530, 210]
			        },
			        {
			            name:'联盟广告',
			            type:'line',
			            stack: '总量',
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'视频广告',
			            type:'line',
			            stack: '总量',
			            data:[150, 232, 201, 154, 190, 330, 410]
			        },
			        {
			            name:'直接访问',
			            type:'line',
			            stack: '总量',
			            data:[320, 332, 301, 334, 390, 330, 320]
			        }
			    ]
			};
		    this.chartsZero.setOption(option);
		},
		initChartsOne () {
			this.chartsOne =  echarts.init(document.getElementById('charts1'));

			var option = {
			    title : {
			        text: '某站点用户访问来源',
			        subtext: '纯属虚构',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			    },
			    series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'直接访问'},
			                {value:310, name:'邮件营销'},
			                {value:234, name:'联盟广告'},
			                {value:135, name:'视频广告'},
			                {value:1548, name:'搜索引擎'}
			            ],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};

			// 绘制图表
			this.chartsOne.setOption(option);
		},
		initChartsTwo () {
			this.chartsTwo =  echarts.init(document.getElementById('charts2'));
			var data = genData(50);
			var option = {
		        tooltip: {
		          	trigger: 'axis',
		          	axisPointer: { // 坐标轴指示器，坐标轴触发有效
		            	type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		          	}
		        },
		        grid: {
		          	top: 10,
		          	left: '2%',
		          	right: '2%',
		          	bottom: '3%',
		          	containLabel: true
		        },
		        xAxis: [{
		          	type: 'category',
		          	data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		          	axisTick: {
		            	alignWithLabel: true
		          	}
		        }],
		        yAxis: [{
		          	type: 'value',
		          	axisTick: {
		            	show: false
		          	}
		        }],
		        series: [{
		          	name: 'pageA',
		          	type: 'bar',
		          	stack: 'vistors',
		          	barWidth: '60%',
		          	data: [79, 52, 200, 334, 390, 330, 220],
		          	animationDuration
		        }, {
		          	name: 'pageB',
		          	type: 'bar',
		          	stack: 'vistors',
		          	barWidth: '60%',
		          	data: [80, 52, 200, 334, 390, 330, 220],
		          	animationDuration
			    }, {
			        name: 'pageC',
			        type: 'bar',
			        stack: 'vistors',
			        barWidth: '60%',
			        data: [30, 52, 200, 334, 390, 330, 220],
			        animationDuration
			    }]
			};
			// 绘制图表
			this.chartsTwo.setOption(option);
		}
	}
}
function genData(count) {
    var nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < 50; i++) {
        name = Math.random() > 0.65
            ? makeWord(4, 1) + '·' + makeWord(3, 0)
            : makeWord(2, 1);
        legendData.push(name);
        seriesData.push({
            name: name,
            value: Math.round(Math.random() * 100000)
        });
        selected[name] = i < 6;
    }

    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };

    function makeWord(max, min) {
        var nameLen = Math.ceil(Math.random() * max + min);
        var name = [];
        for (var i = 0; i < nameLen; i++) {
            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join('');
    }
}
</script>

<style lang="stylus" scoped>
.charts{
	/*margin:5px;*/
	width: 100%;
	height: 100%;
	/*padding: 12px;*/

	.container{
		margin: 0 12px 12px;
		text-align: center;
		overflow: hidden;

		#chartsLine{
			padding: 20px;
			width: 100%;
			height: 500px;
			background: #fff;
		}

		.echarts-box{
			display: flex;
			justify-content: space-between;

			.charts{
				flex: 1;
				height: 400px;
				margin-top: 15px;
				padding:20px;
				background: #fff;
			}

			#charts1{
				/*margin-left: 15px;*/
				margin-right: 15px;
			}
		}
	}
}

</style>