import database from '../database/db.js'
import Projeto from '../models/projeto.js'
import upload from '../utils/multerConfig.js'
import dotenv from 'dotenv'
// import Projeto_tag from '../models/projeto_tag.js'
import Tag from '../models/tag.js'
dotenv.config()
/* Recebe multipart form data, importa o multer do arquivo de configurações como upload, envia imagem para bucket, salva string do endereço. Dados do projeto vão pra table projetos, tags vão para projeto_tags. */
const novoProjeto = async (req, res) => {
  try {
    upload.single('arquivo')(req, res, async (err) => {
      if (err) {
        console.error('Erro ao processar o arquivo', err)
        return res.status(500).send('Erro interno do servidor')
      }
    })
    const linkArquivo = req.file.path
    console.log(linkArquivo)
    const { titulo, link, descricao, tags } = req.body
    await Projeto.create({
      titulo,
      link,
      descricao,
      imagem: linkArquivo,
    })

    const arrayTags = tags.split(' ')
    console.log(arrayTags)
    const tagsCriadas = await Promise.all(
      arrayTags.map((nome) => Tag.findOrCreate({ where: { nome } })),
    )

    console.log(tagsCriadas)
  } catch (error) {
    console.error('Erro em novoProjeto', error)
    return res.status(500).send('Erro interno do servidor')
  }
}

export default novoProjeto
