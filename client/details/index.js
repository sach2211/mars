import React from 'react'
import agent from 'superagent';
import star2 from '../../assets/star2.png';
import './details.css';

export class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        image: '',
        name: '',
        description: '',
        rating: 0

      }
    }
  }

  fetchData(hotelId) {
    agent
    .get(`/api/hotel/${hotelId}`)
    .then( x => {
      if (x.body) {
        this.setState({ data: x.body })
      } else {
        this.props.history.push('/login');
      }
    })
    .catch(e => {
      console.log('call to fetch hotel details failed - ', e);
    })
  }

  componentDidMount() {
    const hotelId =  this.props.match.params.hotelId;
    this.fetchData(hotelId);
  }
  
  render () {
    return(
      <div>
        <div className='imageSection'>
          <img src={this.state.data.image} className='hotelImage'/>
        </div>
        <div className='dataSection'>
          <h2 className='hotelName'> {this.state.data.name} </h2>
          <div>
          {
            <Ratings rating={this.state.data.rating}/>
          }
          </div>
          <h3 style={{color: 'firebrick'}} > Details </h3>
          <div>{this.state.data.description} </div>
          <button className='bookButton'> Book Now </button>
        </div>
      </div>
    );
  }
}

export default Details;

const Ratings = (props) => {
  const rating = Number.parseInt(props.rating);
  const stars = new Array(rating).fill(0);
  return stars.map((x, i) => (
    <img key={`rd${i}`}src={'/'+star2} className='rate'/>
  ));
};