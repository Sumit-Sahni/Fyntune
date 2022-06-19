import React from 'react'
import { useState,  useEffect } from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: column;
   
`
const AllShopsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    gap: 20px;
`



//  ***************************************************** Functionl Component Satrt ****************************************************************************
const AllShops = () => {

    const [allshops, setAllshops] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
   

    const fetchAllShops = async () => {
        const { data } = await axios.get('/allshops');
        console.log(data);
        setAllshops(data);
    }

    useEffect(() => {
        fetchAllShops();
    },[])

// ***********************************Search Funtionality**********************************************************************



    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        console.log(searchValue)
        if (searchInput !== '') {
            const filteredData = allshops.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(allshops)
        }
    }



// ***********************************Delete Funtionality**********************************************************************

    const deleteShop = async (id) =>{
        await fetch(`/allshops/${id}`,{
                method: 'DELETE',
         }).then(res => {
            console.log(res);
          
         })
       
        }
     
    return(
            
       
        <Container>
          <div>
             <nav className="navbar navbar-expand-lg bg-light">
             <div className="container-fluid">
               <NavLink  to="/addshop" className="navbar-brand">Add Shops</NavLink>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <form className="d-flex mt-3" role="search">
                   <input className="form-control me-2" type="search" placeholder="search..."aria-label="Search"
                     onChange={(e) => searchItems(e.target.value)}
                   
              />
            </form>
          </div>
        </div>
      </nav>
      </div>
          
         

      < AllShopsContainer>

      
      {searchInput.length > 1 ? (

         filteredResults.map((item, index) => {
            return(
                
                <div className="card"style={{width: "18rem"}} key={index}>
                     <div className="card-body">
                      <h5 className="card-title">Shop Name - {item.ShopName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Address - {item.Area}</h6>
                      <h5 className="card-subtitle mb-2 text-muted">Category - {item.Category}</h5>
                      <h6  className="card-title">Open Date -{moment(item.OpeningDate).format("MMM Do YYYY")} </h6>
                       <h6  className="card-title">Open Date - {moment(item.ClosingDate).format("MMM Do YYYY")}</h6>
                       <button onClick={()=>{deleteShop(item._id); window.location.reload();}}  className="btn btn-danger">Delete</button>
                    </div>
                  </div>
            )
        })
      ) : (
        
            allshops.map((item, index)=>{
                return(
                   <>
                   <div className="card"style={{width: "18rem"}} key={index}>
                    <div className="card-body">
                     <h5 className="card-title">Shop Name - {item.ShopName}</h5>
                     <h5 className="card-subtitle mb-2 text-muted">Address - {item.Area}</h5>
                     <h5 className="card-subtitle mb-2 text-muted">Category - {item.Category}</h5>
                     <h6  className="card-title">Open Date -{moment(item.OpeningDate).format("MMM Do YY")} </h6>
                      <h6  className="card-title">Open Date - {moment(item.ClosingDate).format("MMM Do YY")}</h6>
                      <button onClick={()=>{deleteShop(item._id); window.location.reload();}}  className="btn btn-danger">Delete</button>
                   </div>
                 </div>
                 </>
                 
              )})
          )}
        
        </AllShopsContainer>
        </Container>
    )
}


export default AllShops;