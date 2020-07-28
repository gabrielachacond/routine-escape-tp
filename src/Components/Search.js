import React from 'react';


class Search extends React.Component {

	
	//las funciones que captura el evento del cambio de los input

	selectArrivalDateHandler = (event) =>
        this.props.onArrivalDateSelected(event.target.value); // sugerencia modificada: la funcion retorna una sola cosa, no hace faltan las llaves {}


    selectDepartureDateHandler = (event) =>
        this.props.onDepartureDateSelected(event.target.value);


    selectCountryHandler = (event) =>
        this.props.onCountrySelected(event.target.value);


    selectPriceHandler = (event) =>
        this.props.onPriceSelected(event.target.value);


    selectRoomHandler = (event) =>
        this.props.onRoomSelected(event.target.value);

	render() {
		const { countryList, priceList, roomList } = this.props;

        const emptySelectOption = 'Selecione...';

        const countrySelectOptions = [{ value: 'all', text: emptySelectOption }, ...countryList];
        const priceSelectOptions = [{ value: '-1', text: emptySelectOption }, ...priceList];
        const roomSelectOptions = [{ value: '-1', text: emptySelectOption }, ...roomList];

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
												{countrySelectOptions.map(option => <option value={option.value}>{option.text}</option>)}
			
											</select>
										</div>
									</div>
								</div>

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<div className="select-option">
											<label>Precio</label>
											<select onChange={this.selectPriceHandler}>
												{priceSelectOptions.map(option => <option value={option.value}>{option.text}</option>)}	
											</select>
										</div>
									</div>
								</div>

								<div className="col-md-6 col-lg">
									<div className="form-group">
										<div className="select-option">
											<label>Habitaciones</label>
											<select onChange={this.selectRoomHandler}>
												{roomSelectOptions.map(option => <option value={option.value}>{option.text}</option>)}
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
