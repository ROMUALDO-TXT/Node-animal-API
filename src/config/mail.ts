interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'corbin.hagenes36@ethereal.email',
      //password: n79TcU3mVgz4bEc43v
      name: 'GetHash test',
    },
  },
} as IMailConfig;
