import React, { Component, PropTypes } from 'react';

import { Products } from '../api/products.js';
 

export default class Product extends Component 
{
  deleteThisProduct() {
    Products.remove(this.props.product._id);
  }

  render() {
    const productClassName = this.props.product.checked ? 'checked' : '';

    return (
      <div className="product-box">
        <div className="left">
          <img src={this.props.product.imgUrl} width="150px"/>
        </div>

        <div className="right">
          <p>{this.props.product.name}</p>
          <p>${this.props.product.price}</p>

          
          <button className="button" onClick={this.props.edit.bind( this,
            this.props.product._id,
            this.props.product.name, 
            this.props.product.price, 
            this.props.product.imgUrl)}
          >Edit</button>

          <button className="button" onClick={this.deleteThisProduct.bind(this)}>Delete</button>
        </div>

      </div>
    );
  }
}
 
Product.propTypes = {
  product: PropTypes.object.isRequired,
};