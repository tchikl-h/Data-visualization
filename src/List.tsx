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

class ContactRow extends React.Component<{ row: Row }> {
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

class ContactTable extends React.Component<{ relation: Array<Row>, filterText: any}> {
  render() {
    var rows = [];
    console.log(this.props.relation);
    for (let i = 0; i < this.props.relation[0].length; i++) {
      let row: Row = [];
      this.props.relation.forEach(list => {
        row.push(list[i]);
        console.log(list[i]);
      });
      if (i === 0)
        rows.push(<b><ContactRow row={row} /></b>);
      else {
        rows.push(<ContactRow row={row} />);
        // row.forEach(element => {
        //   if (element.indexOf(this.props.filterText))
        //     rows.push(<ContactRow row={row} />);
        // });
        console.log("-------------------");
      }
    }
    return (
      <table className='table'>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default class FilterableContactTable extends React.Component<{ data: any }, { filterText: any }> {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: ''
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    
  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }
  
  render() {
    if (this.props.data["relation"])
      return (<h1>The data is malformed</h1>)
    return (
      <div>
        <SearchAppBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <ContactTable
          relation={this.props.data["relation"]}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}