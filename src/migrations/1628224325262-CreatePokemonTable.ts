import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePokemonTable1628224325262 implements MigrationInterface {
    name = 'CreatePokemonTable1628224325262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, "inMyPokemons" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD CONSTRAINT "FK_c0c6b08c6d87d323256cb5759b0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP CONSTRAINT "FK_c0c6b08c6d87d323256cb5759b0"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
    }

}
