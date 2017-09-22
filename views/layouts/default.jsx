var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>
        <h1>test header</h1>
        {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;