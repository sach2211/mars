import React from 'react'
import agent from 'superagent';
import './table.css';
import star from '../../assets/star.svg';

export class Table extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  fetchData() {
    const authToken = window && window.__mars_token__ ? window.__mars_token__ : "";
    if (authToken) {
      agent
      .get('/data')
      .set({ auth:  authToken})
      .then( x => {
        this.setState({ data: x.body })
      })
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return(
      <div>
        <table className='dataTable'>
          <thead>
            <tr>
              <th className='tableHeaders' > No. </th>
              <th className='tableHeaders'> Name </th>
              <th className='tableHeaders'> Description </th>
              <th className='tableHeaders'> Rating </th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.data.map((thisRow, id) => (
              thisRow.isActive ? (
              <tr key={`d-${id}`} className='tableRow'>
                <td className='tableId'> {id + 1} </td>
                <td className='tableName' > {thisRow.name} </td>
                <td className='tableDescription'> {thisRow.description} </td>
                <Ratings rating={thisRow.rating} />
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

export default Table;

const Ratings = (props) => {
  const rating = Number.parseInt(props.rating);
  const stars = new Array(rating).fill(0);
  return stars.map(() => (
    <img src={star} className='rateStars'/>
  ))
};