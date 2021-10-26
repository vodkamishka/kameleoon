import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {searchMatch, sortAlphabet, resetResult, sortStatus} from '../../store/reducer';

interface ISortOrder {
    order: boolean,
    key: string
}

export const useDispatchHook = () => {

    const dispatch = useDispatch<AppDispatch>();
    const getMatch = (value: string) => dispatch(searchMatch(value));
    const sortOrder = (action: ISortOrder) => dispatch(sortAlphabet(action));
    const setOrderStatus = (order: boolean) => dispatch(sortStatus(order));
    const dropResult = () => dispatch(resetResult());

    return {getMatch, sortOrder, dropResult, setOrderStatus}

}

export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector;