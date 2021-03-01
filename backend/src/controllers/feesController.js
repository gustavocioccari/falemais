const connection = require('../database/connection')

module.exports = {
    async create (req, res) {
      try{  
        const {from, to, cost_per_min} = req.body

        await connection('fees').insert({
            from,
            to,
            cost_per_min
        })

        return res.status(201).json('Nova tarifa adicionada com sucesso')
      }catch(err) {return res.status(400),console.log(err)}
    },
    async get (req, res) {
      
      const fees = await connection('fees').select('*')

      return res.status(201).json({ fees })
  }
}