import React, { useState } from "react";
import axios from "axios";

const NumberManager = () => {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    const urls = [
      "http://20.244.56.144/numbers/primes",
      "http://20.244.56.144/numbers/fibo",
      "http://20.244.56.144/numbers/odd",
      "http://20.244.56.144/numbers/rand",
    ];

    try {
      const responses = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await axios.get(url, { timeout: 500 });
            return response.data.numbers;
          } catch (error) {
            console.error("Error fetching from", url, error);
            return [];
          }
        })
      );

      const allNumbers = responses.flat();

      const uniqueNumbers = [...new Set(allNumbers)];
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

      setNumbers(sortedNumbers);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  return (
    <div style={{backgroundColor:'#2A2A2A', color:'yellow', height:'100vh', width:'100%', display:'flex', flexDirection:'column',  justifyContent:'center',alignItems:'center'}}>
      <button style={{width:"150px",height:'40px', borderRadius:'10px', backgroundColor:'#1A1A1A', color:'yellow', border:'none', boxShadow:"inherit", cursor:'pointer'}} onClick={fetchNumbers}>Fetch Numbers</button>
      <div style={{width:'50%'}}>
        <h2>Output</h2>
        <pre>
          {"{"} "Numbers": {JSON.stringify(numbers)}, {"}"}
        </pre>
      </div>
    </div>
  );
};

export default NumberManager;
