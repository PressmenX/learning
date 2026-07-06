import { Book } from '@/common/entities';
import { CreateBookDto } from '../dto/create-book.dto';

export default abstract class BookRepositoryAbstract {
  abstract findAll(): Book[];
  abstract findOne(id: string): Book | null;
  abstract save(payload: CreateBookDto): Book;
  abstract remove(id: string): Book | null;
}
