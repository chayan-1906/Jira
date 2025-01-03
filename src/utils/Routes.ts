const Routes = {
    signInPath: '/sign-in',
    signUpPath: '/sign-up',

    homePath: '/',

    createWorkspacePath: '/workspaces/create',
    workspaceIdPath: (workspaceId: string) => `/workspaces/${workspaceId}`,
    projectIdPath: (workspaceId: string, projectId: string) => `/workspaces/${workspaceId}/projects/${projectId}`,
    projectSettingsPath: (workspaceId: string, projectId: string) => `/workspaces/${workspaceId}/projects/${projectId}/settings`,
    // taskIdPath: (workspaceId: string, projectId: string, taskId: string) => `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,

    tasksPath: (workspaceId: string) => `/workspaces/${workspaceId}/tasks`,
    taskPath: (workspaceId: string, taskId: string) => `/workspaces/${workspaceId}/tasks/${taskId}`,

    settingsPath: (workspaceId: string) => `/workspaces/${workspaceId}/settings`,

    membersPath: (workspaceId: string) => `/workspaces/${workspaceId}/members`,

    /** external urls */
    privacy: '/privacy',
    terms: '/terms',
}

export default Routes;
