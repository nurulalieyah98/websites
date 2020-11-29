import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
import "firebase/storage";
import "firebase/firestore";

class AddBook extends React.Component{
    constructor(props)
    {
        super(props);
        this.ref = firebase.firestore().collection('books');
        this.state ={
            title: '',
            author: '',
            category: '',
            shelves: '',
            synopsis:'',
            beaconId:'',
            url: '',
            image: [],
            check:0
        }
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
        this.setState(state);
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
        this.setState({check: 1});
        const {image} = this.state;
        const uploadTask = firebase.storage().ref(`Book Images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot) => {console.log('snapshot')},
        (error) => {console.log(error);},
        ()=>{firebase.storage().ref('Book Images').child(image.name).getDownloadURL().then(url=>{this.setState({url})})})
    }
    onSubmit = (e) =>
    {
        if(this.state.check === 1)
        {
            e.preventDefault();
            const {title,author,synopsis,category,shelves,beaconId} = this.state;
            this.ref.add({
                title,
                author,
                synopsis,
                category,
                shelves,
                beaconId,
                url: this.state.url
            }).then((docRef)=> {
                this.setState({
                    title:'',
                    author:'',
                    synopsis:'',
                    category:'',
                    shelves:'',
                    beaconId:'',
                    url:''
                });
                alert("Book is successfully added")
                this.props.history.push("/")
            })
            .catch((error)=>{
                alert("Error adding book")
                console.error("Error adding document: ", error);
            });
            this.setState({check: 0})
        }
        else(
            alert("Please upload your image first")
        )
    }
    render()
    {
        const {title,author,synopsis,category,shelves,beaconId} = this.state;
        //const {name,description} = this.state;
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
                   <div>
                   <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Book Title : </label>
                        <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Please Enter Title"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Author : </label>
                        <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Please Enter Author"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Category : </label>
                        <input type="text" className="form-control" name="category" value={category} onChange={this.onChange} placeholder="Please Enter Category"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Beacon ID : </label>
                        <input type="text" className="form-control" name="beaconId" value={beaconId} onChange={this.onChange} placeholder="Please Enter Beacon Id"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Shelves : </label>
                        <input type="text" className="form-control" name="shelves" value={shelves} onChange={this.onChange} placeholder="Please Enter Shelves"></input>
                    </div>
                    <div>
                       <div className="form-group"></div>
                        <label htmlFor="name">Synopsis : </label>
                        <textarea className="form-control" name="synopsis" onChange={this.onChange} value={synopsis} placeholder="Synopsis" cols="80" rows="3">{synopsis}</textarea>
                    </div>
                   </div>

                    <div className ="upload-btn-wrapper">
                        <button className="file-btn">Choose a file</button>
                        <input type = "file" name="myfile" multiple onChange={this.handleChange}></input>
                    </div>

                    <div className="upload-data">
                        <img src={this.state.url} alt="" height="200" width="200"></img>
                    </div>

                    <div className="Buttons">
                        <button className="Submit-Button" onClick={this.handleUpload}>Upload Image First</button>
                        <button className="Submit-Button" onClick={this.onSubmit}>Save All</button>
                    </div>

                </Card>
            </div>
        )
    }
}
export default AddBook;