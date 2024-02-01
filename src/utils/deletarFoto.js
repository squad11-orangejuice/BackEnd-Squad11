/* Função para deletar foto do bucket, recebe link como parâmetro, extrai o nome e executa a ação. */

import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import s3 from './s3ClientConfig.js'
import database from '../database/db.js'

dotenv.config()

const deletarImagem = async (linkFotoAtual) => {
  await database.sync()
  const nomeArquivo = linkFotoAtual.split('/').pop()
  const params = {
    Bucket: process.env.BUCKET,
    Key: nomeArquivo,
  }
  try {
    const deleteFoto = new DeleteObjectCommand(params)
    await s3.send(deleteFoto)
    console.log('Arquivo deletado com sucesso.')
  } catch (err) {
    console.log('Erro ao deletar o arquivo', err)
  }
}

export default deletarImagem
