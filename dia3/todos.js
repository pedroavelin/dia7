const todos = []
module.exports = (app, connection) => {
// Listar todos os "Todos"
  app.get('/todos',(req, res)=>{
    // listar os todos "Todos" que estão na BD
    connection.query("SELECT * FROM todos", (error, results, fields)=>{
      if (error) {
        throw error
      }
      res.send({
        code: 200,
        meta: {
            pagination: {
                total: results.length,
                pages: 1,
                page: 1,
                limit: undefined
            }
        },
        data: results
      })
    })
  })
  // Buscar um "Todo" específico pelo "id"
  app.get('/todos/:id', (req,res)=>{
    const {id} = req.params

    connection.query('SELECT * FROM todos WHERE id = ? LIMIT 1', [id],(error,results,_)=>{
      if (error) {
        throw error
      }
      res.send(results[0]) // Pega no primeiro elemento e retorna
    })
  })

  // Adicionar um "Todo"
  app.post('/todos', (req, res)=>{
    const todo = req.body
    connection.query('INSERT INTO todos SET ?', [todo], (error, results,_)=>{
      if (error) {
        throw error
      }
      res.send(results[0])
    })
  })

  //Actualizando os "Todos"- Não quer funcionar
  app.put('/todos/:id', (req, res)=>{
    const {id} = req.params
    const todo = req.body
    connection.query('UPDATE todos SET ? WHERE id = ?', [todo, id], (error, results, _)=>{
      if (error) {
        throw error
      }
      res.send(results[0])
    })
  })
  
  // Eliminando uma "Todo" especifica
  app.delete('/todos/:id',(req, res)=>{
    const {id} = req.params
  connection.query('DELETE FROM todos WHERE id = ?', [id], (error, results,_)=>{
      if (error) {
        throw error
      }
      res.send(results)
    })
  })


  // obter os "todos" pelo id do user.
  app.get('/users/:id/todos', (req, res) => {
    const { id } = req.params
    connection.query(' SELECT * FROM todos WHERE user_id = ?', [id], function (error, results, _) {
      if (error)
        throw error;
      res.send(results[0])
    });
  })

  // Obter os users pelo id dos "Todos" 
  app.get('/todos/:id/users', (req, res) => {
    const { id } = req.params
    connection.query('SELECT u.id, u.name, u.email, u.genre, u.status FROM todos t Join users u on (t.id = u.id) where t.user_id = ?', [id], function (error, results, fields) {
      if (error){
        
        throw error
      }

      res.send(results)
    });
  })
}


//Não funciona - Rever
// SELECT  u.id, u.name, u.email, u.genre, u.status
// FROM notes_app.todos t
// Join notes_app.users u
// on (t.id = u.id)
// where t.user_id = 2