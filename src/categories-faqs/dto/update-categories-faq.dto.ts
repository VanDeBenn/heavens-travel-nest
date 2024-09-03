import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesFaqDto } from './create-categories-faq.dto';

export class UpdateCategoriesFaqDto extends PartialType(CreateCategoriesFaqDto) {}
