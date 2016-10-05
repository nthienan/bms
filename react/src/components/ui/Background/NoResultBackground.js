import React, {PropTypes} from 'react';

/**
 * NoResultBackground
 */
class NoResultBackground extends React.Component {

  static propTypes = {
    fontSize: PropTypes.string
  };

  static defaultProps = {
    fontSize: '50px'
  };

  render() {
    const style = {
      fontSize: this.props.fontSize,
      color: '#b0bec5',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    };
    return (
      <div style={style}>
        <b>No Results</b>
      </div>
    );
  }
}

export default NoResultBackground;
