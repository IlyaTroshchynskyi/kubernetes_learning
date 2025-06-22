import React, { useState, useEffect } from 'react';
import {config} from "./config.ts";

type Person = {
    id: number;
    name: string;
    age: number;
};

const PersonTable: React.FC = () => {
    const [data, setData] = useState<Person[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/api/users`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="person-table-container">
            <h2 className="table-title">Person Data</h2>
            <table className="person-table">
                <thead>
                <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Age</th>
                </tr>
                </thead>
                <tbody>
                {data.map((person) => (
                    <tr key={person.id} className="table-row">
                        <td className="table-cell">{person.id}</td>
                        <td className="table-cell">{person.name}</td>
                        <td className="table-cell">{person.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonTable;