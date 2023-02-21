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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsGetter = void 0;
class Sanitizor {
    // text comes on the follow format: resultado 1 - 50 de 1000 resultados
    extractTotalOfPagesNumbers(text) {
        const elements = text.split("de");
        const itensPerPage = Number(elements[0].replace('1 - ', '').trim());
        const totalOfLinks = Number(elements[1].replace(/\D/g, ''));
        const numberOfPages = Math.ceil(totalOfLinks / itensPerPage);
        return { totalOfLinks, numberOfPages };
    }
}
class PostsGetter {
    constructor(page) {
        this.page = page;
        this.sanitizor = new Sanitizor();
    }
    start(query, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const BASE_PATH = 'https://df.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios';
            try {
                yield this.page.goto(query, { waitUntil: 'domcontentloaded' });
                const { totalOfLinks, numberOfPages } = yield this.getNumberOfPages();
                for (let i = 0; i < numberOfPages + 1; i++) {
                    yield this.page.goto(`${query}&o=${i}`, { waitUntil: 'domcontentloaded' });
                    const posts = yield this.getOnePagePosts();
                    cb(totalOfLinks, posts);
                }
                yield this.page.close();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getNumberOfPages() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultadosText = yield (this.page.getByText('resultados')).textContent();
            if (!resultadosText)
                throw new Error('Elemento resultados não encontrado');
            return this.sanitizor.extractTotalOfPagesNumbers(resultadosText);
        });
    }
    getOnePagePosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const postsLink = yield this.page.evaluate(() => Array.from(document.querySelectorAll('.sc-12rk7z2-0.bjnzhV > a'), a => a.getAttribute('href')));
            return postsLink;
        });
    }
}
exports.PostsGetter = PostsGetter;
