import React, {PropTypes, Component} from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import styles from '../../styles/MaterialUI/MaterialUI';

/**
 * ProgressBar class
 * Created by nthienan on 10/8/2016.
 */
class ProgressBar extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.show) {
      return <LinearProgress mode="indeterminate" style={styles.progressBar}/>;
    }
    return null;
  }
}

export default ProgressBar;
