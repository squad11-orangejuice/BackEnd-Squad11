import multer from 'multer'
import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'
import sharp from 'sharp'

/* Filtro de proporção e resize para garantir que o arquivo não quebre o layout. */
// const filtroFotos = async (req, file, cb) => {}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
  },
})
/* Configuração de upload formatando o nome do arquivo para incluir o id do cliente e data de envio. */
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    contentDisposition: 'inline',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString().replace(/[-T:.Z]/g, '')
      const filename = `${req.user.id}-${formattedDate}-${file.originalname}`
      cb(null, filename)
    },
  }),
  // fileFilter: filtroFotos,
})

export default upload
