import { Tree } from '@nx/devkit';
import { updateDepConst } from './update-dep-const';

export function updateDomainDepConst(tree: Tree, domain: string) {
  updateDepConst(
    tree,
    (depConst: { sourceTag: string; onlyDependOnLibsWithTags: string[] }[]) => {
      if (!depConst.some((d) => d.sourceTag === `domain:${domain}`)) {
        depConst.push({
          sourceTag: `domain:${domain}`,
          onlyDependOnLibsWithTags: [`domain:${domain}`, 'domain:shared'],
        });
      }
    }
  );
}
