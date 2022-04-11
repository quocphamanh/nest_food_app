import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.create(createMenuDto);
    await this.menuRepository.save(menu);
  }

  async findAll() {
    const menus: Menu[] = await this.menuRepository.find({
      relations: ['menuType', 'ratings', 'menuToOrderDetails'],
    });
    return menus;
  }

  async findOne(id: string) {
    const menu = await this.menuRepository.findOneOrFail(id, {
      relations: ['menuType', 'ratings', 'menuToOrderDetails'],
    });
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    await this.menuRepository.update(id, updateMenuDto);
    return 'Cập nhật menu thành công';
  }

  async remove(id: string) {
    await this.menuRepository.delete(id);
    return 'Xóa menu thành công';
  }
}
