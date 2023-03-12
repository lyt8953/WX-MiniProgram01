// 先在package.json中声明"type": "module",使用es6模块化规范
import express from 'express'
import cors from 'cors'
import router from './router/index.js'


const app = express()

// 在路由之前配置中间件
// 解析x-www表单数据的express.urlencoded中间件和解析JSON表单数据的中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// cors第三方中间件导入,实现跨域资源共享
app.use(cors())


// 导入路由
app.use('/api', router)  // 挂载路由访问前缀api

// 在路由之后配置错误对象中间件


app.listen(80, () => {
    console.log('Express server running at http://127.0.0.1')
})


