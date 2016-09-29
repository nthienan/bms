import React, {PropTypes} from 'react';

/**
 * CircularLoading
 */
class NoResultBackground extends React.Component {

  static propTypes = {
    fontSize: PropTypes.string
  };

  static defaultProps = {
    fontSize: '50px'
  };

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-50px',
        marginLeft: '-100px',
        fontSize: this.props.fontSize,
        color: '#b0bec5'
      }}>
        <b>No Results</b>
      </div>
    );
  }
}

export default NoResultBackground;
