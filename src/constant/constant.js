const DEV_URL = `http://localhost:5000/`;
// const PROD_URL = `https://back-end-fashion-web-app-server.vercel.app/`;

export const BASIC_URL = DEV_URL;
// export const BASIC_URL = PROD_URL

export const ApiRoutes = {
  login: BASIC_URL + `user/login`,
  register: BASIC_URL + `user/register`,
  verifyEmail: BASIC_URL + `user/verifyemail`,
  forgotPassword: BASIC_URL + `user/requestPasswordReset`,
  forgotPasswordSent: BASIC_URL + `user/resetPassword`,
  accountUpdate: BASIC_URL + `user/updateAccount`,

  addedService: BASIC_URL + `service/addService`,
  getService: BASIC_URL + `service/fetchService`,
  getOneService: BASIC_URL + `service/fetchOneService`,
  editService: BASIC_URL + `service/editService`,
  deleteService: BASIC_URL + `service/deleteService`,

  userAddService: BASIC_URL + `user-service/userAddService`,
  userGetService: BASIC_URL + `user-service/eachUserServices`,
  userFetchAllService: BASIC_URL + `user-service/userAllServices`,
  adminUpdateService: BASIC_URL + `user-service/updateService`,

  addedBlog: BASIC_URL + `blogs/addBlog`,
  getBlog: BASIC_URL + `blogs/fetch3blog`,
  getOneBlog: BASIC_URL + `blogs/fetchOneBlog`,
  editBlog: BASIC_URL + `blogs/editBlog`,
  deleteBlog: BASIC_URL + `blogs/deleteBlog`,

  addReview: BASIC_URL + `user-review/addReview`,
  getReview: BASIC_URL + `user-review/getReview`,

  addContact: BASIC_URL + `contact-us/addContact`,
  getContact: BASIC_URL + `contact-us/getContacts`,
};
