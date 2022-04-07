import * as Faker from 'faker';
import { User } from '../modules/user/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.id = faker.random.uuid();
  user.full_name = faker.name.findName();
  user.contact = faker.phone.phoneNumber();
  user.email_address = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = 'abc@123';
  user.role = faker.random.arrayElement(['ADMIN', 'EMPLOYEE', 'CUSTOMER']);
  return user;
});
