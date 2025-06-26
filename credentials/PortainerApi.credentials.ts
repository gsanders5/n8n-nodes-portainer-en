import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PortainerApi implements ICredentialType {
	name = 'portainerApi';
	displayName = 'Portainer API';
	documentationUrl = 'https://docs.portainer.io/api/access';
	properties: INodeProperties[] = [
		{
			displayName: 'Portainer URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
			description: 'URL do seu servidor Portainer (ex: https://portainer.exemplo.com:9443)',
			placeholder: 'https://portainer.exemplo.com:9443',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Sua Chave de API do Portainer. Obtenha em Configurações > Tokens de Acesso na sua conta Portainer.',
			placeholder: 'ptr_xxxxxxxxxxxxxxxxxxxxxxxx',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/users/me',
			method: 'GET',
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'Id',
					value: undefined,
					message: 'Chave de API inválida ou servidor inacessível. Verifique a URL e a chave de API.',
				},
			},
		],
	};
} 