import { areaSchema } from "~/server/db/schemas/area.schema";
import type { TCreateArea, TCreateDefaultArea } from "../../dto/area/area.dto";
import type { TDrizzleDatabase } from "../repository";

export const areaRepository = {
  async create(db: TDrizzleDatabase, dto: TCreateArea) {
    const [area] = await db.insert(areaSchema).values(dto);

    return area;
  },
  async createMulti(db: TDrizzleDatabase, dto: TCreateDefaultArea) {
    const areas = dto.map((name) => ({ name }));
    const area = await db.insert(areaSchema).values(areas);
    return area;
  },
  async getAreas(db: TDrizzleDatabase) {
    return await db.select().from(areaSchema);
  },
};
