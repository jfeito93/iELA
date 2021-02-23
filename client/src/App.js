import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [ sportName, setSportName ] = useState('');
  const [ review, setReview] = useState('');
  const [ sportReviewList, setSportList ] = useState([]);
  const [ newReview, setNewReview ] = useState('')

  useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) =>{
        setSportList(response.data)
      })
  }, [])

  const submitReview = () =>{
      Axios.post('http://localhost:3001/api/insert', {
        sportName: sportName, 
        sportReview: review,
      });
      
  setSportList([
    ...sportReviewList,
    {sportName: sportName, sportReview: review}
  ]);
  }

  const deleteReview = (sport) => {
    Axios.delete(`http://localhost:3001/api/delete/${sport}`).then((response) => {
      setSportList(
        sportReviewList.filter((val) =>{
          return val.sport != sport;
        })
      )
    })
  }

  const updateReview = (sport) => {
    Axios.put('http://localhost:3001/api/update', {
      sportName: sport,
      sportReview: newReview,
    }).then(
      (response) => {
        setSportList(sportReviewList.map((val) => {
          return val.sport == sport ? {sportName: val.sport, sportReview : newReview} : val;
        }))
      }
    )
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
            return <div className="card">
              <h1>{val.sportName}</h1>
              <p>{val.sportReview}</p>
              <button onClick={ () => {deleteReview(val.sportName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) =>{
                setNewReview(e.target.value)
              }} />
              <button onClick={ () => {updateReview(val.sportName)}}>Update</button>
              </div>

        })}
      </div>
    </div>
  );
}

export default App;
