export class LateCheckInValidationError extends Error {
  constructor() {
    super('hte check-in ca only be validated until 20 minutes of its creation.')
  }
}
