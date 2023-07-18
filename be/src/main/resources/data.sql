SET foreign_key_checks = 0;
-- location 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`location` (`city`, `district`, `town`)
VALUES ('서울', '강남구', '역삼1동'),
       ('서울', '강남구', '역삼2동'),
       ('서울', '강남구', '개포1동'),
       ('서울', '강남구', '개포2동'),
       ('서울', '강남구', '개포3동'),
       ('서울', '강남구', '개포4동');

-- member 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`member` (`main_location_idx`, `sub_location_idx`, `login_id`, `password`, `image_url`)
VALUES (1, 2, 'snoop', 12345, 'www.profileimgurl1.com'),
       (2, 3, 'poco', 12345, NULL),
       (4, NULL, 'roy', 12345, 'www.profileimgurl2.com'),
       (1, 5, 'gomungnam', 12345, NULL),
       (3, 5, 'sol', 12345, 'www.profileimgurl3.com'),
       (5, 6, 'wood', 12345, 'www.profileimgurl4.com');

-- category 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`category` (`category_idx`, `name`, `image_url`)
VALUES (1, '디지털기기', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/01_digital.png'),
       (2, '생활가전', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/02_living.png'),
       (3, '가구/인테리어',
        'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/03_furniture.png'),
       (4, '생활/주방', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/04_kitchen.png'),
       (5, '유아동', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/05_baby.png'),
       (6, '유아도서', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/06_baby-book.png'),
       (7, '여성의류',
        'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/07_woman-apparel.png'),
       (8, '여성잡화',
        'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/08_woman-accessories.png'),
       (9, '남성패션/잡화',
        'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/09_man-apparel.png'),
       (10, '뷰티/미용', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/10_beauty.png'),
       (11, '스포츠/레저', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/11_sports.png'),
       (12, '취미/게임/음반', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/12_game.png'),
       (13, '중고차', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/13_car.png'),
       (14, '티켓/교환권', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/14_ticket.png'),
       (15, '가공식품',
        'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/15_processed-foods.png'),
       (16, '반려동물용품', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/16_pet.png'),
       (17, '식물', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/17_plant.png'),
       (18, '기타 중고물품', 'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/category-icons/18_etc.png');


-- item_image 테이블에 더미 데이터 추가
INSERT INTO `second-hand`.`item_image` (`item_image_idx`, `item_idx`, `image_url`)
VALUES (1, 1,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/29be88f4ac04e011747aa85125cca54b1953cd1474711d9585bf94199b32277c_0.webp?q=82&s=300x300&t=crop'),
       (2, 2,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/4173208b06917ddb42a643d364d68acc20d4e8174bc744d788f33fc9294904dc.jpg?q=82&s=300x300&t=crop'),
       (3, 3,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/9830e6c317f7e3c04fd818bf4155e9879d3c4674c0016e31131572c21320d33d_0.webp?q=82&s=300x300&t=crop'),
       (4, 4,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/770caa3c7743983c3b4cf7f10718bc52625681b9f37fb864961984ecc9d63d94_0.webp?q=82&s=300x300&t=crop'),
       (5, 5,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ec66586e653bde5bd9c871d6925cdd09f0447a69ad4d4a1beac9a73178c81b7f_0.webp?q=82&s=300x300&t=crop'),
       (6, 6,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/adc53dd652051e4f9f209f056f8111869756af1322d9be2c1351ef813d16e112_0.webp?q=82&s=300x300&t=crop'),
       (7, 7,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6c7c75ca527ccd3a5903bddbdcc3e06a5cccda34d795458dca8413e67c7aafe2.jpg?q=82&s=300x300&t=crop'),
       (8, 8,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/95f57e55f55507f9f7e0adabdc66588f9fb86ea151d0881a79ffa63eeb1f7086_0.webp?q=82&s=300x300&t=crop'),
       (9, 9,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/097b102f37825a368bdd665cf422202927b89a9db8bb5c4387ee7aa29c5fb874.jpg?q=82&s=300x300&t=crop'),
       (10, 10,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/4cbce17c4e840f3256cb73089d5727d76bd81d8c07a1ffe5dd8055d1a070d1b6.jpg?q=82&s=300x300&t=crop'),
       (11, 11,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/dab0fa2055a4d5fca96a30aaa81b1b104fb6de3e767e8b7584035d70ae4db0e4.jpg?q=82&s=300x300&t=crop'),
       (12, 12,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/817c031ea4e8ecea2a26877a426f12e04479f958d4c45d971945979d9367d41b.jpg?q=82&s=300x300&t=crop'),
       (13, 13,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1646e52cc0b6e9c559c48b2c68991d7122bdd35d818d6460a0280d6ef374ad36.jpg?q=82&s=300x300&t=crop'),
       (14, 14,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ce7a4f18fd1ad71b65d588037a34a7005905c5016407fb186d54d3806d8a5073_0.webp?q=82&s=300x300&t=crop'),
       (15, 15,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a67622bf861e65e2e79bc9896606636bcb27193c74f7a6c2024447127e8e2120_0.webp?q=82&s=300x300&t=crop'),
       (16, 16,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6b322de4facc5c2a761ba829604f8828addc603f914faf00678f668910f9a45f.jpg?q=82&s=300x300&t=crop'),
       (17, 17,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/11155c97602bbbbc6baf75cf0456e6f60c172939c2c3eca92ddb4ce5a87b5229_0.webp?q=82&s=300x300&t=crop'),
       (18, 18,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/73e56fc2641688c6ab6f16372e40e6e0cef02dd62a68724e76fa60fced1ea1f9_0.webp?q=82&s=300x300&t=crop'),
       (19, 19,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ebf600c90fdc1b6d9933a239ffe40d2915c9be5f1455b2d0704c10fd2143d11b.jpg?q=82&s=300x300&t=crop'),
       (20, 20,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/70cd76be273356f2d19a8cde99e550de181df0413e0285ed43a2aa9cc6f2c909.jpg?q=82&s=300x300&t=crop'),
       (21, 21,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/cf13ce839dac37d2ec3f20acad1faa5f2ffea3b5cb5dce22218d49231a889cfa_0.webp?q=82&s=300x300&t=crop'),
       (22, 22,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/e37049f0f2bc70b3dd4485dcf3b848d3fab46f78734b91ed9b12b471abad417e_0.webp?q=82&s=300x300&t=crop'),
       (23, 23,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3f736f070d4ae369e6c9b6d01a2a9e1b9304f7a2c78b6b3ee5ad9dc43fc5fd8a.webp?q=82&s=300x300&t=crop'),
       (24, 24,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7272d0a36cf42fdd798bffa8f878ba5663190595e59f915953ca9e696f385e22_0.webp?q=82&s=300x300&t=crop'),
       (25, 25,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5ac9fab41825d75f84672d58e3e6d0c5c4ed6df23e1771437f2216c0ed547229_0.webp?q=82&s=300x300&t=crop'),
       (26, 26,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/fd7631ab68bcda828c14d1926e399b402674f9c09ce26839d0dd4828686844e9.jpg?q=82&s=300x300&t=crop'),
       (27, 27,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1a923a1304c72143387632db9bc9e3973d4d9e2947dfb6ad0095754be62bd528_0.webp?q=82&s=300x300&t=crop'),
       (28, 28,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6b43586df91806c45c8aaec186503c4dd2b5aefdc73ce418b250166b9b7213e8.jpg?q=82&s=300x300&t=crop'),
       (29, 29,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/d0c6165d4540d04b7e26b509f113e14f10fb77014bfba21bb8139d1c4b72acc8.jpg?q=82&s=300x300&t=crop'),
       (30, 30,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/4800c55830d6d8a7e2b6226c9ccfd41760aea5d24de02b006fa684c96e515ff8.jpg?q=82&s=300x300&t=crop'),
       (31, 31,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/2cc54cb805583200e55505b9cd93d009042310b3f719b8929b150952f8181417.jpg?q=82&s=300x300&t=crop'),
       (32, 32,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7b5fa795498b1a7c76929dbcbc911500bf6444522b43e7df21de6c6bae3fc41e.jpg?q=82&s=300x300&t=crop'),
       (33, 33,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/278e6a15025e25d059ef247659cde90a458e7b3748e59a0c8ba5949c1689436b.jpg?q=82&s=300x300&t=crop'),
       (34, 34,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/42ec4e59bd560e9e8be641fc34de760913033cf9a6fbe1631d63fbab952efab1_0.webp?q=82&s=300x300&t=crop'),
       (35, 35,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/161801f51421c3c2397ffd37f7f9fbb3df6284665972ee6d3f2a752924be8d24_0.webp?q=82&s=300x300&t=crop'),
       (36, 36,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/fc6582158407fbbbec600389f7d4e3e42006f29f2a510ad0da52850af518f15b.jpg?q=82&s=300x300&t=crop'),
       (37, 37,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/facb01dd8e87e6950a8550887db0bb7ecffc11bdad2acb96a5500a3a08650bc0.jpg?q=82&s=300x300&t=crop'),
       (38, 38,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3745fc32ea664ad564843269e08e9722377574b8435c9280afbb68a0630d41ea.jpg?q=82&s=300x300&t=crop'),
       (39, 39,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/40b1c0f5e604239f3a627e4b41b03e4a3c7fcfaf6cb630ad04040297a0eb7f50.jpg?q=82&s=300x300&t=crop'),
       (40, 40,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/40af524376e649346b374b5ab6784d7b74e0540f2d3fb9a5192711b40746a272.jpg?q=82&s=300x300&t=crop'),
       (41, 41,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/BF14FD15ACE46F0A0C46379049A65EB9C941EAE7350C194AC61EF065E194A1B3.jpg?q=82&s=300x300&t=crop'),
       (42, 42,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/d3ffb53216e7283dff66b6c90eeb92c99461a39ee7e95716041550a2e68650fe_0.webp?q=82&s=300x300&t=crop'),
       (43, 43,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/8c4bc0896af34b1e68f3615fd16318b14f5a97c470e1a8dac776c8ed2f44f08a_0.webp?q=82&s=300x300&t=crop'),
       (44, 44,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a132fc765b11440596d21bdd6c4419b009b36de00a6a274dc6a29a8259c10acf_0.webp?q=82&s=300x300&t=crop'),
       (45, 45,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5752fbad88ec500e21fdc6f4c8922b9de31ab53c0290a3701fc78839b9fca071.jpg?q=82&s=300x300&t=crop'),
       (46, 46,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3919d56ca0b78a7711170b0b2c7b76201b90d189cdea98e6b6ea34c581f05e19.jpg?q=82&s=300x300&t=crop'),
       (47, 47,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/25e0088bea65a77a8062f2238c56eddb7ea4ca08501091a83a5621b0244c8975_0.webp?q=82&s=300x300&t=crop'),
       (48, 48,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/9664b3231afba903a6e84cc13350e5af86a31ae2b56c06ad2823b9fec70c052d.jpg?q=82&s=300x300&t=crop'),
       (49, 49,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/17cb530007a15d8759bdb6f82bfa7d69b82032e109e5fff2339e063ff200fbcb.jpg?q=82&s=300x300&t=crop'),
       (50, 50,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/96578f3e04f0309fb59f34ab0f5e43426ce512d7a9a0a2bc3a0d75bd0906ac0b_0.webp?q=82&s=300x300&t=crop'),
       (51, 51,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7147c7266bae54b7496dc1dd12522985f6b382b4061f77403a263e2d48079e08.jpg?q=82&s=300x300&t=crop'),
       (52, 52,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/9ba7a24da2832e01af18b78388f2b47407da10d80e3e2d609b88ad7e77eaf0d3_0.webp?q=82&s=300x300&t=crop'),
       (53, 53,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/762f069c2fc4f4281d5caf3f1c72d1207a4cd76a71cbb4718edb604f3c0ce133.jpg?q=82&s=300x300&t=crop'),
       (54, 54,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/C09236FED4B9AD401525B096650127C24179BABEEC166B41D7F5F90BCC1ED0E6.jpg?q=82&s=300x300&t=crop'),
       (55, 55,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/7410e9ea92b369bbb2e6c4b6ef48976edf1033ed7767c567138bd0bdfb65d242.jpg?q=82&s=300x300&t=crop'),
       (56, 56,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ee1976ecb404a5ee8867e64f3c55d42dc9a9d880b600534c90b41a2b79d4ebd5_0.webp?q=82&s=300x300&t=crop'),
       (57, 57,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/b9aac87989c10dab049db45addab7d734f63671196b557fb6f8789899b57a595.jpg?q=82&s=300x300&t=crop'),
       (58, 58,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/e980b8df3206c7c24b385dad816566cde93c84b418d8212cb6177d7f2de1cceb_0.webp?q=82&s=300x300&t=crop'),
       (59, 59,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/c801a134905b581314a2c87b5a2dd2c201fe84e256f7db9d7124996cbbe9c562_0.webp?q=82&s=300x300&t=crop'),
       (60, 60,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/712dfa0a3588816d7ab7d227a1e5ea5ea850ab8a8c3cf6e53e0c8a28bef424e0_0.webp?q=82&s=300x300&t=crop'),
       (61, 61,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/0432ae46374b1c17600b5e277beb1c7566ff3834ae1d85090d263e72f54f619b.jpg?q=82&s=300x300&t=crop'),
       (62, 62,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/59c6efb4f13bace8bb0d318b1bdfa63d3de41a19434a2074978662d996aba1ba.jpg?q=82&s=300x300&t=crop'),
       (63, 63,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/62020b558864d3002122eec4ee171ed72f8c29bfb111e463a1b8c65c99769ade_0.webp?q=82&s=300x300&t=crop'),
       (64, 64,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/31c001ac0a26cc0f44a29a4f34f4cc06d1296209505e27dc469d4fecc09f70c5.jpg?q=82&s=300x300&t=crop'),
       (65, 65,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/e686d55c9cb72164a3fdf4fde09b25ceb6c7d8d2a15aa629ef145c05fe32e3cd.jpg?q=82&s=300x300&t=crop'),
       (66, 66,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6bed6ed90133acbacc191db3de841a2fc0fb70eac150d33844cbdb348adeab09_0.webp?q=82&s=300x300&t=crop'),
       (67, 67,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/8d3e9bab2993acc944a2b2f8d83cfc743981e13eb1afd2e45d657f670e707124.jpg?q=82&s=300x300&t=crop'),
       (68, 68,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/68b0c4bdf5d16668b379548765922a0193cc61b4963a9311a0109331228c9cfd.jpg?q=82&s=300x300&t=crop'),
       (69, 69,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/39d7bd8f45cebbbb0e734c6f54ce86184533a91d2dc27e16fb470a873401afea_0.webp?q=82&s=300x300&t=crop'),
       (70, 70,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6108e00b01532cec7e576838f7b5f111b76b56f502bbbee371bc20ea835628b4_0.webp?q=82&s=300x300&t=crop'),
       (71, 71,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/de45187ced4d6d9e0ac53372fd64950f7ea110dd2991a9a9cecd098883a748ce.jpg?q=82&s=300x300&t=crop'),
       (72, 72,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/F7A7789A4FCC434C4E38765B1556E496A27C754CB7B727D97C38539F846A1E04.jpg?q=82&s=300x300&t=crop'),
       (73, 73,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5eea4ad796ab840df6e97b66ca517c0f47334f8e87e2e8e5d849158b18100abe.jpg?q=82&s=300x300&t=crop'),
       (74, 74,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/481b651b99e54be6828b6bb93d5d8a8ab9ca45a97443cd90aa72860e6a9beb47.jpg?q=82&s=300x300&t=crop'),
       (75, 75,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/24362e74404fb4b3064251223051c170e669888866e7a38f85cdf2af550d2687_0.webp?q=82&s=300x300&t=crop'),
       (76, 76,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/d2e71eba1b323f0d3811510ab5c7acdbeb9b9e0150e64f39ba85f4addbdc9790.jpg?q=82&s=300x300&t=crop'),
       (77, 77,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/81ed4e114d6e7551a35cbffc44172ad6cf53af58a14c36951bfefce49188dd43_0.webp?q=82&s=300x300&t=crop'),
       (78, 78,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ecd6b400997691a1c7f36f7a503d4a8db3de353b4e09de69b590e303dba9e1c1.jpg?q=82&s=300x300&t=crop'),
       (79, 79,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/2feee78f4c83ee44544e399800a352d923d606cf37af5023ccea2587188ada2f_0.webp?q=82&s=300x300&t=crop'),
       (80, 80,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/f9e0296fab04fb491b3378c00aabc7d73fa0b190352f9f74c8f6b956826f7539.jpg?q=82&s=300x300&t=crop'),
       (81, 81,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1d0653b74783e14187743a0f3ef8b45a8993281daa8e200ffc98da2feb9a904c.jpg?q=82&s=300x300&t=crop'),
       (82, 82,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/235d2aabab04b38c1cdeb76917f5c84337b4a085c339feb461601307d91ef82b.jpg?q=82&s=300x300&t=crop'),
       (83, 83,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/de30d8a30f2fcce0afd6c3ef9a13159bdea95cf81fa96c80bff00f5dcfcc5d1d.jpg?q=82&s=300x300&t=crop'),
       (84, 84,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a645f567650b7d77cabfa3c59178d79c78cf6ebcf1dce1e0053782685f6ec184_0.webp?q=82&s=300x300&t=crop'),
       (85, 85,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/f60df894d9c2c9da169642981c4aeb17f9a1b0ecd62cb229a4466134e19d9485.jpg?q=82&s=300x300&t=crop'),
       (86, 86,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/63037c7f1ba71650267f9dd64bf12e28ae75fad90d240840c5215c9989325a7b.jpg?q=82&s=300x300&t=crop'),
       (87, 87,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/bd002a3cd6c3f01d393dee3401a169607c12dced2923f8e992c9b1a0a6b8324a.jpg?q=82&s=300x300&t=crop'),
       (88, 88,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/5bf96be119dc7cbdff3f77a5a3397f3f4d055feb557a5dd06144e4791505fecb.jpg?q=82&s=300x300&t=crop'),
       (89, 89,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/500d2945584cebffcca9d6d6c8441b71e19edc349a322189224f21ba7b454153_0.webp?q=82&s=300x300&t=crop'),
       (90, 90,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/60945aa8d1ff1b452dec98cd87f22b0ac6db0a0530f8d9554b6ba9c25c279b24.jpg?q=82&s=300x300&t=crop'),
       (91, 91,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/47e0a6d1561d0f662a42de5fbb88cb025c1c15d2018ffd8ea02b5083d245dbce.jpg?q=82&s=300x300&t=crop'),
       (92, 92,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/85392ffe39083e65a7a4098e6b8e3644738da5ef7c76825cca7c4a7477bd1fdc_0.webp?q=82&s=300x300&t=crop'),
       (93, 93,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/1322D46DF3E5038EC632BEB2DE66959F83F06F87BB31713DDC73E350ABD45AA5.jpg?q=82&s=300x300&t=crop'),
       (94, 94,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/a3ff5459b8b23c09f457778bcd09b688b455a8d7f77077c43bf26b8168bea044_0.webp?q=82&s=300x300&t=crop'),
       (95, 95,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/6d8a80f94965f0521e77dd1a2eb2da2304b3f21c9146ae27b9f22166e112f39a.jpg?q=82&s=300x300&t=crop'),
       (96, 96,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/63fc70930ab7815e46dbc82e228b50d2033a0202f41e667a19bab5530c8635f2_0.webp?q=82&s=300x300&t=crop'),
       (97, 97,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/8865151ccb6851cfa714e2514d775a8d8cf75eec244d5451a6247582522843aa.jpg?q=82&s=300x300&t=crop'),
       (98, 98,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/96a3d8ae43aa84992f42bd16029fa9603b006bd480baa750294231b08cd666d0.jpg?q=82&s=300x300&t=crop'),
       (99, 99,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/3712d04c7507170d95448c372a0ffe649d4d4398e5edae6f9994d8831e83494e.jpg?q=82&s=300x300&t=crop'),
       (100, 100,
        'https://dnvefa72aowie.cloudfront.net/origin/article/202306/ef7420ad8c92655e136226b6488498f08f40c31b08d54b78d432d7678d472b94.jpg?q=82&s=300x300&t=crop');

INSERT INTO `second-hand`.`item` (`seller_idx`, `category_idx`, `location_idx`, `main_image_idx`, `posted_at`,
                                  `last_modified_at`, `name`,
                                  `description`, `price`, `view`, `status`)
VALUES (1, 18, 2, 1, '2022-06-30 13:13:56', '2023-07-18 17:13:56', 'Quas.', 'Nesciunt suscipit ipsa deleniti.', 63013,
        24, '판매중'),
       (1, 17, 2, 2, '2023-05-05 05:44:40', '2023-07-18 17:13:56', 'Ducimus.', 'NULL', 971008, 5, '판매중'),
       (3, 11, 6, 3, '2022-10-23 06:59:09', '2023-07-18 17:13:56', 'Doloribus.', 'A nam eos vel asperiores deserunt.',
        57369, 28, '판매중'),
       (1, 1, 6, 4, '2023-01-12 11:26:31', '2023-07-18 17:13:56', 'Corrupti.', 'Sequi sunt voluptatem.', 217542, 3,
        '판매중'),
       (3, 8, 4, 5, '2023-06-13 09:11:37', '2023-07-18 17:13:56', 'Eius.',
        'Dignissimos at accusantium eum recusandae ipsam.', 28937, 11,
        '예약중'),
       (1, 10, 4, 6, '2022-10-03 03:12:18', '2023-07-18 17:13:56', 'Nam animi.',
        'Nemo ex fugiat atque sunt voluptate minus.', 380813, 27,
        '예약중'),
       (1, 3, 2, 7, '2022-11-29 17:23:44', '2023-07-18 17:13:56', 'Dolorem.',
        'Est error accusamus praesentium nesciunt.', 782579, 14, '예약중'),
       (3, 11, 2, 8, '2023-03-16 19:10:37', '2023-07-18 17:13:56', 'Nemo aut.',
        'Optio facere impedit cum qui dolorum assumenda.', 456920, 16,
        '예약중'),
       (2, 13, 2, 9, '2022-08-19 03:57:37', '2023-07-18 17:13:56', 'Minus.', 'Amet sequi ab dicta eos.', 986458, 2,
        '판매중'),
       (3, 3, 3, 10, '2023-05-17 06:21:12', '2023-07-18 17:13:56', 'Facilis.', 'Soluta quae saepe ratione.', 758207, 26,
        '예약중'),
       (2, 3, 3, 11, '2022-11-05 13:19:10', '2023-07-18 17:13:56', 'Fugit id.', 'Modi saepe iste recusandae.', 395624,
        27, '예약중'),
       (3, 16, 3, 12, '2022-12-15 18:14:32', '2023-07-18 17:13:56', 'Excepturi.',
        'Reiciendis iusto totam. Nam molestias nesciunt.', 91618, 17,
        '판매중'),
       (3, 8, 2, 13, '2023-03-25 14:44:25', '2023-07-18 17:13:56', 'Cumque.', 'Assumenda at corporis fugit.', 836506, 4,
        '판매중'),
       (4, 1, 6, 14, '2022-08-12 10:13:46', '2023-07-18 17:13:56', 'Quasi hic.', 'Magni ab repudiandae totam nulla.',
        903420, 1, '판매중'),
       (6, 4, 2, 15, '2022-10-08 22:11:33', '2023-07-18 17:13:56', 'Ad.', 'NULL', 406149, 0, '판매중'),
       (1, 12, 5, 16, '2023-01-12 15:10:27', '2023-07-18 17:13:56', 'Eos.', 'Voluptates beatae quos tempore.', 514007,
        26, '판매중'),
       (6, 6, 1, 17, '2023-05-16 17:16:05', '2023-07-18 17:13:56', 'Eius unde.', 'NULL', 814857, 19, '판매중'),
       (2, 4, 1, 18, '2023-04-25 17:27:02', '2023-07-18 17:13:56', 'Illo.', 'NULL', 884301, 0, '판매중'),
       (6, 7, 1, 19, '2023-05-18 09:47:11', '2023-07-18 17:13:56', 'Suscipit.',
        'Quaerat soluta dolor cum eaque eligendi enim.', 782889, 16,
        '예약중'),
       (2, 6, 6, 20, '2022-08-24 15:22:13', '2023-07-18 17:13:56', 'Ea aut.',
        'Labore occaecati enim sapiente sunt quos.', 845275, 2, '판매중'),
       (5, 12, 3, 21, '2023-05-01 20:15:15', '2023-07-18 17:13:56', 'Laborum.', 'NULL', 976247, 9, '판매중'),
       (6, 9, 3, 22, '2022-12-01 18:17:50', '2023-07-18 17:13:56', 'Maxime.', 'Ad debitis praesentium assumenda est.',
        267299, 10, '판매중'),
       (5, 18, 5, 23, '2022-10-21 00:19:05', '2023-07-18 17:13:56', 'Iste eos.', 'NULL', 977083, 2, '예약중'),
       (5, 4, 4, 24, '2023-05-11 19:11:16', '2023-07-18 17:13:56', 'Nobis.',
        'Excepturi reprehenderit assumenda consequatur.', 145118, 5,
        '판매중'),
       (1, 10, 2, 25, '2022-12-23 21:33:48', '2023-07-18 17:13:56', 'Quaerat.', 'NULL', 226762, 23, '판매중'),
       (5, 8, 5, 26, '2023-03-17 09:03:19', '2023-07-18 17:13:56', 'Quo.',
        'Illo quibusdam neque tempora commodi porro omnis.', 782564, 5,
        '판매중'),
       (1, 11, 6, 27, '2023-02-25 02:34:59', '2023-07-18 17:13:56', 'Harum.', 'Sed adipisci exercitationem minus.',
        844269, 1, '판매중'),
       (5, 1, 1, 28, '2022-06-22 21:27:33', '2023-07-18 17:13:56', 'Beatae.', 'Architecto mollitia ab aliquid ullam.',
        712027, 30, '판매중'),
       (4, 18, 4, 29, '2023-01-31 15:54:55', '2023-07-18 17:13:56', 'Libero id.',
        'Praesentium eveniet modi voluptas velit dolorem.', 726874,
        26, '예약중'),
       (1, 9, 2, 30, '2022-07-01 04:37:29', '2023-07-18 17:13:56', 'Voluptate.', 'Excepturi quam earum beatae at.',
        138158, 22, '판매중'),
       (5, 4, 1, 31, '2023-02-06 14:51:37', '2023-07-18 17:13:56', 'Error.', 'Magnam sunt magnam deleniti.', 547253, 2,
        '판매중'),
       (3, 2, 4, 32, '2023-06-01 02:56:08', '2023-07-18 17:13:56', 'Fugiat.', 'Deleniti cum totam sunt corporis.',
        852661, 9, '판매중'),
       (6, 11, 2, 33, '2023-01-17 08:38:14', '2023-07-18 17:13:56', 'Assumenda.', 'Unde amet quisquam sed.', 693388, 28,
        '판매중'),
       (1, 1, 6, 34, '2023-04-06 16:11:46', '2023-07-18 17:13:56', 'Quas.', 'Incidunt omnis quia deleniti.', 151748, 4,
        '판매중'),
       (4, 12, 5, 35, '2023-05-06 01:40:31', '2023-07-18 17:13:56', 'Ab nisi.', 'Nulla commodi ut dolore.', 590043, 12,
        '판매중'),
       (1, 13, 1, 36, '2022-09-13 20:04:02', '2023-07-18 17:13:56', 'Fuga.', 'Magni optio voluptate ut est.', 348646,
        14, '예약중'),
       (6, 16, 6, 37, '2023-01-19 19:17:43', '2023-07-18 17:13:56', 'Culpa.',
        'Eveniet hic molestiae fuga velit tempora.', 588017, 7, '판매중'),
       (3, 9, 3, 38, '2022-11-02 03:02:41', '2023-07-18 17:13:56', 'Quasi.',
        'Ab mollitia facilis consequuntur voluptates esse.', 957248, 29,
        '예약중'),
       (4, 3, 3, 39, '2022-11-07 00:55:06', '2023-07-18 17:13:56', 'Non enim.', 'NULL', 832758, 21, '판매중'),
       (2, 12, 1, 40, '2023-01-13 03:59:51', '2023-07-18 17:13:56', 'Soluta.', 'Eius officia asperiores numquam.',
        385207, 16, '판매중'),
       (2, 1, 4, 41, '2022-10-29 13:50:34', '2023-07-18 17:13:56', 'Hic.',
        'Alias corporis saepe. Veniam perferendis nobis.', 666125, 15,
        '판매중'),
       (5, 11, 1, 42, '2023-03-01 19:36:15', '2023-07-18 17:13:56', 'Quasi.', 'Perspiciatis assumenda dolor.', 211310,
        15, '판매중'),
       (5, 5, 5, 43, '2022-07-15 10:19:35', '2023-07-18 17:13:56', 'Amet.', 'Quibusdam beatae beatae. Sunt illum fuga.',
        603808, 2, '예약중'),
       (4, 4, 4, 44, '2022-11-17 02:34:33', '2023-07-18 17:13:56', 'Possimus.', 'Sint quod minus esse magni dolores.',
        348623, 19, '판매중'),
       (3, 14, 1, 45, '2023-04-08 10:37:31', '2023-07-18 17:13:56', 'Non.',
        'Aperiam impedit officia explicabo laudantium.', 543583, 16,
        '예약중'),
       (6, 5, 2, 46, '2022-06-29 03:25:35', '2023-07-18 17:13:56', 'Amet.', 'NULL', 670910, 13, '판매중'),
       (4, 5, 2, 47, '2022-12-05 02:53:23', '2023-07-18 17:13:56', 'Dolorem.', 'Natus facere quis unde temporibus.',
        514309, 30, '예약중'),
       (5, 3, 6, 48, '2022-12-30 19:14:42', '2023-07-18 17:13:56', 'Veritatis.', 'Totam animi culpa eius aut.', 869493,
        24, '판매중'),
       (4, 2, 6, 49, '2023-03-06 05:29:26', '2023-07-18 17:13:56', 'Atque.', 'Sed alias ab.', 986213, 5, '판매중'),
       (1, 2, 1, 50, '2023-02-28 01:00:30', '2023-07-18 17:13:56', 'Non nobis.',
        'Ut corporis ad eaque cumque explicabo.', 505242, 16, '예약중'),
       (5, 14, 3, 51, '2023-05-05 07:59:20', '2023-07-18 17:13:56', 'Earum.',
        'Ipsum ratione impedit ipsum nobis facilis.', 774970, 26, '판매중'),
       (1, 6, 5, 52, '2022-12-12 04:19:26', '2023-07-18 17:13:56', 'Earum.', 'Iure et excepturi magni.', 534655, 18,
        '예약중'),
       (6, 2, 2, 53, '2023-04-15 23:45:15', '2023-07-18 17:13:56', 'Quo iure.',
        'Dolores accusamus velit nemo eaque eum.', 840806, 20, '판매중'),
       (1, 9, 6, 54, '2023-03-05 18:32:36', '2023-07-18 17:13:56', 'Autem.', 'NULL', 978002, 29, '예약중'),
       (5, 1, 2, 55, '2022-11-16 06:02:06', '2023-07-18 17:13:56', 'Odio.',
        'Sequi tenetur cupiditate quis porro unde facilis.', 412116, 9,
        '판매중'),
       (6, 2, 3, 56, '2022-12-09 18:19:16', '2023-07-18 17:13:56', 'Quos.', 'Praesentium at id accusamus inventore.',
        379970, 6, '판매중'),
       (5, 14, 6, 57, '2022-09-10 05:53:38', '2023-07-18 17:13:56', 'Ipsum.', 'NULL', 867724, 2, '판매중'),
       (2, 7, 6, 58, '2022-08-24 06:46:23', '2023-07-18 17:13:56', 'Quaerat.',
        'Molestiae dolores provident quam temporibus.', 971083, 18,
        '판매중'),
       (2, 17, 6, 59, '2022-11-18 19:02:41', '2023-07-18 17:13:56', 'Adipisci.', 'Minima ut expedita corporis.', 255813,
        10, '판매중'),
       (6, 12, 2, 60, '2023-02-01 12:49:21', '2023-07-18 17:13:56', 'Modi.', 'Nihil esse ipsa eaque eaque quod nulla.',
        940576, 14, '판매중'),
       (1, 3, 2, 61, '2022-09-25 01:35:37', '2023-07-18 17:13:56', 'Dolor.', 'NULL', 497211, 12, '판매중'),
       (4, 6, 6, 62, '2023-02-18 14:06:11', '2023-07-18 17:13:56', 'Illum.', 'NULL', 357037, 13, '판매중'),
       (5, 12, 6, 63, '2022-12-09 17:41:44', '2023-07-18 17:13:56', 'Labore.', 'Asperiores illo voluptas ipsa vero.',
        714861, 27, '판매중'),
       (6, 5, 2, 64, '2023-06-02 20:39:02', '2023-07-18 17:13:56', 'Dolor.', 'Deserunt nesciunt animi.', 891555, 22,
        '판매중'),
       (3, 3, 6, 65, '2022-12-31 21:55:39', '2023-07-18 17:13:56', 'Eos.', 'Nam ratione culpa optio exercitationem.',
        205833, 27, '예약중'),
       (2, 8, 3, 66, '2023-03-01 21:27:28', '2023-07-18 17:13:56', 'Placeat.', 'NULL', 458725, 15, '예약중'),
       (5, 13, 4, 67, '2022-11-18 19:30:42', '2023-07-18 17:13:56', 'Id.',
        'Harum eius libero. Temporibus fugiat libero esse.', 63142, 10,
        '판매중'),
       (3, 7, 5, 68, '2023-05-06 11:10:38', '2023-07-18 17:13:56', 'Veritatis.',
        'Asperiores voluptatem error eius aspernatur.', 60347, 4,
        '판매중'),
       (5, 6, 2, 69, '2023-01-11 05:01:44', '2023-07-18 17:13:56', 'Ratione.', 'Deleniti molestias voluptatibus rem.',
        78983, 26, '판매중'),
       (6, 8, 1, 70, '2022-11-18 22:01:13', '2023-07-18 17:13:56', 'Saepe ut.', 'NULL', 273951, 8, '판매중'),
       (5, 15, 3, 71, '2023-04-19 11:12:02', '2023-07-18 17:13:56', 'Odio.', 'Laboriosam harum non optio quidem.',
        614243, 14, '판매중'),
       (2, 10, 2, 72, '2022-12-16 20:29:11', '2023-07-18 17:13:56', 'Deserunt.', 'Accusantium totam amet.', 848305, 8,
        '판매중'),
       (3, 3, 6, 73, '2023-03-22 23:38:28', '2023-07-18 17:13:56', 'Porro.', 'Eaque dolorem repudiandae at sit iure.',
        22309, 2, '판매중'),
       (5, 13, 3, 74, '2023-03-07 22:32:28', '2023-07-18 17:13:56', 'A velit.', 'Nesciunt fugit animi in esse.', 690780,
        12, '판매중'),
       (2, 7, 4, 75, '2023-04-11 18:00:42', '2023-07-18 17:13:56', 'In.', 'Officia consectetur atque.', 800976, 29,
        '판매중'),
       (3, 18, 6, 76, '2023-05-01 15:53:21', '2023-07-18 17:13:56', 'Ipsam.',
        'At recusandae cupiditate nobis sit quis.', 163684, 26, '판매중'),
       (2, 2, 3, 77, '2023-06-12 00:58:11', '2023-07-18 17:13:56', 'Dolorem.', 'NULL', 740465, 23, '판매중'),
       (3, 16, 1, 78, '2022-10-18 11:28:29', '2023-07-18 17:13:56', 'Quo.', 'Ex rerum quis occaecati nemo.', 178486, 29,
        '판매중'),
       (5, 2, 6, 79, '2022-11-17 03:26:17', '2023-07-18 17:13:56', 'Fuga.',
        'Nihil nihil libero expedita eos in quas aliquam.', 26861, 24,
        '판매중'),
       (5, 7, 5, 80, '2022-10-21 18:07:51', '2023-07-18 17:13:56', 'Deleniti.', 'NULL', 407559, 4, '판매중'),
       (3, 1, 1, 81, '2022-11-15 01:31:30', '2023-07-18 17:13:56', 'Ad.', 'NULL', 990757, 6, '판매중'),
       (3, 6, 4, 82, '2022-12-29 09:44:56', '2023-07-18 17:13:56', 'Voluptas.', 'Neque assumenda voluptas nulla eaque.',
        624741, 21, '예약중'),
       (4, 18, 4, 83, '2022-08-13 02:16:42', '2023-07-18 17:13:56', 'Sit.', 'Maxime optio vitae odit.', 692839, 2,
        '판매중'),
       (1, 12, 6, 84, '2023-01-23 15:30:46', '2023-07-18 17:13:56', 'Ad minima.',
        'Tenetur unde eligendi quis esse odit.', 938578, 8, '판매중'),
       (1, 16, 4, 85, '2022-06-19 07:41:32', '2023-07-18 17:13:56', 'Ipsa.', 'In enim porro molestias.', 863247, 6,
        '예약중'),
       (2, 11, 1, 86, '2023-01-11 02:06:54', '2023-07-18 17:13:56', 'Iure.', 'Illo eligendi ad vel.', 606123, 7, '예약중'),
       (5, 1, 1, 87, '2022-11-11 01:22:12', '2023-07-18 17:13:56', 'Inventore.', 'Fuga aliquid illo.', 413838, 1,
        '판매중'),
       (2, 12, 4, 88, '2022-07-25 06:55:04', '2023-07-18 17:13:56', 'Aliquid.',
        'Impedit sapiente unde quod porro odit.', 631707, 12, '판매중'),
       (2, 11, 2, 89, '2022-12-25 07:53:17', '2023-07-18 17:13:56', 'Enim cum.',
        'Mollitia quia voluptatibus architecto nesciunt.', 548409, 7,
        '판매중'),
       (1, 13, 5, 90, '2022-10-11 08:52:20', '2023-07-18 17:13:56', 'Odio.', 'Quasi dolorum sunt aspernatur.', 603850,
        15, '판매중'),
       (2, 11, 2, 91, '2022-09-28 13:38:49', '2023-07-18 17:13:56', 'Nisi.', 'NULL', 731976, 9, '판매중'),
       (3, 7, 3, 92, '2023-03-17 01:04:53', '2023-07-18 17:13:56', 'Atque.', 'NULL', 987644, 20, '예약중'),
       (6, 18, 1, 93, '2023-03-23 04:23:41', '2023-07-18 17:13:56', 'Maiores.', 'NULL', 683825, 13, '예약중'),
       (3, 17, 1, 94, '2023-01-08 12:56:03', '2023-07-18 17:13:56', 'Dolores.', 'Illum rem veniam odio fugit error.',
        560213, 18, '예약중'),
       (4, 17, 3, 95, '2022-12-17 03:03:58', '2023-07-18 17:13:56', 'Debitis.',
        'Voluptas laudantium id. Dolorum ea consequuntur.', 196200, 21,
        '판매중'),
       (3, 15, 4, 96, '2023-05-15 04:31:44', '2023-07-18 17:13:56', 'Eligendi.',
        'Rem nesciunt error deserunt nihil repudiandae.', 796712, 5,
        '판매중'),
       (1, 2, 2, 97, '2023-05-19 14:58:40', '2023-07-18 17:13:56', 'Quod.', 'Quidem modi labore error quas.', 86846, 21,
        '판매중'),
       (2, 10, 4, 98, '2023-05-01 02:39:17', '2023-07-18 17:13:56', 'Alias a.', 'Non voluptas a aliquam.', 669846, 18,
        '예약중'),
       (4, 16, 3, 99, '2023-05-20 09:58:34', '2023-07-18 17:13:56', 'Similique.', 'Quo qui modi ipsum.', 369860, 11,
        '판매중'),
       (4, 5, 5, 100, '2023-04-17 12:50:50', '2023-07-18 17:13:56', 'Sequi.', 'NULL', 319796, 28, '예약중');

-- item 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`interest` (`interest_idx`, `member_idx`, `item_idx`)
VALUES (1, 3, 29),
       (2, 4, 47),
       (3, 4, 8),
       (4, 2, 16),
       (5, 1, 6),
       (6, 2, 88),
       (7, 6, 38),
       (8, 1, 39),
       (9, 1, 69),
       (10, 3, 61),
       (11, 3, 28),
       (12, 1, 29),
       (13, 5, 69),
       (14, 2, 97),
       (15, 2, 74),
       (16, 2, 83),
       (17, 2, 61),
       (18, 3, 33),
       (19, 4, 61),
       (20, 6, 85),
       (21, 2, 54),
       (22, 4, 85),
       (23, 2, 94),
       (24, 2, 31),
       (25, 2, 11),
       (26, 4, 10),
       (27, 4, 15),
       (28, 5, 46),
       (29, 5, 59),
       (30, 5, 83),
       (31, 3, 79),
       (32, 5, 4),
       (33, 5, 8),
       (34, 2, 84),
       (35, 4, 70),
       (36, 6, 22),
       (37, 5, 42),
       (38, 5, 28),
       (39, 5, 51),
       (40, 3, 51),
       (41, 6, 49),
       (42, 6, 29),
       (43, 1, 81),
       (44, 1, 99),
       (45, 1, 43),
       (46, 4, 23),
       (47, 2, 9),
       (48, 4, 37),
       (49, 1, 26),
       (50, 4, 28);

-- interest 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`chat_room` (`chat_room_idx`, `item_idx`, `buyer_idx`)
VALUES (1, 54, 1),
       (2, 62, 4),
       (3, 26, 4),
       (4, 60, 5),
       (5, 21, 2),
       (6, 73, 2),
       (7, 97, 1),
       (8, 35, 4),
       (9, 12, 2),
       (10, 20, 2),
       (11, 94, 2),
       (12, 78, 6),
       (13, 58, 4),
       (14, 100, 6),
       (15, 29, 6),
       (16, 3, 1),
       (17, 71, 2),
       (18, 25, 1),
       (19, 23, 3),
       (20, 77, 1),
       (21, 88, 5),
       (22, 80, 6),
       (23, 6, 5),
       (24, 65, 2),
       (25, 17, 4),
       (26, 16, 4),
       (27, 86, 1),
       (28, 60, 3),
       (29, 54, 3),
       (30, 60, 1);

-- chat_room 테이블 더미 데이터 추가
SET foreign_key_checks = 1;
