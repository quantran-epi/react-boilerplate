interface IUseWindowDimension {
    innerWidth: number;
    innerHeight: number;
    availWidth: number;
    availHeight: number;
}

interface IUseWindowDimensionProps {

}

export const useWindowDimension = (props?: IUseWindowDimensionProps): IUseWindowDimension => {
    return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        availHeight: window.screen.availHeight,
        availWidth: window.screen.availWidth
    }
}