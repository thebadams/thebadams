import { PrismaClient, Prisma, Abilities, ArmorTypes } from '../.prisma/client';
import { readFile } from 'node:fs/promises';
type Armor = {
	type: ArmorTypes;
	baseAC: number;
	atkPenalty: number;
};
type Class = {
	name: string;
	baseHP: number;
	bonuses: Abilities[];
	armors: [Armor, Armor, Armor, Armor];
};
const prisma = new PrismaClient();

//create a type that is a string array

async function readClassData() {
	const classesData = await readFile(`${__dirname}/classes.json`, {
		encoding: 'utf-8',
	});
	const json: Class[] = JSON.parse(classesData);
	return json;
}

async function seedClasses() {
	const json = await readClassData();
	const createClassesData = json.map((j) => {
		return { name: j.name, baseHP: j.baseHP, bonuses: j.bonuses };
	});
	const created = await prisma.class.createMany({ data: createClassesData });
	console.log(created);
}

async function seedArmors() {
	const json = await readClassData();
	const armorsData = json.map((j) => {
		return j.armors;
	});

	const createArmorsData: Prisma.ArmorCreateManyInput[] = armorsData.flat();
	const created = await prisma.armor.createMany({
		data: createArmorsData,
		skipDuplicates: true,
	});
	console.log(created);
}

async function connectClassesToArmors() {
	const classes = await readClassData();
	classes.forEach(async (c) => {
		const updated = await prisma.class.update({
			where: { name: c.name },
			data: {
				armors: {
					connect: c.armors.map((a) => {
						return {
							type_baseAC_atkPenalty: a,
						};
					}),
				},
			},
		});
		console.log(updated);
	});
}

async function main() {
	try {
		await seedClasses();
		await seedArmors();
		await connectClassesToArmors();
		console.log('SUCCESS');
	} catch (e) {
		console.error(e);
	}
}

//main();

//seedClasses().catch((e) => console.error(e));
main();
