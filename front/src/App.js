import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const isValidJSON = (string) => {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isValidJSON(input)) {
      setError('Invalid JSON input. Please correct it and try again.');
      setResult(null);
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:5001/bfhl', JSON.parse(input));
      setResult(response.data);
    } catch (error) {
      setError('Error fetching results. Make sure the backend server is running.');
      console.error("Error details:", error.response || error);
      setResult(null);
    }
  };

  const handleSelectChange = (event) => {
    const values = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(values);
  };

  const renderFilteredResults = () => {
    if (!result) return null;
    let dataToShow = {};
    if (selectedOptions.includes('alphabets')) {
      dataToShow.alphabets = result.alphabets;
    }
    if (selectedOptions.includes('numbers')) {
      dataToShow.numbers = result.numbers;
    }
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
      dataToShow.highest_lowercase_alphabet = result.highest_lowercase_alphabet;
    }
    return <pre>{JSON.stringify(dataToShow, null, 2)}</pre>;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>21BPS1257 BFHL Data Processor</h1>
      <div>
        <textarea
          value={input}
          onChange={handleInputChange}
          style={{ width: '300px', height: '100px', marginBottom: '10px' }}
          placeholder="Enter JSON data here"
        />
        <br />
        <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>Submit</button>
      </div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {result && (
        <>
          <select multiple={true} value={selectedOptions} onChange={handleSelectChange} style={{ width: '300px', marginTop: '20px', height: '100px', overflowY: 'auto' }}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          {renderFilteredResults()}
        </>
      )}
    </div>
  );
}

export default App;