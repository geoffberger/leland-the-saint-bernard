module.exports = {
  AWS: {
    region: 'us-east-1',
    identityPoolId: 'us-east-1:bde5c1e6-4e02-4872-9162-aa2428db89c9',
    bucket: 'leland-the-saint-bernard',
    s3Domain: 'https://s3.amazonaws.com',
  },

  site: {
    menu: [
      {
        to: '/location/vegas',
        name: 'Vegas'
      },
      {
        to: '/location/boston',
        name: 'Boston'
      },
      {
        to: '/location/ca',
        name: 'California'
      },
      {
        to: '/location/slc',
        name: 'Salt Lake City'
      },
    ]
  },
};
