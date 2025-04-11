import { useState } from 'react'

function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [result, setResult] = useState(null)

  const analyzeRepo = async () => {
    const res = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo_url: repoUrl }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Tech Health</h1>
      <input
        type="text"
        placeholder="Cole aqui a URL do repositório GitHub"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      <button onClick={analyzeRepo}>Analisar</button>
      <pre style={{ marginTop: 20 }}>
        {result ? JSON.stringify(result, null, 2) : 'Nenhum resultado ainda'}
      </pre>
    </div>
  )
}

export default App

