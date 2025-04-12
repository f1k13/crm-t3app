import { users } from "~/server/db/schemas/user.schema";

import { asc, count, desc, eq, ilike, inArray, or } from "drizzle-orm";

import { SORTABLE_FIELDS } from "~/server/consts/user";
import type { TContext } from "../../trpc";
import type {
  TCreateUserInput,
  TEditUserInput,
  TGetAllUserInput,
  TUserResetPassword,
} from "../../dto/user/user.dto";

type TDrizzleDatabase = TContext["db"];

export const userRepository = {
  async findByLogin(db: TDrizzleDatabase, login: string) {
    const [user] = await db.select().from(users).where(eq(users.login, login));
    return user;
  },

  async findById(db: TDrizzleDatabase, id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async createUser(
    db: TDrizzleDatabase,
    data: TCreateUserInput & { password: string },
  ) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },

  async updateUser(
    db: TDrizzleDatabase,
    id: string,
    data: Omit<TEditUserInput, "id">,
  ) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  },

  async setConfirmed(db: TDrizzleDatabase, id: string, confirm: boolean) {
    return db
      .update(users)
      .set({ isConfirmed: confirm })
      .where(eq(users.id, id));
  },

  async deleteUsers(db: TDrizzleDatabase, userIds: string[]) {
    return db.delete(users).where(inArray(users.id, userIds));
  },

  async getAll(db: TDrizzleDatabase, input: TGetAllUserInput) {
    const { filter, sort, page, limit } = input;
    const offset = (page - 1) * limit;

    const whereClause = filter?.query
      ? or(
          ilike(users.email, `%${filter.query}%`),
          ilike(users.firstName, `%${filter.query}%`),
        )
      : undefined;

    const orderClause = sort
      ? sort.order === "asc"
        ? asc(SORTABLE_FIELDS[sort.field as keyof typeof SORTABLE_FIELDS])
        : desc(SORTABLE_FIELDS[sort.field as keyof typeof SORTABLE_FIELDS])
      : undefined;

    const data = await db
      .select()
      .from(users)
      .where(whereClause)
      .orderBy(orderClause!)
      .limit(limit)
      .offset(offset);

    const totalCount = Number(
      (await db.select({ count: count() }).from(users))?.[0]?.count ?? 0,
    );

    const filteredCount = Number(
      (await db.select({ count: count() }).from(users).where(whereClause))?.[0]
        ?.count ?? 0,
    );

    return {
      data,
      totalCount,
      filteredCount,
    };
  },
  async updatePassword(db: TDrizzleDatabase, password: string, id: string) {
    await db.update(users).set({ password }).where(eq(users.id, id));
  },
};
