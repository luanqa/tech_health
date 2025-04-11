import React, { useState } from 'react'
import axios from 'axios'
import './style.css' // certifique-se de que está importando o CSS

function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [reportUrl, setReportUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const analyzeRepo = async () => {
    setIsLoading(true)
    setReportUrl('')
    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        url: repoUrl,
      })
      setReportUrl(response.data.report_url)
    } catch (error) {
      alert('Erro ao analisar repositório')
    }
    setIsLoading(false)
  }

  return (
    <div className="App">
      <h1 style={{ color: '#0ff' }}>🔍 Analisar Repositório GitHub</h1>

      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Cole a URL do repositório GitHub"
      />
      <button onClick={analyzeRepo}>Analisar</button>

      {isLoading && <div className="spinner"></div>}

      {reportUrl && !isLoading && (
        <div style={{ marginTop: '20px' }}>
          <p>✅ Relatório gerado com sucesso:</p>
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">
            Acessar Apêndice Técnico
          </a>
        </div>
      )}
    </div>
  )
}

export default App

