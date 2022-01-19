export const env = {
  apiUrl: process.env.REACT_APP_DEV
    ? "http://localhost:4000"
    : (() => {
        if (process.env.REACT_APP_NGROK) {
          return `${process.env.REACT_APP_NGROK}/api`;
        }
        return "CHANGE";
      })(),
};
