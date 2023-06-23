
-- location 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`location` (`city`, `district`, `town`) VALUES
('서울', '강남구', '역삼1동'),
('서울', '강남구', '역삼2동'),
('서울', '강남구', '개포1동'),
('서울', '강남구', '개포2동'),
('서울', '강남구', '개포3동'),
('서울', '강남구', '개포4동');

-- member 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`member` (`main_location_idx`, `sub_location_idx`, `login_id`, `password`, `image_url`) VALUES
(1, 2, 'snoop', "12345", 'www.profileimgurl1.com'),
(2, 3, 'poco', "12345", NULL),
(4, NULL, 'roy', "12345", 'www.profileimgurl2.com'),
(1, 5, 'gomungnam', "12345", NULL),
(3, 5, 'sol', "12345", 'www.profileimgurl3.com'),
(5, 6, 'wood', "12345", 'www.profileimgurl4.com');

-- category 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`category` (`category_idx`, `name`, `image_url`) VALUES
(1, '디지털기기', 'www.imgurl1.com'),
(2, '생활가전', 'www.imgurl2.com'),
(3, '가구/인테리어', 'www.imgurl3.com'),
(4, '생활/주방', 'www.imgurl4.com'),
(5, '유아동', 'www.imgurl5.com'),
(6, '유아도서', 'www.imgurl6.com'),
(7, '여성의류', 'www.imgurl7.com'),
(8, '여성잡화', 'www.imgurl8.com'),
(9, '남성패션/잡화', 'www.imgurl9.com'),
(10, '뷰티/미용', 'www.imgurl10.com'),
(11, '스포츠/레저', 'www.imgurl11.com'),
(12, '취미/게임/음반', 'www.imgurl12.com'),
(13, '중고차', 'www.imgurl13.com'),
(14, '티켓/교환권', 'www.imgurl14.com'),
(15, '가공식품', 'www.imgurl15.com'),
(16, '반려동물용품', 'www.imgurl16.com'),
(17, '식물', 'www.imgurl17.com'),
(18, '기타 중고물품', 'www.imgurl18.com');

SET foreign_key_checks =0;

-- item_image 테이블에 더미 데이터 추가
INSERT INTO `second-hand`.`item_image` (`item_image_idx`, `item_idx`, `image_url`) VALUES
(1, 1, 'www.itemimageurl1.com'),
(2, 2, 'www.itemimageurl2.com'),
(3, 3, 'www.itemimageurl3.com'),
(4, 4, 'www.itemimageurl4.com'),
(5, 5, 'www.itemimageurl5.com'),
(6, 6, 'www.itemimageurl6.com'),
(7, 7, 'www.itemimageurl7.com'),
(8, 8, 'www.itemimageurl8.com'),
(9, 9, 'www.itemimageurl9.com'),
(10, 10, 'www.itemimageurl10.com'),
(11, 11, 'www.itemimageurl11.com'),
(12, 12, 'www.itemimageurl12.com'),
(13, 13, 'www.itemimageurl13.com'),
(14, 14, 'www.itemimageurl14.com'),
(15, 15, 'www.itemimageurl15.com'),
(16, 16, 'www.itemimageurl16.com'),
(17, 17, 'www.itemimageurl17.com'),
(18, 18, 'www.itemimageurl18.com'),
(19, 19, 'www.itemimageurl19.com'),
(20, 20, 'www.itemimageurl20.com'),
(21, 21, 'www.itemimageurl21.com'),
(22, 22, 'www.itemimageurl22.com'),
(23, 23, 'www.itemimageurl23.com'),
(24, 24, 'www.itemimageurl24.com'),
(25, 25, 'www.itemimageurl25.com'),
(26, 26, 'www.itemimageurl26.com'),
(27, 27, 'www.itemimageurl27.com'),
(28, 28, 'www.itemimageurl28.com'),
(29, 29, 'www.itemimageurl29.com'),
(30, 30, 'www.itemimageurl30.com'),
(31, 31, 'www.itemimageurl31.com'),
(32, 32, 'www.itemimageurl32.com'),
(33, 33, 'www.itemimageurl33.com'),
(34, 34, 'www.itemimageurl34.com'),
(35, 35, 'www.itemimageurl35.com'),
(36, 36, 'www.itemimageurl36.com'),
(37, 37, 'www.itemimageurl37.com'),
(38, 38, 'www.itemimageurl38.com'),
(39, 39, 'www.itemimageurl39.com'),
(40, 40, 'www.itemimageurl40.com'),
(41, 41, 'www.itemimageurl41.com'),
(42, 42, 'www.itemimageurl42.com'),
(43, 43, 'www.itemimageurl43.com'),
(44, 44, 'www.itemimageurl44.com'),
(45, 45, 'www.itemimageurl45.com'),
(46, 46, 'www.itemimageurl46.com'),
(47, 47, 'www.itemimageurl47.com'),
(48, 48, 'www.itemimageurl48.com'),
(49, 49, 'www.itemimageurl49.com'),
(50, 50, 'www.itemimageurl50.com'),
(51, 51, 'www.itemimageurl51.com'),
(52, 52, 'www.itemimageurl52.com'),
(53, 53, 'www.itemimageurl53.com'),
(54, 54, 'www.itemimageurl54.com'),
(55, 55, 'www.itemimageurl55.com'),
(56, 56, 'www.itemimageurl56.com'),
(57, 57, 'www.itemimageurl57.com'),
(58, 58, 'www.itemimageurl58.com'),
(59, 59, 'www.itemimageurl59.com'),
(60, 60, 'www.itemimageurl60.com'),
(61, 61, 'www.itemimageurl61.com'),
(62, 62, 'www.itemimageurl62.com'),
(63, 63, 'www.itemimageurl63.com'),
(64, 64, 'www.itemimageurl64.com'),
(65, 65, 'www.itemimageurl65.com'),
(66, 66, 'www.itemimageurl66.com'),
(67, 67, 'www.itemimageurl67.com'),
(68, 68, 'www.itemimageurl68.com'),
(69, 69, 'www.itemimageurl69.com'),
(70, 70, 'www.itemimageurl70.com'),
(71, 71, 'www.itemimageurl71.com'),
(72, 72, 'www.itemimageurl72.com'),
(73, 73, 'www.itemimageurl73.com'),
(74, 74, 'www.itemimageurl74.com'),
(75, 75, 'www.itemimageurl75.com'),
(76, 76, 'www.itemimageurl76.com'),
(77, 77, 'www.itemimageurl77.com'),
(78, 78, 'www.itemimageurl78.com'),
(79, 79, 'www.itemimageurl79.com'),
(80, 80, 'www.itemimageurl80.com'),
(81, 81, 'www.itemimageurl81.com'),
(82, 82, 'www.itemimageurl82.com'),
(83, 83, 'www.itemimageurl83.com'),
(84, 84, 'www.itemimageurl84.com'),
(85, 85, 'www.itemimageurl85.com'),
(86, 86, 'www.itemimageurl86.com'),
(87, 87, 'www.itemimageurl87.com'),
(88, 88, 'www.itemimageurl88.com'),
(89, 89, 'www.itemimageurl89.com'),
(90, 90, 'www.itemimageurl90.com'),
(91, 91, 'www.itemimageurl91.com'),
(92, 92, 'www.itemimageurl92.com'),
(93, 93, 'www.itemimageurl93.com'),
(94, 94, 'www.itemimageurl94.com'),
(95, 95, 'www.itemimageurl95.com'),
(96, 96, 'www.itemimageurl96.com'),
(97, 97, 'www.itemimageurl97.com'),
(98, 98, 'www.itemimageurl98.com'),
(99, 99, 'www.itemimageurl99.com'),
(100, 100, 'www.itemimageurl100.com');

SET foreign_key_checks =1;

-- item 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`item` (`seller_idx`, `category_idx`, `location_idx`, `main_image_idx`, `posted_at`, `name`, `description`, `price`, `view`, `status`) VALUES
(1, 18, 2, 1, '2022-06-30 13:13:56', 'Quas.', 'Nesciunt suscipit ipsa deleniti.', 63013, 24, '판매중'),
(1, 17, 2, 2, '2023-05-05 05:44:40', 'Ducimus.', 'NULL', 971008, 5, '판매중'),
(3, 11, 6, 3, '2022-10-23 06:59:09', 'Doloribus.', 'A nam eos vel asperiores deserunt.', 57369, 28, '판매중'),
(1, 1, 6, 4, '2023-01-12 11:26:31', 'Corrupti.', 'Sequi sunt voluptatem.', 217542, 3, '판매중'),
(3, 8, 4, 5, '2023-06-13 09:11:37', 'Eius.', 'Dignissimos at accusantium eum recusandae ipsam.', 28937, 11, '예약중'),
(1, 10, 4, 6, '2022-10-03 03:12:18', 'Nam animi.', 'Nemo ex fugiat atque sunt voluptate minus.', 380813, 27, '예약중'),
(1, 3, 2, 7, '2022-11-29 17:23:44', 'Dolorem.', 'Est error accusamus praesentium nesciunt.', 782579, 14, '예약중'),
(3, 11, 2, 8, '2023-03-16 19:10:37', 'Nemo aut.', 'Optio facere impedit cum qui dolorum assumenda.', 456920, 16, '예약중'),
(2, 13, 2, 9, '2022-08-19 03:57:37', 'Minus.', 'Amet sequi ab dicta eos.', 986458, 2, '판매중'),
(3, 3, 3, 10, '2023-05-17 06:21:12', 'Facilis.', 'Soluta quae saepe ratione.', 758207, 26, '예약중'),
(2, 3, 3, 11, '2022-11-05 13:19:10', 'Fugit id.', 'Modi saepe iste recusandae.', 395624, 27, '예약중'),
(3, 16, 3, 12, '2022-12-15 18:14:32', 'Excepturi.', 'Reiciendis iusto totam. Nam molestias nesciunt.', 91618, 17, '판매중'),
(3, 8, 2, 13, '2023-03-25 14:44:25', 'Cumque.', 'Assumenda at corporis fugit.', 836506, 4, '판매중'),
(4, 1, 6, 14, '2022-08-12 10:13:46', 'Quasi hic.', 'Magni ab repudiandae totam nulla.', 903420, 1, '판매중'),
(6, 4, 2, 15, '2022-10-08 22:11:33', 'Ad.', 'NULL', 406149, 0, '판매중'),
(1, 12, 5, 16, '2023-01-12 15:10:27', 'Eos.', 'Voluptates beatae quos tempore.', 514007, 26, '판매중'),
(6, 6, 1, 17, '2023-05-16 17:16:05', 'Eius unde.', 'NULL', 814857, 19, '판매중'),
(2, 4, 1, 18, '2023-04-25 17:27:02', 'Illo.', 'NULL', 884301, 0, '판매중'),
(6, 7, 1, 19, '2023-05-18 09:47:11', 'Suscipit.', 'Quaerat soluta dolor cum eaque eligendi enim.', 782889, 16, '예약중'),
(2, 6, 6, 20, '2022-08-24 15:22:13', 'Ea aut.', 'Labore occaecati enim sapiente sunt quos.', 845275, 2, '판매중'),
(5, 12, 3, 21, '2023-05-01 20:15:15', 'Laborum.', 'NULL', 976247, 9, '판매중'),
(6, 9, 3, 22, '2022-12-01 18:17:50', 'Maxime.', 'Ad debitis praesentium assumenda est.', 267299, 10, '판매중'),
(5, 18, 5, 23, '2022-10-21 00:19:05', 'Iste eos.', 'NULL', 977083, 2, '예약중'),
(5, 4, 4, 24, '2023-05-11 19:11:16', 'Nobis.', 'Excepturi reprehenderit assumenda consequatur.', 145118, 5, '판매중'),
(1, 10, 2, 25, '2022-12-23 21:33:48', 'Quaerat.', 'NULL', 226762, 23, '판매중'),
(5, 8, 5, 26, '2023-03-17 09:03:19', 'Quo.', 'Illo quibusdam neque tempora commodi porro omnis.', 782564, 5, '판매중'),
(1, 11, 6, 27, '2023-02-25 02:34:59', 'Harum.', 'Sed adipisci exercitationem minus.', 844269, 1, '판매중'),
(5, 1, 1, 28, '2022-06-22 21:27:33', 'Beatae.', 'Architecto mollitia ab aliquid ullam.', 712027, 30, '판매중'),
(4, 18, 4, 29, '2023-01-31 15:54:55', 'Libero id.', 'Praesentium eveniet modi voluptas velit dolorem.', 726874, 26, '예약중'),
(1, 9, 2, 30, '2022-07-01 04:37:29', 'Voluptate.', 'Excepturi quam earum beatae at.', 138158, 22, '판매중'),
(5, 4, 1, 31, '2023-02-06 14:51:37', 'Error.', 'Magnam sunt magnam deleniti.', 547253, 2, '판매중'),
(3, 2, 4, 32, '2023-06-01 02:56:08', 'Fugiat.', 'Deleniti cum totam sunt corporis.', 852661, 9, '판매중'),
(6, 11, 2, 33, '2023-01-17 08:38:14', 'Assumenda.', 'Unde amet quisquam sed.', 693388, 28, '판매중'),
(1, 1, 6, 34, '2023-04-06 16:11:46', 'Quas.', 'Incidunt omnis quia deleniti.', 151748, 4, '판매중'),
(4, 12, 5, 35, '2023-05-06 01:40:31', 'Ab nisi.', 'Nulla commodi ut dolore.', 590043, 12, '판매중'),
(1, 13, 1, 36, '2022-09-13 20:04:02', 'Fuga.', 'Magni optio voluptate ut est.', 348646, 14, '예약중'),
(6, 16, 6, 37, '2023-01-19 19:17:43', 'Culpa.', 'Eveniet hic molestiae fuga velit tempora.', 588017, 7, '판매중'),
(3, 9, 3, 38, '2022-11-02 03:02:41', 'Quasi.', 'Ab mollitia facilis consequuntur voluptates esse.', 957248, 29, '예약중'),
(4, 3, 3, 39, '2022-11-07 00:55:06', 'Non enim.', 'NULL', 832758, 21, '판매중'),
(2, 12, 1, 40, '2023-01-13 03:59:51', 'Soluta.', 'Eius officia asperiores numquam.', 385207, 16, '판매중'),
(2, 1, 4, 41, '2022-10-29 13:50:34', 'Hic.', 'Alias corporis saepe. Veniam perferendis nobis.', 666125, 15, '판매중'),
(5, 11, 1, 42, '2023-03-01 19:36:15', 'Quasi.', 'Perspiciatis assumenda dolor.', 211310, 15, '판매중'),
(5, 5, 5, 43, '2022-07-15 10:19:35', 'Amet.', 'Quibusdam beatae beatae. Sunt illum fuga.', 603808, 2, '예약중'),
(4, 4, 4, 44, '2022-11-17 02:34:33', 'Possimus.', 'Sint quod minus esse magni dolores.', 348623, 19, '판매중'),
(3, 14, 1, 45, '2023-04-08 10:37:31', 'Non.', 'Aperiam impedit officia explicabo laudantium.', 543583, 16, '예약중'),
(6, 5, 2, 46, '2022-06-29 03:25:35', 'Amet.', 'NULL', 670910, 13, '판매중'),
(4, 5, 2, 47, '2022-12-05 02:53:23', 'Dolorem.', 'Natus facere quis unde temporibus.', 514309, 30, '예약중'),
(5, 3, 6, 48, '2022-12-30 19:14:42', 'Veritatis.', 'Totam animi culpa eius aut.', 869493, 24, '판매중'),
(4, 2, 6, 49, '2023-03-06 05:29:26', 'Atque.', 'Sed alias ab.', 986213, 5, '판매중'),
(1, 2, 1, 50, '2023-02-28 01:00:30', 'Non nobis.', 'Ut corporis ad eaque cumque explicabo.', 505242, 16, '예약중'),
(5, 14, 3, 51, '2023-05-05 07:59:20', 'Earum.', 'Ipsum ratione impedit ipsum nobis facilis.', 774970, 26, '판매중'),
(1, 6, 5, 52, '2022-12-12 04:19:26', 'Earum.', 'Iure et excepturi magni.', 534655, 18, '예약중'),
(6, 2, 2, 53, '2023-04-15 23:45:15', 'Quo iure.', 'Dolores accusamus velit nemo eaque eum.', 840806, 20, '판매중'),
(1, 9, 6, 54, '2023-03-05 18:32:36', 'Autem.', 'NULL', 978002, 29, '예약중'),
(5, 1, 2, 55, '2022-11-16 06:02:06', 'Odio.', 'Sequi tenetur cupiditate quis porro unde facilis.', 412116, 9, '판매중'),
(6, 2, 3, 56, '2022-12-09 18:19:16', 'Quos.', 'Praesentium at id accusamus inventore.', 379970, 6, '판매중'),
(5, 14, 6, 57, '2022-09-10 05:53:38', 'Ipsum.', 'NULL', 867724, 2, '판매중'),
(2, 7, 6, 58, '2022-08-24 06:46:23', 'Quaerat.', 'Molestiae dolores provident quam temporibus.', 971083, 18, '판매중'),
(2, 17, 6, 59, '2022-11-18 19:02:41', 'Adipisci.', 'Minima ut expedita corporis.', 255813, 10, '판매중'),
(6, 12, 2, 60, '2023-02-01 12:49:21', 'Modi.', 'Nihil esse ipsa eaque eaque quod nulla.', 940576, 14, '판매중'),
(1, 3, 2, 61, '2022-09-25 01:35:37', 'Dolor.', 'NULL', 497211, 12, '판매중'),
(4, 6, 6, 62, '2023-02-18 14:06:11', 'Illum.', 'NULL', 357037, 13, '판매중'),
(5, 12, 6, 63, '2022-12-09 17:41:44', 'Labore.', 'Asperiores illo voluptas ipsa vero.', 714861, 27, '판매중'),
(6, 5, 2, 64, '2023-06-02 20:39:02', 'Dolor.', 'Deserunt nesciunt animi.', 891555, 22, '판매중'),
(3, 3, 6, 65, '2022-12-31 21:55:39', 'Eos.', 'Nam ratione culpa optio exercitationem.', 205833, 27, '예약중'),
(2, 8, 3, 66, '2023-03-01 21:27:28', 'Placeat.', 'NULL', 458725, 15, '예약중'),
(5, 13, 4, 67, '2022-11-18 19:30:42', 'Id.', 'Harum eius libero. Temporibus fugiat libero esse.', 63142, 10, '판매중'),
(3, 7, 5, 68, '2023-05-06 11:10:38', 'Veritatis.', 'Asperiores voluptatem error eius aspernatur.', 60347, 4, '판매중'),
(5, 6, 2, 69, '2023-01-11 05:01:44', 'Ratione.', 'Deleniti molestias voluptatibus rem.', 78983, 26, '판매중'),
(6, 8, 1, 70, '2022-11-18 22:01:13', 'Saepe ut.', 'NULL', 273951, 8, '판매중'),
(5, 15, 3, 71, '2023-04-19 11:12:02', 'Odio.', 'Laboriosam harum non optio quidem.', 614243, 14, '판매중'),
(2, 10, 2, 72, '2022-12-16 20:29:11', 'Deserunt.', 'Accusantium totam amet.', 848305, 8, '판매중'),
(3, 3, 6, 73, '2023-03-22 23:38:28', 'Porro.', 'Eaque dolorem repudiandae at sit iure.', 22309, 2, '판매중'),
(5, 13, 3, 74, '2023-03-07 22:32:28', 'A velit.', 'Nesciunt fugit animi in esse.', 690780, 12, '판매중'),
(2, 7, 4, 75, '2023-04-11 18:00:42', 'In.', 'Officia consectetur atque.', 800976, 29, '판매중'),
(3, 18, 6, 76, '2023-05-01 15:53:21', 'Ipsam.', 'At recusandae cupiditate nobis sit quis.', 163684, 26, '판매중'),
(2, 2, 3, 77, '2023-06-12 00:58:11', 'Dolorem.', 'NULL', 740465, 23, '판매중'),
(3, 16, 1, 78, '2022-10-18 11:28:29', 'Quo.', 'Ex rerum quis occaecati nemo.', 178486, 29, '판매중'),
(5, 2, 6, 79, '2022-11-17 03:26:17', 'Fuga.', 'Nihil nihil libero expedita eos in quas aliquam.', 26861, 24, '판매중'),
(5, 7, 5, 80, '2022-10-21 18:07:51', 'Deleniti.', 'NULL', 407559, 4, '판매중'),
(3, 1, 1, 81, '2022-11-15 01:31:30', 'Ad.', 'NULL', 990757, 6, '판매중'),
(3, 6, 4, 82, '2022-12-29 09:44:56', 'Voluptas.', 'Neque assumenda voluptas nulla eaque.', 624741, 21, '예약중'),
(4, 18, 4, 83, '2022-08-13 02:16:42', 'Sit.', 'Maxime optio vitae odit.', 692839, 2, '판매중'),
(1, 12, 6, 84, '2023-01-23 15:30:46', 'Ad minima.', 'Tenetur unde eligendi quis esse odit.', 938578, 8, '판매중'),
(1, 16, 4, 85, '2022-06-19 07:41:32', 'Ipsa.', 'In enim porro molestias.', 863247, 6, '예약중'),
(2, 11, 1, 86, '2023-01-11 02:06:54', 'Iure.', 'Illo eligendi ad vel.', 606123, 7, '예약중'),
(5, 1, 1, 87, '2022-11-11 01:22:12', 'Inventore.', 'Fuga aliquid illo.', 413838, 1, '판매중'),
(2, 12, 4, 88, '2022-07-25 06:55:04', 'Aliquid.', 'Impedit sapiente unde quod porro odit.', 631707, 12, '판매중'),
(2, 11, 2, 89, '2022-12-25 07:53:17', 'Enim cum.', 'Mollitia quia voluptatibus architecto nesciunt.', 548409, 7, '판매중'),
(1, 13, 5, 90, '2022-10-11 08:52:20', 'Odio.', 'Quasi dolorum sunt aspernatur.', 603850, 15, '판매중'),
(2, 11, 2, 91, '2022-09-28 13:38:49', 'Nisi.', 'NULL', 731976, 9, '판매중'),
(3, 7, 3, 92, '2023-03-17 01:04:53', 'Atque.', 'NULL', 987644, 20, '예약중'),
(6, 18, 1, 93, '2023-03-23 04:23:41', 'Maiores.', 'NULL', 683825, 13, '예약중'),
(3, 17, 1, 94, '2023-01-08 12:56:03', 'Dolores.', 'Illum rem veniam odio fugit error.', 560213, 18, '예약중'),
(4, 17, 3, 95, '2022-12-17 03:03:58', 'Debitis.', 'Voluptas laudantium id. Dolorum ea consequuntur.', 196200, 21, '판매중'),
(3, 15, 4, 96, '2023-05-15 04:31:44', 'Eligendi.', 'Rem nesciunt error deserunt nihil repudiandae.', 796712, 5, '판매중'),
(1, 2, 2, 97, '2023-05-19 14:58:40', 'Quod.', 'Quidem modi labore error quas.', 86846, 21, '판매중'),
(2, 10, 4, 98, '2023-05-01 02:39:17', 'Alias a.', 'Non voluptas a aliquam.', 669846, 18, '예약중'),
(4, 16, 3, 99, '2023-05-20 09:58:34', 'Similique.', 'Quo qui modi ipsum.', 369860, 11, '판매중'),
(4, 5, 5, 100, '2023-04-17 12:50:50', 'Sequi.', 'NULL', 319796, 28, '예약중');

-- interest 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`interest` (`interest_idx`, `member_idx`, `item_idx`) VALUES
(1, 3, 29),
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

-- chat_room 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`chat_room` (`chat_room_idx`, `item_idx`, `buyer_idx`) VALUES
(1, 54, 1),
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
