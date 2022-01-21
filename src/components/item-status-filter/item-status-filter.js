import React, {Component} from "react";

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    state = {
        filter: 'all'
    };

    buttons = [
        {type: 'button', label: 'All'},
        {type: 'button', label: 'Active'},
        {type: 'button', label: 'Done'}
    ];

    changeFilter = (label) => {
        this.props.updateFilter(label.toLowerCase())
        this.setState({
            filter: label.toLowerCase()
        });
    };

    render() {
        const elements = this.buttons.map((item) => {
            const classNames = 'btn ' + (this.state.filter === item.label.toLowerCase() ? 'btn-info' : 'btn-outline-secondary')
            return (
                <button key={item.label}
                        type={item.type}
                        className={classNames}
                        onClick={() => this.changeFilter(`${item.label}`)}>{item.label}</button>
            );
        });

        return (
            <div className='btn-group'>
                {elements}
            </div>
        );
    };
}
