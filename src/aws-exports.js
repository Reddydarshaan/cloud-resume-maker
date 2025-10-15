const awsConfig = {
  Auth: {
    Cognito: {
      region: "ap-south-1",
      userPoolId: "ap-south-1_36vzQYITO", // your user pool ID
      userPoolClientId: "4nae5t4p2u7cso12ntgvkhipqa", // ✅ your new public client ID
      loginWith: {
        email: true,
        username: false,
        phone: false,
      },
    },
  },
};

export default awsConfig;

           
