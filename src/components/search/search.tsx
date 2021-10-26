import search from '../../assets/icons/search.svg';
import {useDispatchHook} from '../../components/hooks/reduxHooks';

import './search.sass';
import {ITest} from '../../store/reducer';

interface ISearchProps {
    tests: ITest[],
    value: string
    setValue: (value: string) => void
}

const Search = (props: ISearchProps) => {

    const {getMatch} = useDispatchHook();

    const {tests, value, setValue} = props;

    return (
        <div className={'search'}>
            <div className="search_frame">
                <input
                    type={'text'}
                    placeholder={'What test are you looking for?'}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        getMatch(e.target.value);
                    }}
                />
                <img src={search} alt={'search'}/>
                <div className="search_tests">{`${tests.length} tests`}</div>
            </div>
        </div>
    );
};

export default Search;