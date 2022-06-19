import React from 'react';
import { useState,useEffect} from 'react';
import axios from 'axios';
import item from "../Json/Area.js";
import { NavLink } from 'react-router-dom';

const CreateForm = () =>{
    
  const [shopname, setShopname] = useState("");
  const [category, setCategory] = useState("");
  const [opendate, setOpendate] = useState("");
  const [closedate, setClosedate] = useState("");
  const [shopArea, setShopArea] = useState([]);
  const [area, setArea] = useState("");
  
  useEffect(() => {
     const data = item;
     console.log(data);
     setShopArea(data);
  },[])

   
 const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const config =  {
        headers:{
          'Content-Type': 'application/json',
        }
      };
       
      const {data} = await axios.post('/create', {
        shopname,
        area,
        category,
        opendate,
        closedate,
      },
        config
      );
 
      console.log(data);
     alert("Shop Created Successfully");

    } catch (error) {
      console.log(error);
   }
      
      setShopname('');
      setArea(null);
      setCategory(null);
      setOpendate('');
      setClosedate('');
   }

     
    return(
        <> 
       
          <form onSubmit={e => { handleSubmit(e) }} className="p-5">
        <NavLink to="/"  style={{ textDecoration: 'none', color: 'black' }}><h1>All Shop</h1></NavLink>
        <br />
        <div className='col-md-4'>
        <label htmlfor="inputShop" className="form-label">Shop Name</label><br></br>
        <input 
         id='inputShop'
         className="form-control"
          name='choreDesc' 
          type='text'
          value={shopname}
          onChange={e => setShopname(e.target.value.replace(/[^a-z]/gi, ' '))}
          placeholder='Enter Shop Name'
        />
        </div>

        <div className='col-md-3 mt-4'>
        <label htmlfor="inputArea" className="form-label">Area</label><br></br>
        <select className="form-select" aria-label="Default select example" name='area' id='inputArea' onChange={e=>setArea(e.target.value)}>
         <option className='form-control' value="area">Select Area</option>
          {
            shopArea.map((i)=>{
              return(
                <option key={i.areashop} value={i.areashop}>{i.areashop}</option>
              )
            })
          }
        </select>
        </div>
       
        
        <label htmlfor="inputCat" className="form-label mt-4">Category</label><br></br>
        <div className='col-md-3'>
        <select  className="form-select" aria-label="Default select example" name='area' id='inputCat'  onChange={e=>setCategory(e.target.value)}>
         <option value="category">Select Category</option>
          {
            shopArea.map((i)=>{
              return(
                <option key={i.shopcategory} value={i.shopcategory}>{i.shopcategory}</option>
              )
            })
          }
        </select>
      
        </div>
        <br />

        <label htmlfor="OpenDate" className="form-label ">Open Date</label><br></br>
        <div className='col-md-2'>
        <input
         id='OpenDate'
         className="form-control"
          name='category' 
          type='date'
          value={opendate}
          onChange={e => setOpendate(e.target.value)}
        />
        </div>

        <br/>
        <br />
        <label htmlfor="closeDate" className="form-label ">Open Date</label><br></br>
        <div className='col-md-2'>
        <input
          id='closeDate'
          className="form-control"
          name='category' 
          type='date'
          value={closedate}
          onChange={e => setClosedate(e.target.value)}
        />
          </div>
        <br/>

        <button type='submit'onClick={() => window.location.reload()} className="btn btn-primary">Submit</button>
     
      </form> 
        </>
    )
}

export default CreateForm;