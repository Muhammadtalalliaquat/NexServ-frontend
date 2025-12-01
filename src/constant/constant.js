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

  addedService: BASIC_URL + `service/addService`,
  getService: BASIC_URL + `service/fetchService`,
  editService: BASIC_URL + `service/editService`,
  deleteService: BASIC_URL + `service/deleteService`,

  addContact: BASIC_URL + `contact-us/addContact`,
  getContact: BASIC_URL + `contact-us/getContacts`,
};
