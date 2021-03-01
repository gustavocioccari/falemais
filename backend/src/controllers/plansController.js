const connection = require('../database/connection')

module.exports = {
    async create (req, res) {
      try{  
        const {plan, mins_free} = req.body

        await connection('plans').insert({
            plan,
            mins_free
        })

        return res.status(201).json('Novo plano adicionado com sucesso')
      }catch(err) {return res.status(400),console.log(err)}
    },
    async get (req, res) {
      try{
        const plans = await connection('plans').select('*')

        return res.status(201).json({ plans })
      }catch(err){return res.status(400),console.log(err)}
  }
}