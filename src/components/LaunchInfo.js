import React, { Component } from 'react';
import axios from 'axios';

class LaunchInfo extends Component	{

	constructor(props)	{
		super(props);

		this.state = {
			data: null
		};
	}

	componentDidMount()	{

		this.getLaunchInfo();

	}


	async getLaunchInfo()	{
		try	{
			const launchInfo = await axios(`https://api.spacexdata.com/v3/launches/${this.props.flightNumber}`);
			
			const { data } = launchInfo;

			this.setState({ data });

		} catch(err)	{
			console.error(err.message);
		}
	}

	renderLoader()	{
		return <p>..Loading</p>;
	}

	renderImages(images)	{
		const imagesHtml = images.map((item, index) => {

			return(
				<div
					key = { index }
					className = "images"
				>
					<img src = { item } alt="not found" />
				</div>
			);
		});

		return imagesHtml;
	}

	renderNoImages()	{
		return <p>No images available at this time</p>;
	}

	renderInfo()	{
		const { data } = this.state;
		const {
			details,
			flight_number,
			mission_name: name,
			rocket,
			launch_date_local: date,
			launch_site,
			launch_success,
			links
		} = data;

		const time = date.slice(0,10);

		const { rocket_name } = rocket;

		const { site_name_long: site } = launch_site;

		const { 
			article_link: article,
			flickr_images: images,
			mission_patch: patch,
			youtube_id: video,
			wikipedia: wiki
		} = links;


		return(
			<div
				key = { flight_number }
				className = "launchInfo"
			>

				<p className="mission">
					Mission: 
					{
						" " + name
					}
				</p>

				{ patch &&
					<img src={ patch } alt="not found" className="patch"/>
				}

				<span className="imageGallery">
					{
						images.length
						?	this.renderImages(images)
						:	this.renderNoImages()
					}
				</span>

				<table>
					<tbody>
						<tr>
		    				<th>Site</th>
		    				<td>{ site }</td>
		  				</tr>

		  				<tr>
		    				<th>Rocket</th>
		    				<td>{ rocket_name }</td>
		  				</tr>

		  				<tr>
		    				<th>Time</th>
		    				<td>{ time }</td>
		  				</tr>
		  			</tbody>
				</table>
				<span className="info">
					
					<p className="details">
						{ details }
					</p>


					<p className="success">	{
						launch_success === true
						? "Launch successful \u2705"
						: "Launch failed \u274C"
					}
					</p>

					{ article &&
						<a className="article" href={ article }>Read more about this launch</a>
					
					}
				</span>
				
				<span className="buttons">
					
					{ video && 
						<img 
							className="youtube"
							src={require("../images/youtube_logo.png")}
							alt = "not found"
							onClick={ () => { 
								this.props.openModal();
								this.props.setSelectedVideo(video);
							}}
						/>

					}

					{ wiki &&
						<a href={ wiki }>
							<img 
								className="wiki"
								src={require("../images/wikilogo.png")}
								alt = "not found"
							/>
						</a>
					}

				</span>

				<button
					type="button"
					className = "backButton"
					onClick = { () => { this.props.setSelectedFlight(null) } }
					>Back
				</button>
				


			</div>
		);
	}

	render()	{
		return(
			<div className = "launchInfo">
					{
						this.state.data
						? this.renderInfo()
						: this.renderLoader()
					}
	      	</div>
		);

	}
}

export default LaunchInfo;