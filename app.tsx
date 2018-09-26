import * as React from "react";
import * as ReactDOM from "react-dom";
import FilterableContactTable from './src/List'
var data = require('./data.json');
var data2 = require('./data2.json');

ReactDOM.render(
<div>
<FilterableContactTable data={data2} />
</div>,
  document.getElementById("root")
);