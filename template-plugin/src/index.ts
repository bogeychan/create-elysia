import { Elysia } from 'elysia'

export const myPlugin = () =>
	new Elysia({
		name: '$PROJECT_NAME$'
	}).derive(() => {
		const contextApi = {
			getProjectName() {
				return '$PROJECT_NAME$'
			}
		}

		return contextApi
	})
