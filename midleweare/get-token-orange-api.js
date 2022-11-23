const axios = require('axios');
const qs = require('qs');
const data = qs.stringify({
    'grant_type': 'client_credentials' 
  });
const config = {
    method: 'post',
    url: 'https://api.orange.com/oauth/v3/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic WmdlS0d3ZUdYdDQ3d2pERUJJNkRlUzNRZXhKRm8wRVM6RmhYNlEwa3JHQ0s3a0FTbg=='
    },
    data : data
  };
module.exports = async (req, res , next) => {
    axios(config).then(function (response) {
      const obj = Object.assign(response.data);
      req.accessToken = obj.access_token ;
      next();
    }).catch(function (error) {
      console.log(error);
    });
}