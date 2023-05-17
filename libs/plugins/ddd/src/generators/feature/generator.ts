import { formatFiles, getWorkspaceLayout, names, Tree } from '@nx/devkit';
import { FeatureGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { addFiles } from '../../lib/add-files';
import { BaseNormaliedSchemaType } from '../../lib/normalized-schema';
import { updateDomainDepConst } from '../../lib/update-domain-dep-const';

type NormalizedSchema = FeatureGeneratorSchema &
  BaseNormaliedSchemaType & {
    componentName: string;
  };

function normalizeOptions(
  tree: Tree,
  options: FeatureGeneratorSchema
): NormalizedSchema {
  const name = `feature-${names(options.name).fileName}`;
  const componentName = `${names(options.name).fileName}`;
  const projectDirectory = options.domain
    ? `${names(options.domain).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const domainDirectory = `${getWorkspaceLayout(tree).libsDir}/${
    options.domain
  }`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = [
    'type:feature',
    `domain:${names(options.domain).fileName}`,
  ];

  return {
    ...options,
    name,
    componentName,
    projectName,
    projectRoot,
    projectDirectory,
    domainDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, options: FeatureGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.domainDirectory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
  });

  addFiles(
    tree,
    {
      ...normalizedOptions,
      domainClassName: names(normalizedOptions.domain).className,
      componentClassName: names(normalizedOptions.componentName).className,
      domainFileName: names(options.domain).fileName,
    },
    __dirname
  );

  updateDomainDepConst(tree, normalizedOptions.domain);

  await formatFiles(tree);
}
