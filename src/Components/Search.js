import React from 'react';


class Search extends React.Component {

	countrySelectOptions = () => {
		let countrySelectOptions = []; 

		countrySelectOptions.push(<option value="all">Selecione...</option>);
		this.props.countryList.forEach(country => {
			countrySelectOptions.push(<option value={country}>{country}</option>);
		});

		return countrySelectOptions; 
	}

	priceSelectOptions = () => {
		let priceSelectOptions = [];
		let textSelectOption = '$';

		priceSelectOptions.push(<option value="-1">Selecione...</option>);
		for (let i = 1; i <= 4; i++) {
			priceSelectOptions.push(<option value={i}>{textSelectOption}</option>);
			textSelectOption = textSelectOption + '$';
		}

		return priceSelectOptions; //asi tengo la lista de opciones de precios del 1-4
	}

	roomSelectOptions = () => {
		let roomSelectOptions = [];

		roomSelectOptions.push(<option value="-1">Selecione...</option>); //el primer valor siempre en negativo para que el filtro lo tome
		this.props.roomList.forEach(rooms => {
			roomSelectOptions.push(<option value={rooms}>{rooms}</option>);
		});

		return roomSelectOptions;
	}
	//las funciones que captura el evento del cambio de los input

	selectArrivalDateHandler = (event) => { 
		this.props.onArrivalDateSelected(event.target.value); //de aca saco el valor y se lo paso a la funcion que viene por prop y actualiza el estado en app
	}

	selectDepartureDateHandler = (event) => {
		this.props.onDepartureDateSelected(event.target.value);
	}

	selectCountryHandler = (event) => {
		this.props.onCountrySelected(event.target.value);
	}

	selectPriceHandler = (event) => {
		this.props.onPriceSelected(event.target.value);
	}

	selectRoomHandler = (event) => {
		this.props.onRoomSelected(event.target.value);
	}

	render() {

		return (
			<div className="container h-100">
				<div className="header-text display-table h-100">
					<div className="display-table-cell vertical-align-bottom">
						<div className="bg-white-opacity padding-40px-top padding-20px-lr border-radius-3">
							<div className="row align-items-center justify-content-center">

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<label>Fecha de llegada</label> {/* descripcion para el input*/}
										<input type="date" onChange={this.selectArrivalDateHandler}></input> 
									</div>
								</div>

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<label>Fecha de salida</label>
										<input type="date" onChange={this.selectDepartureDateHandler}></input>
									</div>
								</div>

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<div className="select-option">
											<label>Pais</label>
											<select onChange={this.selectCountryHandler}> 
												{this.countrySelectOptions()}  {/*las opciones se contruyen en este metd de la linea 6*/}
											</select>
										</div>
									</div>
								</div>

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<div className="select-option">
											<label>Precio</label>
											<select onChange={this.selectPriceHandler}>
												{this.priceSelectOptions()}  {/*El metodo que construyen las opciones de la l-17*/}
											</select>
										</div>
									</div>
								</div>

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<div className="select-option">
											<label>Habitaciones</label>
											<select onChange={this.selectRoomHandler}>
												{this.roomSelectOptions()}
											</select>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Search;
