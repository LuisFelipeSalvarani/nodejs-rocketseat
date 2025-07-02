import http from 'node:http'

// - Criar usuários
// - Listar usuários
// - Edição usuários
// - Remoção usuários

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso do back-end
// PUT => Atualizar um recurso do back-end
// PATCH => Atualizar uma informação especifica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// JSON- JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@exemplo.com'
    })

    return res.end('Criação de usuário')
  }

  return res.end('Hello World')
})

server.listen(3333)
