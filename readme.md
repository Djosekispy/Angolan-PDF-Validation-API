
# API de Validação de PDFs para o Sistema Angolano

Esta API está sendo desenvolvida para validar documentos em formato PDF, com foco em documentos amplamente utilizados no sistema angolano, como **Bilhetes de Identidade (BI)**, **comprovativos de transferências bancárias**, e outros documentos administrativos. O projeto encontra-se em fase de desenvolvimento, e atualmente apenas a funcionalidade de validação de comprovativos de transferências bancárias está operativa.

## Funcionalidades

- **Validação de Comprovativos de Transferência Bancária**: 
  - Extrai dados essenciais de PDFs, como código da transação, montante, IBAN, data e destinatário.
  - Valida o formato do IBAN angolano, a data da transação e a unicidade do código de transação para evitar fraudes ou duplicações.

### Uso da API GPT-4 Turbo

A API utiliza a **GPT-4 Turbo** para realizar a extração e estruturação dos dados dos documentos PDF. A GPT-4 Turbo é responsável por interpretar o conteúdo dos documentos e retornar informações organizadas no formato JSON, facilitando a validação dos dados.

## Limitações Atuais

- **Não há integração com sistemas bancários ou governamentais**: A API não realiza verificações diretas em bancos ou bases de dados governamentais. Todas as validações são feitas com base nas regras estabelecidas e nos dados extraídos do PDF.
  
- **Funcionalidade em Desenvolvimento**: Outras funcionalidades, como a validação de **Bilhete de Identidade (BI)** e de outros documentos oficiais, ainda estão sendo desenvolvidas e serão implementadas em futuras versões.

## Tecnologia Utilizada

- **Node.js**: Utilizado para o desenvolvimento da aplicação backend.
- **Express.js**: Framework web leve para gerenciar rotas e requisições HTTP.
- **JSON File**: Guarda os dados em arquivos para busca ( simulando um banco de dados).
- **PDF-Parse**: Biblioteca usada para extrair o texto dos PDFs.
- **GPT-4 Turbo**: Usada para processar e estruturar os dados extraídos dos PDFs.

## Endpoints da API

- **POST /profbank/save**:
  Valida os dados de um comprovativo de transferência bancária. A API faz o parsing do PDF, extrai e estrutura os dados usando a GPT-4 Turbo e valida campos como o código da transação, o formato do IBAN e a validade da data.

## Começando

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- Um gerenciador de pacotes como npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Djosekispy/Angolan-PDF-Validation-API.git
   cd Angolan-PDF-Validation-API
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` para armazenar chaves de API e informações sensíveis.

4. Registre-se na Clarify Communit 
    - Obter as credencias da [api](https://clarifai.com/openai/chat-completion/models/GPT-3_5-turbo) 
    
5. Inicie a aplicação:
   ```bash
   npm run dev
   ```

`

## Contribuição

Este projeto está sendo desenvolvido com dedicação para facilitar a validação de documentos no contexto angolano. A comunidade é incentivada a contribuir com sugestões, melhorias e novos recursos.

Para contribuir:
1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature/correção.
3. Envie um pull request explicando suas alterações.

## Roteiro de Desenvolvimento

- **Validação do Bilhete de Identidade (BI)**: Em desenvolvimento.
- **Validação de Outros Documentos**: Expansão para faturas de serviços, contratos, e outros documentos relevantes.
- **Suporte a OCR**: Planejado para PDFs baseados em imagem.
  
## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

