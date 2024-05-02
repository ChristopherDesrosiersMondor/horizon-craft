const UNDEFINED = "undefined"

export function convertNameToDbSafe(name: string): string {
    const nameLower = name.toLowerCase().trim().replace(/ /g, '')
    
    switch (nameLower) {
        case "nom":
            return "name"

        case "description&effet":
        case "descriptioneteffet":
        case "description&effet":
        case "descriptioneteffets":
            return "description"

        case "prixdumarché":
            return "marketPrice"

        case "fabrication:crédits":
            return "craftingCreditCost"

        case "fabrication:ressources":
            return "craftingRessources"

        case "temps(minutes)":
            return "timeInMinutes"

        case "temps(downtime)":
            return "timeInDowntime"

        case "maxpardowntime":
            return "maxPerDowntime"
    
        default:
            break;
    }

    return UNDEFINED
}

export { UNDEFINED }