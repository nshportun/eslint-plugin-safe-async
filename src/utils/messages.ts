export const messages = {
  noFloatingAsyncCalls: {
    ignored: 'Promise-returning call is not awaited, returned, or explicitly handled.',
  },
  noAwaitInLoopWhenBatchable: {
    serial: 'Awaiting inside a loop may be avoidable with Promise.all() or similar batching.',
  },
  noEmptyCatchInAsync: {
    empty: 'Empty catch block swallows async errors. Add logging, rethrow, or an explicit marker comment.',
  },
  requireAwaitInsideTry: {
    missingTry: 'Consider wrapping awaited operations in a try/catch for local error handling.',
  },
  preferAbortsignalInFetchLikeApis: {
    missing: 'Consider adding an AbortSignal option for better cancellation control.',
  },
};
