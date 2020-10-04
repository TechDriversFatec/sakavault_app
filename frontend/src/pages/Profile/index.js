import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Modal from './modal.js';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

// Styles
import './styles.css'

export default function Profile() {
    const [secrets, setIncidents] = useState([]);
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const userID = localStorage.getItem('id');


    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: userID,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ userID ] );


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`secrets/${ id }`, {
                headers: {
                    Authorization: userID,
                }
            });

            setIncidents(secrets.filter(secrets => secrets.id !== id));
        } catch (error) {
            alert('Erro ao excluir caso, tente novamente',error);
        }
    }


    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    const [state, setState] = useState({});
    //onst state = { show: false };

    async function showModal() {
        setState({ show: true });
    };

    async function hideModal() {
        setState({ show: false });
    };

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="SakaVault"/>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo segredo
                </Link>

                <Link className="button-red" onClick={ showModal }></Link>
                <button onClick={ handleLogout } type="submit"><FiPower size={ 18 } color="#e02041" /></button>
            </header>

            <h1>Segredos cadastrados</h1>

            <ul>
               { secrets.map(secrets => (
                    <li key={ secrets.id }>
                        <strong>Titulo</strong>
                        <p>{ secrets.title }</p>
                        <strong>Usuário</strong>
                        <p>{ secrets.email }</p>
                        <strong>E-mail</strong>
                        <p>{ secrets.password }</p>

                        <button onClick={ () => handleDeleteIncident(secrets.id), () => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(secrets.id) } } type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
               )) }
            </ul>

            <Modal show={ state.show } handleClose={ hideModal }></Modal>
        </div>
    );
}