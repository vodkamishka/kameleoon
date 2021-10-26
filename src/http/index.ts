import axios from 'axios';
import {AppDispatch} from '../store';
import {getData, getTest} from '../store/reducer';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const fetchData = async (dispatch: AppDispatch) => {

    const sites  = await $host.get('sites');
    const tests  = await $host.get('tests');

    const data = {sites: sites.data, tests: tests.data};

    dispatch(getData(data))
}

export const fetchTest = async(dispatch: AppDispatch, id: string) => {

    const response = await $host.get(`tests/${id}`);
    dispatch(getTest(response.data))
}
