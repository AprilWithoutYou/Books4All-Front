import React from "react";
import { Link } from 'react-router-dom';
import CartWidget from  '../CartWidget/CartWidget'

export default function Navbar(){
    return(
        
        <nav className='navbar navbar-expand-md navbar-dark bg-dark sticky-top ' >
        <div className="container-fluid ">
        <div className="px-4 ">
        <Link to='/'>
            <img src="https://cdn.discordapp.com/attachments/1091730813529374777/1097178558457184286/books4all-low-resolution-logo-white-on-transparent-background.png" width="100" height="40" />
        </Link>
        </div>
        <button
        type="button" data-toggle="collapse" data-target="#navbarNav" className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex flex-row-reverse " id="navbarNav">
            <ul className="navbar-nav">
            
            <li className="nav-item active"><Link to="/" className="nav-link" >Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link" >About</Link></li>
            <li className="nav-item"><Link to="/books" className="nav-link">Books</Link></li>
{/*             <li className="nav-item "><Link to="/events" className="nav-link">Events</Link></li>*/}
            <li className="nav-item "><Link to="/cart" className="nav-link"></Link><CartWidget/></li> 
            <li className="nav-item "><Link to="/profile" className="nav-link">Profile</Link></li>
            </ul>
        </div>
        </div>
        </nav>  
    );
}
