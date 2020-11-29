import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
import "firebase/storage";
import "firebase/firestore";

class Show extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            book: [],
            key:'',
        }
    }
    componentDidMount(){
        const ref = firebase.firestore().collection('books').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if(doc.exists)
            {
                this.setState({
                    book: doc.data(),
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
        var desertRef = firebase.storage().refFromURL(this.state.book.url)
        firebase.firestore().collection('books').doc(id).delete().then(()=>{
            console.log("Book is successfully deleted");
            alert("Book is successfully deleted");
            this.props.history.push("/")
        }).catch((error)=>
        {
            console.error("Error is", error);
        });
        desertRef.delete().then(function(){
            console.log('file deleted')
        }).catch(function()
        {
            console.log('error while deleting the file')
            alert("Error deleting book");
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
                          <button className="Edit-Button">
                              Show Books
                          </button>
                      </Link>
                   </div>

                   <div className="upload-data">
                        <img src={this.state.book.url} alt="" height="200" width="200"></img>
                    </div>

                    <div className="container">
                        <div className="panel panel-default">
                            <h3 className="panel-title">{this.state.book.title}</h3>
                        </div>
                        <div className="panel-body">
                            <dl>
                                
                                <dt>Author:</dt>
                                <dd>{this.state.book.author}</dd>

                                <dt>Category:</dt>
                                <dd>{this.state.book.category}</dd>

                                <dt>Shelves:</dt>
                                <dd>{this.state.book.shelves}</dd>

                                <dt>Beacon ID:</dt>
                                <dd>{this.state.book.beaconId}</dd>

                                <dt>Synopsis:</dt>
                                <dd>{this.state.book.synopsis}</dd>

                                
                            </dl>
                            <Link to = {`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
                            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }    
}

export default Show;