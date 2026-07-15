import { Book } from '../entities';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Category } from '../../category/entities';
import { GetBookQueryDto } from '../dto/get-book-query.dto';

export default abstract class BookRepositoryAbstract {
  abstract findAll(
    query: GetBookQueryDto,
  ): Promise<Book[] | Record<string, unknown>>;
  abstract findOne(id: string): Promise<Book | null>;
  abstract save(payload: CreateBookDto): Promise<Book>;
  abstract update(id: string, payload: UpdateBookDto): Promise<Book>;
  abstract remove(id: string): Promise<Book>;
  abstract findCategories(ids: string[]): Promise<Category[]>;
}
