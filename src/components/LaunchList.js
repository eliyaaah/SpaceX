import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/SpaceX-logo.jpg';


class LaunchList extends Component	{

	constructor(props)	{
		super(props);

		this.state = {
			launches: [],
		};
	}

	componentDidMount()	{

		this.getLaunchData();

	}

	componentDidUpdate(prevProps, prevState)	{
		const { selectedYear } = this.props;

		if (selectedYear && selectedYear !== prevProps.selectedYear)	{
			this.getLaunchData();
		}
	}


	async getLaunchData()	{
		try	{
			const launchData = await axios('https://api.spacexdata.com/v3/launches',	{
				params: {
					launch_year: this.props.selectedYear
				}
			});
			const { data: launches } = launchData;
			this.setState({
				launches
			});
		}	catch(err)	{
			console.error(err.message);
		}

	}

	renderLoader()	{
		return <p>..Loading</p>;
	}


	renderLaunches()	{
		const { launches } = this.state;
		let launchHtml = launches.map(item => {
			const {
				flight_number,
				mission_name: name,
				links
			} = item;

			const { flickr_images: images } = links;

			const imageFound = images.length ? true : false;

			return(
				<div
					key = { flight_number }
					className = "launchCard"
					onClick = { () => { this.props.setSelectedFlight(flight_number) } }
				>
				{ 
					imageFound &&
						<img src={ images[0] }  alt = "not found" />
				}

				{	
					!imageFound &&
						<img src={ logo } alt = "not found" />
				}
					<p className="mission">
						{
							name + " mission"
						}
					</p>
				</div>
			);
		});


		return launchHtml;
 	}

	render()	{
		return (
			<section className="launchListComponent">
				<h2>Launch List</h2>
				<div className="launchList">
					{
						this.state.launches.length
						?	this.renderLaunches()
						:	this.renderLoader()
					}
				</div>
			</section>

		);
	}
}

export default LaunchList;