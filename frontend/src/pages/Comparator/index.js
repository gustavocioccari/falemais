import React, { useState } from 'react'
import api from '../../services/api'

export default function ComparePlans(){
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [callMinutes, setCallMinutes] = useState('')
  const [costs, setCosts] = useState()
  const [compare, setCompare] = useState(false)

  const setTable = compare ?

      <div>
        <ul>
            <li>
              <strong>{costs.noPlan.plan}</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                .format(costs.noPlan.cost)}</p>

              <strong>{costs.plan30min.plan}</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                .format(costs.plan30min.cost)}</p>

              <strong>{costs.plan60min.plan}</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                .format(costs.plan60min.cost)}</p>

              <strong>{costs.plan120min.plan}</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                .format(costs.plan120min.cost)}</p>
            </li>
        </ul>
      </div> : null

  async function handleCompareCosts(e){
    e.preventDefault()
    const comparisonBody = {
      from,
      to,
      callMinutes
    }
    console.log(comparisonBody)
    try{
      await api.post('/comparison', comparisonBody)
        .then(response=>{
          setCosts(response.data.comparison)
          setCompare(true)
        })
    } catch(err){
        alert('Erro ao realizar comparação, tente novamente.')
        console.log(err)
    }
  } 

  return(
    <div className="comparator-container">
      <header>
        {/* <img src={logoImg} alt="Be the Hero"/> */}
        <span>Bem vindo ao comparador de planos VxTel</span>
      </header>
      <form>
        <div>
          <label>DDD de Origem</label>
          <select value={from} onChange={e=>setFrom(e.target.value)}>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
          </select>
        </div>
        <div>
          <label>DDD de Destino</label>
          <select value={to} onChange={e=>setTo(e.target.value)}>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
          </select>
        </div>
        <div>
          <label>Tempo de ligação (minutos)</label>
          <input
            value={callMinutes}
            onChange={e=>setCallMinutes(e.target.value)}
          />
        </div>
        <div>
          <button 
            className="compare-button"
            onClick={handleCompareCosts}
            type="submit"
          >
            Comparar planos
          </button>
          <div>
            {setTable}
          </div>
        </div>
      </form>
    </div>
  )
}