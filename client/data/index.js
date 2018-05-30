import React from 'react'
import agent from 'superagent';

export class Table extends React.Component {

  fetchData() {
    // agent
    // .get('/data')
    // .set({ auth:  })
    // .then( x => {
    //   console.log(x);
    // })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return(
      <div>
        Data
      </div>
    )
  }
};

export default Table;