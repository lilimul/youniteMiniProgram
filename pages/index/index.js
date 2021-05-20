import getCK from '../../lib/getCK.js'

const app = getApp()

Page({
	data: {
		isswitched: false,
		searchHolder: "大家都在搜：花旗杯",
		TabCur: 0,
		showDrawer: false,
		openNewPostDrawer: false,
		newPostIndex: 0,
		searching: false,
		drawerSwipeTime: null,
		filterContestType: [{
			'name': '专业竞赛',
			'sele': true
		}, {
			'name': '创新创业',
			'sele': true
		}, {
			'name': '语言竞赛',
			'sele': true
		}],
		filterYearType: [{
			'name': '大一',
			'sele': true
		}, {
			'name': '大二',
			'sele': true
		}, {
			'name': '大三',
			'sele': true
		}, {
			'name': '大四',
			'sele': true
		}, {
			'name': '研究生',
			'sele': true
		}, {
			'name': '实验室',
			'sele': true
		}],
		filterYearCount: 6,
		team: [{
			"name": '大广赛找人剪视频',
			"title": '希望代码能敲队',
			"competitiontype": '大广赛', //建议专门定个competitiontype类，便于按标签搜素
			"grade": '不限年级', //同样建议标签化
			"Emergencydegree": '马上就要', //建议标签化
			"introduction": "暂时没想到介绍",
		}],
		contests: [{
			"name": "大广赛",
			"discript": "新闻传播学院的比赛",
			"type": "1",
			"time": [1],
			hide: false
		}],
		searchContests: [],
		searchContestKeyWords: "",
		talents: [{
			"name": "cxk",
			"slogan": "鸡你太美",
			"academy": 1,
			"label": "身经百战",
			hide: false
		}],
		contestsType: ["暂未明确", "不限类型", "专业竞赛", "创新创业", "语言竞赛"],
		contestsTime: ["暂未明确", "现在就要"],
		academy: ["暂无", "新传"],
		person: [{

		}],
		cardCur: 0,
		swiperList: [{
			id: 0,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png'
		}, {
			id: 1,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png',
		}, {
			id: 2,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png'
		}, {
			id: 3,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png'
		}, {
			id: 4,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png'
		}, {
			id: 5,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png'
		}, {
			id: 6,
			type: 'image',
			url: 'https://i.loli.net/2020/09/14/rkubo6iFGYKCaJE.png'
		}]
	},
	cardSwiper(e) {
		this.setData({
			cardCur: e.detail.current
		})
	},
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60
		})
	},
	// 获取所有比赛信息，apiAllContest
	getAllContest: async function() {
		let data;
		wx.request({
			url: app.globalData.apiAllContest,
			success: res => {
				data = res.data.data
				data = data.map(cont => {
					return {
						name: cont.G_name,
						discript: cont.G_discript,
						type: cont.type,
						ddl: cont.time,
						time: [1],
						hide: false
					}
				})
				console.log('比赛信息', data)
				this.setData({
					contests: data
				})
			}
		});
	},
	// 获取所有人才信息，apiAllTalents
	getAllTalents: async function() {
		wx.request({
			url: app.globalData.apiAllTalents,
			success: res => {
				// console.log(res);
				let dataTalents = res.data.data
				dataTalents = dataTalents.map(talent => {
					return {
						id: talent.P_ID,
						name: talent.P_name,
						slogan: talent.P_intro,
						academy: 1,
						label: talent.P_intention,
						hide: false
					}
				})
				console.log('人才信息', dataTalents);
				this.setData({
					talents: dataTalents
				})
			}
		});
	},
	onLoad: async function() {
		await getCK.login();
		
		this.getAllContest();
		this.getAllTalents();
	},
	switch1: function() {
		this.setData({
			isswitched: false,
		})
	},
	switch2: function() {
		this.setData({
			isswitched: true,
		})
	},
	applyDrawer() { //应用筛选
		var contests = this.data.contests;
		const filterContestTpe = this.data.filterContestType;
		const filterYearType = this.data.filterYearType;
		contests.forEach((contest) => {
			contest.hide = true;
			if (contest.type <= 1) {
				contest.hide = false;
			} else {
				filterContestType.forEach((type, i) => {
					if (type.sele && i == contest.type - 2) {
						contest.hide = false;
					}
				});
			}
			if (!contest.hide) {
				contest.hide = true;
				if (1 in filterYearType) {
					contest.hide = false;
				} else {
					filterYearType.forEach((e, i) => {
						if (e.sele && (i in contest.time)) {
							contest.hide = false;
						}
					})
				}
			}
		})
		this.setData({
			contests: contests,
			showDrawer: false
		});
	},
	hideDrawer: function() { //隐藏侧边栏
		this.setData({
			showDrawer: false
		})
	},
	showDrawer: function() { //显示侧边栏
		this.setData({
			showDrawer: true
		})
	},
	//根据字符串相同字的数量排序
	search: function() {

	},
	/*下面是筛选处理相关*/
	//根据竞赛类型筛选
	modifyFilterByContestType: function(badge) {
		const contestIndex = badge.currentTarget.dataset.index;
		var filter = this.data.filterContestType;
		filter[contestIndex].sele = !filter[contestIndex].sele;
		this.setData({
			filterContestType: filter
		});
	},
	//根据年级分类
	modifyFilterByYearType: function(badge) {
		const contestIndex = badge.currentTarget.dataset.index;
		var filter = this.data.filterYearType;
		filter[contestIndex].sele = !filter[contestIndex].sele;
		var count = 0;
		filter.forEach((el) => {
			if (el.sele) {
				count++;
			}
		});
		this.setData({
			filterYearType: filter,
			filterYearCount: count
		});
	},
	debug: function() {

	},
	search: function() {
		if (this.data.searching) { //close searching window
			this.resetSearching();
			this.setData({
				searchContestKeyWords: "",
				searching: false
			})
		}
		if (this.data.searchContestKeyWords != "") {
			this.setData({
				searching: true
			});
			this.searchContest();
		}
	},
	//输入搜索关键词
	inputSearch: function(input) {
		const keyWord = input.detail.value;
		this.setData({
			searchContestKeyWords: keyWord
		});
	},
	//搜索页面
	searchContest: function() {
		const keyWord = this.data.searchContestKeyWords;
		var searchResult = new Array();
		this.data.contests.forEach((contest) => {
			if (contest.name.indexOf(keyWord) >= 0) {
				searchResult.push(contest);
			}
		})
		this.setData({
			searchContests: searchResult
		})
	},
	resetSearching: function() {
		this.setData({
			searching: false,
			searchContests: [],
			searchContestKeyWords: ""
		});
	},
	/*发布新信息页面*/

	//发布队伍招募
	newPostNextStep(btn) { //在首页发布页面的切换
		// debugger;
		const nextIndex = btn.currentTarget.dataset.nextindex;
		this.setData({
			newPostIndex: nextIndex
		});
	},
	triggleNewpostDrawer: function(e) {
		const closeele = e.currentTarget.dataset.closefrom;
		if (closeele == "acrylic" && this.data.newPostIndex > 0) {
			this.setData({
				newPostIndex: 0
			});
			return; //在不是第一步的情况下，点击背景是恢复第一页
		}
		if (this.data.openNewPostDrawer) {
			this.setData({
				openNewPostDrawer: false,
				newPostIndex: 0
			})
		} else {
			this.setData({
				openNewPostDrawer: true
			})
		}

	},
	drawerWindowTouchStart: function(e) {
		var touchStartX = e.touches[0].pageX;
		var touchStartY = e.touches[0].pageY;
		this.data.modalSwipeTouchStartX = touchStartX;
		this.data.modalSwipeTouchStartY = touchStartY;
		this.data.drawerSwipeEndX = touchStartX;
		this.data.drawerSwipeEndY = touchStartY;
		this.data.drawerSwipeTime = Date.now();
	},
	drawerWindowTouchMove: function(e) {
		this.data.drawerSwipeEndX = e.touches[0].pageX;
		this.data.drawerSwipeEndY = e.touches[0].pageY;
	},
	drawerWindowTouchEnd: function(e) {
		var moveX = this.data.drawerSwipeEndX - this.data.modalSwipeTouchStartX;
		var moveYabs = Math.abs(this.data.drawerSwipeEndY - this.data.modalSwipeTouchStartY);
		let time = (Date.now() - this.data.drawerSwipeTime) / 1000;
		if (moveX <= -30 && time < 0.8 && moveYabs < 80) {
			this.setData({
				showDrawer: false
			});
		}
	},
	modifyFilterReverse: function() {
		var flag = false;
		this.data.filterContestType.forEach(e => {
			if (!flag && e.sele) {
				this.modifyFilterClearAll();
				flag = true;
				return;
			}
		});
		if (!flag) {
			this.data.filterYearType.forEach(e => {
				if (flag && e.sele) {
					this.modifyFilterClearAll();
					flag = true;
					return;
				}
			});
		}
		if (!flag)
			this.modifyFilterSeleAll();
	},
	modifyFilterClearAll: function() { //重置所有过滤条件
		this.data.filterContestType.forEach(e => {
			e.sele = false;
		});
		this.data.filterYearType.forEach(e => {
			e.sele = false;
		})
		this.setData({
			filterContestType: this.data.filterContestType,
			filterYearType: this.data.filterYearType
		});
	},
	modifyFilterSeleAll: function() { //选中所有过滤条件
		this.data.filterContestType.forEach(e => {
			e.sele = true;
		});
		this.data.filterYearType.forEach(e => {
			e.sele = true;
		})
		this.setData({
			filterContestType: this.data.filterContestType,
			filterYearType: this.data.filterYearType
		});
	}
})
