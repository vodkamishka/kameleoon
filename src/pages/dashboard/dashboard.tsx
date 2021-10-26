import React, {useEffect, useState} from 'react';
import Board from '../../components/board/board';
import Header from '../../components/header/header';
import './dashboard.sass'
import Search from '../../components/search/search';
import {fetchData} from '../../http/index';
import {useDispatchHook, useSelectorHook} from '../../components/hooks/reduxHooks';
import {useDispatch} from 'react-redux';

interface IOrderState {
    [key: string]: boolean,
}

const Dashboard = () => {

    const dispatch = useDispatch();

    const {sortOrder, dropResult, setOrderStatus} = useDispatchHook();

    const [loading, setLoading] = useState(true);

    const [order, setOrder] = useState<IOrderState>({
        name: false,
        type: false,
        site: false,
        status: false
    })

    const [value, setValue] = useState<string>('')

    const {data} = useSelectorHook(state => state);

    const {tests} = data;

    const handleClick = (key: string) => {
        setOrder((prevState: IOrderState) => ({...prevState, key: !prevState.key}))
        sortOrder({order: !order.key, key});
    }

    const handleClickStatus = () => {
        setOrder((prevState: IOrderState) => ({...prevState, status: !prevState.status}))
        setOrderStatus(!order.status);
    }

    const handleReset = () => {
        dropResult();
        setValue('')
    }

    async function loadData () {
        await fetchData(dispatch);;
        setLoading(false);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className={'dashboard'}>
            {loading ?
                <div>Loading...</div>
            :
                <>
                    <Header title={'dashboard'}/>
                    <main>
                        <Search tests={tests} value={value} setValue={setValue}/>
                        {tests.length ?
                            <>
                                <div className='dashboard_header'>
                                    <div className='dashboard_column' onClick={() => handleClick('name')}>name</div>
                                    <div className='dashboard_column' onClick={() => handleClick('type')}>type</div>
                                    <div className='dashboard_column' onClick={handleClickStatus}>status</div>
                                    <div className='dashboard_column' onClick={() => handleClick('siteId')}>site</div>
                                </div>
                                <div className="boards">
                                    {tests.map(test =>
                                        <Board test={test} data={data} key={test.id}/>
                                    )}
                                </div>
                            </>
                            :
                            <div className='empty-search'>
                                <div className='empty-search_text'>Your search did not match any results.</div>
                                <button onClick={handleReset}>Reset</button>
                            </div>

                        }
                    </main>
                </>
            }

        </div>
    );
};

export default Dashboard;