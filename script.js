/*==========================================
    AIzaSyBjg1Mi2v_ngILNzWk976jvbMOSi2eHqHM
============================================*/

function log(val) {
    console.log(val)
}

let res = document.querySelector('#demo')

function getGeolocation() {

    if(!navigator.geolocation) {

        res.innerHTML = 'Não foi possível recuparar sua geolocalização'
    }
    
    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition( showPosition )

    }
}

function showPosition(position) {

    let lat = position.coords.latitude
    let long = position.coords.longitude
    let precision = position.coords.accuracy
    
    getAddress(lat, long, precision)
}

function getAddress(lat, long, precision) {

    let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=4lVrtUJjANlUnQxK5Y5d6OxDJiDwCpO1&q=${lat}%2C${long}&language=pt-br`
    
    let ajax = new XMLHttpRequest()

    ajax.open('GET', url)
    
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200) {

            let dadosJsonText = ajax.responseText
            let dadosObj = JSON.parse(dadosJsonText)

            creatElement(dadosObj, precision)
        }
    }

    ajax.send()
}

function creatElement(obj, precision) {

    let section = document.querySelector('section')

    let divResponse = document.createElement('div')
    divResponse.className = 'response'

        let divLocal = document.createElement('div')
        divLocal.className = 'response-box'

            let pLocal = document.createElement('p')
            pLocal.innerHTML = '<b>Local: </b>' + obj.LocalizedName

        let divCidade = document.createElement('div')
        divCidade.className = 'response-box'

            let pCidade = document.createElement('p')
            pCidade.innerHTML = '<b>Cidade: </b>' + obj.SupplementalAdminAreas[0].LocalizedName
        
        let divEstado = document.createElement('div')
        divEstado.className = 'response-box'

            let pEstado = document.createElement('p')
            pEstado.innerHTML = '<b>Estado: </b>' + obj.AdministrativeArea.LocalizedName
        
        let divPais = document.createElement('div')
        divPais.className = 'response-box'

            let pPais = document.createElement('p')
            pPais.innerHTML = '<b>País: </b>' + obj.Country.LocalizedName
        
        let divInfo = document.createElement('div')
        divInfo.className = 'response-box'

            let pInfo = document.createElement('p')
            pInfo.innerHTML = '<b>Precisão: </b>' + precision + ' m'

            let pLat = document.createElement('p')
            pLat.innerHTML = '<b>Latitude: </b>' + obj.GeoPosition.Latitude

            let pLong = document.createElement('p')
            pLong.innerHTML = '<b>Longitude: </b>' + obj.GeoPosition.Longitude


    divLocal.appendChild(pLocal)
    divResponse.appendChild(divLocal)

    divCidade.appendChild(pCidade)
    divResponse.appendChild(divCidade)
    
    divEstado.appendChild(pEstado)
    divResponse.appendChild(divEstado)
    
    divPais.appendChild(pPais)
    divResponse.appendChild(divPais)

    divInfo.appendChild(pInfo)
    divInfo.appendChild(pLat)
    divInfo.appendChild(pLong)
    divResponse.appendChild(divInfo)

    section.append(divResponse)
}
