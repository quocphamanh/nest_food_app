import { IsEmail, IsEmpty, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Active } from "src/core/enums/constants.enum";

export class CreateCustomerDto {
    first_name: string;

    last_name: string;

    middle_name: string;

    @IsNotEmpty()
    @IsEmail()
    email_address: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

    landline: string;

    profile_image: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    status: string = Active.IS_ACTIVE;
}
