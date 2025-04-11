#  Tech Health - Gerador de Apêndice Técnico para Investidores

##  Escolhas Técnicas

- **FastAPI**: leve, rápido e ideal para criação de APIs modernas.
- **Jinja2**: para geração de relatórios HTML personalizados.
- **Radon**: análise de complexidade do código sem necessidade de clone local.
- **GitHub API**: coleta de metadados diretamente dos repositórios.

Essas tecnologias foram escolhidas por oferecerem performance, simplicidade e integração com CI/CD.

## Uso de IA

- Utilizei IA para:
  - Ajudar na estruturação da API.
  - Otimização da análise de código com Radon.
  - Geração de templates HTML com boas práticas.
  - Suporte para escrita técnica da documentação.

##  Solução do Problema

O sistema permite gerar automaticamente um apêndice técnico de um repositório GitHub com:

- Nome, estrelas, data de atualização e quantidade de commits.
- Análise de complexidade do código via Radon.
- Relatório visual em HTML acessível por link.

Isso ajuda investidores a rapidamente entenderem a saúde técnica de um projeto.

## Tempo Total de Desenvolvimento

Aproximadamente 4 horas.

## Instruções para rodar o projeto

### Backend (API FastAPI)

1. Crie e ative um ambiente virtual:
  - python -m venv venv source venv/bin/activate # No Windows: venv\Scripts\activate

2. Instale as dependências:
  - pip install -r requirements.txt

3. Rode o servidor:
  - uvicorn main:app --reload
### Frontend (React)

1. Vá para a pasta `frontend`:
  - cd frontend

2. Instale as dependências:
  - npm install

3. Inicie a aplicação:
  - npm run dev

O backend estará rodando em `http://localhost:8000` e o frontend em `http://localhost:5173`.

