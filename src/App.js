import React, { Component } from 'react';
import './styles/styles.scss'


import Header from './components/Header.js';
import Footer from './components/Footer.js';
import LaunchList from './components/LaunchList.js';
import YearSelect from './components/YearSelect.js';
import ModalVideo from 'react-modal-video';
import LaunchInfo from './components/LaunchInfo.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedYear: 2019,
      isOpen: false,
      isEmptyState: true,
      flightNumber: null
    };
  }

  setSelectedYear = (year) => {
    this.setState({
      selectedYear: year
    });
  }

  setSelectedVideo = (video) => {
    this.setState({
      selectedVideo: video,
      isOpen: true
    });
  }

  setSelectedFlight = (flightNumber)  =>  {
    this.setState({
      flightNumber: flightNumber
    });
  }


  openModal = () =>  {
    this.setState({
      isOpen: true
    })
  }

  render()  {
    return(
      <div className="appComponent">
        <Header title="SpaceX Launches" />
        <main>

          { !this.state.flightNumber &&
            <YearSelect 
              setSelectedYear = { this.setSelectedYear } 
            />
          }

          { !this.state.flightNumber && 
            <LaunchList 
              selectedYear = { this.state.selectedYear }
              setSelectedFlight = { this.setSelectedFlight }
            />
          }

          { this.state.flightNumber &&
            <LaunchInfo 
              setSelectedVideo = { this.setSelectedVideo }
              flightNumber = { this.state.flightNumber }
              openModal = { this.openModal }
              setSelectedFlight = { this.setSelectedFlight }
            />
          }

          <ModalVideo 
            channel='youtube' 
            isOpen = { this.state.isOpen } 
            videoId = { this.state.selectedVideo } 
            onClose={() => this.setState({isOpen: false})} 
          />

        </main>
        <Footer />
      </div>

    );
  }

}

export default App;
