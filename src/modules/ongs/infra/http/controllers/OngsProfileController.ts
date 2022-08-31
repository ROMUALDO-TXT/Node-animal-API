import { ShowOngService } from '@modules/ongs/services/ShowOngService';
import { UpdateOngBannerService } from '@modules/ongs/services/UpdateOngBannerService';
import { UpdateOngPasswordService } from '@modules/ongs/services/UpdateOngPasswordService';
import { UpdateOngService } from '@modules/ongs/services/UpdateOngService';
import { AddressDto } from '@modules/users/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OngsProfileController {
  public async showMyProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const id = request.user.child_id;

    const showOngService = container.resolve(ShowOngService);

    const ong = await showOngService.execute({ id });

    return response.json(ong);
  }

  public async showOthersProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const showOngService = container.resolve(ShowOngService);

    const ong = await showOngService.execute({ id });

    return response.json(ong);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cnpj,
      phone,
      description,
      state,
      city,
      district,
      street,
      complement,
      zipcode,
      number,
    } = request.body;

    const avatar = request.file?.filename;

    const ongId = request.user.child_id;

    const updateOngService = container.resolve(UpdateOngService);

    const address: AddressDto = {
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    };

    const ong = await updateOngService.execute({
      ongId,
      name,
      description,
      avatar,
      cnpj,
      address,
      email,
      phone,
    });

    return response.json(ong);
  }
  public async updateBanner(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateBanner = container.resolve(UpdateOngBannerService);

    const ong = await updateBanner.execute({
      ongId: request.user.child_id,
      banner: request.file?.filename,
    });

    return response.json(ong);
  }

  public async updatePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { oldPassword, password } = request.body;

    const ongId = request.user.child_id;

    const updatePassword = container.resolve(UpdateOngPasswordService);

    await updatePassword.execute({
      id: ongId,
      oldPassword,
      password,
    });
    return response.status(200).send('Password updated correctly');
  }
}
