import React from 'react';
import chevron from '../../assets/icons/chevron.svg';
import './footer.sass';
import {useHistory} from "react-router-dom";

const Footer = () => {

    let history = useHistory();

    return (
        <footer className={'footer'}>
            <button onClick={()=> history.push('/dashboard')}>
                <img src={chevron} alt={'back'}/>
            </button>
            <div>back</div>
        </footer>
    );
};

export default Footer;