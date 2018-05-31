import React from 'react'

export default class Paginator extends React.Component {
  
  constructor() {
    super();
    this.state = {
      startIndex: 0,
      endIndex: 4,
      pager: 4,
    }
  }

  nextPage = () => {
    this.setState({ 
      startIndex: this.state.startIndex + this.state.pager, 
      endIndex: this.state.endIndex + this.state.pager
    })
  }

  previousPage = () => {
    if (this.state.startIndex - this.state.pager >= 0) {
      this.setState({ 
        startIndex: this.state.startIndex - this.state.pager, 
        endIndex: this.state.endIndex - this.state.pager
      })
    }
  }
  
  render() {
    return(
      <div>
      {
        this.props.render(this.state.startIndex, this.state.endIndex, this.nextPage, this.previousPage)
      }
      </div>
    );
  }
};
