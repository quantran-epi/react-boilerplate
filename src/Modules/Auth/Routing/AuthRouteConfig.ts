const AuthRoutes = {
    Root: '/auth',
    Login: () => AuthRoutes.Root.concat('/login')
}

export default AuthRoutes