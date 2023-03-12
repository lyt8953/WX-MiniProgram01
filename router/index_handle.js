import db from '../db/index.js'

export default {
    // 登陆
    login: (req, res) => {
        // 数据库查询是否已经注册
        let sqlStr = 'select * from users where phone=?'
        db.query(sqlStr, req.body.phone, (err, result) => {
            // 返回错误信息
            if (err) return res.send(err.message)
            // 注册
            if (result.length === 0) {
                // 数据库中没有则表示是新的电话号码，插入数据
                let sql = 'INSERT INTO users SET ?'
                db.query(sql, req.body, (err, result) => {
                    // 返回错误信息
                    if (err) return res.send(err.message)
                    res.send('注册成功')
                })
            } else {
                // 登陆，并返回数据
                let sql = 'SELECT u.*,c.comment,c.sightsId,c.time FROM users u,comment c WHERE u.phone=c.userPhone AND phone=?'
                db.query(sql, req.body.phone, (err, result2) => {
                    // 返回错误信息
                    if (err) return res.send(err.message)
                    if (result2.length === 0) {
                        return res.send(result)
                    }else{
                        res.send(result2)
                    }
                    
                })
            }
        })
    },
    // 更改个人资料
    update: (req, res) => {
        let oldPhone = req.body.oldPhone
        delete req.body.oldPhone
        // 查看该账号是否发布过评论
        let sqlStr = 'select * from comment where userPhone=?'
        db.query(sqlStr, oldPhone, (err, result) => {
            if (err) return res.send(err.message)
            // 如果未更改号码或该账号未发布过评论，则只用修改users表的信息
            if (oldPhone === req.body.phone || result.length === 0) {
                let sql1 = 'UPDATE users SET ? WHERE phone=?'
                db.query(sql1, [req.body, oldPhone], (err, result1) => {
                    // 返回错误信息
                    if (err) {
                        return res.send('账号已被绑定')
                    }
                    // 返回结果
                    res.send(result1)
                })
            } else {
                let sql2 = 'UPDATE users u,comment c SET ?, c.userPhone=? WHERE u.phone=c.userPhone and u.phone=?'
                db.query(sql2, [req.body, req.body.phone, oldPhone], (err, result2) => {
                    // 返回错误信息
                    if (err) {
                        return res.send('账号已被绑定')
                    }
                    // 返回结果
                    res.send(result2)
                })
            }

        })
    },
    // 收藏
    collect: (req, res) => {
        let sqlStr = 'select * from users where phone=?'
        // 数据库查询
        db.query(sqlStr, req.body.phone, (err, result) => {
            // 返回错误信息
            if (err) return res.send(err.message);
            // 返回结果
            res.send(result)
        })
    },
    comment: (req, res) => {
        let sqlStr = 'select * from users u,comment c where u.phone=c.userPhone and phone=?'
        // 数据库查询
        db.query(sqlStr, req.body.phone, (err, result) => {
            // 返回错误信息
            if (err) return res.send(err.message);
            // 返回结果
            res.send(result)
        })
    },
    del_comment: (req, res) => {
        res.send('删除评论成功')
    }
}



