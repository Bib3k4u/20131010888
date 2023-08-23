import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainSchedule() {
  const [trains, setTrains] = useState([]);
  const [authorizationKey, setAuthorizationKey] = useState("");

  useEffect(() => {
    const fetchAuthorizationToken = async () => {
      const payload = {
        "companyName": "Train Central Schedule by Bibek",
        "clientID": "90d63be5-e12e-430b-b3c1-4680a5682343",
        "clientSecret": "piuObSWnLcIpayuw",
        "ownerName": "Bibek Jha",
        "ownerEmail": "zhabibek4u@gmail.com",
        "rollNo": "20SCSE1010849"
      };

      try {
        const response = await axios.post('http://20.244.56.144/train/auth', payload);
        if (response.status === 200) {
          const responseData = response.data;
          const authKey = responseData.access_token;
          setAuthorizationKey(authKey);
        } else {
          console.log('Request for authorization token was not successful.');
        }
      } catch (error) {
        console.error('Error getting authorization token:', error);
      }
    };

    fetchAuthorizationToken();
  }, []);

  useEffect(() => {
    if (!authorizationKey) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${authorizationKey}`,
      Accept: 'application/json'
    };

    axios.get('http://20.244.56.144:80/train/trains', { headers })
      .then(response => {
        const sortedTrains = response.data.sort((a, b) => a.price.sleeper - b.price.sleeper);
        setTrains(sortedTrains);
      })
      .catch(error => console.error('Error fetching train schedules:', error));
  }, [authorizationKey]);

  return (
    <div className="train-schedule-container">
      <h1 style={{textAlign:'center'}}>Train Schedules</h1>
      <table className="train-table" style={{width:'80%', alignItems:'center'}}>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Departure Time</th>
            <th>Seats Available (Sleeper)</th>
            <th>Seats Available (AC)</th>
            <th>Price (Sleeper)</th>
            <th>Price (AC)</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={train.trainNumber}>
              <td>{train.trainName}</td>
              <td>{`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.price.AC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainSchedule;