import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';

/**
 * FormDialog class
 * Created by nthienan on 10/9/2016.
 */
class FormDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.element),
    modal: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    modal: true,
    title: 'BMS Application',
    width: 500
  };

  render() {
    let style = {
      width: this.props.width
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
        {this.props.children}
      </Dialog>
    );
  }
}

export default FormDialog;
