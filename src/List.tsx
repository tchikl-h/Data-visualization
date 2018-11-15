import * as React from "react";
import * as ReactDOM from "react-dom";
import SearchAppBar from './SearchBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
const style = require("./List.css");

type Row = string[];

class RowList extends React.Component<{ row: Row }> {
  render() {
    let properRow = [];
    this.props.row.forEach(element => {
      properRow.push(<div style={{display: "inline-block", width: "100%"}}>{element}</div>);
    });
    return (
      <List style={{display: "inline-block", width: "100%"}}>
        <ListItem >
            {properRow}
        </ListItem>
        <Divider />
      </List>
    );
  }
}

class RowTable extends React.Component<{ relation: Array<Row>, filterText: any}> {
  render() {
    var rows = [];
    for (let i = 0; i < this.props.relation[0].length; i++) {
      let row: Row = [];
      this.props.relation.forEach(list => {
        row.push(list[i]);
      });
      if (i === 0)
        rows.push(<b><RowList row={row} /></b>);
        else {
          if (!this.props.filterText) {
            rows.push(<RowList row={row} />);
          }
          else {
            row.forEach(element => {
              if (element.indexOf(this.props.filterText) !== -1) {
                rows.push(<RowList row={row} />);
                return;
              }
            });
          }
        }
    }
    return (
      <table className='table'>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default class FilterableRowTable extends React.Component<{}, { filterText: string, data: any}> {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      data: '',
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleResultChange = this.handleResultChange.bind(this);
  }

  // this is a comment
  componentDidMount() {
    fetch('https://young-peak-48795.herokuapp.com/api/v1/all')
    .then(res => res.json())
    .then(res => {
      this.setState({data: res[1]});
    })
  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  handleResultChange(data) {
    fetch('https://young-peak-48795.herokuapp.com/api/v1/all')
    .then(res => res.json())
    .then(res => {
      this.setState({data: res[data]});
    })
  }
  
  render() {
    if (!this.state.data["relation"])
      return (<h1>Loading data...</h1>)
    return (
      <div>
        <SearchAppBar
          onDataFetched={this.handleResultChange}
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <RowTable
          relation={this.state.data["relation"]}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}