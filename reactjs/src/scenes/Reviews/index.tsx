import { Card, Col, Row, Button, Table, Dropdown, Menu, Modal } from 'antd';
import * as React from 'react';
import { EntityDto } from 'src/services/dto/entityDto';
import CreateOrUpdateReviews from './components/createOrUpdateReviews';
import { observer, inject } from 'mobx-react';
import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import ReviewStore from 'src/stores/reviewStore';
import ObjectStore from 'src/stores/objectStore';
import { L } from 'src/lib/abpUtility';
import { FormComponentProps } from 'antd/lib/form';

export interface IReviewProps extends FormComponentProps {
  reviewStore: ReviewStore;
  objectStore: ObjectStore;
}

export interface IReviewState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  id: number;
}

const confirm = Modal.confirm;

@inject(Stores.ReviewStore)
@inject(Stores.ObjectStore)
@observer
class Review extends AppComponentBase<IReviewProps, IReviewState> {
  formRef: any;

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    id: 0
  };

  async componentDidMount() {

    await this.getAll();
  }

  async getAll() {
    await this.props.reviewStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
    await this.props.objectStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id == 0) {
      this.props.reviewStore.createReview();
    } else {
      await this.props.reviewStore.getReviewForEdit(entityDto);
    }
    this.setState({ id: entityDto.id });
    this.Modal();

    this.formRef.props.form.setFieldsValue({
      ...this.props.reviewStore.reviewEdit.review
    });
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.reviewStore.delete(input);
      },
      onCancel() { },
    });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        return;
      } else {
        if (this.state.id == 0) {
          await this.props.reviewStore.create(values);
        } else {
          var editObj = this.props.reviewStore.reviewEdit.review;
          editObj.comment = values.comment;
          editObj.rate = values.rate;
          await this.props.reviewStore.update(editObj);
        }
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form.resetFields();
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  public render() {

    const { reviews } = this.props.reviewStore;
    console.log("Reviews");
    console.log(reviews);
    const columns = [
      { title: L('comment'), dataIndex: 'comment', key: 'comment', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('objectName'), dataIndex: 'objectName', key: 'objectName', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('rate'), dataIndex: 'rate', key: 'rate', width: 150, render: (text: number) => <div>{text}</div> },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item>
                    <a onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</a>
                  </Menu.Item>
                  <Menu.Item>
                    <a onClick={() => this.delete({ id: item.id })}>{L('Delete')}</a>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon="setting">
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            <h2>{L('Reviews')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey="id"
              size={'default'}
              bordered={true}
              pagination={{ pageSize: this.state.maxResultCount, total: reviews == undefined ? 0 : reviews.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={reviews == undefined ? true : false}
              dataSource={reviews == undefined ? [] : reviews.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateReviews
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.id == 0 ? 'create' : 'edit'}
          onOk={this.handleCreate}
          reviewStore={this.props.reviewStore}
          objectStore={this.props.objectStore}
        />
      </Card>
    );
  }
}

export default Review;
