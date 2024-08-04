import React, { useState } from 'react';
import axios from 'axios';

const ApiForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/bfhl', {
                data: JSON.parse(input)
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    API Input:
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder='{"data":["M","1","334","4","B"]}'
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <h3>Filtered Response</h3>
                    <p>Numbers: {response.numbers.join(', ')}</p>
                    <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default ApiForm;
