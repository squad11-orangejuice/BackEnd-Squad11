import multer from 'multer'
import path from 'path'

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pasta = path.join(__dirname, '../../uploads')
    cb(null, pasta)
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}/${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({
  storage: localStorage,
  // fileSize: '',
  // fileFilter,
})

export default upload
