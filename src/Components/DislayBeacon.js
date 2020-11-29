import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 

class DisplayBeacon extends React.Component{
    constructor(props)
    {
        super(props);
        this.ref = firebase.firestore().collection("beacon");
        this.unsubscribe = null;
        this.state = {
          beacons : []
        };
    }
    componentDidMount()
    {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    onCollectionUpdate = (querySnapshot) =>
    {
      const beacons = [];
      querySnapshot.forEach((doc) => {
        const {beaconId, major, minor, name} = doc.data();
        beacons.push({
          key: doc.id,
          doc,
          beaconId,
          major,
          minor,
          name
        });
      });
      this.setState({
        beacons
      });
    }
    render()
    {
      const cardStyles =
      {
          width: '60rem',
          // height: 'auto',
          // backgroundColor: 'white',
          // margin: 'auto',
          // display: 'block',
          // marginTop: '60px',
          // opacity: 0.5,
          // paddingTop: '10px',
          // paddingLeft: '20px',
          // paddingRight: '20px',
          borderStyle: 'outset',
          borderLeft: '50px solid black',
          borderRadius: '20px'
      }
      return (
          <div>
              <Card className="cardStyles" style={cardStyles}>
                

                <div className="Buttons">
                      <Link to="/">
                          <button className="Add-Button">
                              Show Book
                          </button>
                      </Link>
                   </div>

                <div className="Buttons">
                      <Link to="/creates/beacon">
                          <button className="Add-Button">
                              Add Beacon
                          </button>
                      </Link>
                   </div>

                   <div className="container">
                     <div className="panel panel-heading">
                       <h3 className="panel heading">Beacon Details</h3>
                     </div>
                   </div>
                   <div className="panel-body">
                     <table className="table table-stripe">
                       <thead>
                         <tr>
                           <th>Beacon ID</th>
                           <th>Name</th>
                           <th>Major</th>
                           <th>Minor</th>
                         </tr>
                       </thead>
                       <tbody>
                         {this.state.beacons.map(
                           beacon =>
                           <tr>
                             <td><Link to = {`/shows/beacon/${beacon.key}`}>{beacon.beaconId}</Link></td>
                             <td>{beacon.name}</td>
                             <td>{beacon.major}</td>
                             <td>{beacon.minor}</td>
                           </tr> 
                         )}
                       </tbody>
                     </table>

                   </div>
                </Card>
            </div>
        )
    }
}
export default DisplayBeacon;
