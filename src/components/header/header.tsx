import React from 'react';
import './header.sass';

interface IHeader {
    title: string,
    text?: string
}

const Header = (props: IHeader) => {
    const {title, text} = props;

    return (
        <header className={'header'}>
            <div className={'header_title'}>{title}</div>
            {text && <div className={'header_text'}>{text}</div>}
        </header>
    );
};

export default Header;