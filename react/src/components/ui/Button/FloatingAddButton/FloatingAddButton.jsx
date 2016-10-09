import React, {PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MaterialUiStyles from '../../../styles/MaterialUI/MaterialUI'

class FloatingAddButton extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: MaterialUiStyles.floatButton
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div>
        <FloatingActionButton style={this.props.style} onTouchTap={this.handleClick}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}

export default FloatingAddButton;
