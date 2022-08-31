import { Ong, OngPartial, OngProps } from '@modules/ongs/domain/models/Ong';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Ong as OngDb } from '../entities/Ong';
import { OngsMappers } from '../mappers/OngsMappers';

@EntityRepository(OngDb)
class OngsRepository implements IOngsRepository {
  private readonly ormRepository: Repository<OngDb>;
  constructor() {
    this.ormRepository = getRepository(OngDb);
  }

  public async showById(id: string): Promise<Ong | undefined> {
    const ongData = await this.ormRepository
      .createQueryBuilder('ong')
      .leftJoinAndSelect('ong.user', 'user')
      .where('ong.id = :id', { id: id })
      .getOne();

    let ong: Ong | undefined;
    if (ongData) {
      ong = new Ong(ongData as unknown as OngProps);
    }

    return ong;
  }

  public async listOngs(): Promise<PaginatedRepositoryResponse<OngPartial>> {
    const [ongData, count] = await this.ormRepository.findAndCount();

    return {
      numberOfItens: count,
      itens: OngsMappers.mapMany(ongData),
    };
  }

  public async findById(id: string): Promise<Ong | undefined> {
    const ongData = await this.ormRepository.findOne({ where: { id } });
    let ong: Ong | undefined;
    if (ongData) {
      ong = new Ong(ongData as unknown as OngProps);
    }

    return ong;
  }

  public async findApprovalStatusById(id: string): Promise<boolean> {
    const ongData = await this.ormRepository.findOne({ where: { id } });
    if (ongData) {
      return ongData.isApproved;
    }
    return false;
  }

  public async findByCNPJ(cnpj: string): Promise<Ong | undefined> {
    const ongData = await this.ormRepository.findOne({
      where: {
        cnpj,
      },
    });
    let ong: Ong | undefined;
    if (ongData) {
      ong = new Ong(ongData as unknown as OngProps);
    }

    return ong;
  }

  public async findByUserId(id: string): Promise<Ong | undefined> {
    const ongData = await this.ormRepository.findOne({
      join: {
        alias: 'ong',
        leftJoinAndSelect: {
          user: 'ong.user',
        },
      },
      where: {
        user: {
          id,
        },
      },
    });
    let ong: Ong | undefined;
    if (ongData) {
      ong = new Ong(ongData as unknown as OngProps);
    }

    return ong;
  }

  public async findByIdRelated(id: string): Promise<Ong | undefined> {
    const ongData = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['animals', 'campaigns'],
    });
    let ong: Ong | undefined;
    if (ongData) {
      ong = new Ong(ongData as unknown as OngProps);
    }

    return ong;
  }

  public async getIdByUserId(id: string): Promise<string> {
    const ongData = await this.ormRepository
      .createQueryBuilder('ongs')
      .where('ongs.userId = :userId', { userId: id })
      .getOneOrFail();
    return ongData.id;
  }
  public async save(ongData: Ong): Promise<Ong> {
    const dto = ongData.toDto();
    const ongDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(ongDb);

    return new Ong(ongDb as unknown as OngProps);
  }

  public async softDelete(data: Ong): Promise<void> {
    const dto = data.toDto();

    const ongDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(ongDb);
  }
}

export { OngsRepository };
