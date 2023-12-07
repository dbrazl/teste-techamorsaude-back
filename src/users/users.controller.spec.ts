import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const opening_date = new Date();

const createdUser: User = new User({
  company_name: 'Company name',
  fantasy_name: 'Fantasy name',
  cnpj: '12345678912345',
  local: 1,
  active: 1,
  opening_date,
  password: undefined,
});

const id: string = '2932880b-044d-4598-8d52-743c1378d471';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(createdUser),
            findOne: jest.fn().mockResolvedValue(createdUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateUserDto = {
      company_name: 'Company name',
      fantasy_name: 'Fantasy name',
      cnpj: '12345678912345',
      local: 1,
      opening_date: opening_date.toISOString(),
      password: '123456',
    };

    it('should called create', async () => {
      await controller.create(dto);
      expect(usersService.create).toHaveBeenCalledWith(dto);
    });

    it('should create user successfully', async () => {
      const result = await controller.create(dto);
      expect(result).toEqual(createdUser);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());
      expect(controller.create(dto)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should called findOne', async () => {
      await controller.findOne(id);
      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });

    it('should findOne user successfully', async () => {
      const result = await controller.findOne(id);
      expect(result).toEqual(createdUser);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());
      expect(controller.findOne(id)).rejects.toThrow();
    });
  });
});
