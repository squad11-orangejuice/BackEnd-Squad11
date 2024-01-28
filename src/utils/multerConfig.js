import multer from 'multer'
import path from 'path'
import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'

// const localStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const pasta =
//       'C:\\Users\\Carolina Rocha\\Documents\\repositorios\\BackEnd-Squad11\\uploads'
//     cb(null, pasta)
//   },
// filename: function (req, file, cb) {
//   const currentDate = new Date()
//   const formattedDate = currentDate.toISOString().replace(/[-T:.Z]/g, '')
//   cb(null, `${req.user.id}-${formattedDate}-${file.originalname}`)
// },
// })

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
  },
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    key: function (req, file, cb) {
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString().replace(/[-T:.Z]/g, '')
      const filename = `${req.user.id}-${formattedDate}-${file.originalname}`
      cb(null, filename)
    },
  }),
})

export default upload
