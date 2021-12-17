/**
 * Generic JSend Fail Response
 * When an API call is rejected due to invalid data or call conditions, the JSend object's data key contains an object explaining what went wrong, typically a hash of validation errors. For example:
 * #### POST /posts.json (with data body: "Trying to creating a blog post"): ####
 * ```
 * {
 *     "status" : "fail",
 *     "data" : { "title" : "A title is required" }
 * }
 * ```
 * Required keys:
 *
 * * status: Should always be set to "fail".
 * * data: Provides the wrapper for the details of why the request failed. If the reasons for failure correspond to POST values, the response object's keys SHOULD correspond to those POST values.
 */
export interface JSendFailResponse<T> {
  /**
   * Should always be set to "fail".
   */
  status: 'fail'

  /**
   * Provides the wrapper for the details of why the request failed.
   * If the reasons for failure correspond to POST values, the response object's keys SHOULD correspond to those POST values.
   */
  data: T
}
