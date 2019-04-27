import React, { Component } from 'react';

class YearSelect extends Component	{
	constructor()	{
		super();

		this.state = {
			value: "2019"
		}
	}


	handleChange = (event) =>	{
		this.props.setSelectedYear(event.target.value);

		this.setState({
			value: event.target.value
		})
	}

	render()	{ 

		return(
			<div className="yearSelect">
				<p className = "intro">
					Founded in 2002 by Elon Musk, SpaceX company has a goal of reducing space transportation costs and enabling the colonization of Mars.<br />
					It has since conducted many rocket launches starting from 2006. 
				</p>

				<label htmlFor="year"> Select year: </label>
				<select 
					value = { this.state.value }
					name="year" 
					id="year" 
					onChange = { this.handleChange }
				>
						<option value="2006">2006</option>
						<option value="2007">2007</option>
						<option value="2008">2008</option>
						<option value="2009">2009</option>
						<option value="2010">2010</option>
						<option value="2011">2011</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
						<option value="2016">2016</option>
						<option value="2017">2017</option>
						<option value="2018">2018</option>
						<option value="2019">2019</option>
						<option value="2020">2020</option>
				</select>
				<p>Click on launch to view more information about it</p>
			</div>
		);
	}
}

export default YearSelect;