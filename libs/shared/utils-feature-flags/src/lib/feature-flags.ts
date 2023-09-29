export const featureFlags = [
  'customer-list',
  'customer-details',
  'complaint-create',
  'complaint-list',
  'complaint-details',
  'contract-edit',
  'contract-create',
  'contract-list',
  'contract-details',
  'claim-create',
  'claim-list',
  'claim-details',
] as const;

export type FeatureFlag = (typeof featureFlags)[number];
export type FeatureFlags = Record<FeatureFlag, boolean>;

export function isFeatureFlags(
  featureFlags: unknown
): featureFlags is FeatureFlags {
  return typeof featureFlags === 'object' && featureFlags !== null
    ? Object.values(featureFlags).every((v) => typeof v === 'boolean') &&
        Object.keys(featureFlags).every((k) =>
          Object.values(featureFlags).includes(k as FeatureFlag)
        )
    : false;
}
