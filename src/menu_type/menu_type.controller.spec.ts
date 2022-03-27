import { Test, TestingModule } from '@nestjs/testing';
import { MenuTypeController } from './menu_type.controller';
import { MenuTypeService } from './menu_type.service';

describe('MenuTypeController', () => {
  let controller: MenuTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuTypeController],
      providers: [MenuTypeService],
    }).compile();

    controller = module.get<MenuTypeController>(MenuTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
