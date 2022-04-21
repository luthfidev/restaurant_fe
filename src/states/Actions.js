import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-semantic-toasts";

const cookies = new Cookies();

const actions = {
  setStateObject: (store, object) => {
    store.setState(object);
  },

  setState: (store, name, value) => {
    store.setState({ [name]: value });
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
      toast({
        type: "warning",
        icon: "exclamation",
        title: "Warning",
        description:
          JSON.stringify(error.response.data.message),
        animation: "bounce",
        time: 5000,
      });
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
      toast({
        type: "warning",
        icon: "exclamation",
        title: "Warning",
        description:
          JSON.stringify(error.response.data.message),
        animation: "bounce",
        time: 5000,
      });
      throw new Error(error);
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
      toast({
        type: "warning",
        icon: "exclamation",
        title: "Warning",
        description:
          JSON.stringify(error.response.data.message),
        animation: "bounce",
        time: 5000,
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
      toast({
        type: "warning",
        icon: "exclamation",
        title: "Warning",
        description:
          JSON.stringify(error.response.data.message),
        animation: "bounce",
        time: 5000,
      });
      throw new Error(error);
    }
  },
};

export default actions;
