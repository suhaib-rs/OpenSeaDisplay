import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import noImg from'./noimg.png';

// Variables which control the API request to /collections endpoint
var offset = 0
const limit = 5

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collections: []
    }
  }

  // Function which is called the first time the component loads
  componentDidMount() {
    this.getCollections();
  }
  next = () => {
    offset += limit;
    this.getCollections();
  }
  previous = () => {
    offset -= limit;
    this.getCollections();
  }

  // Function to get the Customer Data from json
  getCollections() {
    axios.get(`https://api.opensea.io/api/v1/collections?offset=${offset}&limit=${limit}`)
    .then(response => {
      this.setState({collections: response.data.collections})
    });
  }

  render() {
    if (this.state.collections.length === 0)
      return (<div>Loading...</div>);
    
    let buttons;
    if (offset >= 5) {
      buttons = <div>
      <button className='button' onClick={this.previous}>Previous</button>
      <button className='button' onClick={this.next}>Next</button>
      </div>
    } else {
      buttons = <div><button className='button' onClick={this.next}>Next</button></div>
    }

    return (<div className="App">
      {buttons}
      {
      this.state.collections.map(c => {
      return (<div className='collection' key={c.name}>
         <p>{c.name}</p>
         <img src={c.image_url ? c.image_url : noImg} alt="NFT images"></img>
        </div>)}
        )
      }
      {buttons}
    </div>);
  }
}

export default App;
