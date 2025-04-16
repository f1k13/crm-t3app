import type { TCreateArea } from "../../dto/area/area.dto";
import { areaRepository } from "../../repository/area/area.repository";
import type { TContext } from "../../trpc";

export const areaService = {
  async create(ctx: TContext, dto: TCreateArea) {
    return await areaRepository.create(ctx.db, dto);
  },
  async createMulti(ctx: TContext) {
    const payload = [
      "Доставка",
      "Не профильная организация",
      "Строительство мостов",
      "Строительство дорог",
      "Земляные работы",
      "Прокладка коммуникаций",
      "Коттеджное строительство",
      "Гражданское строительство",
      "Завод по производству",
    ];
    return await areaRepository.createMulti(ctx.db, payload);
  },
  async getAreas(ctx: TContext) {
    return await areaRepository.getAreas(ctx.db);
  },
};
