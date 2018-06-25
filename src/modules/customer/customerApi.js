import axios from 'axios';
import { wrapRequest } from '../utils';

const CUSTOMER_API_URL = 'http://dev-lbs.america.apci.com/SkyDataService/Customers';
//const CUSTOMER_API_URL = 'http://localhost/test/getfile.php?fprefix=Customers';

const DB_REGION = 'EU';
const CORPORATE_IDN = 'U24';

const getCustomerData = wrapRequest(async () =>
  axios.get(CUSTOMER_API_URL, {
    params: {
      dbRegion: DB_REGION,
      CorporateIdn: CORPORATE_IDN
    },
    withCredentials: true
  })
);

export {
  getCustomerData
};
