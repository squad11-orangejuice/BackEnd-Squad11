import database from '../database/db.js'
import Projeto from '../models/projeto.js'
import upload from '../utils/multerConfig.js'
import dotenv from 'dotenv'
import ProjetoTag from '../models/projeto_tag.js'
import Tag from '../models/tag.js'
import deletarImagem from '../utils/deletarFoto.js'

dotenv.config()

const editarProjeto = async (req, res) => {
  try {
    await database.sync()

    upload.single('imagem')(req, res, async (err) => {
      if (err) {
        console.error('Erro no upload', err)
        return res.status(500).send('Erro interno do servidor')
      }
      const { titulo, link, descricao, tags } = req.body

      const linkArquivo = req.file.location
      const idProjeto = req.params.id
      /* Caso seja enviado novo arquivo */
      if (linkArquivo) {
        /* Obter link da foto atual e chamar função para deletar */
        const linkFoto = await Projeto.findByPk(idProjeto, {
          attributes: ['imagem'],
        })
        const linkFotoAtual = linkFoto.imagem
        /* Chamada da função para deletar passando o link como parâmetro */
        try {
          await deletarImagem(linkFotoAtual)
        } catch (error) {
          console.error('Erro ao deletar imagem:', error)
        }
      }

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
      /* Caso sejam recebidas novas tags, deleta as tags associadas e cria novas para evitar duplicidade. */
      if (tags) {
        await ProjetoTag.destroy({
          where: {
            projeto_id: idProjeto,
          },
        })

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
    console.error('Erro em editarProjeto', error)
    return res.status(500).send('Erro interno do servidor')
  }
}

export default editarProjeto
