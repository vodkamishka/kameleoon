import {createSlice} from '@reduxjs/toolkit';
import {getSiteName} from "../utils";

type Types = 'CLASSIC' | 'SERVER_SIDE' | 'MVT';

type StatusType = 'DRAFT' | 'ONLINE' | 'PAUSED' | 'STOPPED';

export interface ISite {
    id: number;
    url: string;
}

export interface ITest {
    id: string;
    name: string;
    type: Types;
    status: StatusType;
    siteId: number;
}

export interface IData {
    sites: ISite[];
    tests: ITest[];
    immutableTests: ITest[],
    test: ITest
}

const initialState: IData = {
    sites: [],
    tests: [],
    immutableTests: [],
    test: {
        id: '',
        name: '',
        type: 'CLASSIC',
        status: "ONLINE",
        siteId: 1
    }
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getData(state, action) {
            state.sites = action.payload.sites;
            state.tests = action.payload.tests;
            state.immutableTests = action.payload.tests
        },
        searchMatch(state, action) {
            state.tests = !!action.payload ?
                state.tests.filter(test => test.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1) :
                state.immutableTests;
        },
        sortAlphabet(state, action) {

            const {order, key} = action.payload;

            let tests = JSON.parse(JSON.stringify(state.tests));
            let sites = JSON.parse(JSON.stringify(state.sites));

            const compare = (a: any, b: any) => {

                if (key === 'siteId') {
                    a = getSiteName(sites, a[key]);
                    b = getSiteName(sites, b[key]);

                    if (order) return a.localeCompare(b)
                    return b.localeCompare(a)
                }

                if (order) return a[key].localeCompare(b[key])
                return b[key].localeCompare(a[key])

            }

            tests.sort(compare)
            state.tests = tests;

        },
        resetResult(state) {
            state.tests = state.immutableTests;
        },
        getTest(state, action) {
            state.test = action.payload
        },
        sortStatus(state, action) {

            const tests = state.tests;

            const online = tests.filter(test => test.status === 'ONLINE');
            const paused = tests.filter(test => test.status === 'PAUSED');
            const stopped = tests.filter(test => test.status === 'STOPPED');
            const draft = tests.filter(test => test.status === 'DRAFT');

            if (action.payload) {
                state.tests = [...online, ...paused, ...stopped, ...draft]

            } else {
                state.tests = [...draft, ...stopped, ...paused, ...online]
            }
        }
    }
})

export const {getData, searchMatch, sortAlphabet, resetResult, getTest, sortStatus} = dataSlice.actions;

export default dataSlice.reducer

