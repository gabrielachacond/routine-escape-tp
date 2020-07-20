import React from 'react';


function Card(props) {

	let priceStyle = {
		margin: '0 2px', // el espacio entre $
		fontSize: '16px', 
		fontWeight: 'bold'
	};

	let price = []; // lista vacia para guardar los elementos de $

	for (let i = 0; i < 4; i++) {
		if (i + 1 <= props.info.price) {
			let priceStyleWihtColor = { ...priceStyle, color: '#2196f3' }; //copia del obj en azul 
			price.push(<li style={priceStyleWihtColor}>$</li>); // lista del $ + el color azul
		} else
			price.push(<li style={priceStyle}>$</li>);
	}

	return (
		<div className="col-lg-4 sm-margin-30px-bottom margin-20px-bottom">
			<div className="theme-shadow border-radius-3">

				<img src={props.info.photo} alt="" /> // asi traigo la prop de foto y trae del JSON

				<div className="padding-15px-left padding-20px-top padding-0px-bottom">
					<h3 className="no-margin-bottom">{props.info.name}</h3>  {/* el prop del nombre del hotel */}
				</div>
				<div className="padding-15px-all d-flex justify-content-between">

					<p className="font-size13 no-margin-bottom">{props.info.description}</p>  {/* el prop de la descrp del hotel */}
				</div>

				<div className="border-bottom padding-25px-all d-flex justify-content-between">
					<h5 className="font-size17 no-margin-bottom">
						<a href="single-room.html" className="text-extra-dark-gray">{props.info.city}, {props.info.country}</a>
					</h5>
					<ul className="rate no-margin-bottom">
						{price}  {/*viene del array de linea 12, no es un prop */}
					</ul>
				</div>

				<div>
					<div className="row align-items-center text-center padding-15px-tb">
						<div className="col-6 border-right">
							<div className="butn small">Reservar</div>
						</div>
						<div className="col-6">
							<span className="display-block font-size20 letter-spacing-2 text-extra-dark-gray">{props.info.rooms}</span>
							<span>HABITACIONES</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
