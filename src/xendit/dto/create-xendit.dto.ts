import { IsAlpha, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateXenditDto {
  @IsOptional()
  external_id: string;

  @IsOptional()
  user_id: string;

  @IsOptional()
  amount: string;

  @IsOptional()
  payer_email: string;

  @IsOptional()
  description: string;
}

// {
//     // id": "6720805cda6e0f7588bd7fc0",
//     "external_id": "heavens-travel",
//     "user_id": "6704bf4bfe6c7165c3ebabc2",
//     "amount": 1650000,
//     "payer_email": "customer@domain.com",
//     "description": "Invoice webhook test",
//   "items": [
//     {
//       "name": "Garuda Wisnu Kencana",
//       "quantity": 1,
//       "price": 150000,
//       "category": "Destination",
//       "url": "https://yourwebsite.com/gwk-tourism"
//     },
//     {
//       "name": "Nusa Penida",
//       "quantity": 1,
//       "price": 1500000,
//       "category": "Destination",
//       "url": "https://yourwebsite.com/gwk-tourism"
//     }
//   ]
// }
