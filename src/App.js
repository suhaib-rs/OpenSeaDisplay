import React, {Component} from 'react';
import axios from 'axios';

var offset = 0
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collections: []
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCollections();
  }
  next = () => {
    offset += 5;
    this.getCollections();
  }
  previous = () => {
    offset -= 5;
    this.getCollections();
  }

  //Function to get the Customer Data from json
  getCollections() {
    axios.get(`https://api.opensea.io/api/v1/collections?offset=${offset}&limit=5`)
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
      <button onClick={this.previous}>Previous</button>
      <button onClick={this.next}>Next</button>
      </div>
    } else {
      buttons = <div><button onClick={this.next}>Next</button></div>
    }

    return (<div>
      {buttons}
      {
      this.state.collections.map(c => {
      return (<div key={c.name}>
         <p>{c.name}</p>
         <img src={c.image_url}></img>
        </div>)}
        )
      }
      {buttons}
    </div>);
  }
}

export default App;
