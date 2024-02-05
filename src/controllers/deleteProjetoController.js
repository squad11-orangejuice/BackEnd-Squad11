import database from '../database/db.js'
import Projeto from '../models/projeto.js'
import deletarImagem from '../utils/deletarFoto.js'

const deleteProjeto = async (req, res) => {
  await database.sync()

  try {
    const projeto = await Projeto.findByPk(req.params.id)

    await deletarImagem(projeto.imagem)

    await projeto.destroy()
    return res.status(200).json({ mensagem: 'Projeto deletado com sucesso' })
  } catch (error) {
    console.error('Erro no controller de deletar projetos: ', error)
    return res.status(500).json({ mensagem: 'Erro no servidor' })
  }
}

export default deleteProjeto
