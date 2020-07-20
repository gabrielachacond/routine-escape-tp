import React from 'react';
import Header from './Components/Header';
import Search from './Components/Search';
import CardList from './Components/CardList';
import hotelsData from './data';
import { isToday, createDateFromString, getHeaderDescriptionFrom, getHeaderDescriptionTo } from './utils';

class App extends React.Component {

	constructor() {
		super();

		this._arrivalDateDefault = new Date().setDate(new Date().getDate() - 1); //atributo de la clase en JS empieza siempre con this._ y -1 para tener un rango de fechas iniciales
		this._departureDateDefault = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // desde hoy hasta 1 ano despues, para que me muestre todos los hoteles hasta +1 year

		this.state = {
			destinations: hotelsData,
			filters: { //filtro de los state inicial
				arrivalDate: this._arrivalDateDefault.valueOf(),
				departureDate: this._departureDateDefault.valueOf(),
				country: 'all',
				price: -1,
				rooms: -1
			},
			headerDescriptionFrom: null,
			headerDescriptionTo: null
		};

		this._countryList = this.getCountryList(); //lista de paises que se crean en el for
		this._roomList = this.getRoomsList();  // lista de habitaciones 
	}

	getCountryList = () => {
		let countryList = new Set(); // para que no guarde repetido, por ejemplo varios hoteles de Argetinas
		this.state.destinations.forEach(destination => { 
			countryList.add(destination.country); // de ese destino, saco una lista.
		});

		return Array.from(countryList); // aca retorno el set en formato de array  para poder recorrerlo en search
	}

	getRoomsList = () => {
		let roomList = new Set();
		this.state.destinations.forEach(destination => {
			roomList.add(destination.rooms);
		});

		return Array.from(roomList).sort((a, b) => a - b);  // orden de menor a mayor e igual retur en array
	}

	selectArrivalDateHandler = (date) => { 
		date = isToday(date) ? new Date(this._arrivalDateDefault) : createDateFromString(date); //aplico elvis operator:  / porque el usuario seleciona un string pero debo pasarlo a obj fecha
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
		return (
			(destination.availabilityFrom <= this.state.filters.arrivalDate || this.state.filters.arrivalDate === this._arrivalDateDefault.valueOf()) && // si la fecha de llegada del destino esta habilitada 
			(destination.availabilityTo >= this.state.filters.departureDate || this.state.filters.departureDate === this._departureDateDefault.valueOf()) && // habilita si la fecha de destino es menor a la que esta disponible el hotel
			(destination.country === this.state.filters.country || this.state.filters.country === 'all') && // si el pais destino esta disponible 
			(destination.price === this.state.filters.price || this.state.filters.price === -1) && //por precio
			(destination.rooms <= this.state.filters.rooms || this.state.filters.rooms === -1) //por habiltacion - es que todo funcione
		);
	}

	render() {
		return (
			<div className="main-wrapper">
				{/*  */}
				<Header
					headerDescriptionFrom={this.state.headerDescriptionFrom}
					headerDescriptionTo={this.state.headerDescriptionTo} />

				{/*  */}
				<Search
					onArrivalDateSelected={this.selectArrivalDateHandler}
					onDepartureDateSelected={this.selectDepartureDateHandler}
					//
					countryList={this._countryList}
					onCountrySelected={this.selectCountryHandler}
					//
					onPriceSelected={this.selectPriceHandler}
					//
					roomList={this._roomList}
					onRoomSelected={this.selectRoomHandler} />

				{/*  */}
				<CardList
					data={this.state.destinations.filter(this.applyFilters)} />
			</div>
		);
	}
}

export default App;
