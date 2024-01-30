import database from '../database/db.js'
import Projeto from '../models/projeto.js'
import upload from '../utils/multerConfig.js'
import dotenv from 'dotenv'
import ProjetoTag from '../models/projeto_tag.js'
import Tag from '../models/tag.js'
dotenv.config()

const editarProjeto = async (req, res) => {
  await database.sync()
  try {
    upload.single('imagem')(req, res, async (err) => {
      if (err) {
        console.error('Erro no upload', err)
        return res.status(500).send('Erro interno do servidor')
      }
      const { titulo, link, descricao, tags } = req.body

      const idProjeto = req.params.id
      const linkArquivo = req.file.location

      await Projeto.update(
        {
          titulo,
          link,
          descricao,
          imagem: linkArquivo,
          data: new Date(),
          user_id: req.user.id,
        },
        { where: { id: idProjeto } },
      )

      const arrayTags = tags.split(',')
      // Se receber tags faz alteração, caso contrário mantém as tags existentes.
      if (tags) {
        await ProjetoTag.destroy({
          where: {
            projeto_id: idProjeto,
          },
        })

        const tagsCriadas = await Promise.all(
          arrayTags.map(async (nome) => {
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
                projeto_id: idProjeto,
                tag_id: id,
              })
            } catch (error) {
              return res.status(500).send('Erro interno do servidor')
            }
          }),
        )
      }

      return res.status(201).send('Projeto editado.')
    })
  } catch (error) {
    console.error('Erro em novoProjeto', error)
    return res.status(500).send('Erro interno do servidor')
  }
}

export default editarProjeto
