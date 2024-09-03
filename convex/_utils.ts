import { QueryCtx, MutationCtx } from "./_generated/server";

// export const getUserDataById = async ({
//   ctx,
//   clerkId,
// }: {
//   ctx: QueryCtx | MutationCtx;
//   clerkId: string;
// }) =>
//   ctx.db
//     .query("users")
//     .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
//     .unique();

export const getUserDataById = async ({
  ctx,
  clerkId,
}: {
  ctx: QueryCtx | MutationCtx;
  clerkId: string;
}) => {
  // Buat kueri untuk mendapatkan semua dokumen yang cocok dengan clerkId
  const query = ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .order("desc"); // Urutkan berdasarkan _creationTime secara menurun

  // Ambil entri pertama (terbaru) dari hasil kueri
  const latestEntry = await query.first();

  return latestEntry;
};
