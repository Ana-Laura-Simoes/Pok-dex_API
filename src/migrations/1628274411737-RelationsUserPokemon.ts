import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationsUserPokemon1628274411737 implements MigrationInterface {
    name = 'RelationsUserPokemon1628274411737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP CONSTRAINT "FK_c0c6b08c6d87d323256cb5759b0"`);
        await queryRunner.query(`CREATE TABLE "userPokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_e3dfc348f178e7a8c17b68734bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "userPokemons" ADD CONSTRAINT "FK_7df3d612d515a0c8dd416337493" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userPokemons" ADD CONSTRAINT "FK_adba93fee6560e93ff084514b89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userPokemons" DROP CONSTRAINT "FK_adba93fee6560e93ff084514b89"`);
        await queryRunner.query(`ALTER TABLE "userPokemons" DROP CONSTRAINT "FK_7df3d612d515a0c8dd416337493"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "userPokemons"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD CONSTRAINT "FK_c0c6b08c6d87d323256cb5759b0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
