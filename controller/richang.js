//用户数据库逻辑操作

const richang = require('../model/richang.js')
const { getRichang } = require('../utils/utils')

const upRCitem = function(req, res){
	var richangItem = req.body
	const willSaveUser = new richang(richangItem)
	//数据存入数据库
	willSaveUser.save().then(()=>{
		res.end(JSON.stringify({success: true}))
	})
}

const getRCitem = function(req, res){
	var { direction, size, startId} = req.body

	if(!direction && !startId){
		richang.find({}).sort({'_id': -1}).limit(size).then((resList)=>{
			if(resList){
				res.end(JSON.stringify({success: true, resList}))
			}else{
				res.end(JSON.stringify({success: false}))
			}
		})
	}else if(direction == 'up'){
		richang.find({'timeId':{ '$lt':startId }}).sort({'_id': -1}).limit(size).then((resList)=>{
			if(resList){
				res.end(JSON.stringify({success: true, resList}))
			}else{
				res.end(JSON.stringify({success: false}))
			}
		})
	}else if(direction == 'down'){
		richang.find({'timeId':{ '$gt':startId }}).sort({'_id': -1}).limit(size).then((resList)=>{
			if(resList){
				res.end(JSON.stringify({success: true, resList}))
			}else{
				res.end(JSON.stringify({success: false}))
			}
		})
	}
	
}

const uploadImgs = function(req, res){
	if (req.file && req.file.filename) {
      	var imgurl = 'http://localhost:5000/userImgs/richangImgs/' + req.file.filename
    	res.end(JSON.stringify(getRichang({success: false, imgurl})))
    }else{
    	res.end(JSON.stringify(getRichang({success: false})))
    }
}

module.exports = {
	upRCitem,
	getRCitem,
	uploadImgs
}