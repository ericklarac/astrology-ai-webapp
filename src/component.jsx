import React from 'react';
import axios from 'axios';
import { Answer } from './components/answer';
import { Button, Grid, Layout } from '@fluentui/react-northstar';

const URL = 'https://1d2130613de7.ngrok.io';

export class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Virgo',
			list: [
				['Aries', '#FF5353'],
				['Taurus', '#80C181'],
				['Gemini', '#FFE153'],
				['Cancer', '#C8C8C8'],
				['Leo', '#FFA35A'],
				['Virgo', '#AF8366'],
				['Libra', '#FDBDBD'],
				['Scorpio', '#252525'],
				['Sagittarius', '#C0ADEF'],
				['Capricorn', '#666B67'],
				['Aquarius', '#80BFEA'],
				['Pisces', '#A1E2C4'],
			],
			interest: 'love',
			interests: [
				['Love', '#CA1551'],
				['Friends', '#03CEA4'],
				['Work life', '#345995'],
				['Future', '#FB4D3D'],
				['Fears', '#78C0E0'],
				['Money', '#F46036'],
			],
			horoscope: '',
			hasAcceptedIntro: false,
			hasSelectedSign: false,
			hasSelectedInterest: false,
			isHoroscopeLoading: true,
			horoscopeError: false,
		};

		this.handleIntroChange = this.handleIntroChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleInterestChange = this.handleInterestChange.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
	}

	handleIntroChange() {
		this.setState({ hasAcceptedIntro: true });
	}

	handleChange(updatedValue) {
		this.setState({ value: updatedValue, hasSelectedSign: true });
	}

	handleInterestChange(updatedInterest) {
		this.setState(
			{
				interest: updatedInterest,
				hasSelectedInterest: true,
			},
			this.makeRequest
		);
	}

	makeRequest() {
		axios
			.get(URL + '/' + this.state.value + '/' + this.state.interest, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
					'Access-Control-Allow-Headers':
						'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
				},
			})
			.then((response) => {
				if (response.status == 200) {
					console.log(response);
					this.setState({
						horoscope: response.data.text,
						isHoroscopeLoading: false,
					});
				} else {
					this.setState({
						horoscope: 'An error ocurred on the server. Try again.',
						isHoroscopeLoading: false,
						horoscopeError: true,
					});
				}
			});
	}

	render() {
		let madeWithLove = (
			<p>
				Made with <span style={{ color: '#e25555' }}>&#9829;</span> by{' '}
				<a href='https://github.com/ericklarac' target='blank'>
					@ericklarac
				</a>{' '}
				and{' '}
				<a href='https://github.com/carloshinojosac' target='blank'>
					@carloshinojosac
				</a>
			</p>
		);

		let intro = (
			<div>
				<h1>Astrology AI</h1>

				<p style={{ fontSize: '2em' }}>
					We used OpenAI's GPT-2 (a text-generating Transformer Neural Network)
					to generate horoscope text.
				</p>

				<p style={{ fontSize: '2em' }}>
					Get your horoscope in three simple steps:
				</p>

				<div>
					<p style={{ fontSize: '1.7em' }}>1. Pick your zodiac sign</p>
					<p style={{ fontSize: '1.7em' }}>2. Pick an interest</p>
					<p style={{ fontSize: '1.7em' }}>
						3. Be patient. Text is generated in real-time, so it might take a
						bit.
					</p>
				</div>

				<p style={{ fontSize: '2em' }}>
					It's pretty easy to train your own text-generating model using{' '}
					<a
						target='blank'
						href='https://colab.research.google.com/drive/1VLG8e7YSEwypxU-noRNhsv5dW4NfTGce'
					>
						this colab notebook.
					</a>
				</p>

				<Button
					onClick={() => this.handleIntroChange()}
					style={{
						fontSize: '2em',
						backgroundColor: '#1be504',
						color: '#fff',
						width: '50em',
						height: '3em',
					}}
				>
					Start!
				</Button>

				{madeWithLove}
			</div>
		);

		let zodiacSignsView = (
			<div>
				<h1>Pick your zodiac sign</h1>

				<Grid
					style={{ alignItems: 'center' }}
					columns={2}
					content={this.state.list.map((zodiac_sign) => (
						<Answer
							key={zodiac_sign[0]}
							name={zodiac_sign[0]}
							onClick={this.handleChange}
							style={{
								padding: '5em',
								backgroundColor: zodiac_sign[1],
								color: '#fff',
							}}
						/>
					))}
				/>
			</div>
		);

		let interestsView = (
			<Layout>
				<h1>Pick an interest</h1>
				<Grid
					columns={1}
					content={this.state.interests.map((key_interest) => (
						<Answer
							key={key_interest[0]}
							name={key_interest[0]}
							onClick={this.handleInterestChange}
							style={{
								padding: '5em',
								backgroundColor: key_interest[1],
								color: '#fff',
							}}
						/>
					))}
				/>
			</Layout>
		);

		return (
			<div>
				{!this.state.hasAcceptedIntro ? (
					intro
				) : !this.state.hasSelectedSign ? (
					zodiacSignsView
				) : !this.state.hasSelectedInterest ? (
					interestsView
				) : this.state.isHoroscopeLoading ? (
					<div>
						<h1>Please wait, the AI is generating your horoscope...</h1>
					</div>
				) : this.state.horoscopeError ? (
					<div>
						<h1>An error occurred</h1>
						<p>{this.state.horoscope}</p>
					</div>
				) : (
					<div>
						<p style={{ fontSize: '3em' }}>Your horoscope is:</p>
						<p style={{ fontSize: '1.4em', padding: '2em' }}>
							{this.state.horoscope}
						</p>

						<Button
							onClick={() => window.location.reload(false)}
							style={{
								fontSize: '2em',
								backgroundColor: '#048ee5',
								color: '#fff',
								width: '50em',
								height: '3em',
							}}
						>
							Try again!
						</Button>
						{madeWithLove}
					</div>
				)}
			</div>
		);
	}
}
