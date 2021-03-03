import React, { useState } from 'react'
import api from '../../services/api'

export default function ComparePlans(){
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [callMinutes, setCallMinutes] = useState(0)

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
            onChange={e=>setCallMinutes(e.target.values)}
          />
        </div>
      </form>     
    </div>
  )
}