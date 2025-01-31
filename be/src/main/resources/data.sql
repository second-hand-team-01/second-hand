USE `second-hand`;

SET
    foreign_key_checks = 0;
-- location 테이블 더미 데이터 추가
INSERT INTO `location` (`location_id`, `city`, `district`, `town`)
VALUES ('1168091500', '서울특별시', '강남구', '개포1동'),
       ('1168091600', '서울특별시', '강남구', '개포2동'),
       ('1168091700', '서울특별시', '강남구', '개포3동'),
       ('1168091800', '서울특별시', '강남구', '개포4동'),
       ('1168091100', '서울특별시', '강남구', '역삼1동'),
       ('1168091200', '서울특별시', '강남구', '역삼2동')
;

-- member 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`member` (`main_location_idx`, `sub_location_idx`, `login_id`, `password`, `image_url`)
VALUES (1, 2, 'snoop', 12345, 'www.profileimgurl1.com'),
       (2, 3, 'poco', 12345, NULL),
       (1, 2, 'roy', 12345, 'www.profileimgurl2.com'),
       (1, 5, 'gomungnam', 12345, NULL),
       (3, null, 'sol', 12345, 'www.profileimgurl3.com'),
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
# INSERT INTO `second-hand`.`item_image` (`item_image_idx`, `item_idx`, `image_url`)
# VALUES (1, 1,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (2, 2,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (3, 3,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (4, 4,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (5, 5,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (6, 6,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (7, 7,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (8, 8,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (9, 9,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (10, 10,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (11, 11,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (12, 12,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (13, 13,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (14, 14,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (15, 15,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (16, 16,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (17, 17,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (18, 18,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (19, 19,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/7.jpg'),
#        (20, 20,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (21, 21,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (22, 22,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (23, 23,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (24, 24,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (25, 25,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (26, 26,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (27, 27,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (28, 28,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/7.jpg'),
#        (29, 29,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (30, 30,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (31, 31,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (32, 32,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (33, 33,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (34, 34,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (35, 35,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (36, 36,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (37, 37,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (38, 38,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (39, 39,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (40, 40,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (41, 41,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (42, 42,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/7.jpg'),
#        (43, 43,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (44, 44,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (45, 45,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (46, 46,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (47, 47,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (48, 48,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (49, 49,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (50, 50,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (51, 51,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (52, 52,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (53, 53,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (54, 54,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/7.jpg'),
#        (55, 55,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (56, 56,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (57, 57,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (58, 58,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (59, 59,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (60, 60,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (61, 61,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (62, 62,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (63, 63,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (64, 64,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (65, 65,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (66, 66,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/5.jpg'),
#        (67, 67,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (68, 68,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (69, 69,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (70, 70,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (71, 71,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/7.jpg'),
#        (72, 72,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (73, 73,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (74, 74,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (75, 75,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (76, 76,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (77, 77,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (78, 78,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (79, 79,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/1.jpg'),
#        (80, 80,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (81, 81,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (82, 82,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (83, 83,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (84, 84,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (85, 85,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (86, 86,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (87, 87,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (88, 88,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/8.jpg'),
#        (89, 89,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (90, 90,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (91, 91,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (92, 92,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/6.jpg'),
#        (93, 93,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/9.jpg'),
#        (94, 94,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/0.jpg'),
#        (95, 95,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (96, 96,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/3.jpg'),
#        (97, 97,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/4.jpg'),
#        (98, 98,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (99, 99,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg'),
#        (100, 100,'https://codesquadsecondhandteam01.s3.ap-northeast-2.amazonaws.com/dummy-image/2.jpg');

# INSERT INTO `second-hand`.`item` (`seller_idx`, `category_idx`, `location_idx`, `main_image_idx`, `posted_at`,
#                                   `last_modified_at`, `name`,
#                                   `description`, `price`, `view`, `status`)
# VALUES (1, 18, 2, 1, '2022-06-30 13:13:56', '2023-07-18 17:13:56', 'Quas.', 'Nesciunt suscipit ipsa deleniti.', 63013,
#         24, '판매중'),
#        (1, 17, 2, 2, '2023-05-05 05:44:40', '2023-07-18 17:13:56', 'Ducimus.', 'NULL', 971008, 5, '판매중'),
#        (3, 11, 6, 3, '2022-10-23 06:59:09', '2023-07-18 17:13:56', 'Doloribus.', 'A nam eos vel asperiores deserunt.',
#         57369, 28, '판매중'),
#        (1, 1, 6, 4, '2023-01-12 11:26:31', '2023-07-18 17:13:56', 'Corrupti.', 'Sequi sunt voluptatem.', 217542, 3,
#         '판매중'),
#        (3, 8, 4, 5, '2023-06-13 09:11:37', '2023-07-18 17:13:56', 'Eius.',
#         'Dignissimos at accusantium eum recusandae ipsam.', 28937, 11,
#         '예약중'),
#        (1, 10, 4, 6, '2022-10-03 03:12:18', '2023-07-18 17:13:56', 'Nam animi.',
#         'Nemo ex fugiat atque sunt voluptate minus.', 380813, 27,
#         '예약중'),
#        (1, 3, 2, 7, '2022-11-29 17:23:44', '2023-07-18 17:13:56', 'Dolorem.',
#         'Est error accusamus praesentium nesciunt.', 782579, 14, '예약중'),
#        (3, 11, 2, 8, '2023-03-16 19:10:37', '2023-07-18 17:13:56', 'Nemo aut.',
#         'Optio facere impedit cum qui dolorum assumenda.', 456920, 16,
#         '예약중'),
#        (2, 13, 2, 9, '2022-08-19 03:57:37', '2023-07-18 17:13:56', 'Minus.', 'Amet sequi ab dicta eos.', 986458, 2,
#         '판매중'),
#        (3, 3, 3, 10, '2023-05-17 06:21:12', '2023-07-18 17:13:56', 'Facilis.', 'Soluta quae saepe ratione.', 758207, 26,
#         '예약중'),
#        (2, 3, 3, 11, '2022-11-05 13:19:10', '2023-07-18 17:13:56', 'Fugit id.', 'Modi saepe iste recusandae.', 395624,
#         27, '예약중'),
#        (3, 16, 3, 12, '2022-12-15 18:14:32', '2023-07-18 17:13:56', 'Excepturi.',
#         'Reiciendis iusto totam. Nam molestias nesciunt.', 91618, 17,
#         '판매중'),
#        (3, 8, 2, 13, '2023-03-25 14:44:25', '2023-07-18 17:13:56', 'Cumque.', 'Assumenda at corporis fugit.', 836506, 4,
#         '판매중'),
#        (4, 1, 6, 14, '2022-08-12 10:13:46', '2023-07-18 17:13:56', 'Quasi hic.', 'Magni ab repudiandae totam nulla.',
#         903420, 1, '판매중'),
#        (6, 4, 2, 15, '2022-10-08 22:11:33', '2023-07-18 17:13:56', 'Ad.', 'NULL', 406149, 0, '판매중'),
#        (1, 12, 5, 16, '2023-01-12 15:10:27', '2023-07-18 17:13:56', 'Eos.', 'Voluptates beatae quos tempore.', 514007,
#         26, '판매중'),
#        (6, 6, 1, 17, '2023-05-16 17:16:05', '2023-07-18 17:13:56', 'Eius unde.', 'NULL', 814857, 19, '판매중'),
#        (2, 4, 1, 18, '2023-04-25 17:27:02', '2023-07-18 17:13:56', 'Illo.', 'NULL', 884301, 0, '판매중'),
#        (6, 7, 1, 19, '2023-05-18 09:47:11', '2023-07-18 17:13:56', 'Suscipit.',
#         'Quaerat soluta dolor cum eaque eligendi enim.', 782889, 16,
#         '예약중'),
#        (2, 6, 6, 20, '2022-08-24 15:22:13', '2023-07-18 17:13:56', 'Ea aut.',
#         'Labore occaecati enim sapiente sunt quos.', 845275, 2, '판매중'),
#        (5, 12, 3, 21, '2023-05-01 20:15:15', '2023-07-18 17:13:56', 'Laborum.', 'NULL', 976247, 9, '판매중'),
#        (6, 9, 3, 22, '2022-12-01 18:17:50', '2023-07-18 17:13:56', 'Maxime.', 'Ad debitis praesentium assumenda est.',
#         267299, 10, '판매중'),
#        (5, 18, 5, 23, '2022-10-21 00:19:05', '2023-07-18 17:13:56', 'Iste eos.', 'NULL', 977083, 2, '예약중'),
#        (5, 4, 4, 24, '2023-05-11 19:11:16', '2023-07-18 17:13:56', 'Nobis.',
#         'Excepturi reprehenderit assumenda consequatur.', 145118, 5,
#         '판매중'),
#        (1, 10, 2, 25, '2022-12-23 21:33:48', '2023-07-18 17:13:56', 'Quaerat.', 'NULL', 226762, 23, '판매중'),
#        (5, 8, 5, 26, '2023-03-17 09:03:19', '2023-07-18 17:13:56', 'Quo.',
#         'Illo quibusdam neque tempora commodi porro omnis.', 782564, 5,
#         '판매중'),
#        (1, 11, 6, 27, '2023-02-25 02:34:59', '2023-07-18 17:13:56', 'Harum.', 'Sed adipisci exercitationem minus.',
#         844269, 1, '판매중'),
#        (5, 1, 1, 28, '2022-06-22 21:27:33', '2023-07-18 17:13:56', 'Beatae.', 'Architecto mollitia ab aliquid ullam.',
#         712027, 30, '판매중'),
#        (4, 18, 4, 29, '2023-01-31 15:54:55', '2023-07-18 17:13:56', 'Libero id.',
#         'Praesentium eveniet modi voluptas velit dolorem.', 726874,
#         26, '예약중'),
#        (1, 9, 2, 30, '2022-07-01 04:37:29', '2023-07-18 17:13:56', 'Voluptate.', 'Excepturi quam earum beatae at.',
#         138158, 22, '판매중'),
#        (5, 4, 1, 31, '2023-02-06 14:51:37', '2023-07-18 17:13:56', 'Error.', 'Magnam sunt magnam deleniti.', 547253, 2,
#         '판매중'),
#        (3, 2, 4, 32, '2023-06-01 02:56:08', '2023-07-18 17:13:56', 'Fugiat.', 'Deleniti cum totam sunt corporis.',
#         852661, 9, '판매중'),
#        (6, 11, 2, 33, '2023-01-17 08:38:14', '2023-07-18 17:13:56', 'Assumenda.', 'Unde amet quisquam sed.', 693388, 28,
#         '판매중'),
#        (1, 1, 6, 34, '2023-04-06 16:11:46', '2023-07-18 17:13:56', 'Quas.', 'Incidunt omnis quia deleniti.', 151748, 4,
#         '판매중'),
#        (4, 12, 5, 35, '2023-05-06 01:40:31', '2023-07-18 17:13:56', 'Ab nisi.', 'Nulla commodi ut dolore.', 590043, 12,
#         '판매중'),
#        (1, 13, 1, 36, '2022-09-13 20:04:02', '2023-07-18 17:13:56', 'Fuga.', 'Magni optio voluptate ut est.', 348646,
#         14, '예약중'),
#        (6, 16, 6, 37, '2023-01-19 19:17:43', '2023-07-18 17:13:56', 'Culpa.',
#         'Eveniet hic molestiae fuga velit tempora.', 588017, 7, '판매중'),
#        (3, 9, 3, 38, '2022-11-02 03:02:41', '2023-07-18 17:13:56', 'Quasi.',
#         'Ab mollitia facilis consequuntur voluptates esse.', 957248, 29,
#         '예약중'),
#        (4, 3, 3, 39, '2022-11-07 00:55:06', '2023-07-18 17:13:56', 'Non enim.', 'NULL', 832758, 21, '판매중'),
#        (2, 12, 1, 40, '2023-01-13 03:59:51', '2023-07-18 17:13:56', 'Soluta.', 'Eius officia asperiores numquam.',
#         385207, 16, '판매중'),
#        (2, 1, 4, 41, '2022-10-29 13:50:34', '2023-07-18 17:13:56', 'Hic.',
#         'Alias corporis saepe. Veniam perferendis nobis.', 666125, 15,
#         '판매중'),
#        (5, 11, 1, 42, '2023-03-01 19:36:15', '2023-07-18 17:13:56', 'Quasi.', 'Perspiciatis assumenda dolor.', 211310,
#         15, '판매중'),
#        (5, 5, 5, 43, '2022-07-15 10:19:35', '2023-07-18 17:13:56', 'Amet.', 'Quibusdam beatae beatae. Sunt illum fuga.',
#         603808, 2, '예약중'),
#        (4, 4, 4, 44, '2022-11-17 02:34:33', '2023-07-18 17:13:56', 'Possimus.', 'Sint quod minus esse magni dolores.',
#         348623, 19, '판매중'),
#        (3, 14, 1, 45, '2023-04-08 10:37:31', '2023-07-18 17:13:56', 'Non.',
#         'Aperiam impedit officia explicabo laudantium.', 543583, 16,
#         '예약중'),
#        (6, 5, 2, 46, '2022-06-29 03:25:35', '2023-07-18 17:13:56', 'Amet.', 'NULL', 670910, 13, '판매중'),
#        (4, 5, 2, 47, '2022-12-05 02:53:23', '2023-07-18 17:13:56', 'Dolorem.', 'Natus facere quis unde temporibus.',
#         514309, 30, '예약중'),
#        (5, 3, 6, 48, '2022-12-30 19:14:42', '2023-07-18 17:13:56', 'Veritatis.', 'Totam animi culpa eius aut.', 869493,
#         24, '판매중'),
#        (4, 2, 6, 49, '2023-03-06 05:29:26', '2023-07-18 17:13:56', 'Atque.', 'Sed alias ab.', 986213, 5, '판매중'),
#        (1, 2, 1, 50, '2023-02-28 01:00:30', '2023-07-18 17:13:56', 'Non nobis.',
#         'Ut corporis ad eaque cumque explicabo.', 505242, 16, '예약중'),
#        (5, 14, 3, 51, '2023-05-05 07:59:20', '2023-07-18 17:13:56', 'Earum.',
#         'Ipsum ratione impedit ipsum nobis facilis.', 774970, 26, '판매중'),
#        (1, 6, 5, 52, '2022-12-12 04:19:26', '2023-07-18 17:13:56', 'Earum.', 'Iure et excepturi magni.', 534655, 18,
#         '예약중'),
#        (6, 2, 2, 53, '2023-04-15 23:45:15', '2023-07-18 17:13:56', 'Quo iure.',
#         'Dolores accusamus velit nemo eaque eum.', 840806, 20, '판매중'),
#        (1, 9, 6, 54, '2023-03-05 18:32:36', '2023-07-18 17:13:56', 'Autem.', 'NULL', 978002, 29, '예약중'),
#        (5, 1, 2, 55, '2022-11-16 06:02:06', '2023-07-18 17:13:56', 'Odio.',
#         'Sequi tenetur cupiditate quis porro unde facilis.', 412116, 9,
#         '판매중'),
#        (6, 2, 3, 56, '2022-12-09 18:19:16', '2023-07-18 17:13:56', 'Quos.', 'Praesentium at id accusamus inventore.',
#         379970, 6, '판매중'),
#        (5, 14, 6, 57, '2022-09-10 05:53:38', '2023-07-18 17:13:56', 'Ipsum.', 'NULL', 867724, 2, '판매중'),
#        (2, 7, 6, 58, '2022-08-24 06:46:23', '2023-07-18 17:13:56', 'Quaerat.',
#         'Molestiae dolores provident quam temporibus.', 971083, 18,
#         '판매중'),
#        (2, 17, 6, 59, '2022-11-18 19:02:41', '2023-07-18 17:13:56', 'Adipisci.', 'Minima ut expedita corporis.', 255813,
#         10, '판매중'),
#        (6, 12, 2, 60, '2023-02-01 12:49:21', '2023-07-18 17:13:56', 'Modi.', 'Nihil esse ipsa eaque eaque quod nulla.',
#         940576, 14, '판매중'),
#        (1, 3, 2, 61, '2022-09-25 01:35:37', '2023-07-18 17:13:56', 'Dolor.', 'NULL', 497211, 12, '판매중'),
#        (4, 6, 6, 62, '2023-02-18 14:06:11', '2023-07-18 17:13:56', 'Illum.', 'NULL', 357037, 13, '판매중'),
#        (5, 12, 6, 63, '2022-12-09 17:41:44', '2023-07-18 17:13:56', 'Labore.', 'Asperiores illo voluptas ipsa vero.',
#         714861, 27, '판매중'),
#        (6, 5, 2, 64, '2023-06-02 20:39:02', '2023-07-18 17:13:56', 'Dolor.', 'Deserunt nesciunt animi.', 891555, 22,
#         '판매중'),
#        (3, 3, 6, 65, '2022-12-31 21:55:39', '2023-07-18 17:13:56', 'Eos.', 'Nam ratione culpa optio exercitationem.',
#         205833, 27, '예약중'),
#        (2, 8, 3, 66, '2023-03-01 21:27:28', '2023-07-18 17:13:56', 'Placeat.', 'NULL', 458725, 15, '예약중'),
#        (5, 13, 4, 67, '2022-11-18 19:30:42', '2023-07-18 17:13:56', 'Id.',
#         'Harum eius libero. Temporibus fugiat libero esse.', 63142, 10,
#         '판매중'),
#        (3, 7, 5, 68, '2023-05-06 11:10:38', '2023-07-18 17:13:56', 'Veritatis.',
#         'Asperiores voluptatem error eius aspernatur.', 60347, 4,
#         '판매중'),
#        (5, 6, 2, 69, '2023-01-11 05:01:44', '2023-07-18 17:13:56', 'Ratione.', 'Deleniti molestias voluptatibus rem.',
#         78983, 26, '판매중'),
#        (6, 8, 1, 70, '2022-11-18 22:01:13', '2023-07-18 17:13:56', 'Saepe ut.', 'NULL', 273951, 8, '판매중'),
#        (5, 15, 3, 71, '2023-04-19 11:12:02', '2023-07-18 17:13:56', 'Odio.', 'Laboriosam harum non optio quidem.',
#         614243, 14, '판매중'),
#        (2, 10, 2, 72, '2022-12-16 20:29:11', '2023-07-18 17:13:56', 'Deserunt.', 'Accusantium totam amet.', 848305, 8,
#         '판매중'),
#        (3, 3, 6, 73, '2023-03-22 23:38:28', '2023-07-18 17:13:56', 'Porro.', 'Eaque dolorem repudiandae at sit iure.',
#         22309, 2, '판매중'),
#        (5, 13, 3, 74, '2023-03-07 22:32:28', '2023-07-18 17:13:56', 'A velit.', 'Nesciunt fugit animi in esse.', 690780,
#         12, '판매중'),
#        (2, 7, 4, 75, '2023-04-11 18:00:42', '2023-07-18 17:13:56', 'In.', 'Officia consectetur atque.', 800976, 29,
#         '판매중'),
#        (3, 18, 6, 76, '2023-05-01 15:53:21', '2023-07-18 17:13:56', 'Ipsam.',
#         'At recusandae cupiditate nobis sit quis.', 163684, 26, '판매중'),
#        (2, 2, 3, 77, '2023-06-12 00:58:11', '2023-07-18 17:13:56', 'Dolorem.', 'NULL', 740465, 23, '판매중'),
#        (3, 16, 1, 78, '2022-10-18 11:28:29', '2023-07-18 17:13:56', 'Quo.', 'Ex rerum quis occaecati nemo.', 178486, 29,
#         '판매중'),
#        (5, 2, 6, 79, '2022-11-17 03:26:17', '2023-07-18 17:13:56', 'Fuga.',
#         'Nihil nihil libero expedita eos in quas aliquam.', 26861, 24,
#         '판매중'),
#        (5, 7, 5, 80, '2022-10-21 18:07:51', '2023-07-18 17:13:56', 'Deleniti.', 'NULL', 407559, 4, '판매중'),
#        (3, 1, 1, 81, '2022-11-15 01:31:30', '2023-07-18 17:13:56', 'Ad.', 'NULL', 990757, 6, '판매중'),
#        (3, 6, 4, 82, '2022-12-29 09:44:56', '2023-07-18 17:13:56', 'Voluptas.', 'Neque assumenda voluptas nulla eaque.',
#         624741, 21, '예약중'),
#        (4, 18, 4, 83, '2022-08-13 02:16:42', '2023-07-18 17:13:56', 'Sit.', 'Maxime optio vitae odit.', 692839, 2,
#         '판매중'),
#        (1, 12, 6, 84, '2023-01-23 15:30:46', '2023-07-18 17:13:56', 'Ad minima.',
#         'Tenetur unde eligendi quis esse odit.', 938578, 8, '판매중'),
#        (1, 16, 4, 85, '2022-06-19 07:41:32', '2023-07-18 17:13:56', 'Ipsa.', 'In enim porro molestias.', 863247, 6,
#         '예약중'),
#        (2, 11, 1, 86, '2023-01-11 02:06:54', '2023-07-18 17:13:56', 'Iure.', 'Illo eligendi ad vel.', 606123, 7, '예약중'),
#        (5, 1, 1, 87, '2022-11-11 01:22:12', '2023-07-18 17:13:56', 'Inventore.', 'Fuga aliquid illo.', 413838, 1,
#         '판매중'),
#        (2, 12, 4, 88, '2022-07-25 06:55:04', '2023-07-18 17:13:56', 'Aliquid.',
#         'Impedit sapiente unde quod porro odit.', 631707, 12, '판매중'),
#        (2, 11, 2, 89, '2022-12-25 07:53:17', '2023-07-18 17:13:56', 'Enim cum.',
#         'Mollitia quia voluptatibus architecto nesciunt.', 548409, 7,
#         '판매중'),
#        (1, 13, 5, 90, '2022-10-11 08:52:20', '2023-07-18 17:13:56', 'Odio.', 'Quasi dolorum sunt aspernatur.', 603850,
#         15, '판매중'),
#        (2, 11, 2, 91, '2022-09-28 13:38:49', '2023-07-18 17:13:56', 'Nisi.', 'NULL', 731976, 9, '판매중'),
#        (3, 7, 3, 92, '2023-03-17 01:04:53', '2023-07-18 17:13:56', 'Atque.', 'NULL', 987644, 20, '예약중'),
#        (6, 18, 1, 93, '2023-03-23 04:23:41', '2023-07-18 17:13:56', 'Maiores.', 'NULL', 683825, 13, '예약중'),
#        (3, 17, 1, 94, '2023-01-08 12:56:03', '2023-07-18 17:13:56', 'Dolores.', 'Illum rem veniam odio fugit error.',
#         560213, 18, '예약중'),
#        (4, 17, 3, 95, '2022-12-17 03:03:58', '2023-07-18 17:13:56', 'Debitis.',
#         'Voluptas laudantium id. Dolorum ea consequuntur.', 196200, 21,
#         '판매중'),
#        (3, 15, 4, 96, '2023-05-15 04:31:44', '2023-07-18 17:13:56', 'Eligendi.',
#         'Rem nesciunt error deserunt nihil repudiandae.', 796712, 5,
#         '판매중'),
#        (1, 2, 2, 97, '2023-05-19 14:58:40', '2023-07-18 17:13:56', 'Quod.', 'Quidem modi labore error quas.', 86846, 21,
#         '판매중'),
#        (2, 10, 4, 98, '2023-05-01 02:39:17', '2023-07-18 17:13:56', 'Alias a.', 'Non voluptas a aliquam.', 669846, 18,
#         '예약중'),
#        (4, 16, 3, 99, '2023-05-20 09:58:34', '2023-07-18 17:13:56', 'Similique.', 'Quo qui modi ipsum.', 369860, 11,
#         '판매중'),
#        (4, 5, 5, 100, '2023-04-17 12:50:50', '2023-07-18 17:13:56', 'Sequi.', 'NULL', 319796, 28, '예약중');

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
SET
    foreign_key_checks = 1;
