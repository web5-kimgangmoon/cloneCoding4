-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `writer_id` INTEGER NOT NULL,
    `reply_id` INTEGER NULL,
    `content` VARCHAR(3000) NOT NULL,
    `img_link` VARCHAR(1000) NULL,
    `view_cnt` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `View_date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_view` DATETIME(3) NOT NULL,
    `writer_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_idfk_1` FOREIGN KEY (`writer_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_idfk_2` FOREIGN KEY (`reply_id`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_idfk_1` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_idfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `View_date` ADD CONSTRAINT `View_date_idfk_1` FOREIGN KEY (`writer_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `View_date` ADD CONSTRAINT `View_date_idfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

