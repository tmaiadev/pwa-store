import React, { Component } from 'react';

export default function(importPromise, props) {
    class AsyncComponent extends Component {
        state = { component: null };
    
        async componentDidMount() {
            const { default: component } = await importPromise();
            this.setState({ component });
        }

        render() {
            const C = this.state.component;

            return C ?
                <C {...this.props} {...props} /> : null; 
        }
    }

    return AsyncComponent;
}