<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230515134816 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE categories (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, categories_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories_cle (categories_id INT NOT NULL, cle_id INT NOT NULL, INDEX IDX_7F3341BFA21214B7 (categories_id), INDEX IDX_7F3341BFF6985D08 (cle_id), PRIMARY KEY(categories_id, cle_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE categories_cle ADD CONSTRAINT FK_7F3341BFA21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categories_cle ADD CONSTRAINT FK_7F3341BFF6985D08 FOREIGN KEY (cle_id) REFERENCES cle (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE categories_cle DROP FOREIGN KEY FK_7F3341BFA21214B7');
        $this->addSql('ALTER TABLE categories_cle DROP FOREIGN KEY FK_7F3341BFF6985D08');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE categories_cle');
    }
}
