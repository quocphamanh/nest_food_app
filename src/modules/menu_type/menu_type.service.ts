import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTreeRepository } from 'typeorm';
import { CreateMenuTypeDto } from './dto/create-menu_type.dto';
import { UpdateMenuTypeDto } from './dto/update-menu_type.dto';
import { MenuType } from './entities/menu_type.entity';

@Injectable()
export class MenuTypeService {
  constructor(
    @InjectRepository(MenuType)
    private menuTypeRepository = getTreeRepository(MenuType),
  ) {}
  async create(createMenuTypeDto: CreateMenuTypeDto) {
    const menuType = this.menuTypeRepository.create(createMenuTypeDto);
    if (createMenuTypeDto.parentId) {
      menuType.parent = await this.menuTypeRepository.findOneOrFail(
        createMenuTypeDto.parentId,
      );
    }
    await this.menuTypeRepository.save(menuType);
  }

  async findAll() {
    const menuTypes: MenuType[] = await this.menuTypeRepository.findTrees();
    return menuTypes;
  }

  async findOne(id: string) {
    const menuType = await this.menuTypeRepository.findOneOrFail(id);
    return this.menuTypeRepository.findDescendantsTree(menuType);
  }

  async update(id: string, updateMenuTypeDto: UpdateMenuTypeDto) {
    await this.menuTypeRepository.update(id, updateMenuTypeDto);
    return 'Cập nhật loại thực đơn hàng thành công';
  }

  async remove(id: string) {
    await this.menuTypeRepository.delete(id);
    return 'Xóa loại thực đơn thành công';
  }
}
