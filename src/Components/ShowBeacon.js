import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
import "firebase/storage";
import "firebase/firestore";

class ShowBeacon extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            beacon: [],
            key:'',
        }
    }
    componentDidMount(){
        const ref = firebase.firestore().collection('beacon').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if(doc.exists)
            {
                this.setState({
                    beacon: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            }
            else{
                console.log("No such document is here!")
            }
        });
    }

    delete(id)
    {
        //var desertRef = firebase.storage().refFromURL(this.state.beacon.url)
        firebase.firestore().collection('beacon').doc(id).delete().then(()=>{
            console.log("Beacon is successfully deleted");
            alert("Beacon is successfully deleted");
            this.props.history.push("/beacon")
        }).catch((error)=>
        {
            console.error("Error is", error);
        });
        // desertRef.delete().then(function(){
        //     console.log('file deleted')
        // }).catch(function()
        // {
        //     console.log('error while deleting the file')
        //     alert("Error deleting beacon");
        // });
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
                      <Link to="/beacon">
                          <button className="Edit-Button">
                              Show Beacon
                          </button>
                      </Link>
                   </div>

                    <div className="container">
                        {/* <div className="panel panel-default">
                            <h3 className="panel-title">{this.state.beacon.beaconId}</h3>
                        </div> */}
                        <div className="panel-body">
                            <dl>

                                <dt>Beacon ID:</dt>
                                <dd>{this.state.beacon.beaconId}</dd>
                                
                                <dt>Name:</dt>
                                <dd>{this.state.beacon.name}</dd>

                                <dt>Major:</dt>
                                <dd>{this.state.beacon.major}</dd>

                                <dt>Minor:</dt>
                                <dd>{this.state.beacon.minor}</dd>

                            </dl>
                            <Link to = {`/edits/beacon/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
                            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }    
}

export default ShowBeacon;