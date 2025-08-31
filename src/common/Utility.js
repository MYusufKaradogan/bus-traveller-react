import i18n from 'i18next';
import dayjs from 'dayjs';

const currencyMap = {
    'tr': 'TRY',
    'en': 'USD',
    'de': 'EUR',
    'fr': 'EUR',
};

export const moneyFormatter = (price) => {
    const lang = i18n.language || 'tr-TR';

    const shortLang = lang.split('-')[0];

    const currency = currencyMap[shortLang];

    const formatter = new Intl.NumberFormat(lang, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    });

    return formatter.format(price || 0);
};


export const addUTCOffsetToDate = (prmDate) => {
    if (prmDate) {
        const date = new Date(prmDate);
        const offsetMinutes = date.getTimezoneOffset();
        if (offsetMinutes !== 0) {
            const offsetHours = -1 * Math.floor(offsetMinutes / 60);
            prmDate = prmDate.add(offsetHours, "hours").toISOString();
        }
    }
    return prmDate;
};

export const convertDate = (strDate) => {
    if (strDate) {
        strDate = dayjs(strDate);
    }
    return strDate;
};