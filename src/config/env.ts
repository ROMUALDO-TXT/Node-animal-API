export default {
  webUrl: process.env.WEB_URL as string,
  apiUrl: process.env.API_URL as string,

  storage: process.env.STORAGE as string,

  spaces: {
    endpoint: process.env.SPACES_ENDPOINT as string,
    region: process.env.SPACES_REGION as string,
    key: process.env.SPACES_KEY as string,
    secret: process.env.SPACES_SECRET as string,
    bucket: process.env.SPACES_BUCKET as string,
    projectFolder: process.env.SPACES_PROJECT_FOLDER as string,
  },

  mailDriver: process.env.MAIL_DRIVER as string,

  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID as string,
    secretId: process.env.AWS_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_API_REGION as string,
  },
};
