import { observable, action } from 'mobx';
import objectService from 'src/services/object/objectService';
import { GetAllObjectOutput } from 'src/services/object/dto/getAllObjectOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { EntityDto } from 'src/services/dto/entityDto';
import { CreateObjectInput } from 'src/services/object/dto/createObjectInput';
import { UpdateObjectInput } from 'src/services/object/dto/updateObjectInput';
import { PagedObjectResultRequestDto } from 'src/services/object/dto/PagedObjectResultRequestDto';
import ObjectEditModel from 'src/models/Objects/objectEditModel';

class ObjectStore {
  
  @observable objects: PagedResultDto<GetAllObjectOutput>;
  @observable objectEdit: ObjectEditModel = new ObjectEditModel();

  @action
  async create(CreateObjectInput: CreateObjectInput) {
    await objectService.create(CreateObjectInput);
  }

  @action
  async createObject() {
    this.objectEdit = {
      object: {
        name: '',
        ownerUserId: 0,
        rating: 0,
        text1: '',
        text2: '',
        id: 0,
      }
    };
  }

  @action
  async getObjectsAsync(getObjectAsyncInput: GetObjectAsyncInput) {
    await objectService.getObjectsAsync(getObjectAsyncInput);
  }

  @action
  async update(UpdateObjectInput: UpdateObjectInput) {
    
    await objectService.update(UpdateObjectInput);
    this.objects.items
      .filter((x: GetAllObjectOutput) => x.id == UpdateObjectInput.id)
      .map((x: GetAllObjectOutput) => {
        return (x = UpdateObjectInput);
      });
  }

  @action
  async delete(entityDto: EntityDto) {
    await objectService.delete(entityDto);
    this.objects.items = this.objects.items.filter((x: GetAllObjectOutput) => x.id != entityDto.id);
  }

  @action
  async getObjectForEdit(entityDto: EntityDto) {
    let data = await objectService.get(entityDto);
    this.objectEdit.object = data.result;
    
  }

  @action
  async get(entityDto: EntityDto) {
    var result = await objectService.get(entityDto);
    this.objects = result.data.result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedObjectResultRequestDto) {
    let result = await objectService.getAll(pagedFilterAndSortedRequest);
    this.objects = result;
  }
}

export default ObjectStore;
