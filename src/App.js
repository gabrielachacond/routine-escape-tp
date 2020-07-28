import React from 'react';
import Header from './Components/Header';
import Search from './Components/Search';
import CardList from './Components/CardList';
import hotelsData from './data';
import { isToday, createDateFromString, getHeaderDescriptionFrom, getHeaderDescriptionTo } from './utils';

class App extends React.Component {

	// sugerencia modificada: se le quita el constructor.

	state = {
		destinations: hotelsData,
		arrivalDateDefault : new Date().setDate(new Date().getDate() - 1),
	    departureDateDefault : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
		filters: {
			arrivalDate:  new Date().setDate(new Date().getDate() - 1).valueOf(),
			departureDate:  new Date(new Date().setFullYear(new Date().getFullYear() + 1)).valueOf(),
			country: 'all',
			price: -1,
			rooms: -1
		},
		headerDescriptionFrom: null,
		headerDescriptionTo: null
	}
	// sugerencia modificada: el metodo construye una lista de objeto, de tipo value text, para construir las opciones del select country...

	getCountryList = () => {
		let countryListTemp = new Set(); // para que no guarde repetido, por ejemplo varios hoteles de Argetinas
		let countryList = [];

        this.state.destinations.forEach(destination => {
            countryListTemp.add(destination.country); // 
        });

        Array.from(countryListTemp).forEach(destination => {
            countryList.push({ value: destination, text: destination });
        });

        return countryList;
	}

	// sugerencia modificada: el metodo construye una lista de objeto, de tipo value text, para construir las opciones del select price...

	getPriceList = () => { //ahora este muestra las opciones de valores de precio
        let priceSelectOptions = [];
        let textSelectOption = '$';

        for (let i = 1; i <= 4; i++) {
            priceSelectOptions.push({ value: i, text: textSelectOption });
            textSelectOption = textSelectOption + '$';
        }

        return priceSelectOptions;
	}

	// sugerencia modificada: el metodo construye una lista de objeto, de tipo value text, para construir las opciones del select room...
	getRoomsList = () => {
        let roomList = new Set();
        this.state.destinations.forEach(destination => {
            roomList.add({ value: destination.rooms, text: destination.rooms });
        });

        return Array.from(roomList).sort((a, b) => a.value - b.value);
    }

	selectArrivalDateHandler = (date) => { 
		date = isToday(date) ? new Date(this.arrivalDateDefault) : createDateFromString(date); //aplico elvis operator:  / porque el usuario seleciona un string pero debo pasarlo a obj fecha
		let state = { ...this.state }; //clonar el estado
		state.filters.arrivalDate = date.valueOf(); // formato milisegundo porque DataJs lo tiene asi, se mantiene.
		state.headerDescriptionFrom = getHeaderDescriptionFrom(date); // y luego muestro ese estado en la cabecera, lo hace en string y lo traduzco en espanol a evaluar
		this.setState(state);
	}

	selectDepartureDateHandler = (date) => {
		date = createDateFromString(date);
		let state = { ...this.state };
		state.filters.departureDate = date.valueOf();
		state.headerDescriptionTo = getHeaderDescriptionTo(date);
		this.setState(state);
	}

	selectCountryHandler = (country) => {
		let state = { ...this.state };
		state.filters.country = country;
		this.setState(state);
	}

	selectPriceHandler = (price) => {
		let state = { ...this.state };
		state.filters.price = Number(price);
		this.setState(state);
	}

	selectRoomHandler = (rooms) => {
		let state = { ...this.state };
		state.filters.rooms = Number(rooms);
		this.setState(state);
	}

	applyFilters = (destination) => {
		// sugerencia modificada: destructuring
		const { arrivalDate, departureDate, country, price, rooms } = this.state.filters;
		const { arrivalDateDefault, departureDateDefault } = this.state;

        return (
            // compara la fecha disponible de llegada que tiene el hotel y la compara con la seleccion del usaurio en el filtro
            // si la fecha de llegada disponible del hotel es menor o igual a la seleccionada es true y muestra el hotel
            // si no lo es, no incluye el hotel en la lista - tengo que hacer el mensaje con if
            (destination.availabilityFrom <= arrivalDate || arrivalDate === arrivalDateDefault.valueOf()) &&
            // compara la fecha disponible de salida que tiene el hotel y la compara con la seleccionó el usaurio en el filtro
            // si la fecha de salida disponible del hotel es mayor o igual a la seleccionada es true y muestra el hotel
            // si no lo es, no incluye el hotel en la lista
            (destination.availabilityTo >= departureDate || departureDate === departureDateDefault.valueOf()) &&
            // compara si el pais del hotel es igual al seleccionado en el filtro, si es asi, incluye el hotel en la lista, de los contrario no lo incluye
            (destination.country === country || country === 'all') &&
            // compara si el precio del hotel es igual al seleccionado en el filtro, si es asi, incluye el hotel en la lista, de los contrario no lo incluye
            (destination.price === price || price === -1) &&
            // compara si el tamaño del hotel es igual al seleccionado en el filtro, si es asi, incluye el hotel en la lista, de los contrario no lo incluye
            (destination.rooms <= rooms || rooms === -1)

			// de resto (el caso o/or) toma los valores por defecto y siempre incluye el hotel en ese filtro
		);
	}

	render() {
        const { headerDescriptionFrom, headerDescriptionTo, destinations } = this.state;
        const {
            selectArrivalDateHandler,
            selectDepartureDateHandler,
            getCountryList,
            selectCountryHandler,
            getPriceList,
            selectPriceHandler,
            getRoomsList,
            selectRoomHandler,
            applyFilters } = this;

        return (
            <div className="main-wrapper">
                {/*  */}
                <Header
                    headerDescriptionFrom={headerDescriptionFrom}
                    headerDescriptionTo={headerDescriptionTo} />

                {/*  */}
                <Search
                    onArrivalDateSelected={selectArrivalDateHandler}
                    onDepartureDateSelected={selectDepartureDateHandler}
                    //
                    countryList={getCountryList()}
                    onCountrySelected={selectCountryHandler}
                    //
                    priceList={getPriceList()}
                    onPriceSelected={selectPriceHandler}
                    //
                    roomList={getRoomsList()}
                    onRoomSelected={selectRoomHandler} />

                {/*  */}
                <CardList
                    data={destinations.filter(applyFilters)} />
            </div>
        );
    }
}

export default App;
