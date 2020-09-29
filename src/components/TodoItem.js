import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class TodoItem extends Component {

    getStyle =() => {
        return {
            padding: 10,            
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }



    render() {
        const {id, title} = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind
                        (this, id)} /> {'  '}
                    {title}
                    <button style={btnStyle} onClick={this.props.delTodo.bind
                        (this, id)} >X</button>
                    
                </p>
            </div>
        )
    }
}

//Prop-Types
TodoItem.propTypes={
    todos: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired    
}
const btnStyle = {
    background: 'red',
    color: 'white',
    broder: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem

