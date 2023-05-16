import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { updateDepConst } from '../../lib/update-dep-const';
import { ApiGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';

interface NormalizedSchema extends ApiGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  domainDirectory: string;
  parsedTags: string[];
  consumer: string;
}

function normalizeOptions(tree: Tree, options: ApiGeneratorSchema): NormalizedSchema {
  const name = `api-${names(options.name).fileName}`;
  const projectDirectory = options.domain ? `${names(options.domain).fileName}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const domainDirectory = `${getWorkspaceLayout(tree).libsDir}/${options.domain}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = [
    'type:api',
    `domain:${names(options.domain).fileName}`,
    `domain:${names(options.domain).fileName}/${name}`
  ];

  return {
    ...options,
    name,
    consumer: names(options.name).fileName.split('/').slice(-1)[0].replace('api-', ''),
    projectName,
    projectRoot,
    projectDirectory,
    domainDirectory,
    parsedTags
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    domainClassName: names(options.domain).className,
    domainFileName: names(options.domain).fileName,
    template: ''
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

function deleteFiles(tree: Tree, options: NormalizedSchema) {
  for (const file of [
    `${options.projectRoot}/src/lib/${options.projectName}.ts`,
    `${options.projectRoot}/src/lib/${options.projectName}.spec.ts`
  ]) {
    tree.delete(file);
  }
}

export default async function (tree: Tree, options: ApiGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.domainDirectory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true
  });

  addFiles(tree, normalizedOptions);
  deleteFiles(tree, normalizedOptions);

  updateDepConst(tree, (depConst: { sourceTag: string; onlyDependOnLibsWithTags: string[] }[]) => {
    if (!depConst.some((d) => d.sourceTag === `domain:${normalizedOptions.domain}`)) {
      depConst.push({
        sourceTag: `domain:${normalizedOptions.domain}`,
        onlyDependOnLibsWithTags: [`domain:${normalizedOptions.domain}`, 'domain:shared']
      });
    }
  });

  updateDepConst(tree, (depConst: { sourceTag: string; onlyDependOnLibsWithTags: string[] }[]) => {
    const index = depConst.findIndex((d) => d.sourceTag === `domain:${normalizedOptions.consumer}`);

    if (index && !!depConst[index]) {
      depConst[index] = {
        ...depConst[index],
        onlyDependOnLibsWithTags: [
          ...depConst[index].onlyDependOnLibsWithTags,
          `domain:${names(options.domain).fileName}/${normalizedOptions.name}`
        ]
      };
    }
  });

  await formatFiles(tree);
}
