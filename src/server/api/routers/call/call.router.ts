import { callService } from "../../services/call/call.service";
import { createTRPCRouter } from "../../trpc";

export const callRouter = createTRPCRouter({
  onIncomingCall: callService.onIncomingCall,
  emitIncomingCall: callService.emitIncomingCall,
});
