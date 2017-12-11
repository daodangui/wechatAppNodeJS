const db = require('../utils/database.js')

//定义schema，即域的数据类型
const schema = new db.Schema({
	openid: {
		type: String,
		required: true
	},
	nickName: {
		type: String,
		required: true
	},
	avatarUrl: {
		type: String,
		required: true
	}
})

//定义 model
const User = db.model('users', schema)

module.exports = User