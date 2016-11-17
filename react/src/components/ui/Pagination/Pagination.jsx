import React, {PropTypes} from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

/**
 * Pagination class
 * Created by nthienan on 10/2/2016.
 */
class Pagination extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func,
    handlePageSizeClick: PropTypes.func,
    pageSize: PropTypes.array
  };

  static defaultProps = {
    style: {
      root: {
        display: 'flex',
        float: 'right',
        color: '#616161'
      },
      text: {
        lineHeight: '48px'
      }
    }
  };

  constructor(props) {
    super(props);
    props.pageSize.map(e => {
      if (e.selected) {
       this.state = {value: e.value};
      }
    });
  }

  pageLabel(page, limit, total) {
    const from = Math.min(((page - 1) * limit) + 1, total);
    const to = Math.min((page * limit), total);
    return `${from} - ${to} of ${total}`;
  }

  goToPrevious = () => {
    this.props.handlePageClick(this.props.page - 1);
  };

  goToNext = () => {
    this.props.handlePageClick(this.props.page + 1);
  };

  onPageSizeChange = (event, key, value) => {
    this.props.handlePageSizeClick(value);
    this.setState({value});
  };

  renderPageSize() {
    const style = {
      root: {
        fontSize: 'inherit',
      },
      labelStyle: {
        lineHeight: 'inherit'
      },
      underlineStyle: {
        border: 'none'
      },
      iconStyle: {
        top: '12px'
      }
    };

    return (
      <DropDownMenu labelStyle={style.labelStyle}
                    underlineStyle={style.underlineStyle}
                    style={style.root}
                    iconStyle={style.iconStyle}
                    value={this.state.value}
                    onChange={this.onPageSizeChange}
      >
        {
          this.props.pageSize.map((e, i) =>
            <MenuItem key={i} value={e.value} primaryText={e.label}/>)
        }
      </DropDownMenu>
    );
  }

  render() {
    return (
      <div style={this.props.style.root}>
        <div style={this.props.style.text}>
          {this.renderPageSize()}
        </div>
        <IconButton
          disabled={this.props.page === 1}
          onTouchTap={this.goToPrevious}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          disabled={this.props.page * this.state.value >= this.props.total}
          onTouchTap={this.goToNext}
        >
          <ChevronRight />
        </IconButton>
        <div style={this.props.style.text}>
          {this.pageLabel(this.props.page, this.state.value, this.props.total)}
        </div>
      </div>
    );
  }
}

export default Pagination;
