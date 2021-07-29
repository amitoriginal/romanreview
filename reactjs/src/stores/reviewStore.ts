import { observable, action } from 'mobx';
import reviewService from 'src/services/review/reviewService';
import { GetAllReviewOutput } from 'src/services/review/dto/getAllReviewOutput';
import { PagedResultDto } from 'src/services/dto/pagedResultDto';
import { EntityDto } from 'src/services/dto/entityDto';
import { CreateReviewInput } from 'src/services/review/dto/createReviewInput';
import { UpdateReviewInput } from 'src/services/review/dto/updateReviewInput';
import { PagedReviewResultRequestDto } from 'src/services/review/dto/PagedReviewResultRequestDto';
import ReviewEditModel from 'src/models/Reviews/reviewEditModel';

class ReviewStore {
  
  @observable reviews: PagedResultDto<GetAllReviewOutput>;
  @observable reviewEdit: ReviewEditModel = new ReviewEditModel();

  @action
  async create(CreateReviewInput: CreateReviewInput) {
    await reviewService.create(CreateReviewInput);
  }

  @action
  async createReview() {
    this.reviewEdit = {
      review: {
        comment: '',
        ownerUserId: 0,
        rate: 0,
        objectId: null ,
        visitDate: '',
        creationTime: '',
        activeReplyId: 0,
        activeReplyMessage: '',
        objectName: '',
        id: 0
      }
    };
  }
  

  @action
  async getReviewsAsync(getReviewAsyncInput: GetReviewAsyncInput) {
    await reviewService.getReviewsAsync(getReviewAsyncInput);
  }

  @action
  async update(UpdateReviewInput: UpdateReviewInput) {
    
    await reviewService.update(UpdateReviewInput);
    this.reviews.items
      .filter((x: GetAllReviewOutput) => x.id == UpdateReviewInput.id)
      .map((x: GetAllReviewOutput) => {
        return (x = UpdateReviewInput);
      });
  }

  @action
  async delete(entityDto: EntityDto) {
    await reviewService.delete(entityDto);
    this.reviews.items = this.reviews.items.filter((x: GetAllReviewOutput) => x.id != entityDto.id);
  }

  @action
  async getReviewForEdit(entityDto: EntityDto) {
    let data = await reviewService.get(entityDto);
    this.reviewEdit.review = data.result;
    
  }

  @action
  async get(entityDto: EntityDto) {
    var result = await reviewService.get(entityDto);
    this.reviews = result.data.result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedReviewResultRequestDto) {
    
    let result = await reviewService.getAll(pagedFilterAndSortedRequest);
    this.reviews = result;
  }
}

export default ReviewStore;
