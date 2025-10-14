import { useEffect, useState } from 'react'

function App() {
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        fetch('/api/greeting')
            .then(res => res.text())
            .then(data => setMessage(data))
            .catch(err => setMessage("Failed to fetch: " + err.message))
    }, [])

    return (
        <div className="flex justify-center items-center h-screen bg-red-100">
            <h1 className="text-3xl font-bold text-green-600">{message}</h1>
        </div>
    )
}

export default App
