import { Elysia } from 'elysia'

export const myPlugin = () =>
	new Elysia({
		name: '$PROJECT_NAME$'
	}).derive({ as: 'global' }, () => {
		const contextApi = {
			getProjectName() {
				return '$PROJECT_NAME$'
			}
		}

		return contextApi
	})
