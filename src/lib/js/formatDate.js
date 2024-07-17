import * as moment from 'moment'


export const formatDate = (date) => {
    if (date) {
        return moment(date).format('DD-MM-YYYY hh:mm:ss')
    }
}