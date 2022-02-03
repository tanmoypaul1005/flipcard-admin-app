// export const api="http://localhost:5000/api";

export const api="https://flipkartserver.herokuapp.com/api";


export const generatePublicUrl = (fileName) => {
  return `https://flipkartserver.herokuapp.com/api${fileName}`;
};