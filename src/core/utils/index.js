export default {
  constructParams: function(query) {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
          var data = param.split('='),
            key = data[0],
            value = data[1];
          params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
          return params;
        }, {})
      : {};
  },
};
const defaultGridColumns = () => [
  {
    dataIndex: 'CreatedBy',
    header: 'CreatedBy',
    type: 'combo',
    comboType: 'User',
  },
  {
    dataIndex: 'CreatedDate',
    header: 'CreatedDate',
    type: 'date',
  },
  {
    dataIndex: 'ModifiedBy',
    header: 'ModifiedBy',
    type: 'combo',
    comboType: 'User',
  },
  {
    dataIndex: 'ModifiedDate',
    header: 'ModifiedDate',
    type: 'date',
  },
];

const toVariableCase = (string) => string.charAt(0).toLowerCase() + string.slice(1);;

export { toVariableCase, defaultGridColumns };
