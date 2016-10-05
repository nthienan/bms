import React, {PropTypes} from 'react'
import github from './github.png';

class Footer extends React.Component {

  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: {
      root: {
        borderTop: '1px solid #ddd',
        height: '60px',
        lineHeight: '60px',
        backgroundColor: 'white',
        position: 'absolute',
        left: '0px',
        right: '0px',
        bottom: '0px'

      },
      text: {
        display: 'block',
        textAlign: 'center',
        opacity: 'weak-opaque',
        color: '#8f8f8f'
      },
      icon: {
        marginLeft: '10px',
        width: '20px',
        height: '20px',
        verticalAlign: 'middle',
        cursor: 'pointer'
      }
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer style={this.props.style.root}>
        <div style={this.props.style.text}>
          <span>© 2016 An Nguyen</span>
          <a href="https://github.com/thienan93">
            <img style={this.props.style.icon} src={github} role="presentation"/>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer
