var React = require('react');
var DefaultLayout = require('./layouts/default');

class ErrorMessage extends React.Component {
  render() {
    return (
        {this.props.name}
    );
  }
}

module.exports = HelloMessage;