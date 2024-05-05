import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { ReduxHelper } from "../../core/redux-helper";
import { Select, Menu, Modal, Input, Tooltip } from "antd";
import SimpleForm from "./simple-form";
//import DialogForm from "./DialogForm";
import AgGrid from "../ag-grid";
import NavPills from "../Tabs";
import Button from "@material-ui/core/Button";
import API from "../../store/requests";
import { EnableLogs } from "../../app-config";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import AddIcon from "@material-ui/icons/AddCircleSharp";
import CardView from "../CardsLayout";
import { CONFIG, newConfig } from "../../store/config";
import Accordion from "../Accordion";
import { withTranslation } from "react-i18next";
import { triggerAPI, defaultLoader } from "../../core/utils";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";

const { Option } = Select;
const modal = Modal;
const { confirm } = Modal;
const Actions = ReduxHelper.Actions;

const DialogForm = () => <div>Need to implement1</div>;

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return <Component history={history} {...props} />;
  };
  return Wrapper;
};

const isTrue = (value) => {
  if (typeof value != "undefined") {
    if (value && value == true) {
      return true;
    }
  }
  return false;
};

export default class BaseView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      activeRecordId: null,
      gridPreferences: JSON.stringify({ filterInfo: [], sortInfo: [] }),
      error: "",
      startData: "",
      endDate: "",
    };
  }

  isFunction = (func) => {
    return func && typeof func == "function";
  };

  generateAction = (identifier) => {
    let generatedAction = {},
      configActions = [];
    for (const item of CONFIG) {
      if (item.key == identifier) configActions = item.actions;
    }

    for (const item of newConfig) {
      if (item.key == identifier) {
        configActions = item.actions;
      }
    }

    configActions.map((item) => {
      let lowerCase = item.charAt(0).toLowerCase() + item.slice(1),
        upperCase = item.charAt(0).toUpperCase() + item.slice(1),
        upperCaseKey = identifier.charAt(0).toUpperCase() + identifier.slice(1);
      generatedAction[lowerCase] = (payload) =>
        Actions[lowerCase + upperCaseKey]({
          identifier,
          action: item,
          ...payload,
        });
      generatedAction["reset" + upperCase] = (payload) =>
        Actions["reset" + upperCase + upperCaseKey]({
          identifier,
          action: item,
          ...payload,
        });
      generatedAction["set" + upperCase] = (payload) =>
        Actions["set" + upperCase + upperCaseKey]({
          identifier,
          action: item,
          ...payload,
        });
    });
    return generatedAction;
  };

  constructChildWithParentConfig = (parentTab) => {
    return parentTab.childs().map((child) => {
      var customViewMode = false;
      var childIsEditable = false;
      if (typeof child.showCustomContent == "boolean") {
        customViewMode = child.showCustomContent;
      }
      if (typeof child.isEditable == "boolean") {
        childIsEditable = child.isEditable;
      }

      var formColumns = this.constructFormFields(
        child.getFormColumns(),
        child.onChange
      );
      var gridColumns = this.constructGridColumns(
        child,
        child.getGridColumns(),
        childIsEditable,
        formColumns.length,
        child.filters,
        child.sort
      );

      child.comboTypes = child.comboTypes || [];
      return {
        mapper: child.mapper,
        comboTypes: [
          ...child.comboTypes,
          {
            type: "User",
            ValueField: "Name",
            IDField: "UserId",
          },
        ],
        autoRefresh: false,
        isChild: true,
        readOnlyGrid: child.readOnlyGrid,
        listAPI: child.listAPI,
        gridColumns: gridColumns,
        formFields: formColumns,
        key: child.key, //item.ad_window_id,
        tabId: child.key, //tabId,
        title: child.title, //item.title || item.windowname || item.name,
        type: "grid",
        identifier: child.key, //identifier,
        idColumn: child.idColumn,
        hidePaging: child.hidePaging,
        extraParams: child.extraParams || {},
        onGridPanelReady: child.onGridPanelReady || (() => {}),
        tabTitle: child.tabTitle,
        gridHeight: child.gridHeight,
        pagination: child.pagination,
        onRowDoubleClicked: child.onRowDoubleClicked,
        pageSize: child.pageSize,
        hideTitle: child.hideTitle,
        childView: child.childView || parentTab.childView,
        uniqueIdentifier: child.uniqueIdentifier,
        GridPanelWrapper: child.GridPanelWrapper,
        saveAndNextButton: child.saveAndNextButton,
        parentIdColumn: parentTab.idColumn,
        isEditable: childIsEditable,
        showCustomContent: customViewMode,
        formChilds: child && child?.formChilds ? child.formChilds() : null,
        // To Do: 2nd level child
        childs: child.childs,
      };
    });
  };

  constructConfig(entity, customView) {
    var childs = this.constructChildWithParentConfig(entity);
    var showCustomContent = false;
    var isEditable = false;
    if (typeof customView == "boolean") {
      showCustomContent = customView;
    }
    if (typeof entity.isEditable == "boolean") {
      isEditable = entity.isEditable;
    }

    var formColumns = this.constructFormFields(
      entity.getFormColumns(),
      entity.onChange
    );
    var gridColumns = this.constructGridColumns(
      entity,
      entity.getGridColumns(),
      isEditable,
      formColumns.length,
      entity.filters,
      entity.sort
    );

    let extraConfigs = {};
    if (this.isFunction(this.gridHeader)) {
      extraConfigs = { ...extraConfigs, gridHeader: this.gridHeader };
    }
    if (this.isFunction(this.gridFooter)) {
      extraConfigs = { ...extraConfigs, gridFooter: this.gridFooter };
    }
    if (this.isFunction(this.customContent)) {
      extraConfigs = { ...extraConfigs, customContent: this.customContent };
    }
    if (this.isFunction(this.loadData)) {
      extraConfigs = { ...extraConfigs, loadData: this.loadData };
    }
    if (this.isFunction(this.onRowSelection)) {
      extraConfigs = { ...extraConfigs, onRowSelection: this.onRowSelection };
    }
    var autoRefresh = true;
    if (typeof entity.autoRefresh == "boolean") {
      autoRefresh = entity.autoRefresh;
    }
    entity.overides = entity.overides || {};
    entity.comboTypes = entity.comboTypes || [];
    return {
      mapper: entity.mapper,
      autoRefresh: autoRefresh,
      isChild: false,
      comboTypes: [
        ...entity.comboTypes,
        {
          type: localStorage.userTable,
          ValueField: "Name",
          IDField: "UserId",
        },
      ],
      readOnlyGrid: entity.readOnlyGrid,
      listAPI: entity.listAPI,
      loadAPI: entity.loadAPI,
      gridColumns: gridColumns,
      formFields: formColumns,
      key: entity.key, //item.ad_window_id,
      tabId: entity.key, //tabId,
      title: entity.title, //item.title || item.windowname || item.name,
      type: "grid",
      identifier: entity.key,
      apiIdentifier: entity.key.toLowerCase(),
      idColumn: entity.idColumn,
      child: this.constructChilds(childs, entity.key),
      childView: entity.childView,
      hidePaging: entity.hidePaging,
      gridPreferences: entity.gridPreferences || {
        sortInfo: [
          { sort: entity.idColumn, dir: entity.idColumnSorting || "desc" },
        ],
        filterInfo: [],
      },
      extraParams: entity.extraParams || {},
      onGridPanelReady: entity.onGridPanelReady || (() => {}),
      gridHeight: entity.gridHeight,
      pagination: entity.pagination,
      onRowDoubleClicked: entity.onRowDoubleClicked,
      pageSize: entity.pageSize,
      uniqueIdentifier: entity.uniqueIdentifier,
      GridPanelWrapper: entity.GridPanelWrapper,
      saveAndNextButton: entity.saveAndNextButton,
      saveButtonText: entity.saveButtonText,
      customButtonsInForm: entity.customButtonsInForm,
      actions: this.generateAction(entity.key),
      isEditable,
      getCardView: entity.getCardView,
      showCustomContent,
      formTitle: entity.formTitle,
      tabTitle: entity.tabTitle,
      formChilds: entity && entity?.formChilds ? entity.formChilds() : null,
      ...extraConfigs,
      ...entity.overides,
    };
  }

  constructChild = (child, parentIdentifier) => {
    var childs = this.constructChildWithParentConfig(child);
    parentIdentifier = parentIdentifier || "";
    var identifier = parentIdentifier + "_" + child.tabId;
    return {
      ...child,
      key: child.tabId,
      type: "grid", //change the gridonly in type to see only grid
      value: child.tabId,
      buttons: [],
      parentIdentifier,
      apiIdentifier: child.tabId.toLowerCase(),
      identifier,
      child: this.constructChilds(childs, identifier),
      actions: this.generateAction(identifier),
      // To Do: 2nd level child
      //child: this.parseItem(tab)
    };
  };

  constructFormFields = (items, onChange) => {
    var fields = items
      .filter((item) => item.header)
      .filter((item) => !item.hidden)
      .map(({ header, ...rest }) => {
        var returnObject = {
          title: header,
          type: rest.type || "string",
          ...rest,
        };
        if (onChange && onChange[rest.dataIndex]) {
          returnObject.onChange = onChange[rest.dataIndex];
        }
        if (rest.type == "int") {
          if (typeof rest.allowNegatives == "boolean") {
            returnObject.allowNegatives = rest.allowNegatives;
          } else {
            returnObject.allowNegatives = true;
          }
        }
        return returnObject;
      });
    var formFields = [...fields];
    return formFields;
  };

  constructGridColumns = (
    entity,
    items,
    isEditable,
    formItemCount,
    entityFilters,
    entitySort
  ) => {
    var fields = items
      .filter((item) => item.header)
      .filter((item) => !item.hidden)
      .map(
        ({
          header,
          dataIndex,
          isEditable: isEditableCol,
          filters,
          sort,
          ...rest
        }) => {
          var cellClass = null;
          if (rest.type === "number") {
            cellClass = "number-cell";
            if (header.toLowerCase() === "id") {
              cellClass = "left-number-cell";
            }
          }

          if (rest.type === "float") {
            cellClass = "float-cell";
          }

          var notsortabletype = false;
          if (entitySort === "none" || sort === "none") {
            notsortabletype = true;
          }

          var returnObject = {
            dataIndex,
            cellClass,
            title: header,
            editable: isEditableCol || isEditable || false,
            nofiltertype: (entityFilters || filters) === "none" ? true : false,
            notsortabletype: notsortabletype,
            ...rest,
          };

          if (dataIndex == entity.idColumn) {
            returnObject.sortingOrder = ["desc", "asc"];
          }
          return returnObject;
        }
      );
    if (formItemCount == 0) {
      return fields;
    }
    var gridColumns = [
      {
        dataIndex: "Operation",
        header: "Operation",
        width: 105,
        type: "operation",
        editable: false,
        nofiltertype: true,
        notsortabletype: true,
      },
      ...fields,
    ];
    return gridColumns;
  };

  constructChilds = (tabs, identifier) => {
    var childs = [];
    for (var tab of tabs) {
      childs.push(this.constructChild(tab, identifier));
    }
    return childs;
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleMenuClick = (selectedRow, e) => {
    if (Number(e.key) == 1) {
      this.setState({
        selectedRow,
        operationType: Number(e.key),
        modal1Visible: true,
        activeRecordId: 1,
      });
    } else if (Number(e.key) == 2) {
      this.setState({
        selectedRow,
        operationType: Number(e.key),
        modal2Visible: true,
        recordIdToDelete: selectedRow.assetId,
      });
    } else if (Number(e.key) == 3) {
      this.setState({
        selectedRow: null,
        operationType: Number(e.key),
        modal1Visible: true,
        activeRecordId: null,
      });
    }
  };

  render() {
    let className = "";
    if (this.config.childView == "flex" && !this.config.parentIdentifier) {
      className = "grid-view-flex";
    }
    return (
      <div className={className}>
        <GridContainer config={this.config} parentRecordId={-1} />
      </div>
    );
  }
}

const ModalForm = ({
  visible,
  toggle,
  selectedRow,
  selectedRowParent,
  columns,
  identifier,
  apiIdentifier,
  activeRecordId,
  mode,
  config,
  resetProps,
  showDialogForm,
  closeDialogForm,
  data,
  combos,
  selectRow,
  formChilds,
}) => {
  if (showDialogForm) {
    return (
      <DialogForm
        open={showDialogForm}
        onclose={closeDialogForm}
        data={data}
        combos={combos}
        selectRow={selectRow}
      />
    );
  } else {
    return (
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => {
          return toggle(false);
        }}
        width={"70%"}
        style={{ top: 20 }}
        className="modal-container"
        destroyOnClose
        closable={false}
      >
        <SimpleForm
          columns={columns}
          selectedRow={selectedRow}
          selectedRowParent={selectedRowParent}
          identifier={identifier}
          apiIdentifier={apiIdentifier}
          toggle={toggle}
          activeRecordId={activeRecordId}
          visible={visible}
          mode={mode}
          config={config}
          resetProps={resetProps}
          formChilds={formChilds}
        />
      </Modal>
    );
  }
};

const PreferenceMenu = ({
  allPreferences,
  onPreferenceSelect,
  visible,
  toggle,
}) => {
  const { t } = this.props;
  var preferences = [];
  if (allPreferences) {
    for (var item of allPreferences) {
      preferences.push(
        <Menu.Item onClick={onPreferenceSelect.bind(null, item.preference)}>
          <a target="_blank" rel="noopener noreferrer">
            {item.key}
          </a>
        </Menu.Item>
      );
    }
  }

  return (
    <div>
      <Menu>
        {preferences}
        <hr />
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={toggle}>
            {t("Add Preference")}
          </a>
        </Menu.Item>
        <Modal
          visible={visible}
          title={t("Preference")}
          footer={[
            <Tooltip title={t("Cancel")}>
              <Button key="back" onClick={toggle}>
                {t("Cancel")}
              </Button>
            </Tooltip>,
            <Tooltip title={t("Submit")}>
              <Button key="submit" type="primary" onClick={toggle}>
                {t("Submit")}
              </Button>
            </Tooltip>,
          ]}
        >
          <p>
            {t("Name")}:
            <Input placeholder="" />
          </p>
          <p>
            {t("Description")}:
            <Input placeholder="" />
          </p>
        </Modal>
      </Menu>
    </div>
  );
};
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        PDF
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        EXCEL
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        JSON
      </a>
    </Menu.Item>
  </Menu>
);

class GridFooter extends PureComponent {
  render() {
    return <>{/*Custom Paging Bar*/}</>;
  }
}

class GridPanel extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      selectedRowParent: null,
      tabId: this.props.config.tabId,
      activeRecordId: "NEW_RECORD",
      visible: false,
      isRefresh: false,
      mode: "",
      showDialogForm: false,
    };
    const {
      config: { identifier, gridPreferences, onGridPanelReady },
      dispatch,
    } = props;
    if (gridPreferences && identifier) {
      /*dispatch(
        Actions['gridpreference' + identifier]({
          localGridPreferences: true,
          gridPreferences,
          action: 'gridpreference',
          identifier,
        }),
      );*/
    }
    onGridPanelReady({ gridPanel: this });
  }
  componentWillUnmount() {
    const {
      config: { identifier, actions },
      dispatch,
    } = this.props;
    dispatch(actions.resetList());
    var preference = { ...this.props.config.gridPreferences };
    if (this.props.config.showCustomContent === false) {
      preference[
        (this.props.config.uniqueIdentifier || identifier) + "columns"
      ] = this.gridColumnApi.getColumnState();
    }
    dispatch(actions.setGridpreference(preference));
  }

  createRow = () => {
    const {
      config: {
        loadAPI,
        identifier,
        apiIdentifier,
        comboTypes,
        isLoadFetching,
      },
      dispatch,
      combos,
      selectedRowParent,
    } = this.props;

    if (loadAPI) {
      var options = {
        action: "load",
        identifier,
        apiIdentifier,
        id: 0,
      };

      if (comboTypes) {
        var listCombos = [];
        for (var combo of comboTypes) {
          if (!combo.loaded && combos[combo.type]) {
            combo.loaded = true;
          }
          if (!combo.loaded) {
            //combo.loaded = true;
            listCombos.push(combo);
          }
        }
        options.comboTypes = JSON.stringify(listCombos);
      }
      dispatch(loadAPI({ ...options, ...this.props.config.extraParams }));
    }
    if (!isLoadFetching && isLoadFetching != this.props.isLoadFetching) {
      modal.destroyAll();
      setTimeout(() => {
        this.setState({
          selectedRowParent: { ...selectedRowParent },
          selectedRow: {},
          activeRecordId: "NEW_RECORD",
          visible: true,
          mode: "edit",
        });
      }, 1000);
    }
  };

  toogle = (toggleAction) => {
    if (this.state.visible) {
      if (this.props.config.comboTypes)
        for (var combo of this.props.config.comboTypes) combo.loaded = false;
      if (!toggleAction) {
        this.setState({
          visible: false,
          isRefresh: false,
          activeRecordId: null,
        });
      } else {
        this.setState(
          { visible: false, isRefresh: true, activeRecordId: null },
          () => (this.state.isRefresh = false)
        );
      }
    } else {
      this.setState({ visible: true });
    }
  };

  applyDateRangeFiler = () => {
    let gridApi = this.gridApi;
    alert("Need to Apply Filter on CreatedBy column");
  };
  loadData = ({ filterInfo, sortInfo, currentPage, limit, filter }) => {
    /*if (!this.props.config.listAPI) {
      return;
    }*/
    if (this.props.config.loadData)
      this.props.config.loadData({
        filterInfo,
        sortInfo,
        currentPage,
        limit,
        filter,
        gridPanel: this,
      });
    else {
      let newFilterInfo = [];
      if (filterInfo) {
        for (var index in filterInfo) {
          if (!newFilterInfo) {
            newFilterInfo = [];
          }
          newFilterInfo.push({
            filterTerm:
              filterInfo[index].filterValue || filterInfo[index].filterTerm,
            filterBy: filterInfo[index].filterBy,
          });
        }
      }
      if (filter) {
        for (var item of filter) {
          if (!newFilterInfo) {
            newFilterInfo = [];
          }
          var filterType = "EQUALS";
          if (item.data.type == "string") {
            filterType = "CONTAINS";
          } else if (item.data.type == "boolean") {
            item.data.value = item.data.value ? 1 : 0;
          } else if (item.data.type == "numeric") {
            if (item.data.comparison == "gt") {
              filterType = "GREATERTHANEQUAL";
            } else if (item.data.comparison == "lt") {
              filterType = "LESSERTHANEQUAL";
            } else if (item.data.comparison == "eq") {
              filterType = "EQUALS";
            }
          } else if (item.data.type == "date") {
            if (item.data.comparison == "gt") {
              filterType = "DATEGREATERTHANEQUAL";
            } else if (item.data.comparison == "lt") {
              filterType = "DATELESSERTHANEQUAL";
            } else if (item.data.comparison == "eq") {
              filterType = "DATEEQUALS";
            }
          } else if (item.data.type == "list") {
            filterType = "MULTI";
          }
          newFilterInfo.push({
            filterTerm: item.data.value,
            filterBy: item.field,
            filterType,
          });
        }
      }

      var options = {
        pageNo: currentPage,
        pageSize: limit,
        filterInfo: newFilterInfo,
        action: "list",
        sortInfo: sortInfo && sortInfo.length === 0 ? null : sortInfo,
        identifier: this.props.config.identifier,
        apiIdentifier: this.props.config.apiIdentifier,
      };

      if (this.props.config.comboTypes) {
        var combos = [];
        for (var combo of this.props.config.comboTypes) {
          if (!combo.loaded) {
            //combo.loaded = true;
            combos.push(combo);
          }
        }
        options.comboTypes = combos;
      }
      if (this.props.config.isChild) {
        let parentEntity = this.props.config.identifier.split("_");
        parentEntity = parentEntity[parentEntity.length - 2];
        options.PageNo = 0;
        options.PageSize = 50;
        options.ParentEntity = parentEntity;
        options.ParentEntityField = this.props.config.parentIdColumn;
        options.ParentId =
          this.props.selectedRowParent[this.props.config.parentIdColumn];
      }

      this.props.dispatch(
        Actions["list" + options.identifier]({
          ...options,
          ...this.props.config.extraParams,
        })
      );
    }
  };

  onRowChange = (selectedRowKeys, selectedRows) => {
    if (this.props.config.onRowSelection)
      this.props.config.onRowSelection({ selectedRows, gridPanel: this });
    if (selectedRows.length === 1)
      this.props.updateState({
        selectedRow: selectedRows[0],
        activeRecordId: selectedRows[0][this.props.config.idColumn],
        toogle: this.loadData,
      });
  };

  updatePreference = (existingPreferences) => {
    // TO DO - Need to move to NOTON Components
    var identifier = this.props.config.tabId;
    var type = identifier + "_GRIDPREFERENCE_REQUEST";

    this.props.dispatch({
      type: type,
      payload: existingPreferences,
      identifier: identifier,
      request: "SET_PREFERENCE",
    });
  };

  loadFetchingModal = () => {
    const { t } = this.props;
    modal.destroyAll();
    modal.success({
      title: t("Please wait") + "..",
      okButtonProps: {
        style: { backgroundColor: "#24b5ee", border: "none", display: "none" },
      },
    });
  };

  deleteSuccess = () => {
    const { t } = this.props;
    modal.destroyAll();
    modal.success({
      title: t("Deleted Successfully") + "...",
      okButtonProps: {
        style: { backgroundColor: "#24b5ee", border: "none", display: "none" },
      },
    });
    setTimeout(() => {
      modal.destroyAll();
    }, 1000);
  };

  confirmDelete = (index, idColumn) => {
    const { t } = this.props;
    var row = this.props.data[index];
    var activeRecordId = row[idColumn];

    var payload = {
      action: "delete",
      [idColumn]: activeRecordId,
      identifier: this.props.config.identifier,
    };

    // TO DO: Need to Show Modal Popup to ask for Delete
    API.triggerPost(this.props.config.apiIdentifier, payload)
      .then((response) => {
        var data = response.data;
        if (data.success) {
          this.setState(
            { isRefresh: true },
            () => (this.state.isRefresh = false)
          );
        } else {
          alert(t("Failed"));
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
  selectRow = (index, type) => {
    const { t } = this.props;
    this.selectedRowType = type;
    if (type === "Delete") {
      const {
        config: { idColumn },
      } = this.props;
      confirm({
        title: t("Are you sure you want to delete this record?"),
        // content: 'Some descriptions',
        onOk: () => {
          this.confirmDelete(index, idColumn);
          this.deleteSuccess();
        },
        onCancel: () => {
          return;
        },
      });
    } else if (type === "Reply") {
      this.setState({ showDialogForm: true });
    } else {
      const {
        data: gridRows,
        config: { idColumn, loadAPI, identifier, apiIdentifier, comboTypes },
        dispatch,
        combos,
      } = this.props;

      var row = gridRows[index];
      var activeRecordId = row[idColumn];
      if (loadAPI) {
        var options = {
          action: "load",
          identifier,
          apiIdentifier,
          id: activeRecordId,
        };

        if (comboTypes) {
          var listCombos = [];
          for (var combo of comboTypes) {
            if (!combo.loaded && combos[combo.type]) {
              combo.loaded = true;
            }
            if (!combo.loaded) {
              //combo.loaded = true;
              listCombos.push(combo);
            }
          }
          options.comboTypes = JSON.stringify(listCombos);
        }

        dispatch(loadAPI({ ...options, ...this.props.config.extraParams }));
      } else {
        var initialValues = {};
        var selectRowValues = {};
        for (var key in row) {
          //initialValues['field_'+key] = row[key + '_iden'] || row[key];
          initialValues[key] = null;
          selectRowValues[key] = row[key];
        }

        this.setState(
          {
            mode: this.selectedRowType,
            visible: true,
            selectedRow: type === "Create" ? {} : initialValues,
            activeRecordId: "NEW_RECORD",
          },
          () => {
            this.setState({
              selectedRow: selectRowValues,
              activeRecordId,
              selectedRowParent: this.props.selectedRowParent,
            });
          }
        );
      }
    }
  };

  resetProps = () => this.createRow();

  onGridReady = (params) => {
    const {
      gridPreferences,
      config: { identifier, uniqueIdentifier },
    } = this.props;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (gridPreferences) {
      let pref = JSON.parse(gridPreferences);
      const { sortInfo, filterInfo } = JSON.parse(gridPreferences);
      if (sortInfo && sortInfo.length > 0) {
        let sort = sortInfo.map((item) => ({
          colId: item.sort,
          sort: item.dir,
        }));
        // To Do: need to handle sort model if needed
        if (this.gridApi.setSortModel) {
          this.gridApi.setSortModel(sort);
        }
      }
      if (filterInfo && filterInfo.length > 0) {
        // TO DO : need to handle for grid prferences
      }
      if (pref[(uniqueIdentifier || identifier) + "columns"]) {
        if (this.gridColumnApi.setColumnState) {
          this.gridColumnApi.setColumnState(
            pref[(uniqueIdentifier || identifier) + "columns"]
          );
        }
      }
    }
  };

  onAddRow = () => {
    this.gridApi.updateRowData({ add: [{}] });
  };

  getRowData = () => {
    var rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.debug("Row Data:", JSON.stringify(rowData));
  };

  exportToXlsx = () => {
    let me = this;

    triggerAPI({
      t: me.props.t,
      controller: me.props.config.identifier,
      params: {
        action: "ExportData",
      },
      gridPanel: me,
      addProgressBar: true,
      resSuccessCallBack: (response) => {
        var jsonArray = response.data.data;
        if (jsonArray.length > 0) {
          let key = "xlsx";
          let fileType = {
            csv: "text/plain;charset=UTF-8",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          };
          var headers = [];
          for (var objectKey in jsonArray[0]) {
            headers.push(objectKey);
          }
          let timeStamp = moment().format("DD.MM.YY hh.mm");
          const fileName = me.props.config.title + " " + timeStamp;
          const ws = XLSX.utils.json_to_sheet(jsonArray, {
            header: headers,
          });
          const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
          let excelBuffer = XLSX.write(wb, { bookType: key, type: "array" });
          const data = new Blob([excelBuffer], { type: fileType[key] });
          FileSaver.saveAs(data, fileName + "." + key);
        } else {
          modal.error({
            title: me.props.t("No Entries for " + me.props.config.title),
            maskClosable: false,
            okButtonProps: {
              style: { backgroundColor: "#C31D1D", border: "none" },
            },
          });
        }
      },
    });
  };

  gridHeader = () => {
    const { t } = this.props;
    const { displayLoader } = this.state;
    if (this.props.config.gridHeader) {
      return this.props.config.gridHeader({
        gridPanel: this,
        config: this.props.config,
      });
    } else {
      if (this.props.config.readOnlyGrid) {
        return <div class="empty-grid-header" />;
      }
      var isFullAccess = sessionStorage.getItem("fullAccess");
      if (isFullAccess == 0) {
        return <div class="empty-grid-header" />;
      }
      if (this.props.config.key == "Activity") {
        return (
          <>
            <Tooltip title="Risks">
              <Button
                variant="outlined"
                color="primary"
                className="main-button-color"
                ghost
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={() => {
                  var scope = this;
                  var activityTypeCombos = scope.props.combos["ActivityType"];
                  var filterList = [];
                  activityTypeCombos
                    .filter((item) => item.Type == "Risks")
                    .forEach((item) => {
                      filterList.push(item.LookupId);
                    });
                  var model = {
                    ActivityTypeId: {
                      type: "listCustom",
                      value: filterList.join(","),
                    },
                  };
                  scope.gridApi.setFilterModel(model);
                }}
              >
                {t("Risks")}
              </Button>
            </Tooltip>{" "}
            <Tooltip title="Risks">
              <Button
                variant="outlined"
                color="primary"
                className="main-button-color"
                ghost
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={() => {
                  var scope = this;
                  var activityTypeCombos = scope.props.combos["ActivityType"];
                  var filterList = [];
                  activityTypeCombos
                    .filter((item) => item.Type == "Controls")
                    .forEach((item) => {
                      filterList.push(item.LookupId);
                    });
                  var model = {
                    ActivityTypeId: {
                      type: "listCustom",
                      value: filterList.join(","),
                    },
                  };
                  scope.gridApi.setFilterModel(model);
                }}
              >
                {t("Controls")}
              </Button>
            </Tooltip>{" "}
            <Tooltip title="Add">
              <Button
                variant="outlined"
                color="primary"
                className="main-button-color"
                ghost
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={this.createRow}
              >
                {t("Add")}
              </Button>
            </Tooltip>
          </>
        );
      }
      return !this.props.config.isChild ? (
        <>
          {displayLoader && defaultLoader()}
          <Tooltip title="Add">
            <Button
              variant="outlined"
              color="primary"
              className="main-button-color"
              ghost
              style={{ marginTop: 20, marginBottom: 20 }}
              onClick={this.createRow}
            >
              {t("Add")}
            </Button>
          </Tooltip>
          <Tooltip title="Export">
            <Button
              variant="outlined"
              color="primary"
              className="main-button-color"
              ghost
              style={{ marginTop: 20, marginBottom: 20 }}
              onClick={this.exportToXlsx}
            >
              {t("Export")}
            </Button>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="New">
            <Button
              variant="outlined"
              color="primary"
              className="main-button-color"
              ghost
              style={{ marginTop: 20, marginBottom: 20 }}
              onClick={
                this.props.config.isEditable ? this.onAddRow : this.createRow
              }
            >
              {t("New")}
            </Button>{" "}
          </Tooltip>
          {this.props.config.isEditable && (
            <Tooltip title="Save">
              <Button
                variant="outlined"
                color="primary"
                className="main-button-color"
                ghost
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={this.getRowData}
              >
                {t("Save")}
              </Button>
            </Tooltip>
          )}
        </>
      );
    }
  };

  gridFooter = () => {
    if (this.props.config.gridFooter) {
      return this.props.config.gridFooter({
        gridPanel: this,
        config: this.props.config,
      });
    }
    return <></>;
  };

  componentWillReceiveProps({
    combos: newCombos,
    errorMessage,
    selectedRow,
    isLoadFetching,
  }) {
    if (this.props.config.comboTypes && newCombos) {
      const { combos: oldCombos } = this.props;
      if (
        oldCombos &&
        Object.keys(oldCombos).length != Object.keys(newCombos).length
      ) {
        var comboTypes = this.props.config.comboTypes;
        for (var comboType of comboTypes) {
          if (
            newCombos[comboType.type] &&
            newCombos[comboType.type].length > 0
          ) {
            comboType.loaded = true;
          }
        }
      }
    }
    if (errorMessage && errorMessage != this.props.errorMessage) {
      this.setState(
        { snackBarVisible: true, message: errorMessage, color: "danger" },
        () =>
          setTimeout(
            () => this.setState({ snackBarVisible: false, message: "" }),
            5000
          )
      );
    }

    if (selectedRow && this.props.selectedRow != selectedRow) {
      var mode = "edit";
      if (this.selectedRowType === "View") {
        mode = "view";
      }

      var activeRecordId = selectedRow["Id"];
      var initialValues = {};
      var selectRowValues = {};
      for (var key in selectedRow) {
        //initialValues['field_'+key] = row[key + '_iden'] || row[key];
        initialValues[key] = null;
        selectRowValues[key] = selectedRow[key];
      }
    }

    if (isLoadFetching && isLoadFetching != this.props.isLoadFetching) {
      this.loadFetchingModal();
    }
    if (!isLoadFetching && isLoadFetching != this.props.isLoadFetching) {
      var activeRecordId = selectedRow["Id"];
      modal.destroyAll();
      this.setState(
        {
          mode: mode,
          visible: true,
          selectedRow: this.selectedRowType === "Create" ? {} : initialValues,
          activeRecordId: "NEW_RECORD",
        },
        () => {
          this.setState({ selectedRow: selectRowValues, activeRecordId });
        }
      );
    }
  }

  buildButtons = (isFetching) => {
    const { t } = this.props;
    return (
      <>
        <span>
          <Button
            variant="outlined"
            className="add-button"
            startIcon={<AddIcon fontSize="small" />}
            onClick={this.createRow}
            disabled={isFetching}
          >
            {t("Add")}
          </Button>
        </span>
      </>
    );
  };

  closeDialogForm = (close) => {
    this.setState({ showDialogForm: close });
  };

  render() {
    const {
      config,
      data,
      total,
      isFetching,
      combos,
      gridPreferences,
      GridPanelWrapper: GridPanelWrapperProps,
      parentIdColumn,
    } = this.props;
    const { isRefresh, snackBarVisible, color, message } = this.state;
    const {
      childView,
      showCustomContent,
      isChild,
      hideTitle,
      identifier,
      gridColumns,
      autoRefresh,
      gridHeight,
      enableAdvanceSearch,
      hidePaging,
      pagination,
      onCellClicked,
      GridPanelWrapper: GridPanelWrapperConfig,
      childs,
      getCardView,
      formChilds,
      title,
    } = config;

    const GridPanelWrapper = GridPanelWrapperConfig || GridPanelWrapperProps;
    return (
      <GridPanelWrapper>
        <div
          className={identifier + "-class"}
          style={{
            width: "100%",
            marginLeft: "5px",
            marginRight: "5px",
            border: "1px solid #F0F0F0",
            height: "600px",
          }}
        >
          {isChild &&
            !hideTitle &&
            (childView == "section" || childView == "flex") &&
            !config.parentIdentifier && (
              <div className="child-view-section-header">{config.title}</div>
            )}
          {this.gridHeader()}
          <Select
            defaultValue="Select Range"
            style={{ width: 150, marginLeft: "10px" }}
            onChange={this.applyDateRangeFiler}
          >
            <Option value="today">Today</Option>
            <Option value="yesterday">Yesterday</Option>
            <Option value="last7days">Last 7 Days</Option>
            <Option value="last30days">Last 30 Days</Option>
            <Option value="lastMonth">Last Month</Option>
          </Select>
          <Snackbar
            place="tc"
            color={color}
            message={message}
            open={snackBarVisible}
          />
          {showCustomContent ? (
            <CardView
              loadData={this.loadData}
              data={data}
              combos={combos}
              selectRow={this.selectRow}
              getCardView={getCardView}
              isRefresh={isRefresh}
              isFetching={isFetching}
              total={total}
              gridPreferences={
                gridPreferences || JSON.stringify(config.gridPreferences)
              }
              autoRefresh={autoRefresh}
              config={config}
              onGridReady={this.onGridReady}
            />
          ) : (
            <AgGrid
              columns={
                parentIdColumn
                  ? gridColumns.filter(
                      (item) => item.dataIndex !== parentIdColumn
                    )
                  : gridColumns
              }
              loadData={this.loadData}
              data={data}
              autoRefresh={autoRefresh}
              enableAdvanceSearch={enableAdvanceSearch}
              total={total}
              isFetching={isFetching}
              selectRow={this.selectRow}
              combos={combos}
              isRefresh={isRefresh}
              onRowChange={this.onRowChange}
              onGridReady={this.onGridReady}
              hidePaging={hidePaging}
              height={gridHeight}
              pagination={pagination}
              onRowDoubleClicked={config.onRowDoubleClicked}
              gridPreferences={
                gridPreferences || JSON.stringify(config.gridPreferences)
              }
              pageSize={config.pageSize}
              onCellClicked={onCellClicked}
              childs={childs}
              config={config}
            />
          )}
          {this.gridFooter()}
          <GridFooter />
          <ModalForm
            identifier={config.identifier}
            apiIdentifier={config.apiIdentifier}
            visible={this.state.visible}
            toggle={this.toogle}
            selectedRowParent={this.state.selectedRowParent}
            selectedRow={this.state.selectedRow}
            mode={this.state.mode}
            columns={
              parentIdColumn
                ? config.formFields.filter(
                    (item) => item.dataIndex !== parentIdColumn
                  )
                : config.formFields
            }
            activeRecordId={this.state.activeRecordId}
            config={config}
            resetProps={this.resetProps}
            showDialogForm={this.state.showDialogForm}
            closeDialogForm={this.closeDialogForm}
            data={data}
            combos={combos}
            selectRow={this.selectRow}
            formChilds={formChilds}
          />
        </div>
      </GridPanelWrapper>
    );
  }
}

GridPanel.defaultProps = {
  GridPanelWrapper: (props) => <>{props.children}</>,
};

const mapStateToProps = (state, props) => {
  var listIdentifier = "list_" + props.config.identifier.toLowerCase();
  var loadIdentifier = "load_" + props.config.identifier.toLowerCase();
  var gridPreferenceIdentifier =
    "gridpreference_" + props.config.identifier.toLowerCase();

  let selectedRowParent = {};
  if (props.config.isChild && props.config.parentIdentifier) {
    var listparentIdentifier =
      "list_" + props.config.parentIdentifier.toLowerCase();
    if (state[listparentIdentifier].data)
      selectedRowParent = {
        ...(state[listparentIdentifier].data.selectedRowParent || {}),
      };
  }
  var gridData = state[listIdentifier];
  var rowData = state[loadIdentifier];
  var gridPreferenceState = state[gridPreferenceIdentifier] || {};

  var listErrorMessage = "";
  var loadErrorMessage = "";

  var isLoadFetching = false;

  var selectedRow = null;

  if (rowData) {
    if (rowData.isFetching) {
      isLoadFetching = true;
    }
    if (rowData.data && rowData.data.data) {
      selectedRow = rowData.data.data;
    }
  }
  /*var gridPreferences = JSON.stringify({
    sortInfo: [],
    filterInfo: [],
  });*/

  var gridPreferences = "";

  if (gridPreferenceState && gridPreferenceState.data) {
    gridPreferences = JSON.stringify(gridPreferenceState.data);
  }

  var allPreferences = [];
  // Sample JSON for All Preferences
  /*
    allPreferences = [
      {
        key: 'Preference1',
        preference: {
          sortInfo: [
            { sortBy: '2145', sortDirection: 'ASC' },
            { sortBy: '2155', sortDirection: 'DESC' },
          ],
          filterInfo: [{ filterBy: '2145', filterTerm: 'Be Soft Drinker' }],
        },
      },
      {
        key: 'Preference2',
        preference: {
          sortInfo: [{ sortBy: '2145', sortDirection: 'DESC' }],
          filterInfo: [{ filterBy: '2145', filterTerm: 'Be Soft Drinker' }],
        },
      },
      {
        key: 'Preference3',
        preference: {
          sortInfo: [{ sortBy: '2145', sortDirection: 'DESC' }],
          filterInfo: [{ filterBy: '2145', filterTerm: 'Demo' }],
        },
      },
    ];
    
    // Sample JSON for Grid Preferences
    gridPreferences = {
      sortInfo: [
        { sortBy: '2145', sortDirection: 'ASC' },
        { sortBy: '2155', sortDirection: 'DESC' },
      ],
      filterInfo: [{ filterBy: '2145', filterTerm: 'Be Soft Drinker' }],
    };*/

  if (gridData) {
    var data = [];
    var count = 0;
    if (gridData.data) {
      if (gridData.data && gridData.data.data) {
        data = gridData.data.data;
        count = gridData.data.total;
      }
    } else if (gridData.error) {
      listErrorMessage = gridData.error;
    }

    return {
      selectedRow,
      errorMessage: listErrorMessage || loadErrorMessage,
      data: data,
      combos: state.combos,
      isFetching: gridData.isFetching,
      isLoadFetching: isLoadFetching,
      total: count,
      gridPreferences: gridPreferences,
      allPreferences: allPreferences,
      selectedRowParent,
    };
  }

  return {
    selectedRow,
    data: [],
    errorMessage: listErrorMessage || loadErrorMessage,
    combos: {},
    isFetching: false,
    isLoadFetching: isLoadFetching,
    total: 0,
    gridPreferences: gridPreferences,
  };
};
const ReduxGridPanel = withTranslation()(
  connect(mapStateToProps)(withRouter(GridPanel))
);

class GridContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      tabId: this.props.config.tabId,
      activeRecordId: null,
      title: "",
      activePanel: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (EnableLogs) {
      Object.keys(nextProps)
        .filter((key) => {
          return nextProps[key] !== this.props[key];
        })
        .map((key) => {
          console.debug(
            "GridContainer - changed property:",
            key,
            "from",
            this.props[key],
            "to",
            nextProps[key]
          );
        });
    }
  }

  updateState = (object) => {
    this.setState({ ...object, activePanel: 1 });
  };

  render() {
    const { config } = this.props;
    const { selectedRow, activeRecordId, toogle, activePanel } = this.state;
    let title = ""; //config.title;
    if (selectedRow) {
      if (config.tabTitle && config.tabTitle.length > 0) {
        config.tabTitle.forEach((column) => {
          title += column + ": " + selectedRow[column] + " ";
        });
      }
    }
    if (
      config.child.length == 0 ||
      ((config.childView == "flex" || config.childView == "section") &&
        !config.parentIdentifier)
    ) {
      return (
        <>
          <ReduxGridPanel
            config={config}
            activeRecordId={activeRecordId}
            parentRecordId={this.props.parentRecordId}
            updateState={this.updateState}
            parentIdColumn={this.props.parentIdColumn}
          />
          <ReduxFormContainer
            config={config}
            childView={config.childView}
            selectedRow={selectedRow}
            activeRecordId={activeRecordId}
            toogle={toogle}
          />
        </>
      );
    }
    return (
      <>
        <Accordion
          active={activePanel}
          collapses={[
            {
              title: title,
              content: (
                <ReduxGridPanel
                  config={config}
                  activeRecordId={activeRecordId}
                  parentRecordId={this.props.parentRecordId}
                  updateState={this.updateState}
                  parentIdColumn={this.props.parentIdColumn}
                />
              ),
            },
            {
              //title: "Form Container",
              content: (
                <ReduxFormContainer
                  config={config}
                  childView={config.childView}
                  selectedRow={selectedRow}
                  activeRecordId={activeRecordId}
                  toogle={toogle}
                />
              ),
            },
          ]}
        />
      </>
    );
  }
}

class FormContainer extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { config } = this.props;

    // UnComment below code to see Form Panel as First Child
    var childs = [
      /*{
        title: 'Details',
        index: 0,
        key: config.key,
        type: 'form-panel',
        columns: config.formFields,
        parentIdColumn: config.parentIdColumn,
      },*/
    ];

    if (config.child) {
      for (var child of config.child) {
        var tabConfig = { ...child };
        childs.push(tabConfig);
      }
    }
    this.state = {
      childs,
    };
  }

  loadTabData = (
    { actions, parentIdentifier, parentIdColumn, type, comboTypes },
    { filterInfo, sortInfo, currentPage, limit }
  ) => {
    const { selectedRow } = this.props;
    if (type === "form-panel") return;
    if (Object.keys(selectedRow).length === 0) return;
    let newFilterInfo = null;
    if (filterInfo) {
      for (var index in filterInfo) {
        if (!newFilterInfo) {
          newFilterInfo = [];
        }
        newFilterInfo.push({
          filterTerm:
            filterInfo[index].filterValue || filterInfo[index].filterTerm,
          filterBy: filterInfo[index].filterBy,
        });
      }
    }
    let parentEntity = parentIdentifier.split("_");
    var options = {
      PageNo: 0,
      PageSize: 50,
      ParentEntity: parentEntity[parentEntity.length - 1],
      ParentEntityField: parentIdColumn,
      ParentId: selectedRow[parentIdColumn],
      filterInfo: newFilterInfo,
      sortInfo: sortInfo && sortInfo.length === 0 ? null : sortInfo,
    };
    if (comboTypes) {
      var combos = [];
      for (var combo of comboTypes) {
        combos.push(combo);
        // TO DO: Need to see why childs are loaded on parent row click
        /*if (!combo.loaded) {
          //combo.loaded = true;
          combos.push(combo);
        }*/
      }
      options.comboTypes = combos;
    }
    if (!selectedRow[parentIdColumn]) return;

    this.props.dispatch(actions.list(options));
  };

  onSelect = (tabIndex) => {
    var tab = this.state.childs[tabIndex];
    this.loadTabData(tab, {});
    return;
  };

  render() {
    const { childs } = this.state;
    const { selectedRow, childView } = this.props;

    return (
      <>
        <TabContainer
          items={childs}
          selectedRow={selectedRow}
          onSelect={this.onSelect}
          parentRecordId={this.props.activeRecordId}
          childView={childView}
          {...this.props}
        />
      </>
    );
  }
}

const mapStateToPropsFrom = (state, props) => {
  let selectedRowParent = {};
  if (props.config.isChild && props.config.identifier) {
    var listIdentifier = "list_" + props.config.identifier.toLowerCase();
    if (state[listIdentifier].data)
      selectedRowParent = {
        ...(state[listIdentifier].data.selectedRowParent || {}),
      };
  }
  return { selectedRowParent };
};

const ReduxFormContainer = connect(mapStateToPropsFrom)(FormContainer);

class TabContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      preferences: {},
    };
  }

  onSelect = (item, tabIndex) => {
    // To Do: key has to be parent_child
    var newPreferences = { ...this.state.preferences };
    if (!newPreferences[item.key]) {
      newPreferences[item.key] = {};
    }
    newPreferences[item.key]["tabIndex"] = tabIndex;
    this.setState({ preferences: newPreferences });
  };

  constructTabItem = (item) => {
    const { selectedRow, parentRecordId, toogle, config } = this.props;
    var recordId = 0;
    if (selectedRow) {
      //debugger;
    }
    /*
    var tabIndex = 0;
    if(this.state.preferences && this.state.preferences[item.key]){
      tabIndex = this.state.preferences[item.key].tabIndex;
    }
    */

    if (item.type === "grid") {
      return (
        <GridContainer
          config={item}
          parentRecordId={parentRecordId}
          parentIdColumn={item.parentIdColumn}
        />
      );
    } else if (item.type === "form-panel") {
      return (
        <SimpleForm
          selectedRow={selectedRow}
          columns={item.columns.filter(
            (column) => column.dataIndex !== item.parentIdColumn
          )}
          identifier={config.identifier}
          apiIdentifier={config.apiIdentifier}
          toggle={toogle}
          closable
          activeRecordId={parentRecordId}
          shouldNotResetFields={true}
          // mode={mode}
          config={config}
          resetProps={() => {}}
        />
      );
    } else if (item.type === "gridonly") {
      //return <OnlyGridContainer config={item} />;
    } else {
      return <div>Need to Implement</div>;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (EnableLogs) {
      Object.keys(nextProps)
        .filter((key) => {
          return nextProps[key] !== this.props[key];
        })
        .map((key) => {
          console.debug(
            "TabContainer - changed property:",
            key,
            "from",
            this.props[key],
            "to",
            nextProps[key]
          );
        });
    }
  }

  render() {
    const { items, closeButton, onSelect, tabIndex, childView } = this.props;
    // TO DO: need to implement close button when tabs are showing in parent container
    return (
      <>
        {childView == "section" || childView == "flex"
          ? items &&
            items.length > 0 &&
            items.map((item) => {
              return this.constructTabItem(item);
            })
          : items &&
            items.length > 0 && (
              <NavPills
                tabs={items.map((item, index) => ({
                  tabButton: item.title,
                  tabContent: this.constructTabItem(item),
                  onSelect: (tabindex) => onSelect(tabindex),
                }))}
              />
            )}
      </>
    );
  }
}
