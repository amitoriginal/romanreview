import { Card, Col, Row, Button, Table, Dropdown, Menu, Modal, Avatar } from 'antd';
import * as React from 'react';
import { EntityDto } from 'src/services/dto/entityDto';
import CreateOrUpdateObjects from './components/createOrUpdateObjects';
import { observer, inject } from 'mobx-react';
import AppComponentBase from 'src/components/AppComponentBase';
import Stores from 'src/stores/storeIdentifier';
import ObjectStore from 'src/stores/objectStore';
import ReviewStore from 'src/stores/reviewStore';
import { L } from 'src/lib/abpUtility';
import { FormComponentProps } from 'antd/lib/form';
import StarImg from 'src/images/star.jpg';

export interface IObjectProps extends FormComponentProps {
  objectStore: ObjectStore;
  reviewStore: ReviewStore;
}

export interface IObjectState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  id: number;
}

const confirm = Modal.confirm;

@inject(Stores.ObjectStore)
@inject(Stores.ReviewStore)
@observer
class Objects extends AppComponentBase<IObjectProps, IObjectState> {
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
    await this.props.objectStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
    //await this.props.reviewStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
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
      this.props.objectStore.createObject();
    } else {
      await this.props.objectStore.getObjectForEdit(entityDto);
    }
    this.setState({ id: entityDto.id });
    this.Modal();

    this.formRef.props.form.setFieldsValue({
      ...this.props.objectStore.objectEdit.object
    });
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.objectStore.delete(input);
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
          await this.props.objectStore.create(values);
        } else {
          var editObj = this.props.objectStore.objectEdit.object;
          editObj.name = values.name;
          await this.props.objectStore.update(editObj);
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

    const { objects } = this.props.objectStore;
    console.log("objects.items");
    console.log(objects);
    const columns = [
      { title: L('Name'), dataIndex: 'name', key: 'name', width: 150, render: (text: string) => <div>{text}</div> },
      {
        title: L('Rating'), dataIndex: 'rating', key: 'rating', width: 100, render: (text: number) =>
          <div>{text.toFixed(1)}
            <Avatar shape="square" style={{ height: 20, width: 20 }} src={StarImg} />
          </div>
      },
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
            <h2>{L('Objects')}</h2>
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
              pagination={{ pageSize: this.state.maxResultCount, total: objects == undefined ? 0 : objects.totalCount, defaultCurrent: 1 }}
              columns={columns}
              loading={objects == undefined ? true : false}
              dataSource={objects == undefined ? [] : objects.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>

        <CreateOrUpdateObjects
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          modalType={this.state.id == 0 ? 'edit' : 'create'}
          onOk={this.handleCreate}
          objectStore={this.props.objectStore}
          reviewStore={this.props.reviewStore}
          id={this.state.id}
        />
      </Card>
    );
  }
}

export default Objects;
