import React from 'react'
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

interface Item {
    name: string;
    id: string;
    imagePath: string;
    description: string;
}

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<Item[]>([]);
    const [filteredData, setFilteredData] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://pbivizedit.com/api/visuals");
                const data = await response.json();

                if (data && data.items) {
                    const items = Array.isArray(data.items) ? data.items : Object.values(data.items);
                    const newData: Item[] = items as Item[];
                    setData(newData);
                } else if (Array.isArray(data)) {
                    setData(data);
                } else if (data !== null) {
                    setData([data]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const modifiedData = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(modifiedData);
    }, [searchTerm]);

    return (
        <>
            <div className="inputContainer">
                <div>Search</div>
                <input
                    type="text"
                    id="inputbox"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div id="content" className="card-container">
                {filteredData.map((item) => (
                    <Card item={item}></Card>
                ))}
            </div>
            <div>{searchTerm}</div>
        </>
    );
}

export default App;
