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
import ActionInfo from 'material-ui/svg-icons/action/info';

import { withGoogleMap } from "react-google-maps";

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
          hintText="ここにTodoを入力"
          ref="inputText"
          value={this.state.value}
          onChange={this._onChange.bind(this)}
        />
        <RaisedButton label="追加" secondary={true} style={style} onClick={this._onAdd.bind(this)} />
      </div>
    );
  }
}

class TodoValue extends React.Component{

  _onDelete(i){
    this.props.onDelete(i);
  }

  render(){
    return(
        <List>
          {
            this.props.todos.map((todo, i) => {
              if(todo.status == 0){
                return <ListItem key={i} primaryText={todo.item} rightIcon={<ActionInfo />} leftCheckbox={<Checkbox onClick={this._onDelete.bind(this, i)} />} />
              }else{
                return <ListItem key={i} primaryText={todo.item} />
              }
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
      todos: []
    }
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onAdd(newTodo){
    this.setState({
      todos: this.state.todos.concat({item:newTodo, status:0})
    });
  }

  onDelete(i){
    const targetTodo = this.state.todos[i];
    targetTodo.status = 1;
    console.log(targetTodo);
    this.setState({
      todos: this.state.todos
    });
  }

  render(){
    return(
      <MuiThemeProvider>
        <div>
          <TodoInput onAdd={this.onAdd} />
          <TodoValue todos={this.state.todos} onDelete={this.onDelete} />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<TodoApps />, document.getElementById("content"));
