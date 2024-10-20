
# API de Validação de PDFs para o Sistema Angolano

Esta API está sendo desenvolvida para validar documentos em formato PDF normal e com conteudo scaneado, com foco em documentos amplamente utilizados no sistema angolano, como **Bilhetes de Identidade (BI)**, **comprovativos de transferências bancárias**, e outros documentos administrativos. O projeto encontra-se em fase de desenvolvimento.

## Funcionalidades

- **Validação de Comprovativos de Transferência Bancária**: 
  - Extrai dados essenciais de PDFs, como código da transação, montante, IBAN, data e destinatário.
  - Valida o formato do IBAN angolano, a data da transação e a unicidade do código de transação para evitar fraudes ou duplicações.

- **Validação de Bilhete de Identidade**: 
   - Ao tentar salvar um novo usuário, o sistema primeiro verifica se já existe um usuário com o mesmo número de BI (campo cardNumber).
   - Caso já exista um usuário com esse número de BI, o sistema rejeita a criação do novo usuário, prevenindo duplicação de dados.
   - O sistema também verifica se o BI está expirado, comparando a data de expiração (expiryDate) com a data atual.
   - Se o BI estiver expirado, o usuário não é salvo, garantindo que apenas usuários com documentos válidos sejam registrados.

- **Validação de NIF**:
   - Carrega um arquivo contém o número de contribuiente
   - Extrai os dados e retorna eles de forma estruturada
   - Aceita apenas documento não scaneado ( Foi testado com documentos gerado pelo SEPE )

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
- **Tesseract.js** : Biblioteca usada para extrair dados da imagem

## Endpoints da API

- **POST /profbank/save**:
  Valida os dados de um comprovativo de transferência bancária. A API faz o parsing do PDF, extrai e estrutura os dados usando a GPT-4 Turbo e valida campos como o código da transação, o formato do IBAN e a validade da data.

- **POST /bidoc/save**:
    Valida os dados de um Bilhete de identidade. Converte o documento scaneado em pdf em imagem png. A API faz o reconhecimento do arquivo, extrai os dados usando o Tesseract.js  e estrutura os dados usando a GPT-4 Turbo, a aplicação é responsavél por toda lógica de validação.

- **POST /nif/show**:
    Extrai os dados de um documento de Identificação Fiscal.  A API faz o reconhecimento do arquivo, extrai os dados  e estrutura os dados usando a GPT-4.

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


## Documentação da API

Acesse a documentação oficial da API, incluindo exemplos detalhados de como utilizar os diferentes endpoints, através do seguinte link: http://localhost:3000/api-docs/. Essa página fornece recursos interativos que facilitam a exploração dos endpoints disponíveis e como utilizá-los corretamente em suas requisições.


## Roteiro de Desenvolvimento

- **Validação de Outros Documentos**: Expansão para faturas de serviços, contratos, e outros documentos relevantes.
- **Suporte a OCR**: Planejado para PDFs baseados em imagem (Já implementado).
- **Converter arquivos scaneados em imagem** : para facilitar a extração de dados ( já implementado)
  
## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

