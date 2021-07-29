import * as React from 'react';
import { Form, Input, Modal, Tabs, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { L } from 'src/lib/abpUtility';
import rules from './createOrUpdateReviews.validation';
import { FormComponentProps } from 'antd/lib/form';
import ReviewStore from 'src/stores/reviewStore';
import ObjectStore from 'src/stores/objectStore';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

export interface ICreateOrUpdateReviewsProps extends FormComponentProps {
  reviewStore: ReviewStore;
  objectStore: ObjectStore;
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onOk: () => void;
}

class CreateOrUpdateReviews extends React.Component<ICreateOrUpdateReviewsProps> {
  state = {
    confirmDirty: false,
    maxResultCount: 10,
    skipCount: 0,
    id: 0,
  };

  render() {
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
    return (
      <Modal
        visible={this.props.visible}
        cancelText={L('Cancel')}
        okText={L('OK')}
        onCancel={this.props.onCancel}
        title={L('Review')}
        onOk={this.props.onOk}
      >
        <Tabs defaultActiveKey={'review'} size={'small'} tabBarGutter={64}>
          <TabPane tab={L('ReviewDetails')} key={'review'}>
            <FormItem label={L('Comment')} {...formItemLayout}>
              {getFieldDecorator('comment', { rules: rules.comment })(<Input />)}
            </FormItem>
            <FormItem label={L('Rate')} {...formItemLayout}>
              {getFieldDecorator('rate', { rules: rules.rate })(<Input />)}
            </FormItem>
            {this.props.modalType === 'create' && this.props.objectStore && this.props.objectStore.objects && this.props.objectStore.objects.items &&
              <FormItem label={L('Object Id')} {...formItemLayout} >
                {getFieldDecorator('objectId', { rules: rules.objectId })(
                  <Select placeholder="select object" style={{ width: '100%' }} >
                    {this.props.objectStore && this.props.objectStore.objects && this.props.objectStore.objects.items.map(item => <Option key={item.id.toString()} value={item.id}>{item.name}</Option>)}
                  </Select>
                )}
              </FormItem>
            }
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create()(CreateOrUpdateReviews);
