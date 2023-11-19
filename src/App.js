import './App.css';
import { get, ref } from 'firebase/database';
import React, {useEffect, useState} from 'react';
import { database } from './firebaseConfig';

const App = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const usersRef = ref(database, 'users');
        get(usersRef).then((snapshot) => {
            if (snapshot.exists()){
                const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }));
                setUsers(usersArray);
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        }) ;
    }, []);

    
    return (

        <>
            <h1 className='header'>Water Analizer</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>Time: {user.time}</h2>
                    <h2>TDS: {user.TDS} ppm</h2>
                    <h2>EC: {user.EC} mS/cm</h2>
                </div>
            ))}
        </>

    );
}

export default App;