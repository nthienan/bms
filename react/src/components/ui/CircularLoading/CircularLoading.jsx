import React, {PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * CircularLoading
 */
class CircularLoading extends React.Component {

  static propTypes = {
    show: PropTypes.bool,
    size: PropTypes.number
  };

  static defaultProps = {
    show: false,
    size: 2
  };

  render() {
    if (this.props.show) {
      return (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-50px',
          marginLeft: '-50px'
        }}>
          <CircularProgress size={this.props.size}/>
        </div>
      );
    }
    return null;
  }
}

export default CircularLoading;
