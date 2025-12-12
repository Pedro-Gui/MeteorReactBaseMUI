// region Imports
import { Recurso } from '../config/recursos';
import { taskSch, ITask } from './taskSch';
import { userprofileServerApi } from '../../userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { Meteor } from 'meteor/meteor';

// endregion

class TaskServerApi extends ProductServerBase<ITask> {
	constructor() {
		super('task', taskSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});
		
		
		const self = this;
		
		this.addTransformedPublication(
			'5FirstTaskList',
			
			(filter = {}) => {
				const userId = Meteor.userId(); // this.userId não existe neste escopo ?
				
				filter = {
					$and: [
						filter,
						{$or: [
							{ ownerId: userId },
							{ isPrivate: false }
						]}
					]
				}

				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, description: 1, owner: 1, ownerId: 1, isPrivate: 1, typeMulti: 1, createdat: 1 },
					limit: 5,
					sort: { createdat: -1 }
				});
			},
			async (doc: ITask & { nomeUsuario: string }) => {
				const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addTransformedPublication(
			'taskList',
			(filter = {}) => {
				const userId = Meteor.userId();
				
				filter = {
					$and: [
						filter,
						{$or: [
							{ ownerId: userId },
							{ isPrivate: false }
						]}
					]
				}

				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, description: 1, owner: 1, ownerId: 1, isPrivate: 1, typeMulti: 1, createdat: 1 }
				});
			},
			async (doc: ITask & { nomeUsuario: string }) => {
				const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addPublication('taskDetail', (filter = {}) => {
			
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					contacts: 1,
					title: 1,
					description: 1,
					type: 1,
					typeMulti: 1,
					date: 1,
					files: 1,
					chip: 1,
					statusRadio: 1,
					statusToggle: 1,
					slider: 1,
					check: 1,
					address: 1,
					owner: 1,
					ownerId: 1,
					isPrivate: 1
				}
			});
		});

		// 	this.addRestEndpoint(
		// 		'view',
		// 		(params, options) => {
		// 			console.log('Params', params);
		// 			console.log('options.headers', options.headers);
		// 			return { status: 'ok' };
		// 		},
		// 		['post']
		// 	);

		// 	this.addRestEndpoint(
		// 		'view/:exampleId',
		// 		(params, _options) => {
		// 			console.log('Rest', params);
		// 			if (params.exampleId) {
		// 				return self
		// 					.defaultCollectionPublication(
		// 						{
		// 							_id: params.exampleId
		// 						},
		// 						{}
		// 					)
		// 					.fetch();
		// 			} else {
		// 				return { ...params };
		// 			}
		// 		},
		// 		['get']
		// 	);
		// }
	}
}

export const taskServerApi = new TaskServerApi();
