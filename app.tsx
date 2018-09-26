import * as React from "react";
import * as ReactDOM from "react-dom";
import FirstComponent from './src/FirstComponent'
import FilterableContactTable from './src/List'
import SimpleList from './src/example';
var data = require('./data.json');
var data2 = require('./data2.json');

ReactDOM.render(
<div>
<FilterableContactTable data={data2} />
</div>,
  document.getElementById("root")
);