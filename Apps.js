import React from 'react';
import 'App.css';
import firebase from './Config';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'; 
class Apps extends React{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        const cardStyles =
        {
            width: 'auto',
            height: 'auto',
            backgroundColor: 'white',
            margin: 'auto',
            display: 'block',
            marginTop: '60px',
            opacity: 0.5,
            paddingTop: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderStyle: 'outset',
            borderLeft: '50px solid black',
            borderRadius: '20px'
        }
        return (
            <div>
                <Card style= {cardStyles}>
                    <Link to="/create">
                        <button class="Add-Button" variant='flat' size='small'>
                            Add Books
                        </button>
                    </Link>

                </Card>
            </div>
        )
    }
}
