import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    clerkId: v.string(),
  },
  async handler(ctx, { clerkId }) {
    // Ambil user yang diurutkan berdasarkan _creationTime secara menurun dan ambil yang terbaru
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .order("desc") // Urutkan berdasarkan _creationTime secara menurun
      .first(); // Ambil entri pertama (terbaru)

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const update = mutation({
  args: {
    clerkId: v.string(),
    status: v.string(),
  },
  async handler(ctx, { clerkId, status }) {
    // Ambil user yang diurutkan berdasarkan _creationTime secara menurun dan ambil yang terbaru
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .order("desc") // Urutkan berdasarkan _creationTime secara menurun
      .first(); // Ambil entri pertama (terbaru)

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Perbarui status
    await ctx.db.patch(user._id, { status });

    return { success: true };
  },
});
