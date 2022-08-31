import {
  Patronize,
  PatronizePartial,
  PatronizeProps,
} from '@modules/patronize/domain/models/Patronize';
import { IPatronizesRepository } from '@modules/patronize/domain/repositories/IPatronizesRepository';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { EntityRepository, Repository, IsNull, getRepository } from 'typeorm';
import { Patronize as PatronizeDb } from '../entities/Patronize';
import { PatronizeMapper } from '../mappers/PatronizeMappers';

@EntityRepository(PatronizeDb)
class PatronizesRepository implements IPatronizesRepository {
  private readonly ormRepository: Repository<PatronizeDb>;

  constructor() {
    this.ormRepository = getRepository(PatronizeDb);
  }

  public async findByTutorAndAnimalId(
    tutorId: string,
    animalId: string,
  ): Promise<Patronize | undefined> {
    const patronizeData = await this.ormRepository.findOne({
      join: {
        alias: 'patronize',
        leftJoinAndSelect: {
          tutor: 'patronize.tutor',
          animal: 'patronize.animal',
        },
      },
      where: {
        tutor: {
          id: tutorId,
        },
        animal: {
          id: animalId,
        },
      },
    });

    let patronize: Patronize | undefined;
    if (patronizeData) {
      patronize = new Patronize(patronizeData as unknown as PatronizeProps);
    }
    return patronize;
  }
  public async findByAnimalId(id: string): Promise<Patronize | undefined> {
    const patronizeData = await this.ormRepository.findOne({
      join: {
        alias: 'patronize',
        leftJoinAndSelect: {
          animal: 'patronize.animal',
          tutor: 'patronize.tutor',
          ong: 'animal.ong',
        },
      },
      where: {
        animal: {
          id: id,
        },
      },
    });

    let patronize: Patronize | undefined;
    if (patronizeData) {
      patronize = new Patronize(patronizeData as unknown as PatronizeProps);
    }
    return patronize;
  }
  public async findById(id: string): Promise<Patronize | undefined> {
    const patronizeData = await this.ormRepository.findOne({
      join: {
        alias: 'patronize',
        leftJoinAndSelect: {
          animal: 'patronize.animal',
          tutor: 'patronize.tutor',
          ong: 'animal.ong',
        },
      },
      where: {
        id,
      },
    });

    let patronize: Patronize | undefined;
    if (patronizeData) {
      patronize = new Patronize(patronizeData as unknown as PatronizeProps);
    }
    return patronize;
  }
  public async listActivePatronizesByOng(
    ongId: string,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<PatronizePartial>> {
    const [patronizes, count] = await this.ormRepository.findAndCount({
      join: {
        alias: 'patronize',
        leftJoinAndSelect: {
          animal: 'patronize.animal',
          ong: 'animal.ong',
          tutor: 'patronize.tutor',
        },
      },
      where: {
        status: 'ACTIVE',
        conclusionDate: IsNull(),
        animal: {
          ong: {
            id: ongId,
          },
        },
      },
      order: {
        createdAt: 'ASC',
      },
      skip,
      take,
    });

    return {
      itens: PatronizeMapper.mapMany(patronizes),
      numberOfItens: count,
    };
  }

  public async save(patronizeData: Patronize): Promise<Patronize> {
    const dto = patronizeData.toDto();
    const patronizeDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(patronizeDb);

    return new Patronize(patronizeDb as unknown as PatronizeProps);
  }

  public async softDelete(data: Patronize): Promise<void> {
    const dto = data.toDto();

    const patronizeDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(patronizeDb);
  }
}
export { PatronizesRepository };
