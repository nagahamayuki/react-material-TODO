import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

const style = {
  margin: 12,
};

class TodoInput extends React.Component{

  constructor(){
    super();
    this.state = {
      value: ""
    }
  }

  _onAdd(){
    const newTodo = this.refs.inputText.getValue();
    this.props.onAdd(newTodo)
    this.setState({
      value: ""
    });
  }

  _onChange(){
    this.setState({
      value: this.refs.inputText.getValue()
    });
  }

  render(){
    return(
      <div>
        <TextField
          hintText="input your idea"
          ref="inputText"
          value={this.state.value}
          onChange={this._onChange.bind(this)}
        />
      <RaisedButton label="Secondary" secondary={true} style={style} onClick={this._onAdd.bind(this)} />
      </div>
    );
  }
}

class TodoValue extends React.Component{
  render(){
    return(
        <List>
          {
            this.props.todos.map(function(todo, i){
              return <ListItem key={i} primaryText={todo.item} />
            })
          }
        </List>
    );
  }
}


class TodoApps extends React.Component{

  constructor(){
    super();
    this.state = {
      todos: [{item: "", status: 0}]
    }
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(newTodo){
    this.setState({
      todos: this.state.todos.concat({item:newTodo, status:0})
    });
  }

  render(){
    return(
      <MuiThemeProvider>
        <div>
          <TodoInput onAdd={this.onAdd} />
          <TodoValue todos={this.state.todos} />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<TodoApps />, document.getElementById("content"));
