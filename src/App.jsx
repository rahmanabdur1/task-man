import React, { useState, useEffect } from 'react';

const App = () => {
  const initialInputValues = ['0.4567', '0.42545', '0.5654654', '0.0234'];
  const [inputValue, setInputValue] = useState('');
  const [hasanValue, setHasanValue] = useState(500);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setInputValue(initialInputValues.join(' '));

    // Check if the current time is between 7 PM and 11 PM
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if ((currentHour >= 0 && currentHour < 3) || (currentHour === 12)) {
      const timer = setTimeout(() => {
        calculateHasanValue();
      }, 5000); // Delay set to 5 seconds (5000 milliseconds)

      return () => clearTimeout(timer); // Clear the timer on component unmount
    }
  }, [initialInputValues]);

  const handleInputChange = (e) => {
    const regex = /^(\d+(\.\d+)?\s){3}\d+(\.\d+)?$/;
    const newValue = e.target.value;
    if (regex.test(newValue) || newValue === '') {
      setInputValue(newValue);
    }
  };

  const calculateHasanValue = () => {
    const valuesArray = inputValue.split(' ').map(parseFloat);
    const randomIndex = Math.floor(Math.random() * valuesArray.length);
    const selectedValue = valuesArray[randomIndex];
    const operator = Math.random() < 0.5 ? '+' : '-';
    const result = operator === '+' ? selectedValue + hasanValue : selectedValue - hasanValue;
    setResult(result);
  };

  return (
    <div className='container'>
      <input 
        type="text" 
        placeholder="Enter 4 values separated by spaces" 
        value={inputValue} 
        onChange={handleInputChange} 
      />
       {result !== null && (
        <div>
          <span>Result: {result}</span>
        </div>
      )}
    </div>
  );
};

export default App;
