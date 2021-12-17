/**
 * ## Generic JSend Error Response
 *
 * When an API call fails due to an error on the server. For example:
 * #### GET /posts.json: ####
 * ```
 * {
 *     "status" : "error",
 *     "message" : "Unable to communicate with database"
 * }
 * ```
 * Required keys:
 * * status: Should always be set to "error".
 * * message: A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.
 *
 * Optional keys:
 * * code: A numeric code corresponding to the error, if applicable
 * * data: A generic container for any other information about the error, i.e. the conditions that caused the error, stack traces, etc.
 */
export interface JSendErrorResponse {
  /**
   * Should always be set to "error"
   */
  status: 'error'

  /**
   * A meaningful, end-user-readable (or at the least log-worthy) message, explaining what went wrong.
   */
  message: string

  /**
   * A numeric code corresponding to the error, if applicable
   */
  code?: number

  /**
   * A generic container for any other information about the error, i.e. the conditions that caused the error, stack traces, etc.
   */
  data?: any
}
