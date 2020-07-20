import React from 'react';
import Card from './Card';

function CardList(props) {
	return (
		<section>
			<div className="container">
				<div className="row popular-things">
					{props.data.map(destination =>
						<Card
							key={destination.slug}  //el ID del hotel 
							info={destination} />
					)}
				</div>
			</div>
		</section>
	);
}

export default CardList;
