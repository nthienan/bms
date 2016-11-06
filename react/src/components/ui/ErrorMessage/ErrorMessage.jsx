import React, {PropTypes} from 'react';

/**
 * ErrorMessage class
 * Created by nthienan on 10/30/2016.
 */
class ErrorMessgae extends React.Component {

  static propTypes = {
    hide: PropTypes.bool,
    message: PropTypes.node.isRequired,
    style: PropTypes.object,
    textStyle: PropTypes.object
  };

  static defaultProps = {
    hide: false,
    style: {
      backgroundColor: '#db6a64',
      borderRadius: '2px'
    }
    ,
    textStyle: {
      fontStyle: 'italic',
      lineHeight: '1.6',
      fontSize: '15.5px',
      color: '#ffffff',
      padding: '5px'
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        <p style={this.props.textStyle}>{this.props.message}</p>
      </div>
    );
  }
}

export default ErrorMessgae;
