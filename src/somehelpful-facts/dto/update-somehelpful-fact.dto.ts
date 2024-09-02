import { PartialType } from '@nestjs/swagger';
import { CreateSomehelpfulFactDto } from './create-somehelpful-fact.dto';

export class UpdateSomehelpfulFactDto extends PartialType(CreateSomehelpfulFactDto) {}
