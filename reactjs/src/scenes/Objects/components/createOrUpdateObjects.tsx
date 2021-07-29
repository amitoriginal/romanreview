import * as React from 'react';
import { Form, Input, Modal, Tabs, Rate, Row, Col, Table, Avatar } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { L } from 'src/lib/abpUtility';
import rules from './createOrUpdateObjects.validation';
import { FormComponentProps } from 'antd/lib/form';
import ObjectStore from 'src/stores/objectStore';
import ReviewStore from 'src/stores/reviewStore';
import StarImg from 'src/images/star.jpg';
const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateObjectsProps extends FormComponentProps {
  objectStore: ObjectStore;
  reviewStore: ReviewStore;
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
  id: number;
}

class CreateOrUpdateObjects extends React.Component<ICreateOrUpdateObjectsProps> {
  state = {
    confirmDirty: false,
    maxResultCount: 10,
    skipCount: 0,
    reviews: [],
    reviewsLoaded: false
  };

  componentDidMount() {
    //this.getReviews();
  }

  async getReviews() {
    alert("Props: " + this.props.id + " Visible:" + this.props.visible);

    var result = await this.props.reviewStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, objectId: this.props.id });
    this.setState({
      reviews: result,
      reviewsLoaded: true
    });
    //var result = this.props.reviewStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount });
    //console.log(result);
  }

  // testq() {
  //   alert("Props: " + this.props.id + " Visible:" + this.props.visible);
  // }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getReviews());
  };

  render() {

    if (this.props.id > 0 && !this.state.reviewsLoaded) {
      this.getReviews();
    }
    console.log("this.state.reviews");
    console.log(this.state.reviews);

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    const { reviews } = this.props.reviewStore;

    const columns = [
      {
        title: L('Rating'), dataIndex: 'rate', key: 'rate', width: 50, render: (text: number) =>
          <div>{text}<Avatar shape="square" style={{ height: 20, width: 20 }} src={StarImg} /></div>
      },
      { title: L('Comment'), dataIndex: 'comment', key: 'comment', width: 200, render: (text: string) => <div>{text}</div> },
      { title: L('ObjectId'), dataIndex: 'objectid', key: 'objectid', width: 200, render: (text: number) => <div>{text}</div> },
    ]

    return (
      <Modal
        visible={this.props.visible}
        cancelText={L('Cancel')}
        okText={L('OK')}
        onCancel={this.props.onCancel}
        title={L('Object')}
        onOk={this.props.onOk}
      >
        <Tabs defaultActiveKey={'object'} size={'small'} tabBarGutter={64}>
          <TabPane tab={L('ObjectDetails')} key={'object'}>
            <FormItem label={L('Name')} {...formItemLayout}>
              {getFieldDecorator('name', { rules: rules.name })(<Input />)}
            </FormItem>
            <FormItem label={L('Rating')} {...formItemLayout}>
              {getFieldDecorator('rating', {
                initialValue: 'rating'
              })(<Rate disabled />)}
            </FormItem>
            <span>{this.props.id}</span>

            {this.props.id > 0 &&
              <Row style={{ marginTop: 20 }}>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 24, offset: 0 }}
                  lg={{ span: 24, offset: 0 }}
                  xl={{ span: 24, offset: 0 }}
                  xxl={{ span: 24, offset: 0 }}
                >

                  {this.state.reviews.map(item=>{
                    
                  })}
                  <Table
                    rowKey="id"
                    size={'default'}
                    bordered={true}
                    pagination={{ pageSize: this.state.maxResultCount, total: reviews == undefined ? 0 : reviews.totalCount, defaultCurrent: 1 }}
                    columns={columns}
                    loading={this.state.reviews == undefined ? true : false}
                    dataSource={[]}//{this.state.reviews == undefined ? [] : this.state.reviews}
                    onChange={this.handleTableChange}
                  />
                </Col>
              </Row>
            }
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create()(CreateOrUpdateObjects);
