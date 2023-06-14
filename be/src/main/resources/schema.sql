SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `second-hand` DEFAULT CHARACTER SET utf8 ;
USE `second-hand` ;

DROP TABLE IF EXISTS `second-hand`.`location` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`location` (
  `location_idx` BIGINT(10) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `town` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_idx`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`member` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`member` (
  `member_idx` BIGINT(10) NOT NULL,
  `login_id` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(45) NULL,
  `main_location_idx` INT NOT NULL,
  `sub_location_idx` INT NULL,
  PRIMARY KEY (`member_idx`),
  UNIQUE INDEX `id_UNIQUE` (`login_id` ASC) VISIBLE,
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
  `category_idx` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_idx`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`item` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`item` (
  `item_idx` INT NOT NULL AUTO_INCREMENT,
  `seller_idx` INT NOT NULL,
  `category_idx` INT NOT NULL,
  `location_idx` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  `price` INT NOT NULL,
  `view` INT NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT '판매중',
  PRIMARY KEY (`item_idx`),
  INDEX `fk_item_member1_idx` (`seller_idx` ASC) VISIBLE,
  INDEX `fk_item_location1_idx` (`location_idx` ASC) VISIBLE,
  INDEX `fk_item_category1_idx` (`category_idx` ASC) VISIBLE,
  CONSTRAINT `fk_item_member1`
    FOREIGN KEY (`seller_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_location1`
    FOREIGN KEY (`location_idx`)
    REFERENCES `second-hand`.`location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_category1`
    FOREIGN KEY (`category_idx`)
    REFERENCES `second-hand`.`category` (`category_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`interest` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`interest` (
  `interest_idx` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  INDEX `fk_member_has_item_item1_idx` (`item_id` ASC) VISIBLE,
  INDEX `fk_member_has_item_member1_idx` (`member_id` ASC) VISIBLE,
  PRIMARY KEY (`interest_idx`),
  CONSTRAINT `fk_member_has_item_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_has_item_item1`
    FOREIGN KEY (`item_id`)
    REFERENCES `second-hand`.`item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`chat_room` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`chat_room` (
  `chat_room_idx` INT NOT NULL AUTO_INCREMENT,
  `item_idx` INT NOT NULL,
  `buyer_idx` INT NOT NULL,
  `seller_idx` INT NOT NULL,
  PRIMARY KEY (`chat_room_idx`),
  INDEX `fk_chat_room_item1_idx` (`item_idx` ASC) VISIBLE,
  INDEX `fk_chat_room_member1_idx` (`buyer_idx` ASC) VISIBLE,
  INDEX `fk_chat_room_member2_idx` (`seller_idx` ASC) VISIBLE,
  CONSTRAINT `fk_chat_room_item1`
    FOREIGN KEY (`item_idx`)
    REFERENCES `second-hand`.`item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_room_member1`
    FOREIGN KEY (`buyer_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_room_member2`
    FOREIGN KEY (`seller_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`message` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`message` (
  `message_idx` INT NOT NULL AUTO_INCREMENT,
  `chat_room_idx` INT NOT NULL,
  `sender_idx` INT NOT NULL,
  `text` VARCHAR(100) NOT NULL,
  `sent_at` DATETIME NOT NULL,
  `read` TINYINT NOT NULL,
  PRIMARY KEY (`message_idx`),
  INDEX `fk_message_chat_room1_idx` (`chat_room_idx` ASC) VISIBLE,
  INDEX `fk_message_member1_idx` (`sender_idx` ASC) VISIBLE,
  CONSTRAINT `fk_message_chat_room1`
    FOREIGN KEY (`chat_room_idx`)
    REFERENCES `second-hand`.`chat_room` (`chat_room_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_member1`
    FOREIGN KEY (`sender_idx`)
    REFERENCES `second-hand`.`member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `second-hand`.`item_image` ;

CREATE TABLE IF NOT EXISTS `second-hand`.`item_image` (
  `item_image_idx` INT NOT NULL AUTO_INCREMENT,
  `item_idx` INT NOT NULL,
  `image_url` VARCHAR(100) NULL,
  PRIMARY KEY (`item_image_idx`),
  INDEX `fk_item_image_item1_idx` (`item_idx` ASC) VISIBLE,
  CONSTRAINT `fk_item_image_item1`
    FOREIGN KEY (`item_idx`)
    REFERENCES `second-hand`.`item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
