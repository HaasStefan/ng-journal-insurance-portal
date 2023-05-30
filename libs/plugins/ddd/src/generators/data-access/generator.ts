import { formatFiles, getWorkspaceLayout, names, Tree } from '@nx/devkit';
import { DataAccessGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { addFiles } from '../../lib/add-files';
import { BaseNormaliedSchemaType } from '../../lib/normalized-schema';
import { updateDomainDepConst } from '../../lib/update-domain-dep-const';

type NormalizedSchema = DataAccessGeneratorSchema & BaseNormaliedSchemaType;

function normalizeOptions(
  tree: Tree,
  options: DataAccessGeneratorSchema
): NormalizedSchema {
  const fileName = names(options.name)?.fileName;
  const name =
    fileName === 'data-access'
      ? fileName
      : `data-access-${names(options.name).fileName}`;
  const projectDirectory = options.domain
    ? `${names(options.domain).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const domainDirectory = `${getWorkspaceLayout(tree).libsDir}/${
    options.domain
  }`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = [
    'type:data-access',
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

export default async function (tree: Tree, options: DataAccessGeneratorSchema) {
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
