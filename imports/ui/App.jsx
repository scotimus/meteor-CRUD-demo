import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../api/products.js';
import ProductForm from './ProductForm.jsx';
import Product from './Product.jsx';

// App component - represents the whole app
class App extends Component {
    constructor() {
    super();
    this.state = {
      formVisible: false,
      form_id: null,
      formName: "",
      formPrice: "",
      formImgUrl: ""
    };
  }

  onChangeInputName(name) {
    this.setState({formName: name});
  }

  onChangeInputPrice(price) {
    this.setState({formPrice: price});
  }

  onChangeInputImgUrl(imgUrl) {
    this.setState({formImgUrl: imgUrl});
  }

  onNew() {
    this.setState({
      formVisible: true,
      form_id: null,
      formName: "",
      formPrice: "",
      formImgUrl: ""
    });
  }

  onEdit(_id, name, price, imgUrl) {
  this.setState({
      formVisible: true,
      form_id: _id,
      formName: name,
      formPrice: price,
      formImgUrl: imgUrl
    });
  }

  hideForm() {
    this.setState({formVisible: false});
  }

   renderProducts() {
    return this.props.products.map((product) => (
      <Product key={product._id} product={product} edit={this.onEdit.bind(this)}/>
    ));
  }

  render() {
    return (
      <div className="container">

        <button className="button" onClick={() => this.onNew()}>New product</button>

        <ProductForm 
          visible={this.state.formVisible}
          hideForm={this.hideForm.bind(this)}  
          form_id={this.state.form_id}
          formName={this.state.formName}
          formPrice={this.state.formPrice}
          formImgUrl={this.state.formImgUrl}
          onChangeInputName={this.onChangeInputName.bind(this)}
          onChangeInputPrice={this.onChangeInputPrice.bind(this)}
          onChangeInputImgUrl={this.onChangeInputImgUrl.bind(this)}
        />

        <header>
          <h1>Product list</h1>
        </header>

        {this.renderProducts()}
      
      </div>
    );
  }
}

App.propTypes = {
  products : PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    products: Products.find({}).fetch(),
  };
}, App);