import { EquipmentsService } from '@/serviceLayer/equipments.service';
import * as fs from 'fs';

const DEFAULT = "-"

interface Equipment {
    name: string;
    description: string;
    marketPrice: string;
    craftingCreditCost: string;
    craftingRessources: string;
    timeInMinutes: string;
    timeInDowntime: string;
    maxPerDowntime: string;
}

interface CategoryObject {
    [category: string]: Equipment[];
}

export interface TransformedEquipment {
    name: string;
    description: string;
    marketPrice: string;
    craftingCreditCost: string;
    craftingRessources: string;
    timeInMinutes: string;
    timeInDowntime: string;
    maxPerDowntime: string;
    category: string;
}

export async function seedEquipmentsToDb(filePath: string, equipmentService: EquipmentsService): Promise<void> {
    try {
        // Read the JSON file
        const jsonString: string = fs.readFileSync(filePath, 'utf-8');
        const categories: CategoryObject = JSON.parse(jsonString);

        // Array to hold transformed equipment
        const transformedEquipment: TransformedEquipment[] = [];

        // Iterate through categories and their equipment
        for (const category in categories) {
            if (categories.hasOwnProperty(category)) {
                const equipmentList: Equipment[] = categories[category];
                // Transform each equipment object
                equipmentList.forEach(async (equipment: Equipment) => {
                    const modifiedEquipment: TransformedEquipment = {
                        name: equipment.name ? equipment.name : DEFAULT,
                        description: equipment.description ? equipment.description : DEFAULT,
                        marketPrice: equipment.marketPrice ? equipment.marketPrice : DEFAULT,
                        craftingCreditCost: equipment.craftingCreditCost ? equipment.craftingCreditCost : DEFAULT,
                        craftingRessources: equipment.craftingRessources ? equipment.craftingRessources : DEFAULT,
                        timeInMinutes: equipment.timeInMinutes ? equipment.timeInMinutes : DEFAULT,
                        timeInDowntime: equipment.timeInDowntime ? equipment.timeInDowntime : DEFAULT,
                        maxPerDowntime: equipment.maxPerDowntime ? equipment.maxPerDowntime : DEFAULT,
                        category: category
                    }
                    transformedEquipment.push(modifiedEquipment)
                    await equipmentService.create(modifiedEquipment);
                });
            }
        }

        console.log(transformedEquipment);
    } catch (error) {
        console.error('Error reading or transforming JSON file:', error);
    }
}