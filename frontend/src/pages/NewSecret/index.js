import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

// Import logo
import logoImg from '../../assets/logo.svg';

export default function NewSecret() {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [note, setNote] = useState('');

    const history = useHistory();

    const userToken = localStorage.getItem('userToken');

    async function handleNewIncident(event) {
        event.preventDefault();

        const data = { name, username, password, note };

        try {
            await api.post('secrets', data, {
                headers: {
                    Authorization: 'Bearer ' + userToken,
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao criar novo caso, tente novamente', error);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="SakaVault"/>

                    <h1>Cadastrar novo segredo</h1>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                        Voltar
                    </Link>

                </section>

                <form onSubmit={ handleNewIncident }>
                    <input 
                        placeholder="Titulo"
                        value={ name }
                        onChange={ event => setName(event.target.value) }
                    />

                    <input 
                        placeholder="Nome de usuário"
                        value={ username }
                        onChange={ event => setUserName(event.target.value) }
                    />

                    <input 
                        placeholder="Senha"
                        value={ password }
                        onChange={ event => setPassword(event.target.value) }
                    />
                    
                    <textarea 
                        placeholder="Descrição"
                        value={ note }
                        onChange={ event => setNote(event.target.value) }
                    />
                   
                    <button className="button" type="submit"> Cadastrar </button>
                </form>
            </div>
        </div>
    );
}