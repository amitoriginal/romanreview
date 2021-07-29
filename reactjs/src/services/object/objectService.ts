import { CreateObjectInput } from './dto/createObjectInput';
import { CreateObjectOutput } from './dto/createObjectOutput';
import GetObjectAsyncOutput from './dto/getObjectAsyncOutput';
import { UpdateObjectInput } from './dto/updateObjectInput';
import { UpdateObjectOutput } from './dto/updateObjectOutput';
import { EntityDto } from '../dto/entityDto';
import http from '../httpService';
import { GetAllObjectOutput } from './dto/getAllObjectOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { GetObjectForEditOutput } from './dto/getObjectForEditOutput';
import { PagedObjectResultRequestDto } from './dto/PagedObjectResultRequestDto';

class ObjectService {
  public async create(createObjectInput: CreateObjectInput): Promise<PagedResultDto<CreateObjectOutput>> {
    let result = await http.post('api/services/app/Object/Create', createObjectInput);
    return result.data.result;
  }

  public async getObjectsAsync(getObjectAsyncInput: GetObjectAsyncInput): Promise<GetObjectAsyncOutput> {
    let result = await http.get('api/services/app/Object/GetObjectsAsync', { params: getObjectAsyncInput });
    return result.data.result;
  }

  public async update(updateObjectInput: UpdateObjectInput): Promise<UpdateObjectOutput> {
    let result = await http.put('api/services/app/Object/Update', updateObjectInput);
    return result.data.result as UpdateObjectOutput;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Object/Delete', { params: entityDto });
    return result.data;
  }

  public async getAllPermissions() {
    let result = await http.get('api/services/app/Object/GetAllPermissions');
    return result.data.result.items;
  }

  public async getObjectForEdit(entityDto: EntityDto): Promise<GetObjectForEditOutput> {
    let result = await http.get('api/services/app/Object/Update', { params: entityDto });
    return result.data.result;
  }

  public async get(entityDto: EntityDto) {
    let result = await http.get('api/services/app/Object/Get', { params: entityDto });
    return result.data;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedObjectResultRequestDto): Promise<PagedResultDto<GetAllObjectOutput>> {
    let result = await http.get('api/services/app/Object/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new ObjectService();
