import {
  Animal,
  AnimalPartial,
  AnimalProps,
} from '@modules/animals/domain/models/Animal';
import {
  AnimalPicture,
  AnimalPictureProps,
} from '@modules/animals/domain/models/AnimalPicture';
import {
  Filters,
  IAnimalsRepository,
} from '@modules/animals/domain/repositories/IAnimalsRepository';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import dayjs from 'dayjs';
import {
  EntityRepository,
  Any,
  Like,
  Repository,
  IsNull,
  getRepository,
  Not,
} from 'typeorm';
import { Animal as AnimalDb } from '../entities/Animal';
import { AnimalMappers } from '../mappers/AnimalMappers';

@EntityRepository(AnimalDb)
class AnimalsRepository implements IAnimalsRepository {
  private readonly ormRepository: Repository<AnimalDb>;

  constructor() {
    this.ormRepository = getRepository(AnimalDb);
  }

  public async findById(id: string): Promise<Animal | undefined> {
    const animalData = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    let animal: Animal | undefined;

    if (animalData) {
      animalData.pictures.map(
        p => new AnimalPicture(p as unknown as AnimalPictureProps),
      );
      animal = new Animal(animalData as unknown as AnimalProps);
    }

    return animal;
  }

  public async list(): Promise<AnimalPartial[]> {
    const animal = await this.ormRepository.find(undefined);

    return AnimalMappers.mapMany(animal);
  }

  //Lista os animais com base nos filtros enviados
  public async listAnimalsFilter(
    { minAge, maxAge, type, city, name, ...rest }: Filters.FilterAnimals,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<AnimalPartial>> {
    const filter: Record<string, unknown> = {};
    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        filter[key] = value;
      }
    });

    //If the filter is empty
    if (rest.species[0] === ' ') {
      const dbSpecies = await this.ormRepository
        .createQueryBuilder('animals')
        .select(['animals.species'])
        .distinctOn(['animals.species'])
        .orderBy('animals.species')
        .getMany();
      const species: string[] = [];
      dbSpecies.forEach(s => {
        species.push(s.species);
      });
      filter['species'] = species;
    }
    if (rest.sex[0] === ' ') {
      filter['sex'] = ['Male', 'Female'];
    }
    if (rest.size[0] === ' ') {
      filter['size'] = ['G', 'M', 'P'];
    }

    let animals: AnimalDb[] = [];
    const isAvailable = true;

    if (city && name) {
      animals = await this.ormRepository.find({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
            user: 'ong.user',
            address: 'user.address',
          },
        },
        where: {
          type,
          species: Any(filter['species'] as string[]),
          size: Any(filter['size'] as string[]),
          sex: Any(filter['sex'] as string[]),
          name: Like(name),
          isAvailable,
          adoptionDate: IsNull(),
          ong: {
            user: {
              address: {
                city,
              },
            },
          },
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else if (city && !name) {
      animals = await this.ormRepository.find({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
            user: 'ong.user',
            address: 'user.address',
          },
        },
        where: {
          type,
          species: Any(filter['species'] as string[]),
          size: Any(filter['size'] as string[]),
          sex: Any(filter['sex'] as string[]),
          isAvailable,
          adoptionDate: IsNull(),
          ong: {
            user: {
              address: {
                city,
              },
            },
          },
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else if (!city && name) {
      animals = await this.ormRepository.find({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
            user: 'ong.user',
          },
        },
        where: {
          type,
          species: Any(filter['species'] as string[]) || true,
          size: Any(filter['size'] as string[]),
          sex: Any(filter['sex'] as string[]),
          name: Like(name),
          isAvailable,
          adoptionDate: IsNull(),
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else {
      animals = await this.ormRepository.find({
        where: {
          type,
          species: Any(filter['species'] as string[]),
          size: Any(filter['size'] as string[]),
          sex: Any(filter['sex'] as string[]),
          isAvailable,
          adoptionDate: IsNull(),
        },
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
            user: 'ong.user',
          },
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    }
    let count = 0;
    const ageFilter = animals.filter(animal => {
      const years = dayjs().diff(animal.bornDate, 'years');
      if (years >= minAge && years <= maxAge) {
        count++;
        return animal;
      }
    });

    return {
      itens: AnimalMappers.mapMany(ageFilter),
      numberOfItens: count,
    };
  }

  //Lista todos os animais de um certo tipo de uma ong;
  public async listByTypeAndOng(
    { type, ongId }: Filters.PublicOngFilter,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<AnimalPartial>> {
    const [animals, count] = await this.ormRepository.findAndCount({
      join: {
        alias: 'animal',
        leftJoinAndSelect: {
          ong: 'animal.ong',
        },
      },
      where: {
        type: type,
        adoptionDate: IsNull(),
        ong: {
          id: ongId,
        },
      },
      order: {
        id: 'ASC',
      },
      skip,
      take,
    });

    return {
      itens: AnimalMappers.mapMany(animals),
      numberOfItens: count,
    };
  }

  public async listByTypeOngAndStatus(
    { type, ongId, isAvailable, name }: Filters.PrivateOngFilter,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<AnimalPartial>> {
    let animals: AnimalDb[];
    let count: number;
    if (name) {
      [animals, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
          },
        },
        where: {
          type: type,
          ong: {
            id: ongId,
          },
          isAvailable: isAvailable,
          name: Like(name),
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [animals, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
          },
        },
        where: {
          type: type,
          ong: {
            id: ongId,
          },
          isAvailable: isAvailable,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    }
    return {
      itens: AnimalMappers.mapMany(animals),
      numberOfItens: count,
    };
  }

  public async listByOngAndStatus(
    { ongId, isAvailable, name }: Filters.PrivateOngFilter,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<AnimalPartial>> {
    let animals: AnimalDb[];
    let count: number;
    if (name) {
      [animals, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
          },
        },
        where: {
          ong: {
            id: ongId,
          },
          isAvailable: isAvailable,
          name: Like(name),
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [animals, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'animal',
          leftJoinAndSelect: {
            ong: 'animal.ong',
          },
        },
        where: {
          ong: {
            id: ongId,
          },
          isAvailable: isAvailable,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    }
    return {
      itens: AnimalMappers.mapMany(animals),
      numberOfItens: count,
    };
  }

  //count animals for the "Veja mais" section;
  public async listOtherAnimalsByTypeAndOng({
    id,
    type,
    ongId,
  }: Filters.PublicOngFilter): Promise<AnimalPartial[]> {
    const animals = await this.ormRepository.find({
      join: {
        alias: 'animals',
        leftJoinAndSelect: {
          ong: 'animals.ong',
        },
      },
      where: {
        ong: {
          id: ongId,
        },
        type,
        isAvailable: true,
        adoptionDate: IsNull(),
        id: Not(id),
      },
      take: 9,
      order: {
        id: 'ASC',
      },
    });

    if (animals.length < 9) {
      const limit = 9 - animals.length;
      const leftAnimals = await this.ormRepository.find({
        join: {
          alias: 'animals',
          leftJoinAndSelect: {
            ong: 'animals.ong',
          },
        },
        where: {
          ong: {
            id: Not(ongId),
          },
          type,
          isAvailable: true,
          adoptionDate: IsNull(),
          id: Not(id),
        },
        take: limit,
        order: {
          id: 'ASC',
        },
      });
      animals.push(...leftAnimals);
    }
    return AnimalMappers.mapMany(animals);
  }
  //List "Destaque" animals
  public async listAdoptionAnimalsHomepage(): Promise<AnimalPartial[]> {
    const animals = await this.ormRepository.find({
      where: {
        type: 'Adoption',
        isAvailable: true,
        adoptionDate: IsNull(),
      },
      order: {
        createdAt: 'ASC',
      },
      take: 9,
    });

    return AnimalMappers.mapMany(animals);
  }
  //List "Destaque" animals
  public async listPatronizeAnimalsHomepage(): Promise<AnimalPartial[]> {
    const animals = await this.ormRepository.find({
      where: {
        type: 'Patronize',
        isAvailable: true,
      },
      order: {
        createdAt: 'ASC',
      },
      take: 9,
    });

    return AnimalMappers.mapMany(animals);
  }

  public async save(animalData: Animal): Promise<Animal> {
    const dto = animalData.toDto();
    const animalDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(animalDb);

    return new Animal(animalDb as unknown as AnimalProps);
  }

  public async softDelete(data: Animal): Promise<void> {
    const dto = data.toDto();

    const animalDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });
    await this.ormRepository.softDelete(animalDb);
  }
}
export { AnimalsRepository };
