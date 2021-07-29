import { CreateReviewInput } from './dto/createReviewInput';
import { CreateReviewOutput } from './dto/createReviewOutput';
import GetReviewAsyncOutput from './dto/getReviewAsyncOutput';
import { UpdateReviewInput } from './dto/updateReviewInput';
import { UpdateReviewOutput } from './dto/updateReviewOutput';
import { EntityDto } from '../dto/entityDto';
import http from '../httpService';
import { GetAllReviewOutput } from './dto/getAllReviewOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { GetReviewForEditOutput } from './dto/getReviewForEditOutput';
import { PagedReviewResultRequestDto } from './dto/PagedReviewResultRequestDto';

class ReviewService {
  public async create(createReviewInput: CreateReviewInput): Promise<PagedResultDto<CreateReviewOutput>> {
    let result = await http.post('api/services/app/Review/Create', createReviewInput);
    return result.data.result;
  }

  public async getReviewsAsync(getReviewAsyncInput: GetReviewAsyncInput): Promise<GetReviewAsyncOutput> {
    let result = await http.get('api/services/app/Review/GetReviewsAsync', { params: getReviewAsyncInput });
    return result.data.result;
  }

  public async update(updateReviewInput: UpdateReviewInput): Promise<UpdateReviewOutput> {
    let result = await http.put('api/services/app/Review/Update', updateReviewInput);
    return result.data.result as UpdateReviewOutput;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Review/Delete', { params: entityDto });
    return result.data;
  }

  public async getAllPermissions() {
    let result = await http.get('api/services/app/Review/GetAllPermissions');
    return result.data.result.items;
  }

  public async getReviewForEdit(entityDto: EntityDto): Promise<GetReviewForEditOutput> {
    let result = await http.get('api/services/app/Review/Update', { params: entityDto });
    return result.data.result;
  }

  public async get(entityDto: EntityDto) {
    let result = await http.get('api/services/app/Review/Get', { params: entityDto });
    return result.data;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedReviewResultRequestDto): Promise<PagedResultDto<GetAllReviewOutput>> {
    let result = await http.get('api/services/app/Review/GetAll', { params: pagedFilterAndSortedRequest });
    console.log("result:");
    console.log(pagedFilterAndSortedRequest);
    console.log(result.data);
    return result.data.result;
  }
}

export default new ReviewService();
