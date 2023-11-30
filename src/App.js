import './App.css'
import React, { useEffect, useState } from 'react';
import { get, ref} from 'firebase/database';
import { database } from './firebaseConfig';
import Modal from './components/Popup'

const App = () => {
  const [latestUser, setLatestUser] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef, {
          limitToLast: 1,
          orderByChild: 'time'
        });

        if (snapshot.exists()) {
          const user = Object.entries(snapshot.val())[3][1];
          user.currentTime = new Date().toLocaleString();
          setLatestUser(user);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch data initially and every 2 seconds
    fetchData();
    const intervalId = setInterval(fetchData, 20000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

    
  }, []);
  const handleCheckData = async () => {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef, {
      limitToLast: 1,
      orderByChild: 'time',
    });

    if (snapshot.exists()) {
      const user = Object.entries(snapshot.val())[3][1];
      user.currentTime = new Date().toLocaleString();
      setLatestUser(user);
    } else {
      console.log('No data available');
    }
  };
  const getWaterCondition = (tdsValue, ecValue) => {
    if (tdsValue < 500 && ecValue < 2) {
      return { condition: 'Excellent', color: 'green' };
    } else if (tdsValue < 1000 &&  ecValue < 5) {
      return { condition: 'Not good', color: 'yellow' };
    } else if (tdsValue < 3000 && ecValue < 10) {
      return { condition: 'Bad', color: 'red' };
    } else {
      return { condition: 'Very Bad', color: 'maroon' };
    }
  };



  return (
      <>
        <h1 className="header">Water Analyzer</h1>
        <div className="user-list">
          {latestUser && (
            <>
            <div key={latestUser.id}>
              <table class="value">
                <td>
                  <h2>TDS: {latestUser.TDS} ppm</h2>
                </td>
                <td>
                  <h2>EC: {latestUser.EC} mS/cm</h2>
                </td>
              </table>
                
              <h3 className='water-condition'>Water Condition: <span style={{ color: getWaterCondition(latestUser.TDS, latestUser.EC).color }}>{getWaterCondition(latestUser.TDS,latestUser.EC).condition}</span></h3>

              <br></br>
              <h4 className='time'>Time: {latestUser.currentTime}</h4>


              <table class="buttons-table">
                <td>
                  <button onClick={handleCheckData}>Check now</button>
                </td>
                <td>
                  <button>Charts</button>
                </td>
                <td>
                  <Modal className='buttons-table button' />
                </td>
                
              </table>
              
            </div>
              
            
            
            </>
          )}
        </div>
      </>
  );
};

export default App;