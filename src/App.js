import React from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 

class App extends React.Component{
    constructor(props)
    {
        super(props);
        this.ref = firebase.firestore().collection("books");
        this.unsubscribe = null;
        this.state = {
          books : []
        };
    }
    handleLogout = () => 
    {
        firebase.auth().signOut();
    };
    componentDidMount()
    {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    onCollectionUpdate = (querySnapshot) =>
    {
      const books = [];
      querySnapshot.forEach((doc) => {
        const {title, author, category, url,shelves, synopsis,beaconId} = doc.data();
        books.push({
          key: doc.id,
          doc,
          title,
          author,
          category,
          url,
          shelves,
          synopsis,
          beaconId,
        });
      });
      this.setState({
        books
      });
    }
    render()
    {
        const cardStyles =
        {
            // width: 'auto',
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
               <div className="Buttons">
                      <Link to="/">
                          <button className="buttonlogout" onClick={this.handleLogout}>
                              Logout
                          </button>
                      </Link>
                   </div>
                <Card className="cardStyles" style={cardStyles}>

                <div className="Buttons">
                      <Link to="/beacon">
                          <button className="Add-Button">
                              Show Beacon
                          </button>
                      </Link>
                   </div>

                  <div className="Buttons">
                      <Link to="/create">
                          <button className="Add-Button">
                              Add Books
                          </button>
                      </Link>
                   </div>

                   {/* <div className="Buttons">
                      <Link to="/">
                          <button className="buttonlogout" onClick={this.handleLogout}>
                              Logout
                          </button>
                      </Link>
                   </div> */}

                   <div className="container">
                     <div className="panel panel-heading">
                       <h3 className="panel heading" font-color="black">Books Details</h3>
                     </div>
                   </div>
                   <div className="panel-body">
                     <table className="table table-stripe">
                       <thead>
                         <tr>
                           <th>Title</th>
                           <th>Author</th>
                           <th>Category</th>
                           <th>Shelves</th>
                           <th>Beacon ID</th>
                           <th>Synopsis</th>
                           <th>Image</th>
                         </tr>
                       </thead>
                       <tbody>
                         {this.state.books.map(
                           book =>
                           <tr>
                             <td><Link to = {`/show/${book.key}`}>{book.title}</Link></td>
                             <td>{book.author}</td>
                             <td>{book.category}</td>
                             <td>{book.shelves}</td>
                             <td>{book.beaconId}</td>
                             <td>{book.synopsis}</td>
                             <td><img src = {book.url} width="100px" height="100px" alt=""></img></td>
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
export default App;
