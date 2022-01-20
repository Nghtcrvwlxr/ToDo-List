import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    maxId = 3;

    state = {
        todoData: [
            {label: 'Drink Coffee', important: false, id: 1},
            {label: 'Learn React', important: true, id: 2},
            {label: 'Make an Awesome App', important: false, id: 3}
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const newData = todoData.filter((elem) => id !== elem.id);
            return {
                todoData: newData
            };
        });
    };

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: ++this.maxId
        };

        this.setState(({todoData}) => {
            const newData = [...todoData, newItem];
            return {
                todoData: newData
            };
        });
    };

    render() {
        return (
            <div className='todo-app'>
                <AppHeader toDo={1} done={3}/>

                <div className='top-panel d-flex'>
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onItemDeleted={this.deleteItem}/>

                <ItemAddForm
                    onItemAdded={this.addItem}/>
            </div>
        );
    };
}
