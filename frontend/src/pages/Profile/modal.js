import React, { useState, useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

import api from '../../services/api';

import './modal.css';

export default function Modal( handleClose, show ){
    const history = useHistory();

    const userID = localStorage.getItem('userToken');

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    // Delete account
    function handleDeleteAccount(){
        document.getElementByClassName('hidden').style.display='block';
    }

	return (
		<div className={ showHideClassName }>
            <section className="modal hidden">
                <span onclick={ handleClose } class="close" title="Close Modal">×</span>
                <form className="modal-content">
                    <div className="container">
                        <h1>Remover Conta</h1>
                        <span>
                            <p>Tem certeza que deseja deletar sua conta?</p>
                            <p className="strong">
                            Todos os dados serão perdidos permanentemente sem a possibilidade de recuperação.
                            </p>
                        </span>
                        
                        
                        <div className="clearfix">
                            <button className="button-red" type="button" onclick="document.getElementByClassName('hidden').style.display='none'" className="cancelbtn">Cancelar</button>
                            <button type="button" onclick="document.getElementById('id01').style.display='none'" className="deletebtn">Remover</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
	);
};