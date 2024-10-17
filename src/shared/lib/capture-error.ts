import { createEffect } from "effector"

export const captureError = (error: unknown) => {
  const callerFunction = captureError?.caller?.name

  console.log(callerFunction, "-", error)
}

export const captureErrorFx = createEffect((error: unknown) => {
  if (!error) return
  captureError(error)
})
