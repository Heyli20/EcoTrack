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
        <div>
            <h1>{message}</h1>
        </div>
    )
}

export default App
