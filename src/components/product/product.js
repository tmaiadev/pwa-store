import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const product = props => {
    return <Link to={props.id} className="product">
        <div style={{ backgroundImage: `url(${props.image})` }}
             className="product__image" />
        <div className="product__title">
            {props.name}
        </div>
        <div>
            R$ {props.price.toFixed(2).replace('.', ',')}
        </div>
        <div className="product__installments">
            ou 4x de {(props.price / 3).toFixed(2).replace('.', ',')}
        </div>
    </Link>
}

export default product;