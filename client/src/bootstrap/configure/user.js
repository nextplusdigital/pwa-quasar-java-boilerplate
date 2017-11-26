/**
 * @param {Object} user
 * @returns {*}
 */
export default (user) => {
  /*
   * Configure the property permissions to access control
   * Example:
   * permissions: {
   *   namespaces: {
   *     permission: [1 to 4]
   *   }
   * }
   */
  /* delete user.permissions['admin.organization'] */
  return user
}
