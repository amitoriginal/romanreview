import { L } from 'src/lib/abpUtility';

const rules = {
  comment: [{ required: true, message: L('ThisFieldIsRequired') }],
  objectId: [{ required: true, message: L('ThisFieldIsRequired') }],
  rate:[{ required: true, message: L('ThisFieldIsRequired') }]
};

export default rules;
