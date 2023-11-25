import './App.css'
import React, { useEffect, useState } from 'react';
import { get, ref} from 'firebase/database';
import { database } from './firebaseConfig';
import Popup from './components/Popup';

const App = () => {
  const [latestUser, setLatestUser] = useState(null);
  const [showDescription, setDescriptionOpen] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  const descriptionText = (
    <>
    <p>
      <strong>TDS (Total Dissolved Solids)</strong> is a measure of the total amount of dissolved minerals, salts, and metals in water.
      TDS is measured in parts per million (ppm).
    </p>
    <p>
      <strong>EC (Electrical Conductivity)</strong> is a measure of the ability of water to conduct electricity. EC is measured in microsiemens per centimeter (µS/cm).
    </p>
    <br />
    <p>
      <strong>Acceptable TDS Range:</strong> The acceptable range for TDS in drinking water is generally considered to be less than 500 ppm.
    </p>
    <p>
      <strong>Acceptable EC Range:</strong> The acceptable range for EC in drinking water is generally considered to be less than 2.0 µS/cm.
    </p>
    <br />
    <p>
        <strong>TDS Interpretation:</strong>
        <br />
        * Less than 500 ppm: Considered safe for drinking water.
        <br />
        * 500-1000 ppm: May have a slightly salty or metallic taste.
        <br />
        * 1000-3000 ppm: May have a noticeable salty or metallic taste and may cause laxative effects in sensitive individuals.
        <br />
        * Above 3000 ppm: May be unpalatable and may cause gastrointestinal distress.
    </p>
    <br />
    <p>
        <strong>EC Interpretation:</strong>
        <br />
        * Less than 2.0 µS/cm: Considered safe for drinking water.
        <br />
        * 2.0-5.0 µS/cm: May indicate the presence of dissolved minerals or salts.
        <br />
        * 5.0-10.0 µS/cm: May indicate the presence of moderate levels of dissolved minerals or salts.
        <br />
        * Above 10.0 µS/cm: May indicate the presence of high levels of dissolved minerals or salts and may affect the taste of the water.
    </p>
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
    const fetchData = async () => {
      try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef, {
          limitToLast: 1,
          orderByChild: 'time'
        });

        if (snapshot.exists()) {
          const user = Object.entries(snapshot.val())[snapshot.size - 1][1];
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
    const intervalId = setInterval(fetchData, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

    
  }, []);
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
    <div className="app-container">
      <>
        <h1 className="header">Water Analyzer</h1>
        <div className="user-list">
          {latestUser && (
            <>
            <div key={latestUser.id} className="user-card">
              <h2>TDS: {latestUser.TDS} ppm</h2>
              <h2>EC: {latestUser.EC} mS/cm</h2>
              <h3>Water Condition: <span style={{ color: getWaterCondition(latestUser.TDS, latestUser.EC).color }}>{getWaterCondition(latestUser.TDS,latestUser.EC).condition}</span></h3>

              <br></br>
              <h4>Time: {latestUser.currentTime}</h4>
              <br />
              <button onClick={() => setDescriptionOpen(true)}>Show Water Quality Info</button>
              <br />
            </div>
              
            <Popup trigger={showDescription} setTrigger={setDescriptionOpen}>
              
              <h1>Water Quality Info</h1>
              <>{descriptionText}</>
            </Popup>

            <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
              <h1>Water Quality Info</h1>
              <>{descriptionText}</>
            </Popup>
            
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default App;