import database from '../database/db.js'
import Projeto from '../models/projeto.js'
import upload from '../utils/multerConfig.js'
import dotenv from 'dotenv'
import ProjetoTag from '../models/projeto_tag.js'
import Tag from '../models/tag.js'
dotenv.config()

const novoProjeto = async (req, res) => {
  await database.sync()
  try {
    upload.single('imagem')(req, res, async (err) => {
      if (err) {
        console.error('Erro no upload', err)
        return res.status(500).send('Erro no servidor')
      }

      const { titulo, link, descricao, tags } = req.body

      const linkArquivo = req.file.location
      const projetoCriado = await Projeto.create({
        titulo,
        link,
        descricao,
        imagem: linkArquivo,
        data: new Date(),
        user_id: req.user.id,
      })

      const projetoId = projetoCriado.id

      const tagsCriadas = await Promise.all(
        tags.map(async (nome) => {
          try {
            const [tag, created] = await Tag.findOrCreate({ where: { nome } })
            const tagId = tag.id
            return tagId
          } catch (error) {
            console.error(`Erro ao criar/encontrar a tag ${nome}:`, error)
            return null
          }
        }),
      )

      await Promise.all(
        tagsCriadas.map(async (id) => {
          try {
            await ProjetoTag.create({
              projeto_id: projetoId,
              tag_id: id,
            })
          } catch (error) {
            console.error()
            return res.status(500).send('Erro no servidor')
          }
        }),
      )

      return res.status(201).send('Projeto criado.')
    })
  } catch (error) {
    console.error('Erro em novoProjeto: ', error)
    return res.status(500).send('Erro interno do servidor')
  }
}

export default novoProjeto
