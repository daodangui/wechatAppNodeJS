//爬取学校数据
const cheerio = require('cheerio')
const querystring = require('querystring')
const request = require('request')

const getGradeInfo = function(req, res){
	var { studentId } = req.body

	let responseData = ''

	function filterData(data) {
	  let $ = cheerio.load(data)
	  $('body').children('table').children('tbody').children('tr').first().find('table').attr('id','studentInfo')
	  $('body').children('table').children('tbody').children('tr').eq(4).find('table').attr('id','scoreInfo')
	  var studentInfoTr = $('#studentInfo tbody tr').last().children()
	  var studentInfo = {
	  	studentId: studentId,
	  	name: studentInfoTr.eq(1).text(),
	  	sex: studentInfoTr.eq(2).text(),
	  	grade: studentInfoTr.eq(3).text(),
	  	profession: studentInfoTr.eq(5).text(),
	  	class: studentInfoTr.eq(6).text(),
	  	academic: studentInfoTr.eq(8).text(),
	  	qualifications: studentInfoTr.eq(9).text()
	  }
	  var scoreInfoTr = $('#scoreInfo tbody').children()
	  var scoreInfo = []
	  scoreInfoTr.each(function(index, value){
	  	if(index!=0){
	  		var scoreInfoItem = {
	  			year: $(value).children().eq(1).text(),
	  			semester: $(value).children().eq(2).text(),
				Category: $(value).children().eq(3).text(),
				CourseTitle: $(value).children().eq(5).text(),
				Credits: $(value).children().eq(7).text(),
				originalScores: $(value).children().eq(9).text(),
				remedialGrades: $(value).children().eq(10).text(),
	  		}
	  		scoreInfo.push(scoreInfoItem)
	  	}
	  })
	  res.end(JSON.stringify({studentInfo, scoreInfo}))
	}

	request.post({
		url:'http://210.44.176.116/cjcx/zcjcx_list.php',
		form: {
			'post_xuehao': studentId
		}
	}, function(err,httpResponse,body){ 
		filterData(body)
	})
}

module.exports = {
	getGradeInfo
}




