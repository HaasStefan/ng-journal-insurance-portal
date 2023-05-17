import { formatFiles, getWorkspaceLayout, names, Tree } from '@nx/devkit';
import { ModelsGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { addFiles } from '../../lib/add-files';
import { BaseNormaliedSchemaType } from '../../lib/normalized-schema';
import { updateDomainDepConst } from '../../lib/update-domain-dep-const';

type NormalizedSchema = ModelsGeneratorSchema & BaseNormaliedSchemaType;

function normalizeOptions(
  tree: Tree,
  options: ModelsGeneratorSchema
): NormalizedSchema {
  const fileName = names(options.name).fileName;
  const name =
    fileName === 'models'
      ? fileName
      : `models-${names(options.name).fileName}`;
  const projectDirectory = options.domain
    ? `${names(options.domain).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const domainDirectory = `${getWorkspaceLayout(tree).libsDir}/${
    options.domain
  }`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = [
    'type:models',
    `domain:${names(options.domain).fileName}`,
  ];

  return {
    ...options,
    name,
    projectName,
    projectRoot,
    projectDirectory,
    domainDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, options: ModelsGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.domainDirectory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
  });

  addFiles(tree, normalizedOptions, __dirname);

  updateDomainDepConst(tree, normalizedOptions.domain);

  await formatFiles(tree);
}
