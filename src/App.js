import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    selectedBatch: '',
  });

  // Change the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Update the URL to use port 3001
    const response = await axios.post('http://localhost:3001/api/submit', formData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <h1>Yoga Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) })}
          />
        </label>
        <br />
        <label>
          Select Batch:
          <select
            value={formData.selectedBatch}
            onChange={(e) => setFormData({ ...formData, selectedBatch: e.target.value })}
          >
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
