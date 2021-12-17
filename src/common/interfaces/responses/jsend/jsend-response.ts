/**
 * Generic JSend Response
 * https://github.com/omniti-labs/jsend
 */
export interface JSendResponse<T> {
  /**
   * success:	All went well, and (usually) some data was returned.
   * fail: There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
   * error: An error occurred in processing the request, i.e. an exception was thrown
   */
  status: 'success' | 'fail' | 'error'

  /**
   * Acts as the wrapper for any data returned by the API call. If the call returns no data, data should be set to null.
   */
  data: T

  /**
   * Only for error
   */
  code: string | undefined

  /**
   * Only for error
   */
  message: string | undefined
}
