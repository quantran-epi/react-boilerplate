const ATMRoutes = {
    Root: '/atm',
    UpdateATMCycle: () => ATMRoutes.Root.concat('/updateAtmCycle'),
}

export default ATMRoutes