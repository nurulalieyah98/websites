import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
import "firebase/storage";
import "firebase/firestore";

class EditBook extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            key:'',
            title:'',
            author:'',
            synopsis:'',
            category:'',
            shelves:'',
            beaconId:'',
            url:'',
            image: null
        }
    }
    componentDidMount(){
        const ref = firebase.firestore().collection('books').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if(doc.exists)
            {
                const document = doc.data();
                this.setState({
                    key: doc.id,
                    title: document.title,
                    author: document.author,
                    synopsis: document.synopsis,
                    category: document.category,
                    shelves: document.shelves,
                    beaconId: document.beaconId,
                    url: document.url
                });
            }
            else{
                console.log("No such document is here!")
            }
        });
    }
    handleChange = (e) =>
    {
        // const image = Array.from(e.target.files);
        // this.setState({image});

        // for (let i = 0; i < e.target.files.length; i++)
       
        if(e.target.files[0])
        {
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0]);
    }
    handleUpload = () =>
    {
        const {image,url} = this.state;
        var desertRef = firebase.storage().refFromURL(url)
        //image upload in submit
        const uploadTask = firebase.storage().ref(`Book Images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot) => {console.log('snapshot')},
        (error) => {console.log(error);},
        ()=>{firebase.storage().ref('Book Images').child(image.name).getDownloadURL().then(url=>{this.setState({url})})})

        desertRef.delete().then(function(){
            console.log('file deleted')
            
        }).catch(function()
        {
            console.log('error while deleting the file')
        });
    }
    onChange = (e) =>
    {
        const state = this.state;
        state[e.target.name] = e.target.value;
        state[e.target.shelves] = e.target.value;
        state[e.target.category] = e.target.value;
        state[e.target.author] = e.target.value;
        state[e.target.beaconId] = e.target.value;
        state[e.target.title] = e.target.value;
        this.setState({document : state});
    }

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {title,author,synopsis,category,shelves,beaconId,url} = this.state;
        const updateRef = firebase.firestore().collection('books').doc(this.state.key);
        updateRef.set({
            title,
            author,
            synopsis,
            category,
            shelves,
            beaconId,
            url
        }).then((docRef)=> {
            this.setState({
                key:'',
                title:'',
                author:'',
                synopsis:'',
                category:'',
                shelves:'',
                beaconId:'',
                url:''
            });
            alert("Book is successfully edited")
            this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error)=>{
            console.error("Error editing the document: ", error);
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
                        <img src={this.state.url} alt="" height="200" width="200"></img>
                    </div>

                    <div className ="upload-btn-wrapper">
                        <button className="file-btn">Choose a file</button>
                        <input type = "file" name="myfile" multiple onChange={this.handleChange}></input>
                    </div>

                    <div className="Buttons">
                        <button className="Submit-Button" onClick={this.handleUpload}>Upload Image First</button>
                    </div>

                    <div className="container">
                        <div className="panel panel-default">
                            
                        <div className="panel-body">
                            <form onSubmit = {this.onSubmit}>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Book Title : </label>
                                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Please Enter Title"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Author : </label>
                                    <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Please Enter Author"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Category : </label>
                                    <input type="text" className="form-control" name="category" value={this.state.category} onChange={this.onChange} placeholder="Please Enter Category"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Beacon ID : </label>
                                    <input type="text" className="form-control" name="beaconId" value={this.state.beaconId} onChange={this.onChange} placeholder="Please Enter Beacon Id"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Shelves : </label>
                                    <input type="text" className="form-control" name="shelves" value={this.state.shelves} onChange={this.onChange} placeholder="Please Enter Shelves"></input>
                                </div>
                                <div>
                                <div className="form-group"></div>
                                    <label htmlFor="name">Synopsis : </label>
                                    <textarea className="form-control" name="synopsis" value={this.state.synopsis} onChange={this.onChange} placeholder="Synopsis" cols="80" rows="3">{this.state.synopsis}</textarea>
                                </div>

                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                    </Card>
            </div>
        )
    }    
}
export default EditBook