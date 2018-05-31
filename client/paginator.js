import React from 'react'

export default class Paginator extends React.Component {
  
  constructor() {
    super();
    this.state = {
      startIndex: 0,
      endIndex: 5,
      pager: 5,
    }
  }

  nextPage() {
    this.setState({ 
      startIndex: startIndex + this.state.pager, 
      endIndex: endIndex + this.state.pager
    })
  }
  
  render() {
    return(
      <tbody>
      {
        this.props.render(this.state.startIndex, this.state.endIndex)
      }
      </tbody>
    );
  }
};
