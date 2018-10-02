import * as React from 'react';
import * as PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchAppBar extends React.Component<any, { anchorEl: any }> {
    constructor(props) {
        super(props);
        this.state = {
          anchorEl: null,
        };
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }
  
    handleClick = (event, data) => {
      if (this.state.anchorEl === null)
        this.setState({ anchorEl: event.currentTarget });
      else {
        if (data !== null)
        this.props.onDataFetched(data)
        this.setState({ anchorEl: null });
      }
    };

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
      }

    render() {
      let items = [];
      for (let i = 0; i < 100; i++) {
        items.push(<MenuItem onClick={((e) => this.handleClick(e, i))}>{i}</MenuItem>);
      }
        return (
            <div className={this.props.classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton className={this.props.classes.menuButton} aria-owns={this.state.anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={((e) => this.handleClick(e, null))} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={((e) => this.handleClick(e, null))}
                    >
                      {items}
                    </Menu>
                </IconButton>
                <Typography className={this.props.classes.title} variant="title" color="inherit" noWrap>
                    Data visualization
                </Typography>
                <div className={this.props.classes.grow} />
                <div className={this.props.classes.search}>
                    <div className={this.props.classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <Input
                    placeholder="Search…"
                    disableUnderline
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                    classes={{
                        root: this.props.classes.inputRoot,
                        input: this.props.classes.inputInput,
                    }}
                    />
                </div>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

export default withStyles(styles as any)(SearchAppBar);