import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Portainer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Portainer',
		name: 'portainer',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Trabalhe com dados da API do Portainer para gerenciar Docker',
		defaults: {
			name: 'Portainer',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'portainerApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Config',
						value: 'configs',
						description: 'Gerenciar configs Docker Swarm',
					},
					{
						name: 'Container',
						value: 'containers',
						description: 'Gerenciar containers Docker',
					},
					{
						name: 'Edge Group',
						value: 'edgeGroups',
						description: 'Gerenciar grupos de edge computing',
					},
					{
						name: 'Edge Stack',
						value: 'edgeStacks',
						description: 'Gerenciar stacks de edge computing',
					},
					{
						name: 'Environment',
						value: 'environments',
						description: 'Gerenciar ambientes/endpoints',
					},
					{
						name: 'Image',
						value: 'images',
						description: 'Gerenciar imagens Docker',
					},
					{
						name: 'Network',
						value: 'networks',
						description: 'Gerenciar redes Docker',
					},
					{
						name: 'Node',
						value: 'nodes',
						description: 'Gerenciar nodes Docker Swarm',
					},
					{
						name: 'Registry',
						value: 'registries',
						description: 'Gerenciar registries de imagens',
					},
					{
						name: 'Role',
						value: 'roles',
						description: 'Gerenciar roles e permissões',
					},
					{
						name: 'Secret',
						value: 'secrets',
						description: 'Gerenciar secrets Docker Swarm',
					},
					{
						name: 'Service',
						value: 'services',
						description: 'Gerenciar services Docker Swarm',
					},
					{
						name: 'Setting',
						value: 'settings',
						description: 'Gerenciar configurações do Portainer',
					},
					{
						name: 'Stack',
						value: 'stacks',
						description: 'Gerenciar stacks Docker Compose',
					},
					{
						name: 'System',
						value: 'system',
						description: 'Informações do sistema e status',
					},
					{
						name: 'Team',
						value: 'teams',
						description: 'Gerenciar equipes e membros',
					},
					{
						name: 'Template',
						value: 'templates',
						description: 'Gerenciar templates de aplicação',
					},
					{
						name: 'User',
						value: 'users',
						description: 'Gerenciar usuários',
					},
					{
						name: 'Volume',
						value: 'volumes',
						description: 'Gerenciar volumes Docker',
					},
					{
						name: 'Webhook',
						value: 'webhooks',
						description: 'Gerenciar webhooks',
					},
				],
				default: 'containers',
			},

			// ===========================================
			// TEMPLATES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['templates'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar templates',
						description: 'Recuperar todos os templates',
						routing: {
							request: {
								method: 'GET',
								url: '/templates',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter template',
						description: 'Obter um template específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/templates/{{$parameter["templateId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// REGISTRIES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['registries'],
					},
				},
							options: [
				{
					name: 'Create',
					value: 'create',
					action: 'Criar registry',
					description: 'Criar um novo registry',
					routing: {
						request: {
							method: 'POST',
							url: '/registries',
							body: {
								Name: '={{$parameter["registryName"]}}',
								URL: '={{$parameter["registryUrl"]}}',
								Type: '={{parseInt($parameter["registryType"]) || 1}}',
								Username: '={{$parameter["username"] || ""}}',
								Password: '={{$parameter["password"] || ""}}',
							},
						},
					},
				},
				{
					name: 'Delete',
					value: 'delete',
					action: 'Deletar registry',
					description: 'Deletar um registry',
					routing: {
						request: {
							method: 'DELETE',
							url: '=/registries/{{$parameter["registryId"]}}',
						},
					},
				},
				{
					name: 'Get',
					value: 'get',
					action: 'Obter registry',
					description: 'Obter um registry específico por ID',
					routing: {
						request: {
							method: 'GET',
							url: '=/registries/{{$parameter["registryId"]}}',
						},
					},
				},
				{
					name: 'Get Many',
					value: 'getMany',
					action: 'Listar registries',
					description: 'Recuperar todos os registries',
					routing: {
						request: {
							method: 'GET',
							url: '/registries',
						},
					},
				},
				{
					name: 'Update',
					value: 'update',
					action: 'Atualizar registry',
					description: 'Atualizar um registry',
					routing: {
						request: {
							method: 'PUT',
							url: '=/registries/{{$parameter["registryId"]}}',
							body: {
								Name: '={{$parameter["registryName"]}}',
								URL: '={{$parameter["registryUrl"]}}',
								Username: '={{$parameter["username"] || ""}}',
								Password: '={{$parameter["password"] || ""}}',
							},
						},
					},
				},
			],
				default: 'getMany',
			},

			// ===========================================
			// TEAMS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['teams'],
					},
				},
							options: [
				{
					name: 'Create',
					value: 'create',
					action: 'Criar team',
					description: 'Criar uma nova equipe',
					routing: {
						request: {
							method: 'POST',
							url: '/teams',
							body: {
								Name: '={{$parameter["teamName"]}}',
							},
						},
					},
				},
				{
					name: 'Delete',
					value: 'delete',
					action: 'Deletar team',
					description: 'Deletar uma equipe',
					routing: {
						request: {
							method: 'DELETE',
							url: '=/teams/{{$parameter["teamId"]}}',
						},
					},
				},
				{
					name: 'Get',
					value: 'get',
					action: 'Obter team',
					description: 'Obter uma equipe específica por ID',
					routing: {
						request: {
							method: 'GET',
							url: '=/teams/{{$parameter["teamId"]}}',
						},
					},
				},
				{
					name: 'Get Many',
					value: 'getMany',
					action: 'Listar teams',
					description: 'Recuperar todas as equipes',
					routing: {
						request: {
							method: 'GET',
							url: '/teams',
						},
					},
				},
				{
					name: 'Update',
					value: 'update',
					action: 'Atualizar team',
					description: 'Atualizar uma equipe',
					routing: {
						request: {
							method: 'PUT',
							url: '=/teams/{{$parameter["teamId"]}}',
							body: {
								Name: '={{$parameter["teamName"]}}',
							},
						},
					},
				},
			],
				default: 'getMany',
			},

			// ===========================================
			// SETTINGS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['settings'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Obter configura es',
						description: 'Obter configurações do Portainer',
						routing: {
							request: {
								method: 'GET',
								url: '/settings',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar configura es',
						description: 'Atualizar configurações do Portainer',
						routing: {
							request: {
								method: 'PUT',
								url: '/settings',
								body: {
									LogoURL: '={{$parameter["logoUrl"] || ""}}',
									BlackListedLabels: '={{$parameter["blacklistedLabels"] ? $parameter["blacklistedLabels"].split(",") : []}}',
									AuthenticationMethod: '={{parseInt($parameter["authMethod"]) || 1}}',
									InternalAuthSettings: {
										RequiredPasswordLength: '={{parseInt($parameter["passwordLength"]) || 8}}',
									},
									AllowContainerCapabilitiesForRegularUsers: '={{$parameter["allowCapabilities"] || false}}',
									AllowDeviceMappingForRegularUsers: '={{$parameter["allowDeviceMapping"] || false}}',
									AllowStackManagementForRegularUsers: '={{$parameter["allowStackManagement"] || true}}',
									AllowBindMountsForRegularUsers: '={{$parameter["allowBindMounts"] || false}}',
									AllowPrivilegedModeForRegularUsers: '={{$parameter["allowPrivilegedMode"] || false}}',
									AllowHostNamespaceForRegularUsers: '={{$parameter["allowHostNamespace"] || false}}',
									SnapshotInterval: '={{$parameter["snapshotInterval"] || "5m"}}',
									EnableEdgeComputeFeatures: '={{$parameter["enableEdgeCompute"] || false}}',
									UserSessionTimeout: '={{$parameter["sessionTimeout"] || "8h"}}',
								},
							},
						},
					},
				],
				default: 'get',
			},

			// ===========================================
			// WEBHOOKS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhooks'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar webhook',
						description: 'Criar um novo webhook',
						routing: {
							request: {
								method: 'POST',
								url: '/webhooks',
								body: {
									ResourceID: '={{$parameter["resourceId"]}}',
									EndpointID: '={{parseInt($parameter["environmentId"])}}',
									WebhookType: '={{parseInt($parameter["webhookType"])}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar webhook',
						description: 'Deletar um webhook',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/webhooks/{{$parameter["webhookId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar webhooks',
						description: 'Recuperar todos os webhooks',
						routing: {
							request: {
								method: 'GET',
								url: '/webhooks',
								qs: {
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// SYSTEM OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['system'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'getStatus',
						action: 'Obter status',
						description: 'Obter status do sistema',
						routing: {
							request: {
								method: 'GET',
								url: '/status',
							},
						},
					},
					{
						name: 'Get Version',
						value: 'getVersion',
						action: 'Obter vers o',
						description: 'Obter versão do Portainer',
						routing: {
							request: {
								method: 'GET',
								url: '/status/version',
							},
						},
					},
					{
						name: 'Get Nodes',
						value: 'getNodes',
						action: 'Obter n s',
						description: 'Obter informações dos nós',
						routing: {
							request: {
								method: 'GET',
								url: '/status/nodes',
							},
						},
					},
				],
				default: 'getStatus',
			},

			// ===========================================
			// EDGE GROUPS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['edgeGroups'],
					},
				},
							options: [
				{
					name: 'Create',
					value: 'create',
					action: 'Criar edge group',
					description: 'Criar um novo grupo de edge computing',
					routing: {
						request: {
							method: 'POST',
							url: '/edge_groups',
							body: {
								Name: '={{$parameter["edgeGroupName"]}}',
								Dynamic: '={{$parameter["isDynamic"] || false}}',
								TagIds: '={{$parameter["tagIds"] ? $parameter["tagIds"].split(",").map(id => parseInt(id.trim())) : []}}',
								Endpoints: '={{$parameter["endpointIds"] ? $parameter["endpointIds"].split(",").map(id => parseInt(id.trim())) : []}}',
							},
						},
					},
				},
				{
					name: 'Delete',
					value: 'delete',
					action: 'Deletar edge group',
					description: 'Deletar um grupo de edge computing',
					routing: {
						request: {
							method: 'DELETE',
							url: '=/edge_groups/{{$parameter["edgeGroupId"]}}',
						},
					},
				},
				{
					name: 'Get',
					value: 'get',
					action: 'Obter edge group',
					description: 'Obter um grupo de edge computing específico por ID',
					routing: {
						request: {
							method: 'GET',
							url: '=/edge_groups/{{$parameter["edgeGroupId"]}}',
						},
					},
				},
				{
					name: 'Get Many',
					value: 'getMany',
					action: 'Listar edge groups',
					description: 'Recuperar todos os grupos de edge computing',
					routing: {
						request: {
							method: 'GET',
							url: '/edge_groups',
						},
					},
				},
				{
					name: 'Update',
					value: 'update',
					action: 'Atualizar edge group',
					description: 'Atualizar um grupo de edge computing',
					routing: {
						request: {
							method: 'PUT',
							url: '=/edge_groups/{{$parameter["edgeGroupId"]}}',
							body: {
								Name: '={{$parameter["edgeGroupName"]}}',
								Dynamic: '={{$parameter["isDynamic"] || false}}',
								TagIds: '={{$parameter["tagIds"] ? $parameter["tagIds"].split(",").map(id => parseInt(id.trim())) : []}}',
								Endpoints: '={{$parameter["endpointIds"] ? $parameter["endpointIds"].split(",").map(id => parseInt(id.trim())) : []}}',
							},
						},
					},
				},
			],
				default: 'getMany',
			},

			// ===========================================
			// EDGE STACKS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar edge stack',
						description: 'Criar um novo stack de edge computing',
						routing: {
							request: {
								method: 'POST',
								url: '/edge_stacks',
								body: {
									Name: '={{$parameter["edgeStackName"]}}',
									StackFileContent: '={{$parameter["stackFileContent"]}}',
									EdgeGroups: '={{$parameter["edgeGroupIds"] ? $parameter["edgeGroupIds"].split(",").map(id => parseInt(id.trim())) : []}}',
									DeploymentType: '={{parseInt($parameter["deploymentType"]) || 0}}',
									PrePullImage: '={{$parameter["prePullImage"] || false}}',
									RetryDeploy: '={{$parameter["retryDeploy"] || false}}',
									Env: '={{$parameter["environmentVariables"]?.envVar ? $parameter["environmentVariables"].envVar.map(item => ({name: item.name, value: item.value})) : []}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar edge stack',
						description: 'Deletar um stack de edge computing',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/edge_stacks/{{$parameter["edgeStackId"]}}',
							},
						},
					},
					{
					name: 'Get',
					value: 'get',
					action: 'Obter edge stack',
					description: 'Obter um stack de edge computing específico por ID',
					routing: {
						request: {
							method: 'GET',
							url: '=/edge_stacks/{{$parameter["edgeStackId"]}}',
						},
					},
				},
				{
					name: 'Get Many',
					value: 'getMany',
					action: 'Listar edge stacks',
					description: 'Recuperar todos os stacks de edge computing',
					routing: {
						request: {
							method: 'GET',
							url: '/edge_stacks',
						},
					},
				},
				{
					name: 'Get Status',
					value: 'getStatus',
					action: 'Obter status do edge stack',
					description: 'Obter status de deployment do edge stack',
					routing: {
						request: {
							method: 'GET',
							url: '=/edge_stacks/{{$parameter["edgeStackId"]}}/status',
						},
					},
				},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar edge stack',
						description: 'Atualizar um stack de edge computing',
						routing: {
							request: {
								method: 'PUT',
								url: '=/edge_stacks/{{$parameter["edgeStackId"]}}',
								body: {
									StackFileContent: '={{$parameter["stackFileContent"]}}',
									EdgeGroups: '={{$parameter["edgeGroupIds"] ? $parameter["edgeGroupIds"].split(",").map(id => parseInt(id.trim())) : []}}',
									PrePullImage: '={{$parameter["prePullImage"] || false}}',
									RetryDeploy: '={{$parameter["retryDeploy"] || false}}',
									Env: '={{$parameter["environmentVariables"]?.envVar ? $parameter["environmentVariables"].envVar.map(item => ({name: item.name, value: item.value})) : []}}',
									Prune: '={{$parameter["prune"] || false}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// CONTAINERS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['containers'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar container',
						description: 'Criar um novo container',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/create',
								qs: {
									name: '={{$parameter["containerName"] || undefined}}',
								},
								body: {
									Image: '={{$parameter["image"]}}',
									Cmd: '={{$parameter["command"] ? $parameter["command"].split(" ") : undefined}}',
									Env: '={{$parameter["environmentVariables"]?.envVar ? $parameter["environmentVariables"].envVar.map(item => item.name + "=" + item.value) : undefined}}',
									ExposedPorts: '={{$parameter["exposedPorts"] ? Object.fromEntries($parameter["exposedPorts"].split(",").map(port => [port.trim() + "/tcp", {}])) : undefined}}',
									HostConfig: {
										PortBindings: '={{$parameter["portBindings"] ? Object.fromEntries($parameter["portBindings"].split(",").map(binding => { const [container, host] = binding.split(":"); return [container.trim() + "/tcp", [{ HostPort: host.trim() }]]; })) : undefined}}',
										RestartPolicy: {
											Name: '={{$parameter["restartPolicy"] || "no"}}',
										},
									},
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar container',
						description: 'Deletar um container',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}',
								qs: {
									force: '={{$parameter["forceDelete"] || false}}',
									v: '={{$parameter["removeVolumes"] || false}}',
								},
							},
						},
					},
					{
						name: 'Exec',
						value: 'exec',
						action: 'Executar comando',
						description: 'Executar comando no container',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/exec',
								body: {
									AttachStdout: true,
									AttachStderr: true,
									Cmd: '={{$parameter["execCommand"].split(" ")}}',
									Tty: '={{$parameter["tty"] || false}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter container',
						description: 'Obter um container específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/json',
							},
						},
					},
					{
						name: 'Get Logs',
						value: 'getLogs',
						action: 'Obter logs',
						description: 'Obter logs do container',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/logs',
								qs: {
									stdout: '={{$parameter["includeStdout"] || true}}',
									stderr: '={{$parameter["includeStderr"] || true}}',
									tail: '={{$parameter["tailLines"] || "all"}}',
									timestamps: '={{$parameter["timestamps"] || false}}',
								},
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar containers',
						description: 'Recuperar múltiplos containers',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/json',
								qs: {
									all: '={{$parameter["includeAll"] || true}}',
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get Stats',
						value: 'getStats',
						action: 'Obter estat sticas',
						description: 'Obter estatísticas de uso do container',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/stats',
								qs: {
									stream: false,
								},
							},
						},
					},
					{
						name: 'Inspect',
						value: 'inspect',
						action: 'Inspecionar container',
						description: 'Inspecionar detalhes do container',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/json',
							},
						},
					},
					{
						name: 'Pause',
						value: 'pause',
						action: 'Pausar container',
						description: 'Pausar um container em execução',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/pause',
							},
						},
					},
					{
						name: 'Restart',
						value: 'restart',
						action: 'Reiniciar container',
						description: 'Reiniciar um container',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/restart',
								qs: {
									t: '={{$parameter["timeout"] || 10}}',
								},
							},
						},
					},
					{
						name: 'Start',
						value: 'start',
						action: 'Iniciar container',
						description: 'Iniciar um container parado',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/start',
							},
						},
					},
					{
						name: 'Stop',
						value: 'stop',
						action: 'Parar container',
						description: 'Parar um container em execução',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/stop',
								qs: {
									t: '={{$parameter["timeout"] || 10}}',
								},
							},
						},
					},
					{
						name: 'Unpause',
						value: 'unpause',
						action: 'Despausar container',
						description: 'Despausar um container pausado',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/containers/{{$parameter["containerId"]}}/unpause',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// ENVIRONMENTS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['environments'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar ambientes',
						description: 'Recuperar todos os ambientes disponíveis',
						routing: {
							request: {
								method: 'GET',
								url: '/endpoints',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter ambiente',
						description: 'Obter um ambiente específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// STACKS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['stacks'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar stacks',
						description: 'Recuperar todos os stacks',
						routing: {
							request: {
								method: 'GET',
								url: '/stacks',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter stack',
						description: 'Obter um stack específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/stacks/{{$parameter["stackId"]}}',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar stack',
						description: 'Deletar um stack',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/stacks/{{$parameter["stackId"]}}',
								qs: {
									endpointId: '={{$parameter["environmentId"]}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar stack',
						description: 'Atualizar um stack existente',
						routing: {
							request: {
								method: 'PUT',
								url: '=/stacks/{{$parameter["stackId"]}}',
								qs: {
									endpointId: '={{$parameter["environmentId"]}}',
								},
								body: {
									stackFileContent: '={{$parameter["stackFileContent"] || undefined}}',
									env: '={{$parameter["env"]?.envVar ? $parameter["env"].envVar.map(item => ({name: item.name, value: item.value})) : undefined}}',
									prune: '={{$parameter["prune"] || false}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// IMAGES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['images'],
					},
				},
				options: [
					{
						name: 'Build',
						value: 'build',
						action: 'Build imagem',
						description: 'Construir uma imagem a partir de Dockerfile',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/build',
								qs: {
									t: '={{$parameter["imageTag"]}}',
									dockerfile: '={{$parameter["dockerfileName"] || "Dockerfile"}}',
									rm: '={{$parameter["removeIntermediateContainers"] || true}}',
								},
								body: '={{$parameter["buildContext"]}}',
								headers: {
									'Content-Type': 'application/x-tar',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar imagem',
						description: 'Deletar uma imagem',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/{{$parameter["imageId"]}}',
								qs: {
									force: '={{$parameter["forceDelete"] || false}}',
									noprune: '={{$parameter["noprune"] || false}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter imagem',
						description: 'Obter uma imagem específica por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/{{$parameter["imageId"]}}/json',
							},
						},
					},
					{
						name: 'Get History',
						value: 'getHistory',
						action: 'Obter hist rico',
						description: 'Obter histórico de uma imagem',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/{{$parameter["imageId"]}}/history',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar imagens',
						description: 'Recuperar todas as imagens',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/json',
								qs: {
									all: '={{$parameter["includeAll"] || false}}',
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Inspect',
						value: 'inspect',
						action: 'Inspecionar imagem',
						description: 'Inspecionar detalhes da imagem',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/{{$parameter["imageId"]}}/json',
							},
						},
					},
					{
						name: 'Pull',
						value: 'pull',
						action: 'Pull imagem',
						description: 'Fazer pull de uma imagem do registry',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/create',
								qs: {
									fromImage: '={{$parameter["imageName"]}}',
									tag: '={{$parameter["imageTag"] || "latest"}}',
								},
								headers: {
									'X-Registry-Auth': '={{$parameter["registryAuth"] || ""}}',
								},
							},
						},
					},
					{
						name: 'Push',
						value: 'push',
						action: 'Push imagem',
						description: 'Fazer push de uma imagem para o registry',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/{{$parameter["imageId"]}}/push',
								qs: {
									tag: '={{$parameter["imageTag"] || "latest"}}',
								},
								headers: {
									'X-Registry-Auth': '={{$parameter["registryAuth"] || ""}}',
								},
							},
						},
					},
					{
						name: 'Tag',
						value: 'tag',
						action: 'Tag imagem',
						description: 'Criar tag para uma imagem',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/images/{{$parameter["imageId"]}}/tag',
								qs: {
									repo: '={{$parameter["repository"]}}',
									tag: '={{$parameter["newTag"]}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// VOLUMES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['volumes'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar volumes',
						description: 'Recuperar todos os volumes',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/volumes',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar volume',
						description: 'Deletar um volume',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/volumes/{{$parameter["volumeName"]}}',
								qs: {
									force: '={{$parameter["forceDelete"] || false}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// NETWORKS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['networks'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar redes',
						description: 'Recuperar todas as redes',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/networks',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar rede',
						description: 'Deletar uma rede',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/networks/{{$parameter["networkId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// USERS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['users'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar usu rios',
						description: 'Recuperar todos os usuários',
						routing: {
							request: {
								method: 'GET',
								url: '/users',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter usu rio',
						description: 'Obter um usuário específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/users/{{$parameter["userId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// SERVICES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['services'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar service',
						description: 'Criar um novo service Docker Swarm',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services/create',
								body: {
									Name: '={{$parameter["serviceName"]}}',
									TaskTemplate: {
										ContainerSpec: {
											Image: '={{$parameter["image"]}}',
											Env: '={{$parameter["environmentVariables"]?.envVar ? $parameter["environmentVariables"].envVar.map(item => item.name + "=" + item.value) : undefined}}',
											Args: '={{$parameter["args"] ? $parameter["args"].split(" ") : undefined}}',
										},
										RestartPolicy: {
											Condition: '={{$parameter["restartCondition"] || "any"}}',
										},
									},
									Mode: {
										Replicated: {
											Replicas: '={{parseInt($parameter["replicas"]) || 1}}',
										},
									},
									EndpointSpec: {
										Ports: '={{$parameter["ports"] ? $parameter["ports"].split(",").map(port => { const [published, target] = port.split(":"); return { Protocol: "tcp", PublishedPort: parseInt(published.trim()), TargetPort: parseInt(target.trim()) }; }) : undefined}}',
									},
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar service',
						description: 'Deletar um service Docker Swarm',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services/{{$parameter["serviceId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter service',
						description: 'Obter um service específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services/{{$parameter["serviceId"]}}',
							},
						},
					},
					{
						name: 'Get Logs',
						value: 'getLogs',
						action: 'Obter logs',
						description: 'Obter logs do service',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services/{{$parameter["serviceId"]}}/logs',
								qs: {
									stdout: '={{$parameter["includeStdout"] || true}}',
									stderr: '={{$parameter["includeStderr"] || true}}',
									tail: '={{$parameter["tailLines"] || "all"}}',
									timestamps: '={{$parameter["timestamps"] || false}}',
								},
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar services',
						description: 'Recuperar todos os services Docker Swarm',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services',
								qs: {
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Scale',
						value: 'scale',
						action: 'Escalar service',
						description: 'Escalar um service Docker Swarm',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services/{{$parameter["serviceId"]}}/update',
								qs: {
									version: '={{$parameter["version"]}}',
								},
								body: {
									Mode: {
										Replicated: {
											Replicas: '={{parseInt($parameter["replicas"])}}',
										},
									},
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar service',
						description: 'Atualizar um service Docker Swarm',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/services/{{$parameter["serviceId"]}}/update',
								qs: {
									version: '={{$parameter["version"]}}',
								},
								body: {
									TaskTemplate: {
										ContainerSpec: {
											Image: '={{$parameter["image"]}}',
											Env: '={{$parameter["environmentVariables"]?.envVar ? $parameter["environmentVariables"].envVar.map(item => item.name + "=" + item.value) : undefined}}',
										},
									},
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// SECRETS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['secrets'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar secret',
						description: 'Criar um novo secret Docker Swarm',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/secrets/create',
								body: {
									Name: '={{$parameter["secretName"]}}',
									Data: '={{Buffer.from($parameter["secretData"], "utf8").toString("base64")}}',
									Labels: '={{$parameter["labels"] ? JSON.parse($parameter["labels"]) : undefined}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar secret',
						description: 'Deletar um secret Docker Swarm',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/secrets/{{$parameter["secretId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter secret',
						description: 'Obter um secret específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/secrets/{{$parameter["secretId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar secrets',
						description: 'Recuperar todos os secrets Docker Swarm',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/secrets',
								qs: {
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Inspect',
						value: 'inspect',
						action: 'Inspecionar secret',
						description: 'Inspecionar detalhes do secret',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/secrets/{{$parameter["secretId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// CONFIGS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['configs'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar config',
						description: 'Criar um novo config Docker Swarm',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/configs/create',
								body: {
									Name: '={{$parameter["configName"]}}',
									Data: '={{Buffer.from($parameter["configData"], "utf8").toString("base64")}}',
									Labels: '={{$parameter["labels"] ? JSON.parse($parameter["labels"]) : undefined}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar config',
						description: 'Deletar um config Docker Swarm',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/configs/{{$parameter["configId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter config',
						description: 'Obter um config específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/configs/{{$parameter["configId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar configs',
						description: 'Recuperar todos os configs Docker Swarm',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/configs',
								qs: {
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Inspect',
						value: 'inspect',
						action: 'Inspecionar config',
						description: 'Inspecionar detalhes do config',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/configs/{{$parameter["configId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// NODES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['nodes'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Obter node',
						description: 'Obter um node específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/nodes/{{$parameter["nodeId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar nodes',
						description: 'Recuperar todos os nodes Docker Swarm',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/nodes',
								qs: {
									filters: '={{$parameter["filters"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Inspect',
						value: 'inspect',
						action: 'Inspecionar node',
						description: 'Inspecionar detalhes do node',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/nodes/{{$parameter["nodeId"]}}',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar node',
						description: 'Atualizar um node Docker Swarm',
						routing: {
							request: {
								method: 'POST',
								url: '=/endpoints/{{$parameter["environmentId"]}}/docker/nodes/{{$parameter["nodeId"]}}/update',
								qs: {
									version: '={{$parameter["version"]}}',
								},
								body: {
									Role: '={{$parameter["role"]}}',
									Availability: '={{$parameter["availability"]}}',
									Labels: '={{$parameter["labels"] ? JSON.parse($parameter["labels"]) : undefined}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// COMMON PARAMETERS
			// ===========================================
			{
				displayName: 'Environment ID',
				name: 'environmentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['containers', 'images', 'volumes', 'networks', 'stacks', 'services', 'secrets', 'configs', 'nodes'],
						operation: ['getMany', 'get', 'start', 'stop', 'restart', 'delete', 'update', 'create', 'exec', 'getLogs', 'getStats', 'inspect', 'pause', 'unpause', 'build', 'pull', 'push', 'tag', 'getHistory', 'scale'],
					},
				},
				default: '1',
				description: 'O ID do ambiente/endpoint do Portainer',
				placeholder: '1',
			},
			{
				displayName: 'Container ID',
				name: 'containerId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['get', 'start', 'stop', 'restart', 'delete', 'exec', 'getLogs', 'getStats', 'inspect', 'pause', 'unpause'],
					},
				},
				default: '',
				description: 'O ID do container',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'Stack ID',
				name: 'stackId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['stacks'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'O ID do stack',
				placeholder: '1',
			},
			{
				displayName: 'Image ID',
				name: 'imageId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['images'],
						operation: ['delete', 'get', 'getHistory', 'inspect', 'push', 'tag'],
					},
				},
				default: '',
				description: 'O ID da imagem',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'Volume Name',
				name: 'volumeName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['volumes'],
						operation: ['delete'],
					},
				},
				default: '',
				description: 'O nome do volume',
				placeholder: 'my_volume',
			},
			{
				displayName: 'Network ID',
				name: 'networkId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['networks'],
						operation: ['delete'],
					},
				},
				default: '',
				description: 'O ID da rede',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'O ID do usuário',
				placeholder: '1',
			},
			{
				displayName: 'Service ID',
				name: 'serviceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['services'],
						operation: ['get', 'delete', 'getLogs', 'scale', 'update'],
					},
				},
				default: '',
				description: 'O ID do service Docker Swarm',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'Secret ID',
				name: 'secretId',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				displayOptions: {
					show: {
						resource: ['secrets'],
						operation: ['get', 'delete', 'inspect'],
					},
				},
				default: '',
				description: 'O ID do secret Docker Swarm',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'Config ID',
				name: 'configId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['configs'],
						operation: ['get', 'delete', 'inspect'],
					},
				},
				default: '',
				description: 'O ID do config Docker Swarm',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'Node ID',
				name: 'nodeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['nodes'],
						operation: ['get', 'inspect', 'update'],
					},
				},
				default: '',
				description: 'O ID do node Docker Swarm',
				placeholder: 'abc123def456',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['templates'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'O ID do template',
				placeholder: '1',
			},
			{
				displayName: 'Registry ID',
				name: 'registryId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['registries'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'O ID do registry',
				placeholder: '1',
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['teams'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'O ID da equipe',
				placeholder: '1',
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhooks'],
						operation: ['delete'],
					},
				},
				default: '',
				description: 'O ID do webhook',
				placeholder: '1',
			},

			// ===========================================
			// ADDITIONAL OPTIONS
			// ===========================================
			{
				displayName: 'Include All',
				name: 'includeAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['getMany'],
					},
				},
				default: true,
				description: 'Whether to include stopped containers in the listing',
			},
			{
				displayName: 'Force Delete',
				name: 'forceDelete',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['delete'],
					},
				},
				default: false,
				description: 'Whether to force deletion even if the resource is in use',
			},
			{
				displayName: 'Remove Volumes',
				name: 'removeVolumes',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['delete'],
					},
				},
				default: false,
				description: 'Whether to remove associated volumes when deleting container',
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['restart', 'stop'],
					},
				},
				default: 10,
				description: 'Number of seconds to wait before forcefully stopping',
			},

			// ===========================================
			// CONTAINER CREATION PARAMETERS
			// ===========================================
			{
				displayName: 'Container Name',
				name: 'containerName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do container',
			},
			{
				displayName: 'Image',
				name: 'image',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['containers', 'services'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Imagem Docker a ser usada',
				placeholder: 'nginx:latest',
			},
			{
				displayName: 'Command',
				name: 'command',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Comando a ser executado no container',
			},
			{
				displayName: 'Environment Variables',
				name: 'environmentVariables',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['containers', 'services'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						name: 'envVar',
						displayName: 'Environment Variable',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Nome da variável',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Valor da variável',
							},
						],
					},
				],
			},
			{
				displayName: 'Exposed Ports',
				name: 'exposedPorts',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Portas expostas (separadas por vírgula)',
				placeholder: '80,443',
			},
			{
				displayName: 'Port Bindings',
				name: 'portBindings',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Mapeamento de portas no formato container:host',
				placeholder: '80:8080,443:8443',
			},
			{
				displayName: 'Restart Policy',
				name: 'restartPolicy',
				type: 'options',
				options: [
					{ name: 'No', value: 'no' },
					{ name: 'Always', value: 'always' },
					{ name: 'Unless Stopped', value: 'unless-stopped' },
					{ name: 'On Failure', value: 'on-failure' },
				],
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['create'],
					},
				},
				default: 'no',
				description: 'Política de reinicialização',
			},

			// ===========================================
			// EXEC COMMAND PARAMETERS
			// ===========================================
			{
				displayName: 'Exec Command',
				name: 'execCommand',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['exec'],
					},
				},
				default: '/bin/sh',
				description: 'Comando a ser executado no container',
			},
			{
				displayName: 'TTY',
				name: 'tty',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['containers'],
						operation: ['exec'],
					},
				},
				default: false,
				description: 'Whether to allocate a pseudo-TTY',
			},

			// ===========================================
			// LOGS PARAMETERS
			// ===========================================
			{
				displayName: 'Include Stdout',
				name: 'includeStdout',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['containers', 'services'],
						operation: ['getLogs'],
					},
				},
				default: true,
				description: 'Whether to include stdout in logs',
			},
			{
				displayName: 'Include Stderr',
				name: 'includeStderr',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['containers', 'services'],
						operation: ['getLogs'],
					},
				},
				default: true,
				description: 'Whether to include stderr in logs',
			},
			{
				displayName: 'Tail Lines',
				name: 'tailLines',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['containers', 'services'],
						operation: ['getLogs'],
					},
				},
				default: 'all',
				description: 'Número de linhas do final (ou "all")',
			},
			{
				displayName: 'Timestamps',
				name: 'timestamps',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['containers', 'services'],
						operation: ['getLogs'],
					},
				},
				default: false,
				description: 'Whether to show timestamps in logs',
			},

			// ===========================================
			// IMAGE PARAMETERS
			// ===========================================
			{
				displayName: 'Image Tag',
				name: 'imageTag',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['images'],
						operation: ['build', 'pull', 'push'],
					},
				},
				default: 'latest',
				description: 'Tag da imagem',
			},
			{
				displayName: 'Image Name',
				name: 'imageName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['images'],
						operation: ['pull'],
					},
				},
				default: '',
				description: 'Nome da imagem para pull',
				placeholder: 'nginx',
			},
			{
				displayName: 'Repository',
				name: 'repository',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['images'],
						operation: ['tag'],
					},
				},
				default: '',
				description: 'Nome do repositório',
			},
			{
				displayName: 'New Tag',
				name: 'newTag',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['images'],
						operation: ['tag'],
					},
				},
				default: '',
				description: 'Nova tag para a imagem',
			},

			// ===========================================
			// SERVICE PARAMETERS
			// ===========================================
			{
				displayName: 'Service Name',
				name: 'serviceName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['services'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do service',
			},
			{
				displayName: 'Replicas',
				name: 'replicas',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['services'],
						operation: ['create', 'scale'],
					},
				},
				default: 1,
				description: 'Número de réplicas',
			},
			{
				displayName: 'Version',
				name: 'version',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['services', 'nodes'],
						operation: ['scale', 'update'],
					},
				},
				default: 0,
				description: 'Versão do objeto para atualização',
			},

			// ===========================================
			// SECRET AND CONFIG PARAMETERS
			// ===========================================
			{
				displayName: 'Secret Name',
				name: 'secretName',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				displayOptions: {
					show: {
						resource: ['secrets'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do secret',
			},
			{
				displayName: 'Secret Data',
				name: 'secretData',
				type: 'string',
				typeOptions: {
					rows: 4,
					password: true,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['secrets'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Dados do secret',
			},
			{
				displayName: 'Config Name',
				name: 'configName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['configs'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do config',
			},
			{
				displayName: 'Config Data',
				name: 'configData',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['configs'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Dados do config',
			},

			// ===========================================
			// REGISTRY PARAMETERS
			// ===========================================
			{
				displayName: 'Registry Name',
				name: 'registryName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['registries'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Nome do registry',
			},
			{
				displayName: 'Registry URL',
				name: 'registryUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['registries'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'URL do registry',
			},
			{
				displayName: 'Registry Type',
				name: 'registryType',
				type: 'options',
				options: [
					{ name: 'Quay.io', value: '1' },
					{ name: 'Azure', value: '2' },
					{ name: 'Custom', value: '3' },
					{ name: 'Gitlab', value: '4' },
					{ name: 'ProGet', value: '5' },
					{ name: 'DockerHub', value: '6' },
					{ name: 'ECR', value: '7' },
				],
				displayOptions: {
					show: {
						resource: ['registries'],
						operation: ['create'],
					},
				},
				default: '3',
				description: 'Tipo do registry',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['registries'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Nome de usuário',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						resource: ['registries'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Senha',
			},

			// ===========================================
			// TEAM PARAMETERS
			// ===========================================
			{
				displayName: 'Team Name',
				name: 'teamName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['teams'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Nome da equipe',
			},

			// ===========================================
			// EDGE GROUP PARAMETERS
			// ===========================================
			{
				displayName: 'Edge Group ID',
				name: 'edgeGroupId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['edgeGroups'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'ID do grupo de edge computing',
			},
			{
				displayName: 'Edge Group Name',
				name: 'edgeGroupName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['edgeGroups'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Nome do grupo de edge computing',
			},
			{
				displayName: 'Is Dynamic',
				name: 'isDynamic',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['edgeGroups'],
						operation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Whether o grupo é dinâmico (baseado em tags)',
			},
			{
				displayName: 'Tag IDs',
				name: 'tagIds',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['edgeGroups'],
						operation: ['create', 'update'],
						isDynamic: [true],
					},
				},
				default: '',
				description: 'IDs das tags para grupo dinâmico (separados por vírgula)',
				placeholder: '1,2,3',
			},
			{
				displayName: 'Endpoint IDs',
				name: 'endpointIds',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['edgeGroups'],
						operation: ['create', 'update'],
						isDynamic: [false],
					},
				},
				default: '',
				description: 'IDs dos endpoints para grupo estático (separados por vírgula)',
				placeholder: '1,2,3',
			},

			// ===========================================
			// EDGE STACK PARAMETERS
			// ===========================================
			{
				displayName: 'Edge Stack ID',
				name: 'edgeStackId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['get', 'delete', 'update', 'getStatus'],
					},
				},
				default: '',
				description: 'ID do stack de edge computing',
			},
			{
				displayName: 'Edge Stack Name',
				name: 'edgeStackName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do stack de edge computing',
			},
			{
				displayName: 'Edge Group IDs',
				name: 'edgeGroupIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'IDs dos grupos de edge onde o stack será deployado (separados por vírgula)',
				placeholder: '1,2,3',
			},
			{
				displayName: 'Deployment Type',
				name: 'deploymentType',
				type: 'options',
				options: [
					{ name: 'Docker Compose', value: '0' },
					{ name: 'Docker Swarm', value: '1' },
					{ name: 'Kubernetes', value: '2' },
				],
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create'],
					},
				},
				default: '0',
				description: 'Tipo de deployment',
			},
			{
				displayName: 'Pre Pull Image',
				name: 'prePullImage',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Whether fazer pre-pull das imagens antes do deployment',
			},
			{
				displayName: 'Retry Deploy',
				name: 'retryDeploy',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Whether retentar deployment em caso de falha',
			},
			{
				displayName: 'Stack File Content',
				name: 'stackFileContent',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Conteúdo do arquivo docker-compose.yml ou stack file',
				placeholder: 'version: "3.8"\nservices:\n  web:\n    image: nginx:latest',
			},
			{
				displayName: 'Environment Variables',
				name: 'environmentVariables',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['edgeStacks'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						name: 'envVar',
						displayName: 'Environment Variable',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Nome da variável de ambiente',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Valor da variável de ambiente',
							},
						],
					},
				],
				description: 'Variáveis de ambiente para o edge stack',
			},

			// ===========================================
			// WEBHOOK PARAMETERS
			{
				displayName: 'Resource ID',
				name: 'resourceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhooks'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'ID do recurso',
			},
			{
				displayName: 'Webhook Type',
				name: 'webhookType',
				type: 'options',
				options: [
					{ name: 'Service', value: '1' },
					{ name: 'Stack', value: '2' },
				],
				displayOptions: {
					show: {
						resource: ['webhooks'],
						operation: ['create'],
					},
				},
				default: '2',
				description: 'Tipo do webhook',
			},

			// ===========================================
			// STACK UPDATE PARAMETERS
			// ===========================================
			{
				displayName: 'Stack File Content',
				name: 'stackFileContent',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				displayOptions: {
					show: {
						resource: ['stacks'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'O conteúdo do arquivo docker-compose.yml ou stack file',
				placeholder: 'version: "3.8"\nservices:\n  web:\n    image: nginx:latest',
			},
			{
				displayName: 'Environment Variables',
				name: 'env',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['stacks'],
						operation: ['update'],
					},
				},
				default: {},
				options: [
					{
						name: 'envVar',
						displayName: 'Environment Variable',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Nome da variável de ambiente',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Valor da variável de ambiente',
							},
						],
					},
				],
				description: 'Variáveis de ambiente para o stack',
			},
			{
				displayName: 'Prune Services',
				name: 'prune',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['stacks'],
						operation: ['update'],
					},
				},
				default: false,
				description: 'Whether to prune services that are no longer referenced',
			},
		],
	};
} 