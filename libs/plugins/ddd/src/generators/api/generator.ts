import { formatFiles, getWorkspaceLayout, names, Tree } from '@nx/devkit';
import { updateDepConst } from '../../lib/update-dep-const';
import { ApiGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';
import { addFiles } from '../../lib/add-files';
import { BaseNormaliedSchemaType } from '../../lib/normalized-schema';
import { updateDomainDepConst } from '../../lib/update-domain-dep-const';

type NormalizedSchema = ApiGeneratorSchema &
  BaseNormaliedSchemaType & {
    consumer: string;
  };

function normalizeOptions(
  tree: Tree,
  options: ApiGeneratorSchema
): NormalizedSchema {
  const name = `api-${names(options.name).fileName}`;
  const projectDirectory = options.domain
    ? `${names(options.domain).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const domainDirectory = `${getWorkspaceLayout(tree).libsDir}/${
    options.domain
  }`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = [
    'type:api',
    `domain:${names(options.domain).fileName}`,
    `domain:${names(options.domain).fileName}/${name}`,
  ];

  return {
    ...options,
    name,
    consumer: names(options.name)
      .fileName.split('/')
      .slice(-1)[0]
      .replace('api-', ''),
    projectName,
    projectRoot,
    projectDirectory,
    domainDirectory,
    parsedTags,
  };
}

function updateConsumerDepConst(tree: Tree, options: NormalizedSchema) {
  updateDepConst(
    tree,
    (depConst: { sourceTag: string; onlyDependOnLibsWithTags: string[] }[]) => {
      const index = depConst.findIndex(
        (d) => d.sourceTag === `domain:${options.consumer}`
      );

      if (index && !!depConst[index]) {
        depConst[index] = {
          ...depConst[index],
          onlyDependOnLibsWithTags: [
            ...depConst[index].onlyDependOnLibsWithTags,
            `domain:${names(options.domain).fileName}/${options.name}`,
          ],
        };
      }
    }
  );
}

export default async function (tree: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.domainDirectory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
  });

  addFiles(tree, normalizedOptions, __dirname);

  updateDomainDepConst(tree, normalizedOptions.domain);
  updateConsumerDepConst(tree, normalizedOptions);

  await formatFiles(tree);
}
