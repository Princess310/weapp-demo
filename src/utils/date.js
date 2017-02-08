import moment from './moment';

moment.defineLocale('zh-cn', {
	months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	longDateFormat : {
		LT : 'Ah点mm分',
		LTS : 'Ah点m分s秒',
		L : 'YYYY-MM-DD',
		LL : 'YYYY年MMMD日',
		LLL : 'YYYY年MMMD日Ah点mm分',
		LLLL : 'YYYY年MMMD日ddddAh点mm分',
		l : 'YYYY-MM-DD',
		ll : 'YYYY年MMMD日',
		lll : 'YYYY年MMMD日Ah点mm分',
		llll : 'YYYY年MMMD日ddddAh点mm分'
	},
	meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	meridiemHour: function (hour, meridiem) {
		if (hour === 12) {
			hour = 0;
		}
		if (meridiem === '凌晨' || meridiem === '早上' ||
				meridiem === '上午') {
			return hour;
		} else if (meridiem === '下午' || meridiem === '晚上') {
			return hour + 12;
		} else {
			// '中午'
			return hour >= 11 ? hour : hour + 12;
		}
	},
	meridiem : function (hour, minute, isLower) {
		var hm = hour * 100 + minute;
		if (hm < 600) {
			return '凌晨';
		} else if (hm < 900) {
			return '早上';
		} else if (hm < 1130) {
			return '上午';
		} else if (hm < 1230) {
			return '中午';
		} else if (hm < 1800) {
			return '下午';
		} else {
			return '晚上';
		}
	},
	calendar : {
		sameDay : function () {
			return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
		},
		nextDay : function () {
			return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
		},
		lastDay : function () {
			return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
		},
		nextWeek : function () {
			var startOfWeek, prefix;
			startOfWeek = moment().startOf('week');
			prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
			return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
		},
		lastWeek : function () {
			var startOfWeek, prefix;
			startOfWeek = moment().startOf('week');
			prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
			return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
		},
		sameElse : 'LL'
	},
	ordinalParse: /\d{1,2}(日|月|周)/,
	ordinal : function (number, period) {
		switch (period) {
		case 'd':
		case 'D':
		case 'DDD':
			return number + '日';
		case 'M':
			return number + '月';
		case 'w':
		case 'W':
			return number + '周';
		default:
			return number;
		}
	},
	relativeTime : {
		future : '%s内',
		past : '%s前',
		s : '几秒',
		m : '1 分钟',
		mm : '%d 分钟',
		h : '1 小时',
		hh : '%d 小时',
		d : '1 天',
		dd : '%d 天',
		M : '1 个月',
		MM : '%d 个月',
		y : '1 年',
		yy : '%d 年'
	},
	week : {
		// GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
		dow : 1, // Monday is the first day of the week.
		doy : 4  // The week that contains Jan 4th is the first week of the year.
	}
});

moment.locale('zh-cn'); //中文配置初始化


let _DEFAULT_FORMAT_DATE = "YYYY-MM-DD HH:mm:ss";
// the time check value: 1 day for now
let _CHECK_DEFAULT_TIME = 24 * 60 * 60 * 1000;

function zeroFull(str){
	return str >= 10 ? str : ('0' + str);
}

let date = {
	/**
	 * [format 时间戳格式化]
	 * @param  {[Number || Object]} date   [时间戳或Date对象]
	 * @param  {[转换格式]} format [需要转换的格式，不传则用_DEFAULT_FORMAT_DATE]
	 * @return {[String]}        [格式化后的时间]
	 */
	format: (date, format) => {
		if(!date){
			return;
		}

		if(!format){
			format = _DEFAULT_FORMAT_DATE;
		}

		var m = moment(date);
		var dateStr = m.format(format);
		return dateStr;
	},
	/**
	 * [dateSinceToday 计算日期距离当前时间多久]
	 * @param  {[Number || Object]} date   [时间戳或Date对象]
	 * @return {[String]}      [计算结果 如: 1分钟前]
	 */
	dateSinceToday: (date) => {
		if(!date){
			return;
		}
		var value = moment(date).fromNow();
		return value;
	},
	/**
	 * [getParseTime description]
	 * @param  {[String]} times [Unix 时间戳]
	 * @return {[String]}       [返回时间的时分 如12:20]
	 */
	getParseTime: (times) => {
		var date = new Date(times * 1000);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		return (zeroFull(hours) + ":" + zeroFull(minutes));
	},
	/**
	 * [getRoundTimeStr 获取当前时间戳+1000-99999之间的随机数]
	 * @return {[String]} [随机数]
	 */
	getRoundTimeStr: () => {
		var date = new Date();
		var times = Math.round(date.getTime() / 1000);

		// 获取10000 ~ 99999之间的随机数
		var min = 1000;
		var max = 99999;
		var diff = max - min;
		var num = Math.round(Math.random() * diff) + min;

		return String(times) + num;
	},
	/**
	 * [getTimeForNow 获取当前日期的时间戳]
	 * @return {[Number]} [时间戳]
	 */
	getTimeForNow: () => {
		return (new Date()).getTime();
	},
	/**
	 * [checkDiffDate 判断2个日期间隔是否超过一定的时间]
	 * @param  {[Number]} date1    [时间戳 小]
	 * @param  {[Number]} date2    [时间戳 大]
	 * @param  {[Number]} checkVal [时间间隔时间出戳]
	 * @return {[Boolean]}          [判断结果]
	 */
	checkDiffDate: (date1, date2, checkVal) => {
		if(!checkVal){
			checkVal = _CHECK_DEFAULT_TIME;
		}
		return ((date2 - date1) > checkVal);
	},
	/**
	 * [isInSameDay 2个日期是否在相同一天]
	 * @param  {[Number]}  date1 [时间戳1]
	 * @param  {[Number]}  date2 [时间戳2]
	 * @return {Boolean}       [判断结果]
	 */
	isInSameDay: (date1, date2) => {
		return ((new Date(date1)).getDate() == (new Date(date2)).getDate());
	},
	getMonthNumber: (times) => {
		var date = new Date(times * 1000);

		return (date.getMonth() + 1);
	},
	/**
	 * [getDayNumber 获取日期的天]
	 * @param  {[Number]} times [时间戳]
	 * @return {[Number]}       [天]
	 */
	getDayNumber: (times) => {
		var date = new Date(times * 1000);
		
		return date.getDate();
	},
	parseDate: (value) => {
		var time = date.getTimeForNow();
		var dateStr = value * 1000;
		var diffTime = 1000 * 60 * 60 * 24 * 7; // 7 days diff
		var result;

		if(date.checkDiffDate(dateStr, time, diffTime)){
			result = date.format(dateStr, "YYYY-MM-DD");
		}else {
			result = date.dateSinceToday(value * 1000);
		}

		return result;
	}
};

module.exports = date;