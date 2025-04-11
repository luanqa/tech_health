from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import subprocess
import requests
from jinja2 import Template
import os

app = FastAPI()

# Permitir acesso de qualquer origem (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar a pasta reports como arquivos estáticos
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

# Modelo da requisição
class AnalyzeRequest(BaseModel):
    url: str

# Função para obter dados do GitHub
def get_repo_data(owner, repo):
    url = f"https://api.github.com/repos/{owner}/{repo}"
    commits_url = f"{url}/commits"

    repo_info = requests.get(url).json()
    commits = requests.get(commits_url).json()

    return {
        "name": repo_info.get("name"),
        "stars": repo_info.get("stargazers_count"),
        "commits": len(commits) if isinstance(commits, list) else 0,
        "updated_at": repo_info.get("updated_at")
    }

# Função para análise de complexidade com radon
def analyze_complexity(path="."):
    result = subprocess.run(["radon", "cc", path, "-s", "-a"], capture_output=True, text=True)
    return result.stdout

# Template HTML
TEMPLATE = '''
<html>
<head><title>Tech Health Appendix</title></head>
<body>
<h1>📊 Tech Health Appendix</h1>
<p><strong>Repositório:</strong> {{ name }}</p>
<p><strong>Última atualização:</strong> {{ updated_at }}</p>
<p><strong>Commits recentes:</strong> {{ commits }}</p>
<p><strong>Estrelas:</strong> {{ stars }}</p>
<h2>📈 Análise de Complexidade</h2>
<pre>{{ complexity }}</pre>
</body>
</html>
'''

# Função para gerar o relatório
def generate_report(data, owner, repo):
    complexity = analyze_complexity_from_github(owner, repo)
    template = Template(TEMPLATE)
    html = template.render(**data, complexity=complexity)

    filename = f"report_{data['name']}.html"
    path = os.path.join("reports", filename)
    os.makedirs("reports", exist_ok=True)
    with open(path, "w") as f:
        f.write(html)
    return path

# Rota POST para análise
@app.post("/analyze")
def analyze_repo(request: AnalyzeRequest):
    url = request.url

    if "github.com" not in url:
        return {"error": "URL inválida"}

    try:
        parts = url.strip("/").split("/")
        owner = parts[-2]
        repo = parts[-1]
        data = get_repo_data(owner, repo)
        report_path = generate_report(data, owner, repo)

        filename = os.path.basename(report_path)
        return {"report_url": f"http://localhost:8000/reports/{filename}"}

    except Exception as e:
        return {"error": str(e)}


        
def analyze_complexity_from_github(owner, repo):
    api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1"
    response = requests.get(api_url).json()

    results = []
    for file in response.get("tree", []):
        if file["path"].endswith(".py"):
            file_url = f"https://raw.githubusercontent.com/{owner}/{repo}/main/{file['path']}"
            content_response = requests.get(file_url)
            if content_response.status_code == 200:
                with open("temp_file.py", "w") as f:
                    f.write(content_response.text)
                result = subprocess.run(["radon", "cc", "temp_file.py", "-s", "-a"], capture_output=True, text=True)
                results.append(f"{file['path']}\n{result.stdout}")
    return "\n".join(results) if results else "Nenhum arquivo Python encontrado ou erro ao analisar."


