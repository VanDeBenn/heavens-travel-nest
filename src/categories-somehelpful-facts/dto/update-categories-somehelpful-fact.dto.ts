import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesSomehelpfulFactDto } from './create-categories-somehelpful-fact.dto';

export class UpdateCategoriesSomehelpfulFactDto extends PartialType(CreateCategoriesSomehelpfulFactDto) {}
