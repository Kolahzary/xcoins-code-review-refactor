export interface ValidationError {
  /**
   * Property which rejected in validation check
   */
  property: string

  /**
   * Constraint which caused the validation to be rejected
   */
  constraint: string

  /**
   * Error message
   */
  error: string
}
