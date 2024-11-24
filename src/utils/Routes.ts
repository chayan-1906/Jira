const Routes = {
    signInPath: '/sign-in',
    signUpPath: '/sign-up',

    homePath: '/',

    createWorkspacePath: '/workspaces/create',
    workspaceIdPath: (workspaceId: string) => `/workspaces/${workspaceId}`,

    tasksPath: '/tasks',

    settingsPath: '/settings',

    membersPath: '/members',

    /** external urls */
    privacy: '/privacy',
    terms: '/terms',
}

export default Routes;
