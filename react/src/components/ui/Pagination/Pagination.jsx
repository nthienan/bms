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
    },
    pageSize: [
      {lable: '10 rows/page', value: 10},
      {lable: '20 rows/page', value: 20},
      {lable: '50 rows/page', value: 50},
      {lable: '100 rows/page', value: 100},
      {lable: '200 rows/page', value: 200},
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 10
    }
  }

  pageLabel(page, limit, total) {
    const from = Math.min(((page - 1) * limit) + 1, total);
    const to = Math.min((page * limit), total);
    return `${from} - ${to} of ${total}`;
  }

  onChange = (event, key, value) => {
    this.setState({value});
    this.props.handlePageSizeClick(value);
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
      <DropDownMenu labelStyle={style.labelStyle} underlineStyle={style.underlineStyle} style={style.root}
                    iconStyle={style.iconStyle} value={this.state.value} onChange={this.onChange}
      >
        {
          this.props.pageSize.map((e, i) =>
            <MenuItem key={i} value={e.value} primaryText={e.lable}/>)
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
          onClick={this.props.handlePageClick}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          disabled={this.props.page * this.state.value >= this.props.total}
          onClick={this.props.handlePageClick}
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
