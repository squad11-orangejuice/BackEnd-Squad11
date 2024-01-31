import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'
import s3 from './s3ClientConfig.js'
dotenv.config()

/* Verificar tipo de arquivo e rejeitar caso não seja jpeg ou png (atribui false à cb) */
const verificaTipoArquivo = (file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(new Error('Tipo de arquivo não suportado'), false)
  }
}

const filtroFotos = async (req, file, cb) => {
  try {
    verificaTipoArquivo(file, cb)
    // verificaProporcaoImagem(file, cb)
    // redimensionaImagem(file, cb)
  } catch (error) {
    cb(error)
  }
}

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
      const filename = `${req.user.id}-${formattedDate}`
      cb(null, filename)
    },
  }),
  fileFilter: filtroFotos,
  limits: {
    fileSize: 950 * 1024,
  },
})

export default upload
