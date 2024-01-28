import database from '../database/db.js'
import Projeto from '../models/projeto.js'
import upload from '../utils/multerConfig.js'
import dotenv from 'dotenv'
import ProjetoTag from '../models/projeto_tag.js'
import Tag from '../models/tag.js'
dotenv.config()
/* Recebe multipart form, importa o multer do arquivo de configurações como upload, envia imagem para bucket, salva string do endereço. Dados do projeto vão pra table projetos, utilizo split para separar as tags. Novas tags são salvas na tabela tags, todos os ids das tags (novas e antigas) são salvos em um array. Utilizado o método map para obter os ids das tags e depois envira para a tabela projeto_tags. */
const novoProjeto = async (req, res) => {
  await database.sync()
  try {
    upload.single('imagem')(req, res, async (err) => {
      if (err) {
        console.error('Erro no upload', err)
        return res.status(500).send('Erro interno do servidor')
      }

      const { titulo, link, descricao, tags } = req.body

      // Criar projeto e salvar o retorno em uma variável para obter id (enviado para projeto_tags)
      const linkArquivo = req.file.path
      const projetoCriado = await Projeto.create({
        titulo,
        link,
        descricao,
        imagem: linkArquivo,
        data: new Date(),
        user_id: req.user.id,
      })

      // Separar tags recebidas via multipart form, verificar se já existe e criar caso não existam. Salvar em uma variável. Obter tag_id.
      const arrayTags = tags.split(',')
      const projetoId = projetoCriado.id

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
              projeto_id: projetoId,
              tag_id: id,
            })
          } catch (error) {
            return res.status(500).send('Erro interno do servidor')
          }
        }),
      )

      return res.status(201).send('Projeto criado.')
    })
  } catch (error) {
    console.error('Erro em novoProjeto', error)
    return res.status(500).send('Erro interno do servidor')
  }
}

export default novoProjeto
