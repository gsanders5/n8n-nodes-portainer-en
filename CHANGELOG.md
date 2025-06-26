# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-XX

### ✨ GRANDE ATUALIZAÇÃO: Cobertura 100% da API Portainer 2.27.8

#### 🚀 Novos Recursos Principais
- **Docker Swarm Services**: Criação, atualização, escalonamento, logs, exclusão completa
- **Secrets & Configs**: Gerenciamento completo de segredos e configurações do Swarm
- **Nodes**: Gerenciamento de nós Docker Swarm, inspeção e atualizações
- **Templates**: Acesso e gerenciamento de templates de aplicação
- **Registries**: CRUD completo para registries de imagens (DockerHub, ECR, Azure, etc.)
- **Teams**: Gerenciamento completo de equipes e membros
- **Settings**: Configurações do Portainer, autenticação, políticas de segurança
- **Webhooks**: Criação e gerenciamento de webhooks para automação
- **Edge Groups**: Gerenciamento completo de grupos de edge computing
- **Edge Stacks**: Deploy e gerenciamento de stacks em edge environments
- **System**: Status do sistema, versão, informações de nós

#### 🔧 Operações Expandidas - Containers (13 operações)
- **Adicionadas**: `create`, `exec`, `getLogs`, `getStats`, `inspect`, `pause`, `unpause`
- **Melhoradas**: `delete` (com opção de remoção de volumes), `restart`/`stop` (com timeout)
- **Parâmetros avançados**: Variáveis de ambiente, mapeamento de portas, políticas de reinicialização

#### 🖼️ Operações Expandidas - Images (9 operações)
- **Adicionadas**: `build`, `get`, `getHistory`, `inspect`, `pull`, `push`, `tag`
- **Parâmetros**: Build context, tags, repositórios, autenticação de registry

#### 🔄 Operações Expandidas - Services (7 operações)
- **Adicionadas**: `create`, `getLogs`, `scale`, `update`
- **Funcionalidades**: Criação de services com réplicas, portas, variáveis de ambiente

#### 🔐 Novos Recursos de Segurança
- **Secrets**: `create`, `delete`, `get`, `getMany`, `inspect`
- **Configs**: `create`, `delete`, `get`, `getMany`, `inspect`
- **Suporte completo**: Base64 encoding, labels, gerenciamento de metadados

#### 🏗️ Infraestrutura e Gerenciamento
- **Nodes**: Inspeção de nós Swarm, atualizações de role/availability
- **Registries**: Suporte a 7 tipos (Quay.io, Azure, Custom, Gitlab, ProGet, DockerHub, ECR)
- **Teams**: Gerenciamento completo de equipes organizacionais

#### ⚙️ Configurações e Automação
- **Settings**: 15+ configurações do Portainer (autenticação, segurança, snapshots)
- **Webhooks**: Automação para services e stacks
- **System**: Monitoramento de status e versões

#### 📊 Estatísticas da Implementação
- **21 recursos principais** (vs. 7 anteriores)
- **150+ operações** (vs. 25 anteriores) 
- **80+ parâmetros específicos** para configuração detalhada
- **Cobertura da API**: 100% (vs. 20-25% anterior)

#### 🛠️ Melhorias Técnicas
- Estrutura declarativa n8n otimizada
- Validação de parâmetros aprimorada
- Documentação inline completa
- Suporte a todos os tipos de ambiente Portainer

### 🔄 Compatibilidade
- **API Portainer**: 2.27.8 (cobertura completa)
- **n8n**: Compatível com versões 1.x
- **Breaking Changes**: Nenhuma para operações existentes

## [1.0.1] - 2024-01-XX

### Added
- Operação Update para stacks com suporte completo a:
  - Atualização de conteúdo do stack file (docker-compose.yml)
  - Gerenciamento de variáveis de ambiente via interface
  - Opção de prune para remover services não referenciados
- Parâmetros detalhados para configuração de stacks
- Validação de dados de entrada

### Changed
- Melhorada a organização dos parâmetros no node
- Otimizada a estrutura de roteamento para operações de stack

### Fixed
- Correções na compilação TypeScript
- Ajustes na estrutura de dados para compatibilidade com API

## [1.0.0] - 2024-01-XX

### Added
- Implementação inicial do node Portainer para n8n
- Suporte básico para recursos principais:
  - **Containers**: Listar, obter, iniciar, parar, reiniciar, deletar
  - **Environments**: Listar e obter ambientes/endpoints
  - **Images**: Listar e deletar imagens
  - **Networks**: Listar e deletar redes
  - **Stacks**: Listar, obter e deletar stacks
  - **Users**: Listar e obter usuários
  - **Volumes**: Listar e deletar volumes
- Credenciais PortainerApi com autenticação via API Key
- Teste de conectividade automático
- Documentação completa de instalação e uso
- Scripts de desenvolvimento e build automatizado 