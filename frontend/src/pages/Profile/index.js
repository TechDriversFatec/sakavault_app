import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import Modal from './modal.js';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

// Styles
import './styles.css'

export default function Profile() {

    const [secrets, setSecrets] = useState([]);
    const [dropdown, setDropdown] = useState("");

    const history = useHistory();

    const userToken = localStorage.getItem('userToken');

    const showDropdown = () => {
        console.log("show");
        //se clicar no botão, modal aparece
        setDropdown("show");
        document.body.addEventListener("click", closeDropdown);
    }

    const closeDropdown = event => {
        console.log("hidden");
        setDropdown("");
        document.body.removeEventListener("click", closeDropdown);
    };

    useEffect( () => {
        if(userToken == null){ 
            history.push('/');
            return;
        }else{
            api.get('secrets', {
                headers: {
                    Authorization: 'Bearer ' + userToken,
                }
            }).then(response => {
                setSecrets(response.data.data);
            })
        }
    }, [userToken] );

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`secrets/${ id }`, {
                headers: {
                    Authorization: 'Bearer ' + userToken,
                }
            });

            setSecrets(secrets.filter(secrets => secrets.id !== id));
        } catch (error) {
            alert('Erro ao excluir caso, tente novamente',error);
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    let state = {
        isShowing: false
    }

    async function openModalHandler() {
        state = {isShowing: true};
    }

    async function closeModalHandler() {
        state = {isShowing: false};
    }

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="SakaVault"/>

                <Link className="button" to="/secrets/new">
                    Cadastrar novo segredo
                </Link>

                <a className="button-red" style={{ marginLeft: 16 }} onClick={ showDropdown }>Excluir conta</a>
                
                <button onClick={ handleLogout } type="submit"><FiPower size={ 18 } color="#e02041" /></button>
            </header>

            <h1>Segredos cadastrados</h1>
            
            <ul>
               { secrets.map(secrets => (
                    <li key={ secrets.id }>
                        <strong>Nome</strong>
                        <p>{ secrets.name }</p>
                        <strong>Usuário</strong>
                        <p>{ secrets.username }</p>
                        <strong>Password</strong>
                        <p>{ secrets.password }</p>
                        <strong>Notas</strong>
                        <p>{ secrets.notes }</p>

                        <button 
                        onClick={ () => handleDeleteIncident(secrets.id), () => {
                            if (window.confirm('Are you sure you wish to delete this item?')) 
                            this.onCancel(secrets.id) 
                            } } type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
               )) }
            </ul>

            <Modal className={ dropdown }/>
        </div>
    );
}