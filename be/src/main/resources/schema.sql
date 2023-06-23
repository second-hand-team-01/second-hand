
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `second-hand` ;

CREATE SCHEMA IF NOT EXISTS `second-hand` DEFAULT CHARACTER SET utf8 ;
USE `second-hand` ;

DROP TABLE IF EXISTS `second-hand`.`location` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`location` (
  `location_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `town` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_idx`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`member` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`member` (
  `member_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `main_location_idx` BIGINT(10) NOT NULL,
  `sub_location_idx` BIGINT(10) NULL,
  `login_id` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(500) NULL,
  `refresh_token` VARCHAR(500) NULL,
  PRIMARY KEY (`member_idx`),
  UNIQUE INDEX `login_id_UNIQUE` (`login_id` ASC) VISIBLE,
  INDEX `fk_member_location1_idx` (`main_location_idx` ASC) VISIBLE,
  INDEX `fk_member_location2_idx` (`sub_location_idx` ASC) VISIBLE,
  CONSTRAINT `fk_member_location1`
    FOREIGN KEY (`main_location_idx`)
    REFERENCES `second-hand`.`location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_location2`
    FOREIGN KEY (`sub_location_idx`)
    REFERENCES `second-hand`.`location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`category` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`category` (
  `category_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_idx`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`item` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`item` (
  `item_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `seller_idx` BIGINT(10) NOT NULL,
  `category_idx` BIGINT(10) NOT NULL,
  `location_idx` BIGINT(10) NOT NULL,
  `main_image_idx` BIGINT(10) NULL,
  `posted_at` DATETIME NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(300) NULL,
  `price` INT NOT NULL,
  `view` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(45) NOT NULL DEFAULT '판매중',
  PRIMARY KEY (`item_idx`),
  INDEX `fk_item_member2_idx` (`seller_idx` ASC) VISIBLE,
  INDEX `fk_item_category2_idx` (`category_idx` ASC) VISIBLE,
  INDEX `fk_item_location2_idx` (`location_idx` ASC) VISIBLE,
  INDEX `fk_item_item_image1_idx` (`main_image_idx` ASC) VISIBLE,
  CONSTRAINT `fk_item_member2`
    FOREIGN KEY (`seller_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_category2`
    FOREIGN KEY (`category_idx`)
    REFERENCES `second-hand`.`category` (`category_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_location2`
    FOREIGN KEY (`location_idx`)
    REFERENCES `second-hand`.`location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_item_image1`
    FOREIGN KEY (`main_image_idx`)
    REFERENCES `second-hand`.`item_image` (`item_image_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`item_image` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`item_image` (
  `item_image_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `item_idx` BIGINT(10) NOT NULL,
  `image_url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`item_image_idx`),
  INDEX `fk_item_image_item2_idx` (`item_idx` ASC) VISIBLE,
  CONSTRAINT `fk_item_image_item2`
    FOREIGN KEY (`item_idx`)
    REFERENCES `second-hand`.`item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`interest` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`interest` (
  `interest_idx` BIGINT(10) NOT NULL,
  `member_idx` BIGINT(10) NOT NULL,
  `item_idx` BIGINT(10) NOT NULL,
  INDEX `fk_member_has_item_item2_idx` (`item_idx` ASC) VISIBLE,
  INDEX `fk_member_has_item_member2_idx` (`member_idx` ASC) VISIBLE,
  PRIMARY KEY (`interest_idx`),
  CONSTRAINT `fk_member_has_item_member2`
    FOREIGN KEY (`member_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_has_item_item2`
    FOREIGN KEY (`item_idx`)
    REFERENCES `second-hand`.`item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`chat_room` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`chat_room` (
  `chat_room_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `item_idx` BIGINT(10) NOT NULL,
  `buyer_idx` BIGINT(10) NOT NULL,
  INDEX `fk_member_has_item_item3_idx` (`item_idx` ASC) VISIBLE,
  INDEX `fk_member_has_item_member3_idx` (`buyer_idx` ASC) VISIBLE,
  PRIMARY KEY (`chat_room_idx`),
  CONSTRAINT `fk_member_has_item_member3`
    FOREIGN KEY (`buyer_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_has_item_item3`
    FOREIGN KEY (`item_idx`)
    REFERENCES `second-hand`.`item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
