import React from 'react'
import agent from 'superagent';
import { withRouter } from 'react-router-dom';

import Paginator from '../paginator';
import './table.css';
import star from '../../assets/star.svg';

// Styling

// Card like structure for Listings.

export class Table extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      sortedData: [],
      sortBy: 'no', // can be ['no', 'rating']
      sortOrder: true // can be true or false => ascending or descending
    }
  }

  fetchData() {
      agent
      .get('/api/data')
      .then( x => {
        if (x.body && Array.isArray(x.body)) {
          this.setState({ data: x.body, sortedData: x.body })
        } else {
          this.props.history.push('/login');
        }
      })
      .catch(e => {
        console.log('call to fetch data failed - ', e);
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  sortEntries(col) {
    const sortCol = col;
    let sortOrd = true;

    if (this.state.sortBy === sortCol) {
      sortOrd = !this.state.sortOrder;
    }

    const sortedData = this.state.data.slice().sort((thisRow, nextRow) => (
      (nextRow.rating - thisRow.rating) * (sortOrd ? -1 : 1)
    ));
    this.setState({ sortedData: sortedData, sortBy: sortCol, sortOrder: sortOrd });
  }

  generateTableJSX(data, start, end) {
    const markUp = [];
    for (let i = start; i < data.length && i < end; i++) {
      let thisListing = null, thisRow = data[i];
        thisListing = (
          <tr key={`d-${i}`} className={`${thisRow.isActive ? '' : 'inactiveListing'}`}>
            <td className='tableThumbnail'> 
              <img src={thisRow.image} className='hotelThumbnail'/>
            </td>
            <td className='tableName' >
              <h3> {thisRow.name} </h3>
              {
                !thisRow.isActive ? (
                  <div className='unavailableHotel'> Unavailable </div>
                ) : null
              }
            </td>
            <td className='tableDescription'> 
              {thisRow.description} 
            </td>
            <td className='tableRatings'> 
              <Ratings rating={thisRow.rating} />
            </td>
            <td className='tableTags'>
              <Tags tag={thisRow.tags} />
            </td>
            <td>
              <button onClick={() => this.onHotelClick(i)}> Book Now </button>
            </td>
          </tr>
        );
      markUp.push(thisListing);
    }
    return markUp;
  }

  onHotelClick(no) {
    this.props.history.push(`/hotel/${no}`)
  }

  render() {
    return(
      <div>
          <Paginator
            render= { (start, end, nextPage, previousPage) => (
              <div>
                <PrevButton start={start} previousPage={previousPage} />
                <table className='dataTable'>
                <thead className='tableHeaders'>
                  <tr>
                    <th className='header'> Photo </th>
                    <th className='header'> Name </th>
                    <th className='header'> Description </th>
                    <th className='ratingsHeader header' onClick={ () => this.sortEntries('ratings') }> 
                      Rating
                      {
                        this.state.sortBy === 'ratings' ? (
                          this.state.sortOrder ? '▲' : '▼'
                        ) : ''
                      }
                    </th>
                    <th className='header'> Tags </th>
                  </tr>
                </thead>
                <tbody>
                {this.generateTableJSX(this.state.sortedData, start, end)}
                </tbody>
                </table>
                <EndButton end={end} nextPage={nextPage} data={this.state.data.length}/>
              </div>
            )}
          />
      </div>
    )
  }
};

export default withRouter(Table);

export const Ratings = (props) => {
  const rating = Number.parseInt(props.rating);
  const stars = new Array(rating).fill(0);
  const icon = props.icon || star;
  const hotelStars = stars.map((x, i) => (
    <img key={`r${i}`} src={icon} className='rateStars'/>
  ));
  if (hotelStars.length === 0) {
    hotelStars.push(<div> NA </div>);
  }
  return hotelStars;
};

const Tags = (props) => {
  const tag = props.tag || [];
  return tag.map((x, i) => (
    <span key={`t${i}`}> {`#${x}`} </span>
  ))
};

const PrevButton = ({ start, previousPage }) => {
  if (start > 0) {
    return (
      <button 
        className='prevButton'
        onClick={previousPage}> 
        Prev
      </button>
    )
  }
  return null;
}

const EndButton = ({ end, data, nextPage }) => {
  if (end < data) {
    return (
      <button 
        className='nextButton'
        onClick={nextPage}> 
        Next
      </button>
    )
  }
  return null;
}