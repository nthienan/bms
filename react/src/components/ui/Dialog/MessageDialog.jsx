import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';

class BaseDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.element),
    modal: PropTypes.bool,
    message: PropTypes.string.isRequired,
    title: PropTypes.string,
    width: PropTypes.number
  };

  static defaultProps = {
    modal: true,
    title: 'BMS Application',
    width: 500
  };

  render() {
    let style = {
      width: this.props.width + 'px'
    };
    let titleStyle = {
      fontSize: 'inherit'
    };
    return (
      <Dialog
        title={this.props.title} modal={this.props.modal} actions={this.props.buttons}
        open={this.props.open} onRequestClose={this.props.onRequestClose}
        contentStyle={style} titleStyle={titleStyle}

      >
        {this.props.message}
      </Dialog>
    );
  }

}

export default BaseDialog;
