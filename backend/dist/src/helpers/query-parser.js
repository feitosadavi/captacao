"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
function parseQuery(externalQuery, targets) {
    const targetParsers = {
        'olx': ({ state, model, brand }) => `https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/${brand}/${model}/estado-${state}?f=p`,
        'webmotors': ({ state, model, brand }) => `https://www.webmotors.com.br/carros/${state}/${brand}/${model}`,
        'icarros': () => '',
    };
    const queries = targets.map(target => ({
        target,
        content: targetParsers[target](externalQuery)
    }));
    return queries;
}
exports.parseQuery = parseQuery;
