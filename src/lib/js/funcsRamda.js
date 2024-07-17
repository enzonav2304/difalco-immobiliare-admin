var R = require('ramda'); /** import ALL ramda functions **/

const myR = {
       
    arrayValue: function (prop, data) {
        //console.log('debugging ramda')
        return R.pluck(prop, data) 
    },
    filterCities: function(x) { //this.zone.data
        console.log('and this?')
        return R.into(['Agrigento'], 
        R.compose(
            R.reject(R.propEq('citta', 'Agrigento')),
            R.map(R.prop('citta'))
        ))(x)
    },
    flatArrayMatchObj: function(data, y){
        return this.filterObjects(this.flatten(data), y)
    },
    getTableValue: function(data, y) {
        console.log('hi')
        let obj= this.flatArrayMatchObj(data, y)
        let my_obj = R.omit(['id'], obj[0])
        //console.log(my_obj)
        const x = Object.values(my_obj)
        return R.last(x) //=> 'fum'
    },
    filterObjects: function(data, y) {
        //console.log('exec ramda func')
        const _filter = x => x.id == y
        const t = R.pipe(
            R.filter(_filter)
        )(data)
        return t
    },
    filterZones: function(data, y) { //this.zone.data
        const _filter = x => x.citta == y
        const t = R.pipe(
            R.filter(_filter)
        )(data)
        return t        
    },
    reduceObject: function(data, my_array) {
        console.log('ramda function')
        const cleanObject = (data, props) => R.map(R.omit(props), data)
        return cleanObject(data, my_array)
    },
    returnImageId: function(data, _url) {
        //console.log('is ramda ' + url)
        const port = data
        const ticker = {url: _url}
        const obj = R.find(R.eqProps('url', ticker), port)
        return R.prop('id', obj)
    },
    sortBy: function(field, obj) {//ascending
        console.log('using R sortBy')
        let x = R.sortBy(R.prop(field), obj)
        return x
        //var ascendingSortedObjs = R.sortBy(R.prop('last_nom'), objs)
        //var descendingSortedObjs = R.reverse(ascendingSortedObjs) 
    },
    sortBydesc: function(field, obj) {
        let x = this.sortBy(field, obj)
        return R.reverse(x)        
    },
    //const my_data = myR.reduceObject(this.main_data.data, ['id_immobile', 'contratto', 'tipo_immobile', 'status', 'data_pubblicazione', 'status'])
    
    /* helpers */
    flatten: function(x) {
        const t = R.flatten(x)
        return t
    },
    isEmpty: function(x) {
        return R.isEmpty(x)
    },
    isNull: function(x) {
        return R.isNil(x)
    },
    lengthObj: function(arr) {
        const t = R.length(arr)
        return t
    },
    map: function() {
        return R.map
    },
    omit: function(x, y) {
        return R.omit(x, y)
    },
    prop: function() {
        return R.prop
    }
}  
export default myR