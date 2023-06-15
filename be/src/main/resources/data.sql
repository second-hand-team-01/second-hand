
SET foreign_key_checks =0;

-- location 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`location` (`city`, `district`, `town`) VALUES
('서울', '강남구', '역삼1동'),
('서울', '강남구', '역삼2동'),
('서울', '강남구', '개포1동'),
('서울', '강남구', '개포2동'),
('서울', '강남구', '개포3동'),
('서울', '강남구', '개포4동');

-- member 테이블 더미 데이터 추가
INSERT INTO `second-hand`.`member` (`main_location_idx`, `sub_location_idx`, `login_id`, `image_url`) VALUES
(1, 2, 'snoop', 'www.profileimgurl1.com'),
(2, 3, 'poco', NULL),
(4, NULL, 'roy', 'www.profileimgurl2.com'),
(1, 5, 'gomungnam', NULL),
(3, 5, 'sol', 'www.profileimgurl3.com'),
(5, 6, 'wood', 'www.profileimgurl4.com');

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
