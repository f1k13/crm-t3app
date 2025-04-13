import { asc, count, desc, eq, ilike, inArray, or } from "drizzle-orm";

import { SORTABLE_FIELDS } from "~/server/consts/user";
import type {
  TCreateUserInput,
  TEditUserInput,
  TGetAllUserInput,
} from "../../dto/user/user.dto";
import { userSchema } from "~/server/db/schemas/user.schema";
import type { TDrizzleDatabase } from "../repository";

export const userRepository = {
  async findByLogin(db: TDrizzleDatabase, login: string) {
    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.login, login));
    return user;
  },

  async findById(db: TDrizzleDatabase, id: string) {
    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.id, id));
    return user;
  },

  async createUser(
    db: TDrizzleDatabase,
    data: TCreateUserInput & { password: string },
  ) {
    const [user] = await db.insert(userSchema).values(data).returning();
    return user;
  },

  async updateUser(
    db: TDrizzleDatabase,
    id: string,
    data: Omit<TEditUserInput, "id">,
  ) {
    const [user] = await db
      .update(userSchema)
      .set(data)
      .where(eq(userSchema.id, id))
      .returning();
    return user;
  },

  async setConfirmed(db: TDrizzleDatabase, id: string, confirm: boolean) {
    return db
      .update(userSchema)
      .set({ isConfirmed: confirm })
      .where(eq(userSchema.id, id));
  },

  async deleteUsers(db: TDrizzleDatabase, userIds: string[]) {
    return db.delete(userSchema).where(inArray(userSchema.id, userIds));
  },

  async getAll(db: TDrizzleDatabase, input: TGetAllUserInput) {
    const { filter, sort, page, limit } = input;
    const offset = (page - 1) * limit;
    const whereClause = filter?.query
      ? or(
          ilike(userSchema.email, `%${filter.query}%`),
          ilike(userSchema.firstName, `%${filter.query}%`),
        )
      : undefined;

    const orderClause = sort
      ? sort.order === "asc"
        ? asc(SORTABLE_FIELDS[sort.field as keyof typeof SORTABLE_FIELDS])
        : desc(SORTABLE_FIELDS[sort.field as keyof typeof SORTABLE_FIELDS])
      : undefined;

    const data = await db
      .select()
      .from(userSchema)
      .where(whereClause)
      .orderBy(orderClause!)
      .limit(limit)
      .offset(offset);
    const totalCount = Number(
      (await db.select({ count: count() }).from(userSchema))?.[0]?.count ?? 0,
    );

    const filteredCount = Number(
      (
        await db.select({ count: count() }).from(userSchema).where(whereClause)
      )?.[0]?.count ?? 0,
    );

    return {
      data,
      totalCount,
      filteredCount,
    };
  },
  async updatePassword(db: TDrizzleDatabase, password: string, id: string) {
    await db.update(userSchema).set({ password }).where(eq(userSchema.id, id));
  },
};
