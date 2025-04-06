import EventEmitter, { on } from "events";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { tracked } from "@trpc/server";

const ee = new EventEmitter();

const onIncomingCall = protectedProcedure
  .input(z.object({ lastEventId: z.string().nullish() }))
  .subscription(async function* (opts) {
    for await (const [data] of on(ee, "incoming-call", {
      signal: opts.signal,
    })) {
      const callData = data as { caller: string; callId: string };
      yield tracked(callData.callId, callData);
    }
  });

const emitIncomingCall = protectedProcedure.mutation(async ({ input }) => {
  ee.emit("incoming-call", input);
});
export const callService = {
  onIncomingCall,
  emitIncomingCall,
};
