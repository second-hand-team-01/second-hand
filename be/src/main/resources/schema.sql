SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `second-hand` ;

CREATE SCHEMA IF NOT EXISTS `second-hand` DEFAULT CHARACTER SET utf8 ;
USE `second-hand` ;

DROP TABLE IF EXISTS `location` ;

CREATE TABLE IF NOT EXISTS `location` (
  `location_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `town` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_idx`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `member` ;

CREATE TABLE IF NOT EXISTS `member` (
  `member_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `login_id` VARCHAR(45) NOT NULL,
  `image_url` VARCHAR(45) NULL,
  `main_location_idx` BIGINT(10) NOT NULL,
  `sub_location_idx` BIGINT(10) NULL,
  PRIMARY KEY (`member_idx`),
  UNIQUE INDEX `id_UNIQUE` (`login_id` ASC) VISIBLE,
  INDEX `fk_member_location1_idx` (`main_location_idx` ASC) VISIBLE,
  INDEX `fk_member_location2_idx` (`sub_location_idx` ASC) VISIBLE,
  CONSTRAINT `fk_member_location1`
    FOREIGN KEY (`main_location_idx`)
    REFERENCES `location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_location2`
    FOREIGN KEY (`sub_location_idx`)
    REFERENCES `location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `category_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_idx`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `item` ;

CREATE TABLE IF NOT EXISTS `item` (
  `item_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `seller_idx` BIGINT(10) NOT NULL,
  `category_idx` BIGINT(10) NOT NULL,
  `location_idx` BIGINT(10) NOT NULL,
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
    REFERENCES `member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_location1`
    FOREIGN KEY (`location_idx`)
    REFERENCES `location` (`location_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_category1`
    FOREIGN KEY (`category_idx`)
    REFERENCES `category` (`category_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `interest` ;

CREATE TABLE IF NOT EXISTS `interest` (
  `interest_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `member_idx` BIGINT(10) NOT NULL,
  `item_idx` BIGINT(10) NOT NULL,
  INDEX `fk_member_has_item_item1_idx` (`item_idx` ASC) VISIBLE,
  INDEX `fk_member_has_item_member1_idx` (`member_idx` ASC) VISIBLE,
  PRIMARY KEY (`interest_idx`),
  CONSTRAINT `fk_member_has_item_member1`
    FOREIGN KEY (`member_idx`)
    REFERENCES `member` (`member_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_has_item_item1`
    FOREIGN KEY (`item_idx`)
    REFERENCES `item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `item_image` ;

CREATE TABLE IF NOT EXISTS `item_image` (
  `item_image_idx` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `item_idx` BIGINT(10) NOT NULL,
  `image_url` VARCHAR(100) NULL,
  PRIMARY KEY (`item_image_idx`),
  INDEX `fk_item_image_item1_idx` (`item_idx` ASC) VISIBLE,
  CONSTRAINT `fk_item_image_item1`
    FOREIGN KEY (`item_idx`)
    REFERENCES `item` (`item_idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
