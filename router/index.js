import express from 'express'
import handle from './index_handle.js'


const router = express.Router()


router.post('/login', handle.login)
router.post('/update', handle.update)
router.post('/collect', handle.collect)
router.post('/comment', handle.comment)
router.post('/del_comment', handle.del_comment)

export default router 