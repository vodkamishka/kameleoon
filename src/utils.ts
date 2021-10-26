import {ISite} from './store/reducer';

export const getSiteName = (sites: ISite[], siteId: number): string => {
    return sites
        .find(el => el.id === siteId)!.url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '');
}

export const getSiteNumber = (sites: ISite[], url: string) => {

    return sites.find((site: ISite) => site.url === url)!.id
}

export const capitalise = (str: string) => str.charAt(0) + str.slice(1).toLowerCase()

export const capitaliseType = (str: string) => {
    return str === 'MVT' ? str : capitalise(str)
}

export const getPartUrl = (location: string) => location
    .replaceAll('/', '')
    .replaceAll(/\d+/g, '');
