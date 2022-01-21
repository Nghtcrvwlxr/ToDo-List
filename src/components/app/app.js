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
        ],
        search: '',
        filter: 'all'
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

    onSearchUpdate = (label) => {
        this.setState({
            search: label
        });
    };

    onFilterUpdate = (label) => {
        this.setState({
            filter: label
        });
    };

    searchData = (data, search) => {
        if (search) {
            return data.filter(item => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1)
        } else {
            return data;
        }
    };

    filterData = (data, filter) => {
        if (filter === 'all') {
            return data
        }
        if (filter === 'active') {
            return data.filter(item => !item.done)
        }
        if (filter === 'done') {
            return data.filter(item => item.done)
        }
    };

    render() {

        const {todoData, search, filter} = this.state;

        const doneCount = todoData.filter((el) => el.done ).length;
        const todoCount = todoData.length - doneCount;
        const visibleData = this.searchData(this.filterData(todoData, filter), search);

        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className='top-panel d-flex'>
                    <SearchPanel updateSearch={this.onSearchUpdate}/>
                    <ItemStatusFilter updateFilter={this.onFilterUpdate}/>
                </div>

                <TodoList
                    todos={visibleData}
                    onItemDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}/>

                <ItemAddForm
                    onItemAdded={this.addItem}/>
            </div>
        );
    };
}
