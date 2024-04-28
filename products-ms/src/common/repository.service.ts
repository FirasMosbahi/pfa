import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import {
  ClientSession,
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';
import { BaseSchema } from '../schema/base.schema';

export abstract class CommonRepository<T extends BaseSchema> {
  protected abstract readonly modelName: string;

  protected constructor(protected readonly model: Model<T>) {}

  private static isMongoError(error: unknown): error is MongoError {
    return (error as MongoError).code !== undefined;
  }

  private static isError(error: unknown): error is Error {
    return (error as Error).message !== undefined;
  }

  getModelName(): string {
    return this.modelName.toUpperCase();
  }

  // ... other imports ...

  async findOne(
    filterQuery: FilterQuery<T>,
    projection?: any | null,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<T | null> {
    try {
      return await this.model
        .findOne(filterQuery, projection, {
          ...options,
          session,
        })
        .then((document) => {
          return document ? document.toObject() : null;
        });
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  async findById(
    id: Types.ObjectId,
    populate?: string[],
    projection?: any | null,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<T> {
    let data: T | null;
    try {
      const query = this.model.findById(id, projection, {
        ...options,
        session,
      });
      populate?.forEach((arg) => {
        query.populate(arg);
      });
      data = await query.then((document) => {
        return document ? document.toObject() : null;
      });
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
    if (!data) {
      throw new NotFoundException(
        `Could not find ${this.modelName} because the given id (${id}) doesn't match any.`,
      );
    }
    return data;
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: any | null,
    options: QueryOptions = {},
    session?: ClientSession,
  ): Promise<T[]> {
    let data: T[] = [];
    try {
      const query = this.model.find(filterQuery, projection, {
        ...options,
        session,
      });
      data = await query.then((documents) => {
        return documents.map((document) => {
          return document.toObject();
        });
      });
    } catch (e: unknown) {
      this.handleErrors(e);
    }
    return data;
  }

  async create(model: Partial<T>, session?: ClientSession): Promise<T> {
    try {
      return this.model
        .create([model], { session })
        .then((data) => data[0])
        .then((document) => {
          return document.toObject();
        });
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  async findByIdAndUpdate(
    id: Types.ObjectId,
    updateQuery: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options: QueryOptions & { new: true } = { new: true },
    session?: ClientSession,
  ): Promise<T | null> {
    let data: T | null;
    try {
      data = await this.model
        .findByIdAndUpdate(id, updateQuery, {
          ...options,
          session,
        })
        .then((document) => {
          return document ? document.toObject() : null;
        });
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
    if (!data) {
      throw new NotFoundException(
        `Could not update ${this.modelName} because the given id (${id}) doesn't match any.`,
      );
    }
    return data;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options: QueryOptions & { new: true } = { new: true },
  ): Promise<T | null> {
    let data: T | null;
    try {
      data = await this.model
        .findOneAndUpdate(filterQuery, updateQuery, options)
        .then((document) => {
          return document ? document.toObject() : null;
        });
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
    if (!data) {
      throw new NotFoundException(
        `Could not update ${this.modelName} because the given body (${filterQuery}) doesn't match any.`,
      );
    }
    return data;
  }

  async updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions | null,
    session?: ClientSession,
  ): Promise<UpdateWriteOpResult> {
    try {
      options = { ...options, session }; // merge the session into options
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.model.updateOne(filter, update, options);
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  async updateMany(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions | null,
    session?: ClientSession,
  ): Promise<UpdateWriteOpResult> {
    try {
      options = { ...options, session }; // merge the session into options
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.model.updateMany(filter, update, options);
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  async findByIdAndDelete(
    id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<T | null> {
    let data: T | null;
    try {
      data = await this.model
        .findByIdAndDelete(id, { session })
        .then((document) => {
          return document ? document.toObject() : null;
        });
    } catch (e: any) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
    if (!data) {
      throw new NotFoundException(
        `Could not delete ${this.modelName} because the given id (${id}) doesn't match any.`,
      );
    }
    return data;
  }

  async findOneAndDelete(
    filter?: FilterQuery<T>,
    options?: QueryOptions | null,
    session?: ClientSession,
  ): Promise<T | null> {
    let data: T | null;
    try {
      data = await this.model
        .findOneAndDelete(filter, { ...options, session })
        .then((document) => {
          return document ? document.toObject() : null;
        });
    } catch (e: any) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
    if (!data) {
      throw new NotFoundException(
        `Could not delete ${
          this.modelName
        } because the given body (${JSON.stringify(
          filter,
        )}) doesn't match any.`,
      );
    }
    return data;
  }

  async deleteOne(
    filter?: FilterQuery<T>,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<any> {
    try {
      options = { ...options, session }; // merge the session into options
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.model.deleteOne(filter, options);
    } catch (e: any) {
      this.handleErrors(e);
    }
  }

  async deleteMany(
    filter?: FilterQuery<T>,
    options?: QueryOptions,
    session?: ClientSession,
  ): Promise<any> {
    try {
      options = { ...options, session }; // merge the session into options
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.model.deleteMany(filter, options);
    } catch (e: any) {
      this.handleErrors(e);
    }
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    try {
      return this.model.aggregate(pipeline);
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  async count(filterQuery: FilterQuery<T>): Promise<number> {
    try {
      return await this.model.countDocuments(filterQuery);
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  async bulkWrite(
    operations: any[],
    options?: any,
    session?: ClientSession,
  ): Promise<any> {
    try {
      const result = await this.model.bulkWrite(operations, {
        session,
        ...options,
      });
      return result;
    } catch (e: unknown) {
      this.handleErrors(e);
      throw new InternalServerErrorException();
    }
  }

  private handleErrors(e: unknown): void {
    if (CommonRepository.isMongoError(e)) {
      this.handleMongoError(e);
    } else if (CommonRepository.isError(e)) {
      throw new InternalServerErrorException(e.message);
    } else {
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  private handleMongoError(e: MongoError): void {
    if (e.code === 11000) {
      throw new ConflictException(
        `The provided data for ${this.modelName} triggered a duplicate error. Probably, this model has an extra unique field other than its id.`,
      );
    }
    throw new InternalServerErrorException(e.message);
  }
}
