import { Test, TestingModule } from '@nestjs/testing';
import { MenuTypeService } from './menu_type.service';

describe('MenuTypeService', () => {
  let service: MenuTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuTypeService],
    }).compile();

    service = module.get<MenuTypeService>(MenuTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
