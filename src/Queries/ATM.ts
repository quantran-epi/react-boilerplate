import { IUpdateATMCycleMakerSearchViewModel } from "@modules/ATM/ViewModels/UpdateATMCycleMakerSearchViewModel";

const ATMKeys = {
    All: () => ['atm'],
    ATMCycle: {
        Search: (searchViewModel: IUpdateATMCycleMakerSearchViewModel) => [...ATMKeys.All(), 'Search', searchViewModel],
    }
}

export default ATMKeys;