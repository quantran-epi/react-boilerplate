const ATMRoutes = {
    Root: '/atm',
    UpdateATMCycleMaker: () => ATMRoutes.Root.concat('/updateAtmCycleMaker'),
    UpdateATMCycleListChecker: () => ATMRoutes.Root.concat('/updateAtmCycleChecker'),
    UpdateATMCycleDetailChecker: (id: number) => ATMRoutes.UpdateATMCycleListChecker().concat('/' + id.toString())
}

export default ATMRoutes