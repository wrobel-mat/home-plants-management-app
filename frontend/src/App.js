import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const getGreeting = async () => {
    try {
        return await axios.get('/api');
    } catch (e) {
        if (e.response) {
            console.log(e.response);
        }
        return 'error';
    }
};

function App() {
    const [greeting, setGreeting] = useState(undefined);
    useEffect(() => {
        getGreeting()
            .then((response) => {
                console.log(response);
                setGreeting(response.data);
            })
            .catch((e) => setGreeting(e));
    });
    return <div className="App">Docker test - {greeting}</div>;
}

export default App;
