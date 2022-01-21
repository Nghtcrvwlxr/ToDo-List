import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    maxId = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Learn React'),
            this.createTodoItem('Make an Awesome App'),
        ]
    };

    createTodoItem(label) {
        return {
            label: label,
            done: false,
            important: false,
            id: ++this.maxId
        };
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
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newData = [...todoData, newItem];
            return {
                todoData: newData
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    render() {

        const {todoData} = this.state;

        const doneCount = todoData.filter((el) => el.done ).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className='top-panel d-flex'>
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onItemDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}/>

                <ItemAddForm
                    onItemAdded={this.addItem}/>
            </div>
        );
    };
}
