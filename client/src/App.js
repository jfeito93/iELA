import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [ sportName, setSportName ] = useState('');
  const [ review, setReview] = useState('');
  const [ sportReviewList, setSportList ] = useState([]);

  useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) =>{
        setSportList(response.data)
      })
  }, [])

  const submitReview = () =>{
      Axios.post('http://localhost:3001/api/insert', {
        sportName: sportName, 
        sportReview: review,
      }).then(() => {
        alert('successfull insert')
      })

  }

  return (
    <div className="App">
      <h1>Applying CRUD/MySQL</h1>
      
      <div className='form'>
        <label>Sport Name: </label>
        <input type="text" name = "sportName" onChange={(e) => {
          setSportName(e.target.value)
        }}/>
        <label>Sport Review: </label>
        <input type="text" name = "review" onChange={(e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}>Submit</button>

        {sportReviewList.map((val) => { 
            return <h1>SportName: {val.sportName} | SportReview: {val.sportReview}</h1>

        })}
      </div>
    </div>
  );
}

export default App;
