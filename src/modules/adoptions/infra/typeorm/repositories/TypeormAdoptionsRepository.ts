import {
  Adoption,
  AdoptionPartial,
  AdoptionProps,
} from '@modules/adoptions/domain/models/Adoption';
import { IAdoptionsRepository } from '@modules/adoptions/domain/repositories/IAdoptionsRepository';
import {
  TutorPartial,
  TutorProps,
  Tutor,
} from '@modules/tutors/domain/models/Tutor';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import {
  Any,
  EntityRepository,
  Repository,
  IsNull,
  getRepository,
} from 'typeorm';
import { Adoption as AdoptionDb } from '../entities/Adoption';
import { AdoptionMappers } from '../mappers/AdoptionMappers';

@EntityRepository(AdoptionDb)
class AdoptionsRepository implements IAdoptionsRepository {
  private readonly ormRepository: Repository<AdoptionDb>;

  constructor() {
    this.ormRepository = getRepository(AdoptionDb);
  }

  public async findByTutorAndAnimalId(
    tutorId: string,
    animalId: string,
  ): Promise<Adoption | undefined> {
    const adoptionData = await this.ormRepository.findOne({
      join: {
        alias: 'adoption',
        leftJoinAndSelect: {
          tutor: 'adoption.tutor',
          animal: 'adoption.animal',
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
    let adoption: Adoption | undefined;
    if (adoptionData) {
      adoption = new Adoption(adoptionData as unknown as AdoptionProps);
    }
    return adoption;
  }
  public async findByAnimalId(animalId: string): Promise<Adoption | undefined> {
    const adoptionData = await this.ormRepository.findOne({
      join: {
        alias: 'adoption',
        leftJoinAndSelect: {
          animal: 'adoption.animal',
          tutor: 'adoption.tutor',
          ong: 'animal.ong',
        },
      },
      where: {
        animal: {
          id: animalId,
        },
      },
    });

    let adoption: Adoption | undefined;
    if (adoptionData) {
      adoption = new Adoption(adoptionData as unknown as AdoptionProps);
    }
    return adoption;
  }
  public async findById(id: string): Promise<Adoption | undefined> {
    const adoptionData = await this.ormRepository.findOne({
      join: {
        alias: 'adoption',
        leftJoinAndSelect: {
          animal: 'adoption.animal',
          tutor: 'adoption.tutor',
          ong: 'animal.ong',
        },
      },
      where: {
        id,
      },
    });
    let adoption: Adoption | undefined;
    if (adoptionData) {
      adoption = new Adoption(adoptionData as unknown as AdoptionProps);
    }
    return adoption;
  }
  public async listOpenAdoptionsByOng(
    ongId: string,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<AdoptionPartial>> {
    const [adoptionData, count] = await this.ormRepository.findAndCount({
      join: {
        alias: 'adoption',
        leftJoinAndSelect: {
          animal: 'adoption.animal',
          ong: 'animal.ong',
          tutor: 'adoption.tutor',
        },
      },
      where: {
        status: Any(['Em andamento', 'Solicitado']),
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
      itens: AdoptionMappers.mapMany(adoptionData),
      numberOfItens: count,
    };
  }

  async listTutorsByAnimalId(
    ongId: string,
    animalId: string,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<TutorPartial>> {
    const adoptionData = await this.ormRepository.find({
      join: {
        alias: 'adoption',
        leftJoinAndSelect: {
          animal: 'adoption.animal',
          ong: 'animal.ong',
          tutor: 'adoption.tutor',
        },
      },
      where: {
        status: Any(['Em andamento', 'Solicitado']),
        conclusionDate: IsNull(),
        animal: {
          id: animalId,
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

    const tutors: TutorPartial[] = [];
    let count = 0;
    adoptionData.forEach(a => {
      tutors.push(new Tutor(a.tutor as unknown as TutorProps).toPartial());
      count++;
    });
    return {
      itens: tutors,
      numberOfItens: count,
    };
  }
  public async save(adoptionData: Adoption): Promise<Adoption> {
    const dto = adoptionData.toDto();
    const adoptionDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(adoptionDb);

    return new Adoption(adoptionDb as unknown as AdoptionProps);
  }

  public async softDelete(data: Adoption): Promise<void> {
    const dto = data.toDto();

    const adoptionDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });
    await this.ormRepository.softDelete(adoptionDb);
  }
}

export { AdoptionsRepository };
