const express = require('express')
const router = express.Router()

const userController = require('../controller/user.js')
const richangController = require('../controller/richang.js')
const toolController = require('../controller/tool.js')

const upload = require('../utils/uploadimg')

//定义用户信息相关路由
router.post('/users/login', userController.login)

//定义文件上传
router.post('/upload/richangImgs', upload.single('richangImgs'), richangController.uploadImgs)

//定义日常动态上传
router.post('/upRCitem', richangController.upRCitem)

//获取日常动态
router.post('/getRCitem', richangController.getRCitem)

//获取用户从成绩信息
router.post('/tool/getGradeInfo', toolController.getGradeInfo)


module.exports = router