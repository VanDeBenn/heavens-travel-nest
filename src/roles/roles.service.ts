import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  // create new role
  async create(createRoleDto: CreateRoleDto) {
    const dataRole = new Role();
    dataRole.name = createRoleDto.name;

    const result = await this.rolesRepository.insert(dataRole);

    return this.rolesRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.rolesRepository.findAndCount({
      relations: {
        users: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.rolesRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  // update role
  async update(id: string, updateRoleDto: UpdateRoleDto) {
    let dataRole = new Role();
    dataRole.name = dataRole.name;

    try {
      await this.rolesRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    const result = await this.rolesRepository.update(id, updateRoleDto);

    return this.rolesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  // delete role
  async remove(id: string) {
    try {
      await this.rolesRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.rolesRepository.delete(id);
  }
}
