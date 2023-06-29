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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.crawledItems = void 0;
exports.crawledItems = [
    {
        productId: 1,
        title: '스피드랙 철제선반 조립식앵글 렉 펜트리',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.166Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 18, likeCount: 16 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/29be88f4ac04e011747aa85125cca54b1953cd1474711d9585bf94199b32277c_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 2,
        title: '메종마르지엘라',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 290000,
        countInfo: { chatCount: 3, likeCount: 23 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/4173208b06917ddb42a643d364d68acc20d4e8174bc744d788f33fc9294904dc.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 3,
        title: '루이비통 알마bb 에삐 블랙',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 125,
        countInfo: { chatCount: 13, likeCount: 44 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/9830e6c317f7e3c04fd818bf4155e9879d3c4674c0016e31131572c21320d33d_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 4,
        title: '지포어 반팔티셔츠',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 160000,
        countInfo: { chatCount: 8, likeCount: 16 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/770caa3c7743983c3b4cf7f10718bc52625681b9f37fb864961984ecc9d63d94_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 5,
        title: 'LDH-7000 제습기 팝니다',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 90000,
        countInfo: { chatCount: 4, likeCount: 4 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ec66586e653bde5bd9c871d6925cdd09f0447a69ad4d4a1beac9a73178c81b7f_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 6,
        title: '고야드 미니앙주 블랙 풀구성이에요',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 148,
        countInfo: { chatCount: 8, likeCount: 73 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/adc53dd652051e4f9f209f056f8111869756af1322d9be2c1351ef813d16e112_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 7,
        title: '철재서랍장',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 4, likeCount: 26 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6c7c75ca527ccd3a5903bddbdcc3e06a5cccda34d795458dca8413e67c7aafe2.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 8,
        title: '삼성 스마트티비',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 150000,
        countInfo: { chatCount: 8, likeCount: 5 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/95f57e55f55507f9f7e0adabdc66588f9fb86ea151d0881a79ffa63eeb1f7086_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 9,
        title: '애플워치se2 40mm gps 새것 급처',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 200000,
        countInfo: { chatCount: 12, likeCount: 17 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/097b102f37825a368bdd665cf422202927b89a9db8bb5c4387ee7aa29c5fb874.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 10,
        title: '바이레도 모하비고스트 50ml 향수',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 3, likeCount: 9 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/4cbce17c4e840f3256cb73089d5727d76bd81d8c07a1ffe5dd8055d1a070d1b6.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 11,
        title: '아크릴투명의자',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 2, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/dab0fa2055a4d5fca96a30aaa81b1b104fb6de3e767e8b7584035d70ae4db0e4.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 12,
        title: '삼익가구 퀸사이즈 침대 프레임',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 100000,
        countInfo: { chatCount: 13, likeCount: 22 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/817c031ea4e8ecea2a26877a426f12e04479f958d4c45d971945979d9367d41b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 13,
        title: '헌터 장화 (새상품)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 120000,
        countInfo: { chatCount: 4, likeCount: 14 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1646e52cc0b6e9c559c48b2c68991d7122bdd35d818d6460a0280d6ef374ad36.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 14,
        title: '사우스케이프 정품 팬츠',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 180000,
        countInfo: { chatCount: 3, likeCount: 22 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ce7a4f18fd1ad71b65d588037a34a7005905c5016407fb186d54d3806d8a5073_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 15,
        title: '셀린느 미니카바스백 상태좋고 구성 다 있어요',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 900000,
        countInfo: { chatCount: 5, likeCount: 22 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a67622bf861e65e2e79bc9896606636bcb27193c74f7a6c2024447127e8e2120_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 16,
        title: '아이폰 11 프로맥스 64gb',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 460000,
        countInfo: { chatCount: 5, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6b322de4facc5c2a761ba829604f8828addc603f914faf00678f668910f9a45f.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 17,
        title: '**',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 320000,
        countInfo: { chatCount: 4, likeCount: 37 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/11155c97602bbbbc6baf75cf0456e6f60c172939c2c3eca92ddb4ce5a87b5229_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 18,
        title: '또띠아 10호 팝니다',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 3000,
        countInfo: { chatCount: 6, likeCount: 13 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/73e56fc2641688c6ab6f16372e40e6e0cef02dd62a68724e76fa60fced1ea1f9_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 19,
        title: '티파니앤코 스마일 목걸이',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 400000,
        countInfo: { chatCount: 15, likeCount: 41 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ebf600c90fdc1b6d9933a239ffe40d2915c9be5f1455b2d0704c10fd2143d11b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 20,
        title: '마이프로틴 임펙트웨이 2.5kg 단백질 보충제 프로틴 파우더',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 2, likeCount: 7 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/70cd76be273356f2d19a8cde99e550de181df0413e0285ed43a2aa9cc6f2c909.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 21,
        title: '스카티카메룬 뉴포트3 거의새거 정품 34인치',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.167Z',
        status: '판매중',
        price: 400000,
        countInfo: { chatCount: 2, likeCount: 17 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/cf13ce839dac37d2ec3f20acad1faa5f2ffea3b5cb5dce22218d49231a889cfa_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 22,
        title: 'lg 퓨리케어 냉온정수기',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 60000,
        countInfo: { chatCount: 8, likeCount: 20 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/e37049f0f2bc70b3dd4485dcf3b848d3fab46f78734b91ed9b12b471abad417e_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 23,
        title: '이사때문에 거의 사용안한 전자레인지 내놓습니다.',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 20000,
        countInfo: { chatCount: 2, likeCount: 5 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3f736f070d4ae369e6c9b6d01a2a9e1b9304f7a2c78b6b3ee5ad9dc43fc5fd8a.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 24,
        title: '갤럭시 S21 (무잔상 액정깨끗해요)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 270000,
        countInfo: { chatCount: 6, likeCount: 28 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7272d0a36cf42fdd798bffa8f878ba5663190595e59f915953ca9e696f385e22_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 25,
        title: '하포스침대 노헤드 퀸사이즈 수납침대 프레임 + 매트리스',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 3, likeCount: 5 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5ac9fab41825d75f84672d58e3e6d0c5c4ed6df23e1771437f2216c0ed547229_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 26,
        title: 'cos 여자 반팔 36 사이즈 55사이즈',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 20000,
        countInfo: { chatCount: 3, likeCount: 12 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/fd7631ab68bcda828c14d1926e399b402674f9c09ce26839d0dd4828686844e9.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 27,
        title: '새상품) 에르메스 피코탄18 블랙 금장 B각인 판매합니다',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 500,
        countInfo: { chatCount: 2, likeCount: 13 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1a923a1304c72143387632db9bc9e3973d4d9e2947dfb6ad0095754be62bd528_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 28,
        title: '갤럭시 노트20 브론즈 판매해요',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 220000,
        countInfo: { chatCount: 4, likeCount: 12 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6b43586df91806c45c8aaec186503c4dd2b5aefdc73ce418b250166b9b7213e8.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 29,
        title: '컴퓨터책상 모던미드센츄리 책상',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 60000,
        countInfo: { chatCount: 3, likeCount: 43 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/d0c6165d4540d04b7e26b509f113e14f10fb77014bfba21bb8139d1c4b72acc8.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 30,
        title: '샤넬 빈티지 펜던트 목걸이 벨트 가방',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 149000,
        countInfo: { chatCount: 3, likeCount: 28 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/4800c55830d6d8a7e2b6226c9ccfd41760aea5d24de02b006fa684c96e515ff8.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 31,
        title: '샤넬 정품 귀걸이 한짝',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 180000,
        countInfo: { chatCount: 1, likeCount: 10 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/2cc54cb805583200e55505b9cd93d009042310b3f719b8929b150952f8181417.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 32,
        title: 'LG 공기청정기',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 6, likeCount: 14 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7b5fa795498b1a7c76929dbcbc911500bf6444522b43e7df21de6c6bae3fc41e.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 33,
        title: '타이틀리스트 여성세트(55)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 89000,
        countInfo: { chatCount: 3, likeCount: 23 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/278e6a15025e25d059ef247659cde90a458e7b3748e59a0c8ba5949c1689436b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 34,
        title: '코스트코 돈시몽 자몽쥬스 3병씩 나누실분!',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 369,
        countInfo: { chatCount: 1, likeCount: 13 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/42ec4e59bd560e9e8be641fc34de760913033cf9a6fbe1631d63fbab952efab1_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 35,
        title: '원목 전신거울 1만원 외 원목협탁',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 3, likeCount: 3 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/161801f51421c3c2397ffd37f7f9fbb3df6284665972ee6d3f2a752924be8d24_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 36,
        title: '비비랩 콜라겐',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 20000,
        countInfo: { chatCount: 4, likeCount: 4 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/fc6582158407fbbbec600389f7d4e3e42006f29f2a510ad0da52850af518f15b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 37,
        title: '프라다 리에디션 호보백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 600000,
        countInfo: { chatCount: 2, likeCount: 12 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/facb01dd8e87e6950a8550887db0bb7ecffc11bdad2acb96a5500a3a08650bc0.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 38,
        title: '피아트 푸쉬카 핑크',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 60000,
        countInfo: { chatCount: 3, likeCount: 8 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3745fc32ea664ad564843269e08e9722377574b8435c9280afbb68a0630d41ea.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 39,
        title: '디올 블랙 미니 오블리크 북토트백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 750000,
        countInfo: { chatCount: 0, likeCount: 39 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/40b1c0f5e604239f3a627e4b41b03e4a3c7fcfaf6cb630ad04040297a0eb7f50.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 40,
        title: '나이키 힙쌕',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 18000,
        countInfo: { chatCount: 4, likeCount: 24 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/40af524376e649346b374b5ab6784d7b74e0540f2d3fb9a5192711b40746a272.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 41,
        title: '⭐️이사 정리⭐️ 월넛 색상 원목 전신거울',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 15000,
        countInfo: { chatCount: 8, likeCount: 22 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/BF14FD15ACE46F0A0C46379049A65EB9C941EAE7350C194AC61EF065E194A1B3.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 42,
        title: '어뉴 골프 모자 벙거지 새상품 바이저 골프바이저',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 60000,
        countInfo: { chatCount: 0, likeCount: 50 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/d3ffb53216e7283dff66b6c90eeb92c99461a39ee7e95716041550a2e68650fe_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 43,
        title: '마크제이콥스 카메라백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 88000,
        countInfo: { chatCount: 2, likeCount: 5 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/8c4bc0896af34b1e68f3615fd16318b14f5a97c470e1a8dac776c8ed2f44f08a_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 44,
        title: '투지퍼 미우미우 가방',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 270000,
        countInfo: { chatCount: 0, likeCount: 15 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a132fc765b11440596d21bdd6c4419b009b36de00a6a274dc6a29a8259c10acf_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 45,
        title: 'SS 슈퍼싱글 지누스 매트리스+프레임(71👉🏻80%)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 140000,
        countInfo: { chatCount: 5, likeCount: 15 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5752fbad88ec500e21fdc6f4c8922b9de31ab53c0290a3701fc78839b9fca071.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 46,
        title: '서랍장',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 20000,
        countInfo: { chatCount: 4, likeCount: 12 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3919d56ca0b78a7711170b0b2c7b76201b90d189cdea98e6b6ea34c581f05e19.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 47,
        title: '수납형 계단침대 SS',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 20000,
        countInfo: { chatCount: 6, likeCount: 18 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/25e0088bea65a77a8062f2238c56eddb7ea4ca08501091a83a5621b0244c8975_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 48,
        title: '딥티크 탐다오 판매합니다',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 30000,
        countInfo: { chatCount: 4, likeCount: 7 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/9664b3231afba903a6e84cc13350e5af86a31ae2b56c06ad2823b9fec70c052d.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 49,
        title: '남성 빈폴 얇은 자켓 100사이즈',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 35000,
        countInfo: { chatCount: 1, likeCount: 1 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/17cb530007a15d8759bdb6f82bfa7d69b82032e109e5fff2339e063ff200fbcb.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 50,
        title: '갤레시 워치 5 실버 새거',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 170000,
        countInfo: { chatCount: 2, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/96578f3e04f0309fb59f34ab0f5e43426ce512d7a9a0a2bc3a0d75bd0906ac0b_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 51,
        title: '팬디 여성 키즈 바람막이 55 사이즈',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 80000,
        countInfo: { chatCount: 1, likeCount: 2 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7147c7266bae54b7496dc1dd12522985f6b382b4061f77403a263e2d48079e08.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 52,
        title: '촬영조명',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 2, likeCount: 9 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/9ba7a24da2832e01af18b78388f2b47407da10d80e3e2d609b88ad7e77eaf0d3_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 53,
        title: '클래식박스 가죽가방 크로스백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 70000,
        countInfo: { chatCount: 4, likeCount: 3 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/762f069c2fc4f4281d5caf3f1c72d1207a4cd76a71cbb4718edb604f3c0ce133.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 54,
        title: '폴로 랄프로렌 블랙 반팔 니트',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 60000,
        countInfo: { chatCount: 2, likeCount: 16 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/C09236FED4B9AD401525B096650127C24179BABEEC166B41D7F5F90BCC1ED0E6.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 55,
        title: '24인치 한성 모니터 팔아요',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 6, likeCount: 8 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7410e9ea92b369bbb2e6c4b6ef48976edf1033ed7767c567138bd0bdfb65d242.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 56,
        title: '까사미아 쇼파',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 100,
        countInfo: { chatCount: 1, likeCount: 4 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ee1976ecb404a5ee8867e64f3c55d42dc9a9d880b600534c90b41a2b79d4ebd5_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 57,
        title: '롯데 패밀리 콘서트 18일 A석 2매',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 100000,
        countInfo: { chatCount: 2, likeCount: 0 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/b9aac87989c10dab049db45addab7d734f63671196b557fb6f8789899b57a595.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 58,
        title: '무선 탁상 LED 조명',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 15000,
        countInfo: { chatCount: 1, likeCount: 31 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/e980b8df3206c7c24b385dad816566cde93c84b418d8212cb6177d7f2de1cceb_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 59,
        title: '파커 벡터 만년필',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 1, likeCount: 1 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/c801a134905b581314a2c87b5a2dd2c201fe84e256f7db9d7124996cbbe9c562_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 60,
        title: '마켓비 접이식 소파 침대',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 10000,
        countInfo: { chatCount: 4, likeCount: 16 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/712dfa0a3588816d7ab7d227a1e5ea5ea850ab8a8c3cf6e53e0c8a28bef424e0_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 61,
        title: '북선반 판매합니다.',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 80000,
        countInfo: { chatCount: 1, likeCount: 14 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/0432ae46374b1c17600b5e277beb1c7566ff3834ae1d85090d263e72f54f619b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 62,
        title: '주방다이',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 30000,
        countInfo: { chatCount: 5, likeCount: 11 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/59c6efb4f13bace8bb0d318b1bdfa63d3de41a19434a2074978662d996aba1ba.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 63,
        title: '타임 집업가디건 F',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 25000,
        countInfo: { chatCount: 1, likeCount: 3 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/62020b558864d3002122eec4ee171ed72f8c29bfb111e463a1b8c65c99769ade_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 64,
        title: '락피쉬 헤이든 레인부츠 크림 240',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 69000,
        countInfo: { chatCount: 4, likeCount: 14 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/31c001ac0a26cc0f44a29a4f34f4cc06d1296209505e27dc469d4fecc09f70c5.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 65,
        title: '카디널레드 하우아백 블랙 프리오더 예약배송',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 350000,
        countInfo: { chatCount: 3, likeCount: 10 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/e686d55c9cb72164a3fdf4fde09b25ceb6c7d8d2a15aa629ef145c05fe32e3cd.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 66,
        title: '위니아 건조기 10kg 2022',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 290000,
        countInfo: { chatCount: 2, likeCount: 2 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6bed6ed90133acbacc191db3de841a2fc0fb70eac150d33844cbdb348adeab09_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 67,
        title: '라면 팝니다!!! (진짬뽕, 진라면, 짜파게티, 신라면)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 4000,
        countInfo: { chatCount: 2, likeCount: 3 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/8d3e9bab2993acc944a2b2f8d83cfc743981e13eb1afd2e45d657f670e707124.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 68,
        title: '풋조이 골프화',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 49000,
        countInfo: { chatCount: 2, likeCount: 8 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/68b0c4bdf5d16668b379548765922a0193cc61b4963a9311a0109331228c9cfd.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 69,
        title: 'LG 10kg통돌이 세탁기',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 5, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/39d7bd8f45cebbbb0e734c6f54ce86184533a91d2dc27e16fb470a873401afea_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 70,
        title: 'e스마트 홈바 사이드테이블 철제 바테이블 화이트 1800',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 39000,
        countInfo: { chatCount: 2, likeCount: 33 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6108e00b01532cec7e576838f7b5f111b76b56f502bbbee371bc20ea835628b4_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 71,
        title: '샤넬 핑크 트위드 자켓',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 250,
        countInfo: { chatCount: 1, likeCount: 3 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/de45187ced4d6d9e0ac53372fd64950f7ea110dd2991a9a9cecd098883a748ce.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 72,
        title: '토즈 드라이빙 슈즈',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 130000,
        countInfo: { chatCount: 1, likeCount: 19 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/F7A7789A4FCC434C4E38765B1556E496A27C754CB7B727D97C38539F846A1E04.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 73,
        title: '미드센츄리 미니식탁의자 미니스툴 미니화장대의자',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 20000,
        countInfo: { chatCount: 2, likeCount: 25 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5eea4ad796ab840df6e97b66ca517c0f47334f8e87e2e8e5d849158b18100abe.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 74,
        title: '카인다미 발레리나 세트 택달린 새제품 판매(핑크, 아이보리)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 66000,
        countInfo: { chatCount: 3, likeCount: 25 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/481b651b99e54be6828b6bb93d5d8a8ab9ca45a97443cd90aa72860e6a9beb47.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 75,
        title: '사우스케이프 여성티셔츠',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 140000,
        countInfo: { chatCount: 6, likeCount: 24 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/24362e74404fb4b3064251223051c170e669888866e7a38f85cdf2af550d2687_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 76,
        title: '디올 북토트 미니',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 278,
        countInfo: { chatCount: 0, likeCount: 24 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/d2e71eba1b323f0d3811510ab5c7acdbeb9b9e0150e64f39ba85f4addbdc9790.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 77,
        title: '라코스떼',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 25000,
        countInfo: { chatCount: 1, likeCount: 2 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/81ed4e114d6e7551a35cbffc44172ad6cf53af58a14c36951bfefce49188dd43_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 78,
        title: '오프화이트 반팔 풀구성 새상품',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 170000,
        countInfo: { chatCount: 2, likeCount: 10 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ecd6b400997691a1c7f36f7a503d4a8db3de353b4e09de69b590e303dba9e1c1.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 79,
        title: '벽등',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 550000,
        countInfo: { chatCount: 1, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/2feee78f4c83ee44544e399800a352d923d606cf37af5023ccea2587188ada2f_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 80,
        title: '부쉐론 콰트로 클래식 웨딩밴드',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 150,
        countInfo: { chatCount: 0, likeCount: 4 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/f9e0296fab04fb491b3378c00aabc7d73fa0b190352f9f74c8f6b956826f7539.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 81,
        title: '[DAMIANI] 다미아니 벨에포크  화이트골드 다이아반지 7호',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 250,
        countInfo: { chatCount: 2, likeCount: 34 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1d0653b74783e14187743a0f3ef8b45a8993281daa8e200ffc98da2feb9a904c.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 82,
        title: '(새상품 풀구성)구찌 신상 스퀘어 선글라스',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 200000,
        countInfo: { chatCount: 1, likeCount: 14 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/235d2aabab04b38c1cdeb76917f5c84337b4a085c339feb461601307d91ef82b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 83,
        title: '(새상품 풀구성)구찌 마몽트 선글라스',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 175000,
        countInfo: { chatCount: 1, likeCount: 17 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/de30d8a30f2fcce0afd6c3ef9a13159bdea95cf81fa96c80bff00f5dcfcc5d1d.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 84,
        title: '프라다 백팩 테수토백팩. 프라다배낭',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 630000,
        countInfo: { chatCount: 0, likeCount: 8 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a645f567650b7d77cabfa3c59178d79c78cf6ebcf1dce1e0053782685f6ec184_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 85,
        title: '입생로랑립스틱',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 36000,
        countInfo: { chatCount: 2, likeCount: 2 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/f60df894d9c2c9da169642981c4aeb17f9a1b0ecd62cb229a4466134e19d9485.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 86,
        title: '바네사브루노 스팽클 장식 리넨 카바스백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 175000,
        countInfo: { chatCount: 1, likeCount: 29 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/63037c7f1ba71650267f9dd64bf12e28ae75fad90d240840c5215c9989325a7b.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 87,
        title: '재당근 오프화이트 카라바조 후드티',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 90000,
        countInfo: { chatCount: 6, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/bd002a3cd6c3f01d393dee3401a169607c12dced2923f8e992c9b1a0a6b8324a.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 88,
        title: '20년형 LG 냉장고 462L M459S',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 550000,
        countInfo: { chatCount: 1, likeCount: 5 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5bf96be119dc7cbdff3f77a5a3397f3f4d055feb557a5dd06144e4791505fecb.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 89,
        title: '핏분 무게조절 덤벨 24kg',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 2, likeCount: 11 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/500d2945584cebffcca9d6d6c8441b71e19edc349a322189224f21ba7b454153_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 90,
        title: '샤넬백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 430,
        countInfo: { chatCount: 0, likeCount: 13 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/60945aa8d1ff1b452dec98cd87f22b0ac6db0a0530f8d9554b6ba9c25c279b24.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 91,
        title: '오르 orr 532 슬림 스탠다드 데님 청바지',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 50000,
        countInfo: { chatCount: 3, likeCount: 24 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/47e0a6d1561d0f662a42de5fbb88cb025c1c15d2018ffd8ea02b5083d245dbce.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 92,
        title: '롯데백화점 상품권 10만원',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 93000,
        countInfo: { chatCount: 2, likeCount: 0 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/85392ffe39083e65a7a4098e6b8e3644738da5ef7c76825cca7c4a7477bd1fdc_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 93,
        title: '테니스라켓 요넥스 브이코어 프로 97 310g',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 130000,
        countInfo: { chatCount: 1, likeCount: 6 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1322D46DF3E5038EC632BEB2DE66959F83F06F87BB31713DDC73E350ABD45AA5.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 94,
        title: '파지약과 판매합니다',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 12000,
        countInfo: { chatCount: 1, likeCount: 9 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a3ff5459b8b23c09f457778bcd09b688b455a8d7f77077c43bf26b8168bea044_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 95,
        title: '(거의새것) 골프웨어set (size：55)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 150000,
        countInfo: { chatCount: 4, likeCount: 22 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6d8a80f94965f0521e77dd1a2eb2da2304b3f21c9146ae27b9f22166e112f39a.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 96,
        title: '버버리 카라티',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.168Z',
        status: '판매중',
        price: 70000,
        countInfo: { chatCount: 2, likeCount: 21 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/63fc70930ab7815e46dbc82e228b50d2033a0202f41e667a19bab5530c8635f2_0.webp?q=82&s=300x300&t=crop'
    },
    {
        productId: 97,
        title: '미닉스 건조기 (프로x)',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.169Z',
        status: '판매중',
        price: 190000,
        countInfo: { chatCount: 1, likeCount: 9 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/8865151ccb6851cfa714e2514d775a8d8cf75eec244d5451a6247582522843aa.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 98,
        title: '나이키 드라이핏 반팔티 XL사이즈',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.169Z',
        status: '판매중',
        price: 19000,
        countInfo: { chatCount: 1, likeCount: 1 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/96a3d8ae43aa84992f42bd16029fa9603b006bd480baa750294231b08cd666d0.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 99,
        title: 'Theory 띠어리 니트 티셔츠',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.169Z',
        status: '판매중',
        price: 30000,
        countInfo: { chatCount: 4, likeCount: 8 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3712d04c7507170d95448c372a0ffe649d4d4398e5edae6f9994d8831e83494e.jpg?q=82&s=300x300&t=crop'
    },
    {
        productId: 100,
        title: '펜디 토트백/숄더백',
        town: { townId: 1, name: '서울 강남구 역삼1동' },
        createdAt: '2023-06-15T06:27:32.169Z',
        status: '판매중',
        price: 380000,
        countInfo: { chatCount: 0, likeCount: 12 },
        imgUrl: 'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ef7420ad8c92655e136226b6488498f08f40c31b08d54b78d432d7678d472b94.jpg?q=82&s=300x300&t=crop'
    },
];
var fs = require("fs");
var path = require("path");
var readyToConvertItems = exports.crawledItems;
var convertItems = function (crawledItems) {
    return crawledItems.map(function (item) {
        var productId = item.productId, title = item.title, town = item.town, createdAt = item.createdAt, status = item.status, price = item.price, countInfo = item.countInfo, imgUrl = item.imgUrl;
        return {
            name: title,
            location: town.name,
            postedAt: createdAt,
            status: status,
            price: price,
            chat: countInfo.chatCount,
            interest: countInfo.likeCount,
            imageUrl: imgUrl,
            interestChecked: false
        };
    });
};
var saveItemsAsJson = function (crawledItems) { return __awaiter(void 0, void 0, void 0, function () {
    var items, data, filePath;
    return __generator(this, function (_a) {
        items = convertItems(crawledItems);
        data = JSON.stringify(items, null, 2);
        filePath = path.join(__dirname, 'convertedItems.json');
        fs.writeFile(filePath, data, function (err) {
            if (err) {
                console.error('An error occurred:', err);
            }
            else {
                console.log('Successfully wrote to file:', filePath);
            }
        });
        return [2 /*return*/];
    });
}); };
saveItemsAsJson(readyToConvertItems);
