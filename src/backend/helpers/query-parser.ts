import { TargetKeys } from '@/types';
import { ExternalQuery } from '@/backend/domain/external-query';

interface QueryParserFunction {
  (externalQuery: ExternalQuery): string
}
type TargetParser = Record<TargetKeys, QueryParserFunction>

type Query = {
  target: TargetKeys
  content: string
}

export function parseQuery (externalQuery: ExternalQuery, targets: TargetKeys[]): Query[] {
  const targetParsers: TargetParser = {
    'olx': ({ state, model, brand }) => `https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/${brand}/${model}/estado-${state}?f=p`,
    'webmotors': ({ state, model, brand }) => `https://www.webmotors.com.br/carros/${state}/${brand}/${model}`,
    'icarros': () => '',
  }

  const queries = targets.map<Query>(target => ({
    target,
    content: targetParsers[target](externalQuery)
  }))

  return queries
}
