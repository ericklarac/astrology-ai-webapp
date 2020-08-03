import React, { Component } from 'react';
import { Button } from '@fluentui/react-northstar';

export class Answer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Button
				fluid
				onClick={() => this.props.onClick(this.props.name)}
				style={this.props.style}
			>
				<h1>{this.props.name}</h1>
			</Button>
		);
	}
}
