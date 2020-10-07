import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

import api from '../../services/api';

import './modal.css';

export default function Modal( props ){
    const { className, modalRef } = props;

    // Delete account
    function handleDeleteAccount(){
        document.getElementByClassName('hidden').style.display='block';
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
                            <button type="button" className="button-modal deletebtn">Remover</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
	);
};