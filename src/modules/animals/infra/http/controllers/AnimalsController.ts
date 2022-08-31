import { Request, Response } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { container } from 'tsyringe';
import { ListAnimalService } from '@modules/animals/services/ListAnimalsService';
import { CreateAnimalService } from '@modules/animals/services/CreateAnimalService';
import { UpdateAnimalService } from '@modules/animals/services/UpdateAnimalService';
import { ShowAnimalService } from '@modules/animals/services/ShowAnimalService';
import { DeleteAnimalService } from '@modules/animals/services/DeleteAnimalService';
import { UpdateAvailabilityService } from '@modules/animals/services/UpdateAvailabilityService';
import { UpdateAdoptedService } from '@modules/animals/services/UpdateAdoptedService';
import { ListOtherAnimalsTypeService } from '@modules/animals/services/ListOtherAnimalsTypeService';
import { ListPublicOngAnimalsService } from '@modules/animals/services/ListPublicOngAnimalsService';
import { ListPrivateOngAnimalsService } from '@modules/animals/services/ListPrivateOngAnimalsService';
import { ListPrivateOngAnimalsByTypeService } from '@modules/animals/services/ListPrivateOngAnimalsByTypeService';
import { ListFilterAnimalService } from '@modules/animals/services/ListAnimalsFilterService';

type File = {
  filename: string;
};

export default class AnimalsController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAnimalService = container.resolve(ListAnimalService);

    const animals = await listAnimalService.execute();

    return response.json(animals);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      bornDate,
      shelterEnterDate,
      sex,
      size,
      species,
      costsDescription,
      monthlyCosts,
    } = request.body;

    const { type } = request.params;
    const ongId = request.user.child_id;
    const files = request.files as File[];

    const picturesFilenames = files.map(file => file.filename);

    const createAnimalService = container.resolve(CreateAnimalService);

    const animal = await createAnimalService.execute({
      type,
      name,
      description,
      bornDate,
      shelterEnterDate,
      sex,
      size,
      species,
      costsDescription,
      monthlyCosts,
      picturesFilenames,
      ongId,
    });

    return response.json(animal);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      description,
      bornDate,
      shelterEnterDate,
      sex,
      size,
      species,
      costsDescription,
      monthlyCosts,
    } = request.body;

    const ongId = request.user.child_id;
    const files = request.files as File[];

    let splitArray: string[];
    let filehash: string;
    let filename: string;
    const tmpFolder = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'temp',
    );
    const picturesFilenames = files.map(file => {
      splitArray = file.filename.split('-');
      filehash = crypto.randomBytes(10).toString('hex');
      filename = `${filehash}-${splitArray[splitArray.length - 1]}`;
      fs.rename(
        `${tmpFolder}/${file.filename}`,
        `${tmpFolder}/${filename}`,
        function (err) {
          if (err) console.log('ERROR: ' + err);
        },
      );
      return filename;
    });

    const updateAnimalService = container.resolve(UpdateAnimalService);

    const animal = await updateAnimalService.execute({
      id,
      name,
      description,
      bornDate,
      shelterEnterDate,
      sex,
      size,
      species,
      costsDescription,
      monthlyCosts,
      picturesFilenames,
      ongId,
    });

    return response.json(animal);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAnimalService = container.resolve(ShowAnimalService);

    const animal = await showAnimalService.execute({ id });

    return response.json(animal);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const ongId = request.user.child_id;

    const deleteAnimalService = container.resolve(DeleteAnimalService);

    await deleteAnimalService.execute({ id, ongId });

    return response.status(200);
  }

  public async updateAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { animalId, available } = request.body;
    const ongId = request.user.child_id;

    const updateAvailabilityService = container.resolve(
      UpdateAvailabilityService,
    );

    await updateAvailabilityService.execute({
      ongId,
      animalId,
      available,
    });
    return response.status(200).send();
  }

  public async updateAdopted(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { animalId, adopted } = request.body;
    const ongId = request.user.child_id;

    const updateAdoptedService = container.resolve(UpdateAdoptedService);

    await updateAdoptedService.execute({
      ongId,
      animalId,
      adopted,
    });
    return response.status(200).send();
  }

  public async findMore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { type, ongId } = request.query;
    const listOtherAnimalsTypeService = container.resolve(
      ListOtherAnimalsTypeService,
    );

    const animals = await listOtherAnimalsTypeService.execute({
      id,
      type: String(type),
      ongId: String(ongId),
    });

    return response.json(animals);
  }

  public async listPublicOngAnimals(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { type, ongId } = request.query;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listPublicOngAnimalsService = container.resolve(
      ListPublicOngAnimalsService,
    );
    const animals = await listPublicOngAnimalsService.execute(
      {
        type: String(type),
        ongId: String(ongId),
      },
      {
        skip,
        take,
      },
    );

    return response.json(animals);
  }

  public async listPrivateOngAnimals(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { isAvailable, name } = request.query;
    const ongId = request.user.child_id;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listPrivateOngAnimalsService = container.resolve(
      ListPrivateOngAnimalsService,
    );

    const animals = await listPrivateOngAnimalsService.execute(
      {
        ongId: String(ongId),
        isAvailable: Boolean(isAvailable),
        name: name ? String(name) : undefined,
      },
      {
        skip,
        take,
      },
    );

    return response.json(animals);
  }

  public async listPrivateOngAnimalsByType(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { isAvailable, name } = request.query;
    const type = request.params;
    const ongId = request.user.child_id;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listPrivateOngAnimalsByTypeService = container.resolve(
      ListPrivateOngAnimalsByTypeService,
    );

    const animals = await listPrivateOngAnimalsByTypeService.execute(
      {
        type: String(type),
        ongId: String(ongId),
        isAvailable: Boolean(isAvailable),
        name: name ? String(name) : undefined,
      },
      {
        skip,
        take,
      },
    );
    return response.json(animals);
  }

  public async listFilterAnimals(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { type } = request.params;
    const { sex, size, species, name, city, minAge, maxAge } = request.query;
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    let _sex: string[] = [];
    let _size: string[] = [];
    let _species: string[] = [];

    if (sex) {
      _sex = String(sex).split(',');
    }
    if (size) {
      _size = String(size).split(',');
    }
    if (species) {
      _species = String(species).split(',');
    }

    const listFilterAnimals = container.resolve(ListFilterAnimalService);
    const animals = await listFilterAnimals.execute(
      {
        sex: _sex,
        size: _size,
        name: name ? String(name) : undefined,
        city: city ? String(city) : undefined,
        species: _species,
        type,
        minAge: Number(minAge),
        maxAge: Number(maxAge),
      },
      {
        skip,
        take,
      },
    );

    return response.json({ animals });
  }
}
