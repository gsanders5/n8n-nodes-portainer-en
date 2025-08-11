# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-12-27

### ✨ Added
- **🤖 AI Agent Tool Support**: Node now compatible as Tool in n8n AI Agent
  - **IMPLEMENTED**: Property `usableAsTool: true` in node configuration
  - **UPDATED GROUP**: Changed from `['transform']` to `['tool']` for better categorization
  - **COMPATIBILITY**: Works with recent and nightly builds of n8n (≥ v1.79)
  - **FEATURES**: The node can now be called directly by AI Agent as a tool
  - **USAGE**: Will appear in the list of available tools in AI Agent Workflow

### 🔧 Enhanced
- **Optimized Category**: Node now appears in the "Tool" category for better discovery
- **AI Integration**: Ready for use in automated workflows with AI
- **Stability**: Clean structure with static routing compatible with AI Tools

### 📋 Usage Notes
- **Required Version**: Requires n8n version ≥ 1.79 or nightly builds
- **Installation**: Reinstall node after update for recognition by AI Agent
- **Configuration**: Restart n8n after installation to activate Tool functionality

## [2.0.0] - 2024-01-XX

### ✨ MAJOR UPDATE: 100% Portainer API 2.27.8 Coverage

#### 🚀 Main New Features
- **Docker Swarm Services**: Complete creation, update, scaling, logs, deletion
- **Secrets & Configs**: Full management of Swarm secrets and configurations
- **Nodes**: Docker Swarm node management, inspection and updates
- **Templates**: Access and management of application templates
- **Registries**: Complete CRUD for image registries (DockerHub, ECR, Azure, etc.)
- **Teams**: Complete team and member management
- **Settings**: Portainer settings, authentication, security policies
- **Webhooks**: Creation and management of webhooks for automation
- **Edge Groups**: Complete management of edge computing groups
- **Edge Stacks**: Deploy and manage stacks in edge environments
- **System**: System status, version, node information

#### 🔧 Expanded Operations - Containers (13 operations)
- **Added**: `create`, `exec`, `getLogs`, `getStats`, `inspect`, `pause`, `unpause`
- **Improved**: `delete` (with volume removal option), `restart`/`stop` (with timeout)
- **Advanced parameters**: Environment variables, port mapping, restart policies

#### 🖼️ Expanded Operations - Images (9 operations)
- **Added**: `build`, `get`, `getHistory`, `inspect`, `pull`, `push`, `tag`
- **Parameters**: Build context, tags, repositories, registry authentication

#### 🔄 Expanded Operations - Services (7 operations)
- **Added**: `create`, `getLogs`, `scale`, `update`
- **Features**: Service creation with replicas, ports, environment variables

#### 🔐 New Security Features
- **Secrets**: `create`, `delete`, `get`, `getMany`, `inspect`
- **Configs**: `create`, `delete`, `get`, `getMany`, `inspect`
- **Full support**: Base64 encoding, labels, metadata management

#### 🏗️ Infrastructure and Management
- **Nodes**: Swarm node inspection, role/availability updates
- **Registries**: Support for 7 types (Quay.io, Azure, Custom, Gitlab, ProGet, DockerHub, ECR)
- **Teams**: Complete organizational team management

#### ⚙️ Settings and Automation
- **Settings**: 15+ Portainer settings (authentication, security, snapshots)
- **Webhooks**: Automation for services and stacks
- **System**: Status and version monitoring

#### 📊 Implementation Statistics
- **21 main features** (vs. 7 previous)
- **150+ operations** (vs. 25 previous)
- **80+ specific parameters** for detailed configuration
- **API Coverage**: 100% (vs. 20-25% previous)

#### 🛠️ Technical Improvements
- Optimized n8n declarative structure
- Enhanced parameter validation
- Complete inline documentation
- Support for all Portainer environment types

### 🔄 Compatibility
- **Portainer API**: 2.27.8 (complete coverage)
- **n8n**: Compatible with 1.x versions
- **Breaking Changes**: None for existing operations

## [1.0.1] - 2024-01-XX

### Added
- Update operation for stacks with full support for:
  - Stack file content updates (docker-compose.yml)
  - Environment variable management via interface
  - Prune option to remove unreferenced services
- Detailed parameters for stack configuration
- Input data validation

### Changed
- Improved parameter organization in node
- Optimized routing structure for stack operations

### Fixed
- TypeScript compilation fixes
- Data structure adjustments for API compatibility

## [1.0.0] - 2024-01-XX

### Added
- Initial implementation of Portainer node for n8n
- Basic support for main features:
  - **Containers**: List, get, start, stop, restart, delete
  - **Environments**: List and get environments/endpoints
  - **Images**: List and delete images
  - **Networks**: List and delete networks
  - **Stacks**: List, get and delete stacks
  - **Users**: List and get users
  - **Volumes**: List and delete volumes
- PortainerApi credentials with API Key authentication
- Automatic connectivity test
- Complete installation and usage documentation
- Automated development and build scripts