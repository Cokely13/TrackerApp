import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';

import { fetchRecords} from '../store/allRecordsStore'


export class Records extends React.Component {
  constructor() {
    super();
    this.state = {
    };
}

componentDidMount(){
  this.props.fetchRecords()
}


render () {
  const records = this.props.allRecords

  const sorted = records.sort((a, b) => (a.eventId -b.eventId ))
    // return parseInt(a.time) - parseInt(b.time);
// });

  // const sorted = this.props.allResults.sort((a,b) => {a.userId < b.userId})

  return (
    <div style={{marginTop:"200px"}}>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop: "50px"}}><u>Records</u></h1>
    <div className="container text-center">
  <div className="row align-items-start">
    <div className="col"><u>
      Name
      </u>
    </div>
    <div className="col"><u>
     Event Name
     </u>
    </div>
    <div className="col"><u>
      Time
      </u>
    </div>
    </div>
    </div>
    <div>
    {sorted.map((result) => {
        return (<div className="container text-center"key={result.id}>
          <div className="row align-items-start">
          <div className="col" ><Link to={`/users/${result.userId}`}>{result.userName}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventName}</Link>
    </div>
    {/* <div className="col">
     {Date(result.updatedAt)}
    </div> */}
    <div className="col">
       {result.time}
    </div>
    </div>
    </div>)})}
    </div>
    </div>
    )
}
}



const mapState = (state) => {
  return{
    allRecords: state.allRecords
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchRecords: () => dispatch(fetchRecords())
  };
};

export default connect(mapState, mapDispatch)(Records)
