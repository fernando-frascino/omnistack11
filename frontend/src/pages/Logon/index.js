import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImage from '../../assets/logo.svg';
import herosImage from '../../assets/heroes.png';

export default function Logon() {

  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.ong.name);

      history.push('/profile');
    }catch{
      alert('Erro no login, por favor tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID"
            onChange={e => setId(e.target.value)}
            value={id}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={herosImage} alt="Heros"/>
    </div>
  );
}