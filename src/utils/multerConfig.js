import multer from 'multer'
import path from 'path'

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pasta =
      'C:\\Users\\Carolina Rocha\\Documents\\repositorios\\BackEnd-Squad11\\uploads'
    cb(null, pasta)
  },
  filename: function (req, file, cb) {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().replace(/[-T:.Z]/g, '')
    cb(null, `${req.user.id}-${formattedDate}-${file.originalname}`)
  },
})
const upload = multer({
  storage: localStorage,
  // fileSize: '',
  // fileFilter,
})

export default upload
