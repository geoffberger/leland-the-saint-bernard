import 'aws-sdk/dist/aws-sdk';
import config from './config'
const aws = window.AWS;

export default () => {
  aws.config.region = config.AWS.region;
  aws.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.AWS.identityPoolId,
  });
};
