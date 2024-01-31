import multer from 'multer'
import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'
import sharp from 'sharp'

/* Verificar tipo de arquivo e rejeitar caso não seja jpeg ou png (atribui false à cb) */
const verificaTipoArquivo = (file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(new Error('Tipo de arquivo não suportado'), false)
  }
}

/* Verificar se a proporção da imagem está correta para caber no layout. */

// const verificaProporcaoImagem = async (file, cb) => {
//   const imagemSharp = sharp(file).raw().toBuffer({ resolveWithObject: false })
//   const pixelArray = new Uint8ClampedArray(file.buffer)
//   console.log(pixelArray)
//   const dadosImagem = await imagemSharp.metadata()
//   // console.log(dadosImagem)
//   const proporcaoCorreta = 644 / 421
//   const proporcaoImagem = dadosImagem.width / dadosImagem.height
//   const variacaoPermitida = 0.02 // Permitir 2% de variação na proporção

//   if (Math.abs(proporcaoImagem - proporcaoCorreta) > variacaoPermitida) {
//     return cb(new Error('A proporção da imagem precisa ser de 644:421'), false)
//   }

//   cb(null, true)
// }

/* Redimensionar a imagem para se ajustar ao layout. */
// const redimensionaImagem = async (file, cb) => {
//   const dadosImagem = await sharp(file).metadata()
//   const larguraCorreta = 644
//   const alturaCorreta = 421

//   if (
//     dadosImagem.width !== larguraCorreta ||
//     dadosImagem.height !== alturaCorreta
//   ) {
//     const resizedImg = await sharp(file).resize({
//       width: larguraCorreta,
//       height: alturaCorreta,
//     })

//     file = resizedImg
//   }

//   cb(null, true)
// }

const filtroFotos = async (req, file, cb) => {
  try {
    verificaTipoArquivo(file, cb)
    // verificaProporcaoImagem(file, cb)
    // redimensionaImagem(file, cb)
  } catch (error) {
    cb(error)
  }
}

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
  fileFilter: filtroFotos,
  limits: {
    fileSize: 950 * 1024,
  },
})

export default upload
