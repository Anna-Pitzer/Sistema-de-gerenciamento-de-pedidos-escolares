# Sistema de gerenciamento de pedidos escolares

Este projeto foi inicialmente desenvolvido por [lucasraymund](https://github.com/lucasraymund) para a Divisão Municipal de Nutrição Escolar da Secretaria Municipal de Educação. Após a sua saída, assumi a responsabilidade de implementar novas funcionalidades pendentes, realizar melhorias na infraestrutura e aplicar refinamentos no design da interface, preservando a identidade original da aplicação.

O ecossistema é composto por uma **API REST (Back-end)** e uma **Single Page Application (Front-end)** que trabalham em conjunto para automatizar e centralizar o planeamento, a distribuição e o controlo da alimentação escolar municipal. O sistema gere desde o catálogo de alimentos e fornecedores homologados até o consumo real das escolas e a geração de mapas logísticos de entrega.

---

## Tecnologias Utilizadas

### Back-end (API REST)
* **Node.js** & **Express.js**: Motor principal do servidor e gestão de rotas HTTP.
* **TypeScript**: Desenvolvimento tipado (compilado para JavaScript).
* **MySQL** & **MySQL2**: Base de dados relacional para persistência dos dados da rede de ensino.
* **BcryptJS**: Criptografia de alta segurança para proteção e hashing de passwords.
* **CORS**: Configuração de segurança para comunicação controlada entre domínios.

### Front-end (Interface Web)
* **Angular 21**: Framework estrutural para a criação de uma SPA (Single Page Application) moderna.
* **Angular Material**: Biblioteca de componentes visuais para um design padronizado e intuitivo.
* **Bootstrap 5**: Framework CSS para suporte a layouts fluidos e responsivos.
* **jsPDF**: Biblioteca integrada para geração direta de relatórios e documentos em formato PDF no navegador.
* **Ngx-Mask**: Gestão e formatação automática de campos de input (como NIF, telefones e datas).
* **Vitest**: Framework de testes moderno utilizado para a execução de testes unitários rápidos e fiáveis.

### Automação de Processos
* **Python 3** & **OpenPyXL**: Motor responsável pela leitura, tratamento de dados e escrita de folhas de cálculo automatizadas no formato Excel (`.xlsx`).

---

## Funcionalidades do Sistema

* **Autenticação Segura**: Controle de acessos através de login, logout, validação contínua de token de sessão.
* **Módulos CRUD Completos**: Gestão unificada (criar, ler, atualizar e apagar) de três pilares:
  * **Escolas**: Unidades escolares geridas pela rede municipal.
  * **Fornecedores**: Empresas parceiras responsáveis pela entrega das mercadorias.
  * **Produtos**: Catálogo de mantimentos e insumos que compõem a merenda escolar.
* **Gestão de Pedidos**: Fluxo completo de ordens de entrega, permitindo a abertura, adição de itens, atualização quantitativa, consulta por ID/número e finalização (congelamento de dados para entrega).
* **Controlo de Consumo**: Registo detalhado do consumo periódico de alimentos em cada unidade escolar para evitar desperdícios.
* **Geração de Relatórios**: Exportação automatizada de dados operacionais (via jsPDF no front-end e OpenPyXL no back-end).

---

## O Mecanismo "Espelho de Pedidos"

Uma das funcionalidades mais importantes do ecossistema é o endpoint `POST /order/espelho`. Ao ser acionado, o back-end em Node.js delega a carga de processamento para o script Python (`espelho.py`), injetando os dados estruturados da distribuição.

O script monta uma matriz logística avançada em Excel com o seguinte formato:
* **Linhas**: Listam todas as escolas destinatárias daquela remessa.
* **Colunas**: Listam os produtos que compõem o pedido.
* **Cruzamentos**: Exibem a quantidade exata calculada que cada unidade escolar deve receber.
* **Totais**: Linhas e colunas de cálculo automático com somatórios por escola, por produto e o total geral consolidado.
* **Design Corporativo**: Formatação visual em tons de azul escuro e médio (`#1F4E79` e `#2E75B6`), preparada especificamente para impressão direta e assinatura do fornecedor no momento da entrega logística.

---

## Arquitetura de Endpoints da API

> ℹ️ **Nota de Padrão de Projeto:** Para garantir a integridade e uniformidade das comunicações, todas as rotas de consulta ou modificação utilizam exclusivamente o método `POST`. Os dados necessários viajam encapsulados no corpo da requisição (`req.body.data`), acompanhados do respetivo token de validação de identidade (`req.body.token`).

### Autenticação e Sessão
* `POST /login` - Realiza a autenticação do utilizador.
* `POST /logout` - Invalida a sessão atual.
* `POST /verify-session` - Verifica se a sessão do utilizador ainda está ativa.

### Escolas
* `POST /schools` - Lista todas as escolas municipais cadastradas.
* `POST /schools/register` - Regista uma nova escola na base de dados.
* `POST /schools/update` - Atualiza os dados de uma escola existente.
* `POST /schools/delete` - Remove o registo de uma escola.

### Fornecedores
* `POST /providers` - Lista os fornecedores homologados.
* `POST /providers/register` - Regista um novo fornecedor.
* `POST /providers/update` - Atualiza os dados cadastrais de um fornecedor.
* `POST /providers/delete` - Remove um fornecedor do sistema.

### Produtos
* `POST /products` - Lista o catálogo de alimentos disponíveis.
* `POST /products/register` - Adiciona um novo produto ao catálogo.
* `POST /products/update` - Altera especificações de um produto.
* `POST /products/delete` - Remove um produto do catálogo.

### Pedidos e Distribuição
* `POST /order` - Consulta o histórico geral ou específico de ordens de pedidos.
* `POST /order/register` - Cria uma nova ordem de distribuição.
* `POST /order/update` - Edita as quantidades de um pedido em aberto.
* `POST /order/delete` - Cancela/exclui uma ordem do sistema.
* `POST /order/finish` - Finaliza o pedido, congelando os dados para faturamento/entrega.
* `POST /order/espelho` - Dispara o script Python para gerar a folha de cálculo logística.

### Controlo de Consumo
* `POST /consumption` - Consulta os registos históricos de consumo.
* `POST /consumption/register` - Regista o consumo de alimentos efetuado pelas unidades escolares.

---

## Configuração do Ambiente e Instalação

### Requisitos Prévios
* **Node.js**: Versão 18.x ou superior.
* **Python**: Versão 3.10.x ou superior.
* **MySQL**: Versão 8.0 ou compatível (configurado por padrão na porta `3306`).

## Configuração do `config.js` (Back-end)

Como o arquivo original `config.js` contém credenciais locais e não é enviado para o repositório por motivos de segurança, você deve criá-lo manualmente na raiz da pasta do **back-end**.

Crie um arquivo chamado `config.js` e adicione a seguinte estrutura básica:

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;

// Configuração do banco de dados principal em MySQL
exports.database = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'seu_usuario',
    password: process.env.DB_PASSWORD || 'sua_senha',
    database: process.env.DB_NAME || '',
};
````
### Instalação das Dependências

1. Clone o repositório para o seu ambiente local:
   ```bash
   git clone <url-do-seu-repositorio>
   cd School-Order-Management-System
   Instale as dependências da API REST (Back-end):

# Navegue até à pasta do backend (se aplicável) e execute:
```bash
npm install
Instale as dependências da Interface Web (Front-end Angular):
````

# Navegue até à pasta do frontend (se aplicável) e execute:
```
npm install
Instale a biblioteca Python necessária para o motor de relatórios:
pip install openpyxl
````

## Executando a Aplicação
1. Back-end (API)
Modo de Desenvolvimento (Live Reload com Nodemon):

2. npm run start:dev
O servidor iniciará localmente na porta configurada 3003.

### Modo de Produção:

````
npm run build    # Compila o TypeScript para JavaScript nativo
npm start        # Inicia o servidor compilado
````
2. Front-end (Angular)
Executar Servidor de Desenvolvimento:
````
npm run tart    # ou: npx ng serve
Aceda à aplicação através do navegador em http://localhost:4200/.
`````
3. Executar Testes Unitários:
````
npm run test     # Executa a suite de testes utilizando o Vitest
````
4. Compilar para Produção:
````
npm run build    # Gera os ficheiros estáticos otimizados na pasta dist/
````
## Camadas de Segurança Implementadas
* `Mascaramento de Credenciais:` Armazenamento seguro de passwords recorrendo ao algoritmo de hash saltado bcryptjs.
* `Proteção Transversal de Rotas:` Filtro centralizado que exige tokens de sessão válidos para qualquer operação que altere dados.
* `Servidor Prontificado para HTTPS:` O ficheiro server.js inclui a arquitetura nativa do Express configurada para realizar a leitura de chaves criptográficas (SSL/TLS), permitindo ativar conexões seguras de forma nativa em ambientes de produção.
* `Isolamento de Ficheiros:` Configuração do .gitignore mapeada para impedir o envio acidental de dependências (node_modules, .angular), pastas de build (dist/) e ficheiros de registo local (*.log) para o repositório.
  
## Licença
Este projeto é de uso exclusivo e restrito da Coordenadoria Municipal de Nutrição Escolar. Todos os direitos reservados.
