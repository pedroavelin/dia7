module.exports = (app, connection) => {
  app.get('/users', (_, res) => {
    connection.query('SELECT * from users', function (error, results, fields) {
      if (error) throw error;

      res.send({
        code: 200,
        meta: {
          pagination: {
            total: results.length,
            pages: 1,
            page: 1,
            limit: undefined,
          }
        },
        data: results
      })
    });
  })
  app.get('/users/:id', (req, res) => {
    const { id } = req.params
    connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
      if (error) {
        throw error
      }

      res.send(results[0])
    })
  })

  app.post('/users', (req, res) => {
    const user = req.body

  connection.query('INSERT INTO users SET ?', [user], (error, results, _) => {
      if (error) {
        throw error
      }

      //   Retornando o objecto depois de fazer um post(Inrelevante)

      // const { insertId } = results

      // connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
      //   if (error) {
      //     throw error
      //   }

      // })

      res.send(results[0])

    })
  })

  app.put('/users/:id', (req, res) => {
    const { id } = req.params

    const user = req.body

    connection.query('UPDATE users SET ? WHERE id = ?', [user, id], (error, results, _) => {
      if (error) {
        throw error
      }

      // connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
      //   if (error) {
      //     throw error
      //   }

      // })

      res.send(results[0])
    })
  })

  app.patch('/users/:id/activated', (req, res) => {
    const { id } = req.params

    const { isActive } = req.body

    //   const status = isActive ? 1 : 0

    //   connection.query('UPDATE users SET status = ? WHERE id = ?', [status, id], (error, results, _) => {
    //     if (error) {
    //       throw error
    //     }

    // })

    res.send(isActive)
  })

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params

    connection.query('DELETE FROM users WHERE id = ?', [id], (error, results, _) => {
      if (error) {
        throw error
      }

      // const [user] = results

      // connection.query('DELETE FROM users WHERE id = ?', [id], (error, _, __) => {
      //   if (error) {
      //     throw error
      //   }

      // })
      res.send(results)
    })
  })
}
