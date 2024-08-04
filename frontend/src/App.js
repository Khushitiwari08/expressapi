import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const ApiForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        numbers: true,
        alphabets: true,
        highest_alphabet: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const parsedInput = JSON.parse(input); // Ensure input is valid JSON
            const res = await axios.post('http://localhost:3000/bfhl', {
                data: parsedInput
            }, {
                headers: { 'Content-Type': 'application/json' } // Ensure correct headers
            });
            setResponse(res.data);
        } catch (error) {
            if (error.response) {
                // Server error
                setError(`Server Error: ${error.response.status} - ${error.response.statusText}`);
            } else if (error.request) {
                // Network error
                setError('Network Error: Please check your connection.');
            } else if (error instanceof SyntaxError) {
                // JSON parsing error
                setError('Invalid JSON format.');
            } else {
                // Other errors
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filter) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: !prevFilters[filter]
        }));
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <>
                {filters.numbers && <p>Numbers: {response.numbers.join(', ')}</p>}
                {filters.alphabets && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {filters.highest_alphabet && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
            </>
        );
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
                        placeholder='["M","1","334","4","B"]'
                    />
                </label>
                <div className="slider-group">
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={filters.numbers} 
                            onChange={() => handleFilterChange('numbers')} 
                        />
                        <span className="slider round"></span>
                        Numbers
                    </label>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={filters.alphabets} 
                            onChange={() => handleFilterChange('alphabets')} 
                        />
                        <span className="slider round"></span>
                        Alphabets
                    </label>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={filters.highest_alphabet} 
                            onChange={() => handleFilterChange('highest_alphabet')} 
                        />
                        <span className="slider round"></span>
                        Highest Alphabet
                    </label>
                </div>
                <button type="submit" disabled={loading}>Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h3>Response</h3>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
};

export default ApiForm;
