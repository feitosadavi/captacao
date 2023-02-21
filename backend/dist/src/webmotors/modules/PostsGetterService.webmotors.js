"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsGetterService = void 0;
const axios_1 = __importDefault(require("axios"));
const WEBMOTORS_API_BASE_PATH = 'https://www.webmotors.com.br/api/search/car?url=';
const WEBMOTORS_SITE_BASE_PATH = 'https://www.webmotors.com.br/comprar';
const HEADERS = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0',
    }
};
class PostsGetterService {
    start(queryUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const links = [];
                const URL = `${WEBMOTORS_API_BASE_PATH}${queryUrl}`;
                console.log(URL + '?showCount=true');
                const { Count, SearchResults } = (yield axios_1.default.get(`${URL}&showCount=true`, HEADERS)).data;
                const newLinks = SearchResults.map(result => this.buildPostUrl(result));
                links.push(...newLinks);
                const numberOfRequests = this.countNumberOfRequests(Count, SearchResults.length);
                console.log({ numberOfRequests });
                for (let i = 1; i < numberOfRequests; i++) {
                    const { SearchResults } = (yield axios_1.default.get(`${URL}&actualPage${i + 1}`, HEADERS)).data;
                    const newLinks = SearchResults.map(result => this.buildPostUrl(result));
                    links.push(...newLinks);
                }
                return { totalOfLinks: Count, links };
            }
            catch (error) {
                console.log('WEBMOTORS - TEVE UM ERRO NO START DO POSTS GETTER WORKER');
            }
        });
    }
    buildPostUrl({ UniqueId, Specification: { Version, Make, Model, NumberPorts, YearFabrication } }) {
        const sanitizedVersion = Version.Value.toLowerCase().replace(' ', '-');
        return `${WEBMOTORS_SITE_BASE_PATH}/${Model.Value}/${Make.Value}/${sanitizedVersion}/${NumberPorts}/${YearFabrication}/${UniqueId}`;
    }
    countNumberOfRequests(totalOfPosts, itensPerRequest) {
        return Math.ceil(totalOfPosts / itensPerRequest);
    }
}
exports.PostsGetterService = PostsGetterService;
