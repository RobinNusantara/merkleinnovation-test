/**
 * @typedef {"post" | "get" | "put" | "patch" | "delete"} IHttpMethod
 */

const HttpMethod = Object.freeze({
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Patch: "PATCH",
    Delete: "DELETE",
});

module.exports = { HttpMethod };