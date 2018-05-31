import React from 'react'
import agent from 'superagent';
import { withRouter } from 'react-router-dom';
import './table.css';
import star from '../../assets/star.svg';

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
    const authToken = window && window.__mars_token__ ? window.__mars_token__ : "";
    if (authToken) {
      agent
      .get('/data')
      .set({ auth:  authToken})
      .then( x => {
        this.setState({ data: x.body, sortedData: x.body })
      })
    } else {
      this.props.history.push('/login');
    }
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

  render() {
    return(
      <div>
        <table className='dataTable'>
          <thead>
            <tr>
              <th className='tableHeaders' > No. </th>
              <th className='tableHeaders'> Photo </th>
              <th className='tableHeaders'> Name </th>
              <th className='tableHeaders'> Description </th>
              <th className='tableHeaders' onClick={ () => this.sortEntries('ratings') }> Rating </th>
              <th className='tableHeaders'> Tags </th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.sortedData.map((thisRow, id) => (
              thisRow.isActive ? (
              <tr key={`d-${id}`} className='tableRow'>
                <td className='tableId'> {id + 1} </td>
                <td className='tableThumbnail'> <img src={thisRow.image} /> </td>
                <td className='tableName' > {thisRow.name} </td>
                <td className='tableDescription'> {thisRow.description} </td>
                <td className='tableRatings'> 
                  <Ratings rating={thisRow.rating} />
                </td>
                <td className='tableTags'>
                  <Tags tag={thisRow.tags} />
                </td>
              </tr>
              ) : (
                null
              )
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
};

export default withRouter(Table);

const Ratings = (props) => {
  const rating = Number.parseInt(props.rating);
  const stars = new Array(rating).fill(0);
  return stars.map(() => (
    <img src={star} className='rateStars'/>
  ))
};

const Tags = (props) => {
  const tag = props.tag || [];
  return tag.map((x) => (
    <span> {`#${x}`} </span>
  ))
};