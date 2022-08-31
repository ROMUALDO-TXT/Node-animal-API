interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailProvider {
  sendMail(
    to: IMailContact,
    subject: string,
    templateData: IParseMailTemplate,
    from?: IMailContact,
  ): Promise<void>;
}

export { IMailProvider, IMailContact, IParseMailTemplate, ITemplateVariable };
