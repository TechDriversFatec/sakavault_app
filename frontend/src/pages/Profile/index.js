import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

// Styles
import './styles.css'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ ongId ] );


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${ id }`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (error) {
            alert('Erro ao excluir caso, tente novamente',error);
        }
    }


    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    // Delete account
    function handleDeleteAccount(){
        
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="SakaVault"/>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo segredo
                </Link>

                <button onClick={ handleDeleteAccount } type="submit"></button>
                <button onClick={ handleLogout } type="submit"><FiPower size={ 18 } color="#e02041" /></button>
            </header>

            <h1>Segredos cadastrados</h1>

            <ul>
               { incidents.map(incidents => (
                    <li key={ incidents.id }>
                        <strong>Titulo</strong>
                        <p>{ incidents.title }</p>
                        <strong>Usuário</strong>
                        <p>{ incidents.description }</p>
                        <strong>E-mail</strong>
                        <p>{ incidents.password }</p>

                        <button onClick={ () => handleDeleteIncident(incidents.id), () => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(incidents.id) } } type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
               )) }
            </ul>

            <div className="modal hidden">
                <span onclick="document.getElementByClassName('hidden').style.display='none'" class="close" title="Close Modal">×</span>
                <form className="modal-content" onSubmit={}>
                    <div className="container">
                    <h1>Remover Conta</h1>
                    <span>
                        <p>Tem certeza que deseja deletar sua conta?</p>
                        <p className="strong">
                        Todos os dados serão perdidos permanentemente sem a possibilidade de recuperação.
                        </p>
                    </span>
                    
                    
                    <div className="clearfix">
                        <button className="button-red" type="button" onclick="document.getElementById('id01').style.display='none'" className="cancelbtn">Cancelar</button>
                        <button type="button" onclick="document.getElementById('id01').style.display='none'" className="deletebtn">Remover</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}