import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const actions = {
  setStateObject: (store, object) => {
    store.setState(object);
  },

  setState: (store, name, value) => {
    store.setState({ [name]: value });
  },
  snackBar: (store, message, severity) => {
    store.setState({
      openSnackBar: true,
      snackbarMessage: message,
      snackbarSeverity: severity,
    });
  },
  login: async (store, data) => {
    try {
      let fetch = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        data,
        {}
      );
      return fetch;
    } catch (error) {
      store.setState({});
    }
  },
  register: async (store, url, data) => {
    try {
      let fetch = await axios.post(
        `${process.env.REACT_APP_API_URL}${url}`,
        data
      );
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
      throw new Error(error);
    }
  },
  getData: async (store, tableConfig) => {
    try {
      const { page, limit, columns, url } = tableConfig;
      let urlFix = `${process.env.REACT_APP_API_URL}${url}`;
      let params = {
        page: page,
        limit: limit,
      };
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].filter) {
          params[columns[i].filter.params] = columns[i].filter.value;
        }
      }
      let fetch = axios.get(urlFix, {
        params: params,
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      });
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
    }
  },
  get: async (store, url, params) => {
    try {
      let urlFix = `${process.env.REACT_APP_API_URL}${url}`;
      let fetch = await axios.get(urlFix, {
        params: params,
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      });
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
    }
  },
  post: async (store, url, data) => {
    try {
      let fetch = await axios.post(
        `${process.env.REACT_APP_API_URL}${url}`,
        data,
        {
          headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
        }
      );
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
      throw new Error(error);
    }
  },
  postForm: async (store, url, data) => {
    try {
      let dataSend = Object.keys(data);
      const form = new FormData();
      for (let i = 0; i < dataSend.length; i++) {
        form.append(dataSend[i], data[dataSend[i]]);
      }
      let fetch = await axios.post(
        `${process.env.REACT_APP_API_URL}${url}`,
        form,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        }
      );
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
      throw new Error(error);
    }
  },
  edit: async (store, url, data) => {
    try {
      let fetch = await axios.patch(
        `${process.env.REACT_APP_API_URL}${url}`,
        data,
        {
          headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
        }
      );
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
      throw new Error(error);
    }
  },
  editForm: async (store, url, data) => {
    try {
      let dataSend = Object.keys(data);
      const form = new FormData();
      for (let i = 0; i < dataSend.length; i++) {
        form.append(dataSend[i], data[dataSend[i]]);
      }
      let fetch = await axios.patch(
        `${process.env.REACT_APP_API_URL}${url}`,
        form,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${cookies.get("jwt")}`,
          },
        }
      );
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
      throw new Error(error);
    }
  },
  delete: async (store, url, params) => {
    try {
      let fetch = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, {
        params: params,
        headers: { Authorization: `Bearer ${cookies.get("jwt")}` },
      });
      return fetch;
    } catch (error) {
      store.setState({
        openSnackBar: true,
        snackbarMessage: error.response.data.message,
        snackbarSeverity: "error",
      });
      throw new Error(error);
    }
  },
};

export default actions;
