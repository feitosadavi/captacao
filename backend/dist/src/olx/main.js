"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBot = void 0;
const node_events_1 = __importDefault(require("node:events"));
const runWorkerSync_1 = require("../helpers/runWorkerSync");
function createBot(cb, { target }) {
    const eventManager = new node_events_1.default();
    eventManager.on('log', (logMsg) => cb(logMsg));
    eventManager.on('post_links', (links) => {
        (0, runWorkerSync_1.runWorkerSync)({
            name: 'MessengerWorker',
            target,
            data: { links },
            eventManager,
            onMessage: ({ type, content }) => {
                const msg = {
                    target,
                    type,
                    content
                };
                eventManager.emit(`log`, msg);
            },
        });
    });
    function run(query) {
        eventManager.emit('log', {
            type: 'stack',
            target,
            content: {
                type: 'info',
                description: 'Coletando Dados',
            }
        });
        (0, runWorkerSync_1.runWorkerSync)({
            name: 'PostsGetterWorker',
            target,
            data: { query },
            eventManager,
            onMessage: ({ totalOfLinks, links }) => {
                const msg = {
                    type: 'progress',
                    target,
                    content: {
                        current: 0,
                        total: totalOfLinks
                    }
                };
                eventManager.emit('log', msg);
                eventManager.emit('post_links', links);
            },
        });
    }
    return { run };
}
exports.createBot = createBot;
