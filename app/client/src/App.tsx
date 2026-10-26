import { useEffect, useState } from "react"


function App() {
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
    }, [])


  return (
    <div className="App">
      <h1>Message from server: {message}</h1>
    </div>
  )
}

export default App
