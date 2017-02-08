//城市检索的首字母
let searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]


function searchLetter() {
	return searchLetter;
}

module.exports = {
	searchLetter: searchLetter,
	parseDistance: (distance, city) => {
		var distance = distance;
		var result;

		if(distance >= 0){
			if(distance < 1000){
				result =  Math.round(distance) + " m";
			}else if(distance < 99 * 1000){
				result =  Number(distance / 1000).toFixed(1) + " km";
			}else {
				result = city ? city : ">99km";
			}
		}else {
			result = "未知";
		}
		return result;
	}
}