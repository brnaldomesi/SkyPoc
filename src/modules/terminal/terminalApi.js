import axios from 'axios';
import { wrapRequest } from '../../modules/utils';

const TERMINAL_API_URL = 'http://dev-lbs.america.apci.com/SkyDataService/Terminals';
//const TERMINAL_API_URL = 'http://localhost/test/getfile.php?fprefix=Terminals';

const DB_REGION = 'EU';

const getTerminalData = wrapRequest(async () =>
  axios.get(TERMINAL_API_URL, {
    params: {
      dbRegion: DB_REGION
    },
    withCredentials: true
  })
);

export {
  getTerminalData
};
