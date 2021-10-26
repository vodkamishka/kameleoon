import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import './results-finalize.sass';
import {getPartUrl} from '../../utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useDispatch} from "react-redux";
import {fetchTest} from "../../http";
import {useSelectorHook} from "../../components/hooks/reduxHooks";

interface IuseParams {
    id: string
}

const ResultsFinalize = () => {

    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const {id} = useParams<IuseParams>();

    const dispatch = useDispatch();

    const partLocation = getPartUrl(location.pathname);

    const {data} = useSelectorHook(state => state);

    const {test} = data;

    async function loadTest () {
        await fetchTest(dispatch, id);
        setLoading(false);
    }

    useEffect(() => {
        loadTest();
    }, [])

    return (
        <div className='results-finalize'>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    <Header title={partLocation} text={test.name}/>
                    <Footer/>
                </>
            }
        </div>
    );
};

export default ResultsFinalize;