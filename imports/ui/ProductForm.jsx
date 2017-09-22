import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Products } from '../api/products.js';



export default class ProductForm extends Component {

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.form_id) {
      Products.update(this.props.form_id, {
        $set: {
          name: this.props.formName,
          price: this.props.formPrice,
          imgUrl: this.props.formImgUrl
        },
      });

    }
    else {
      Products.insert
      ({
          name: this.props.formName,
          price: this.props.formPrice,
          imgUrl: this.props.formImgUrl,
          createdAt: new Date()
      });
    }

    this.props.hideForm();
  }

  handleChangeName(event) {
    this.props.onChangeInputName(event.target.value);
  }

  handleChangePrice(event) {
    this.props.onChangeInputPrice(event.target.value);
  }

  handleChangeImgUrl(event) {
    this.props.onChangeInputImgUrl(event.target.value);
  }

  render() {
    var visibilityState = this.props.visible ? "visible" : "hidden";
    var header = this.props.form_id ? "Edit product" : "New product";

    return (   
      <div className="modal" style={{visibility: visibilityState}}>
        <div className="modal-content">
          <span onClick={this.props.hideForm} className="close">&times;</span>
          <h3>{header}</h3>
          


          <form onSubmit={this.handleSubmit.bind(this)} >
            <label>Name</label>
            <input
              value={this.props.formName}
              onChange={(event) => this.handleChangeName(event)}
              type="text"
              ref="nameInput"
              placeholder="Enter name..."
            />
            <br />

            <label>Price</label>
            <input
              value={this.props.formPrice}
              onChange={(event) => this.handleChangePrice(event)}
              type="number"
              ref="priceInput"
              placeholder="Enter price..."
            />
            <br />

            <label>Image URL</label>
            <input
              value={this.props.formImgUrl}
              onChange={(event) => this.handleChangeImgUrl(event)}
              type="url"
              ref="imgUrlInput"
              placeholder="Image URL..."
            />
            <br />

            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }


}