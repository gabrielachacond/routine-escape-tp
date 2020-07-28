import React from 'react';
import Card from './Card';
import Uneventful from './Uneventful';

function CardList(props) {
    const cards = props.data.map(destination =>
        <Card
            key={destination.slug}
            info={destination} />
    );

    console.log(props.data.length);

    return (
        <section>
            <div className="container">
                <div className="row popular-things">
                    {props.data.length > 0
                    ? cards
                    : <Uneventful />}
                </div>
            </div>
        </section>
    );
}

export default CardList;
