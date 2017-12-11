//用户数据库逻辑操作

const User = require('../model/user.js')
const https = require('https')
const {URL} = require('url')
const { getUser } = require('../utils/utils')

const login = function(req, res){
	var { nickName, avatarUrl } = req.body
	var responseData = ''
	var options = `https://api.weixin.qq.com/sns/jscode2session?appid=wx51592255f9c459d6&secret=4dc1456e7b41470e64853316f13a3d9e&js_code=${req.body.code}&grant_type=authorization_code`
	https.get(options, (result) => {
		result.setEncoding = 'utf8'
		result.on('data', (chunk) => {
			responseData += chunk
		})
		result.on('end', ()=>{
			User.findOne({openid: JSON.parse(responseData).openid})
				.then((user)=>{
					if (!user) {
						const willSaveUser = new User({
							nickName,
							avatarUrl,
							openid: JSON.parse(responseData).openid
						})
						//数据存入数据库
						willSaveUser.save().then(()=>{
							res.end(JSON.stringify(getUser({success: true, openid: JSON.parse(responseData).openid})))
						})
					}else{
						res.end(JSON.stringify(getUser({success: false, openid: JSON.parse(responseData).openid})))
					}
				})
		})
	}).on('error', (e) => {
	  console.error(e);
	});
}

module.exports = {
	login
}