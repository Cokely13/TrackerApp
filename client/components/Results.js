import React from 'react'
import { connect} from 'react-redux'
import { fetchResults } from '../store/allResultsStore'

export class Results extends React.Component {
  constructor() {
    super();
    this.state = {
    };

}

componentDidMount(){
  this.props.fetchResults()
}


render () {
  return (
    <div>
    <div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
      Date
    </div>
    <div className="col">
     Event
    </div>
    <div className="col">
      Time
    </div>
    </div>
    </div>
    <div>
    {this.props.allResults.map((result) => {
        return (<div className="container text-center"key={result.id}>
          <div className="row align-items-start">
        <div className="col" >
      Date
    </div>
    <div className="col">
     {result.eventName}
    </div>
    <div className="col">
       {result.time}
    </div>
    </div>
    </div>)})}
    </div>
    </div>
    )
}}

const mapState = (state) => {
  return{
    allResults: state.allResults
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
  };
};

export default connect(mapState, mapDispatch)(Results)
