import React from "react";
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [reportUrl, setReportUrl] = useState('')

  const analyzeRepo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        url: repoUrl,
      })
      setReportUrl(response.data.report_url)
    } catch (error) {
      alert('Erro ao analisar repositório')
    }
  }

  return (
    <div className="App">
      <h1>🔍 Analisar Repositório GitHub</h1>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Cole aqui a URL do repositório (ex: https://github.com/gabrielecirulli/2048)"
        style={{ width: '400px', padding: '8px' }}
      />
      <button onClick={analyzeRepo} style={{ marginLeft: '10px' }}>
        Analisar
      </button>

      {/* Aqui entra o bloco que você mandou */}
      {reportUrl && (
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

