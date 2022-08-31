import { Tutor as TutorDb } from '../entities/Tutor';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { ITutorsRepository } from '@modules/tutors/domain/repositories/ITutorsRepository';
import {
  Tutor,
  TutorPartial,
  TutorProps,
} from '@modules/tutors/domain/models/Tutor';
import { TutorMapper } from '../mappers/TutorsMappers';

@EntityRepository(TutorDb)
class TutorsRepository implements ITutorsRepository {
  private readonly ormRepository: Repository<TutorDb>;
  constructor() {
    this.ormRepository = getRepository(TutorDb);
  }

  public async showById(id: string): Promise<Tutor | undefined> {
    const tutorData = await this.ormRepository
      .createQueryBuilder('tutors')
      .where('id = :id', { id: id })
      .getOne();

    let tutor: Tutor | undefined;
    if (tutorData) {
      tutor = new Tutor(tutorData as unknown as TutorProps);
    }
    return tutor;
  }

  public async listTutors({
    skip,
    take,
  }: Pagination): Promise<PaginatedRepositoryResponse<TutorPartial>> {
    const [tutorData, count] = await this.ormRepository.findAndCount({
      skip,
      take,
    });
    return {
      numberOfItens: count,
      itens: TutorMapper.mapMany(tutorData),
    };
  }

  public async findById(id: string): Promise<Tutor | undefined> {
    const tutorData = await this.ormRepository.findOne({
      join: {
        alias: 'tutor',
        leftJoinAndSelect: {
          user: 'tutor.user',
          address: 'user.address',
        },
      },
      where: {
        id: id,
      },
    });

    let tutor: Tutor | undefined;
    if (tutorData) {
      tutor = new Tutor(tutorData as unknown as TutorProps);
    }

    return tutor;
  }

  public async findByCPF(cpf: string): Promise<Tutor | undefined> {
    const tutorData = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    let card: Tutor | undefined;
    if (tutorData) {
      card = new Tutor(tutorData as unknown as TutorProps);
    }

    return card;
  }

  public async getIdByUserId(id: string): Promise<string> {
    const tutor = await this.ormRepository
      .createQueryBuilder('tutors')
      .where('tutors.userId = :userId', { userId: id })
      .getOneOrFail();

    return tutor.id;
  }

  public async save(tutorData: Tutor): Promise<Tutor> {
    const dto = tutorData.toDto();
    const tutorDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(tutorDb);

    return new Tutor(tutorDb as unknown as TutorProps);
  }

  public async softDelete(data: Tutor): Promise<void> {
    const dto = data.toDto();

    const tutorDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(tutorDb);
  }
}

export { TutorsRepository };
