export type GeneratorSchema = {
  name: string;
  domain: string;
};

export type BaseNormaliedSchemaType = {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  domainDirectory: string;
  parsedTags: string[];
};

export type NormalizedSchemaType = BaseNormaliedSchemaType & GeneratorSchema;
