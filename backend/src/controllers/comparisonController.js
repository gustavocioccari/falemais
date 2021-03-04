const connection = require('../database/connection')

module.exports = {
    async compare (req, res) {
      console.log(req.body)
      try{
        const {from, to, callMinutes} = req.body
        const additionalFee = 1.10

        const feeReturn = await connection('fees')
                          .where({
                            from: from,
                            to: to
                          })
                          .select('cost_per_min')
        
        if (feeReturn.length === 0)
          return res.status(400).json("Erro na simulação")
        
        const fee =feeReturn[0]['cost_per_min']
        
        const noPlanCallCost = fee*callMinutes

        const plans = await connection('plans').select('plan','mins_free')

        const plansCosts = {
          lessThan30min(callMinutes){
            const freeMinutes = 30
            var callCost30minPlan = ''
            if (callMinutes<=freeMinutes){
              callCost30minPlan = 0
              return callCost30minPlan
            }
            else{
              const exceedingMinutes = callMinutes - freeMinutes
              callCost30minPlan = fee*exceedingMinutes*additionalFee
              return callCost30minPlan
            }
          },
          lessThan60min(callMinutes){
            const freeMinutes = 60
            var callCost60minPlan = ''
            if (callMinutes<=freeMinutes){
              callCost60minPlan = 0
              return callCost60minPlan
            }
            else{
              const exceedingMinutes = callMinutes - freeMinutes
              callCost60minPlan = fee*exceedingMinutes*additionalFee
              return callCost60minPlan
            }
          },
          lessThan120min(callMinutes){
            const freeMinutes = 120
            var callCost120minPlan = ''
            if (callMinutes<=freeMinutes){
              callCost120minPlan = 0
              return callCost120minPlan
            }
            else{
              const exceedingMinutes = callMinutes - freeMinutes
              callCost120minPlan = fee*exceedingMinutes*additionalFee
              return callCost120minPlan
            }
          }
        }

        const lessThan30min = plansCosts.lessThan30min(callMinutes)
        const lessThan60min = plansCosts.lessThan60min(callMinutes)
        const lessThan120min = plansCosts.lessThan120min(callMinutes)

        const comparison = {
          noPlan: {
            plan: "Sem plano contratado",
            cost: noPlanCallCost
          },
          plan30min: {
            plan:plans[0]['plan'], //Need to refactor
            cost:lessThan30min
          },
          plan60min: {
            plan:plans[1]['plan'], //Need to refactor
            cost:lessThan60min
          },
          plan120min: {
            plan:plans[2]['plan'], //Need to refactor
            cost:lessThan120min
          },       
        }

        return res.status(201).json({ comparison })
      } catch(err){return res.status(400),console.log(err)}
  }
}