import { PartialType } from '@nestjs/swagger';
import { CreateCategoriSomehelpfulFactDto } from './create-categories-somehelpful-fact.dto';

export class UpdateCategoriSomehelpfulFactDto extends PartialType(CreateCategoriSomehelpfulFactDto) {}
