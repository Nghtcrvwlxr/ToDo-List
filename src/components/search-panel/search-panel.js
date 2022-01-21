import React, {Component} from "react";

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });

        this.props.updateSearch(e.target.value)
    };

    render() {
        return (
            <input type='text'
                   className='form-control search-input'
                   placeholder='type to search'
                   onChange={this.onLabelChange}
                   value={this.state.label}/>
        );
    };
}
