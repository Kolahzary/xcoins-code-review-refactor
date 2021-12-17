/**
 * Generic JSend Success Response
 * When an API call is successful, the JSend object is used as a simple envelope for the results, using the data key, as in the following:
 * #### GET /posts.json: ####
 * ```
 * {
 *     status : "success",
 *     data : {
 *         "posts" : [
 *             { "id" : 1, "title" : "A blog post", "body" : "Some useful content" },
 *             { "id" : 2, "title" : "Another blog post", "body" : "More content" },
 *         ]
 *      }
 * }
 * ```
 * #### GET /posts/2.json: ####
 * ```
 * {
 *     status : "success",
 *     data : { "post" : { "id" : 2, "title" : "Another blog post", "body" : "More content" }}
 * }
 * ```
 * #### DELETE /posts/2.json: ####
 * ```
 * {
 *     status : "success",
 *     data : null
 * }
 * ```
 * Required keys:
 *
 * * status: Should always be set to "success".
 * * data: Acts as the wrapper for any data returned by the API call. If the call returns no data (as in the last example), data should be set to null.
 */
export interface JSendSuccessResponse<T> {
  /**
   * Should always be success
   */
  status: 'success'

  /**
   * Acts as the wrapper for any data returned by the API call. If the call returns no data, data should be set to null.
   */
  data: T
}
