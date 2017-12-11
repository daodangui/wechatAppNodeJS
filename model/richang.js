const db = require('../utils/database.js')

//定义schema，即域的数据类型
const schema = new db.Schema({
	openid: {
		type: String,
		required: true
	},
	userInfo: {
		type: Object,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	imgList: {
		type: Array,
		required: false
	},
	postTime: {
		type: String,
		required: true
	},
	timeId: {
		type: Number,
		required: true
	}
})

//定义 model
const Richang = db.model('richang', schema)

module.exports = Richang