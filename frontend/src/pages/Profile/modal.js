import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

import api from '../../services/api';

import './modal.css';

export default function Modal( props ){
    const { className, modalRef } = props;
    const history = useHistory();

    // Delete account
    function handleDeleteAccount(){
        let confirmDelete = prompt("Para confirmar a exclusão da conta digite o nome do seu usuário: ");
        try{
            if(confirmDelete != null){
                localStorage.clear();
                history.push('/');
            }
        }catch(err){
            alert(err);
        }
    }

	return (
		<div ref={ modalRef } className={ `${className} modal` }>
            <section className="hidden">
                <span className="close" title="Close Modal">×</span>
                <form className="modal-content">
                    <div className="container">
                        <h1>Remover Conta</h1>
                        <span>
                            <p>Tem certeza que deseja deletar sua conta?</p>
                            <p className="strong">
                            Todos os dados serão perdidos permanentemente sem a possibilidade de recuperação.
                            </p>
                        </span>
                        
                        
                        <div className="btn-space">
                            <button className="button-modal cancelbtn" type="button" >Cancelar</button>
                            <button type="button" className="button-modal deletebtn" onClick={ handleDeleteAccount }>Remover</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
	);
};