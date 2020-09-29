import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import Header from './components/layout/Header'
//import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class App extends Component {
  state ={
    todos: []
    /*todos: [
      {
        id: uuidv4(),
        title: 'Take out to trash',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Dinner with wife',
        completed: true
      },
      {
        id: uuidv4(),
        title: 'Meeting with Boss',
        completed: false
      }            
    ]*/
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({todos: res.data}))
  }

  markComplete = (id) =>{
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })} );
  }

  //Delete Todo
  /*delTodo = (id) =>{
   this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]});
  }*/

  delTodo = (id) =>{
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
    ;
   }
  //Using from Json placeholder for delete

  //Add Todo
  /*addTodo = (title) =>{
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]})
  }*/
  //Getting from Json placeholder
  addTodo =(title) =>{
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({todos: [...this.state.todos, res.data]}))
  }

  render(){
      return (    
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo} />
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
            </React.Fragment> 
          )}/>
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
