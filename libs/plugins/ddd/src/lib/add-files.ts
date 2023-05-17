import { generateFiles, names, Tree } from "@nx/devkit";
import * as path from 'path';
import { NormalizedSchemaType } from "./normalized-schema";

export function addFiles<T>(tree: Tree, options:  T & NormalizedSchemaType, dirname: string) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      domainClassName: names(options.domain).className,
      domainFileName: names(options.domain).fileName,
      template: ''
    };
    generateFiles(tree, path.join(dirname, 'files'), options.projectRoot, templateOptions);
  }