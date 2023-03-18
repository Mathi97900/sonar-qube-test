const dev = 'http://localhost:80/swan';
const production = 'https://nest-api-dev.getswan.co/swan';
const api = process.env.REACT_APP_ENV === 'production' ? production : dev;
console.log(process.env.REACT_APP_ENV);
export default api;
