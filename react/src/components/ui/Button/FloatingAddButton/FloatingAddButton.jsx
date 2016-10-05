import React, {PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MaterialUiStyles from '../../../styles/MaterialUI/MaterialUI'

class FloatingAddButton extends React.Component {

  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: MaterialUiStyles.floatButton
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FloatingActionButton style={this.props.style}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}

export default FloatingAddButton;
