import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

export const taskSch: ISchema<ITask> = {
	image: {
		type: String,
		label: 'Imagem',
		defaultValue: '',
		optional: true,
		isImage: true,
		defaultSize: {
			width: 300,
			height: 300
		}
	},
	title: {
		type: String,
		label: 'Nome',
		defaultValue: '',
		optional: false
	},
	description: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: false
	},

	type: {
		type: String,
		label: 'Status',
		defaultValue: 'naoConcluido',
		optional: false,
		options: () => [
			{ value: 'concluido', label: 'Concluído' },
			{ value: 'andamento', label: 'Em andamento' },
			{ value: 'naoConcluido', label: 'Não concluído' }
		]
	},
	typeMulti: {
		type: String,
		label: 'Prioridade',
		optional: true,
		options: () => [
			{ value: 'alta', label: 'Alta' },
			{ value: 'media', label: 'Média' },
			{ value: 'baixa', label: 'Baixa' }
		]
	},
	date: {
		type: Date,
		label: 'Data de fabricação',
		defaultValue: '',
		optional: true
	},
	files: {
		type: [Object],
		label: 'Anexos',
		defaultValue: '',
		optional: true,
		isUpload: true
	},

	tasks: {
		type: [Object],
		label: 'Tarefas',
		defaultValue: '',
		optional: true,
		subSchema: {
			name: {
				type: String,
				label: 'Nome da Tarefa',
				defaultValue: '',
				optional: true
			},
			description: {
				type: String,
				label: 'Descrição da Tarefa',
				defaultValue: '',
				optional: true
			}
		}
	},

	statusRadio: {
		type: String,
		label: 'Prioridade',
		defaultValue: '',
		optional: true,
		radiosList: ['Baixa', 'Média', 'Alta']
	},

	owner: {
		type: String,
		label: 'Owner',
		optional: true, 
	},
	ownerId: {
		type: String,
		label: 'Owner ID',
		optional: true, 
	},
	isPrivate: {
		type: Boolean,
		label: 'Privacidade',
		optional: true,
		defaultValue: false,
		valueLabelTrue: 'Privado',
		valueLabelFalse: 'Público',
	}
	
};

export interface ITask extends IDoc {
	image: string;
	owner: string;
	ownerId: string;
	isPrivate: boolean;
	title: string;
	description: string;
	check: Array<string>;
	type: string;
	typeMulti: string;
	date: Date;
	files: object[];
	tasks: object[];
	statusRadio: string;
	
}
