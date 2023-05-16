

export const GetMonth = (numMonth:number):string => {
    switch (numMonth) {
        case 1:
            return "jan"
        case 2:
            return "feb"
        case 3:
            return "mar"
        case 4:
            return "apl"
        case 5:
            return "may"
        case 6:
            return "jun"
        case 7:
            return "jul"
        case 8:
            return "aug"
        case 9:
            return "sep"
        case 10:
            return "oct"
        case 11:
            return "nov"
        case 12:
            return "dcm"
        default:
            return "none"
    }
}