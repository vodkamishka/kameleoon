import React, {useMemo} from 'react';
import {ITest, IData} from '../../store/reducer';
import {useHistory} from 'react-router-dom';

import './board.sass';
import {capitalise, capitaliseType, getSiteName} from '../../utils';
import {black, crimson, gray, green, lightGreen, peach} from "../../constants";

interface IBoardProps {
    test: ITest
    data: IData
}

const Board = (props: IBoardProps) => {

    const history = useHistory();

    const {test: {siteId, name, type, status, id}, data} = props;
    const {sites} = data;

    const statusStyle = {
        color: status === 'ONLINE' ? lightGreen :
               status === 'STOPPED' ? crimson :
                   status === "PAUSED" ? peach : black
    }

    const styleButton = {background: status === 'DRAFT' ? gray : green}

    const fixedStatus = useMemo(() => {
        return capitalise(status)
    }, [status]);

    const fixedType = useMemo(() => {
        return capitaliseType(type)
    }, [type])

    const site = getSiteName(sites, siteId);

    const text = status === 'DRAFT' ? 'Finalize' : 'Result';

    const handleClick = () => {
        const url = (status === 'DRAFT' ? `/${text}/${id}` : `/${text}s/${id}`).toLowerCase();
        history.push(url);
    }

    return (
        <div className={'board'}>
            <div className={'board_column'}>{name}</div>
            <div className={'board_column'}>{fixedType}</div>
            <div className={'board_column'} style={statusStyle}>{fixedStatus}</div>
            <div className={'board_column'}>{site}</div>
            <div>
                <button
                    className={'board_button'}
                    style={styleButton}
                    onClick={handleClick}
                >
                    {text}
                </button>
            </div>
        </div>
    );
};

export default Board;