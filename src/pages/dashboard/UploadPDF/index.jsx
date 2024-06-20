import React from 'react';
import BaseView from '../../../components/BaseView/BaseView';
import { Modal, Collapse, Upload, Button, Spin, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Dialog, DialogContent, IconButton, DialogTitle, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import API from '../../../store/requests';
import { compose } from 'redux';
import { BlobServiceClient } from '@azure/storage-blob';
import Progress from 'antd/lib/progress';
import { intersectionWith, isEqual } from 'lodash';
import Layout from '../../../components/Layout';

const { confirm } = Modal;
const { Panel } = Collapse;
const { Dragger } = Upload;
const modal = Modal;

class UploadPDF extends BaseView {
  constructor(props) {
    super({ props });
    this.state = {
      files: [],
      batchData: [],
      previewDialog: false,
      previewURL: '',
      showFormatMsg: false,
      showLoader: true,
      fileToUpload: {},
      uploadProgress: {},
      uploaded: false,
      isUploading: false,
      disableSelection: true,
      availableFiles: [],
    };
  }

  pannelStyles = {
    background: '#c31d1d',
    color: '#ffffff',
    userSelect: 'none',
  };

  loadAzureStorageConfig() {
    let me = this;
    let params = {
      action: 'LoadAzureStorageConfig',
    };
    API.triggerPost('DataUploader', params)
      .then(response => {
        if (response.status === 200 && response.data.success) {
          me.setState({
            containerName: response.data.containerName,
            blockMainDirectoryName: response.data.blockMainDirectoryName,
            storageAccountName: response.data.storageAccountName,
            sasToken: response.data.sasToken.replace('?', ''),
          });
          const { getUploadedFiles } = this.state || {};
          if (getUploadedFiles) {
            this.checkToBeUploaded();
          }
        }
      })
      .catch(err => {
        me.showModal(err.message, 'error');
      });
  }

  componentDidMount() {
    this.loadAzureStorageConfig();
  }

  submitBatch = t => {
    let me = this;
    const {
      blockMainDirectoryName,
    } = this.state;

    let blobFolder = [
      blockMainDirectoryName,
    ]
      .filter(directory => directory)
      .join('/');

    let params = {
      blobFolder,
      action: 'SyncData',
    };
    this.setState({ showLoader: true });
    API.triggerPost('DataUploader', params)
      .then(response => {
        this.setState({ showLoader: false });
        if (response.status === 200 && response.data.success) {
          alert('Files are in Sync')
          /*this.props.history.push({
            pathname: '/POG/DataUploader/InternalBatch',
            state: {},
          });*/
        }
      })
      .catch(err => {
        this.setState({ showLoader: false });
        me.showModal(err.message, 'error');
      });
  };

  showConfirm = t => {
    const {
    } = this.state;
    confirm({
      title: (
        <>
          <br /> {t('would you like to Sync the files') + ' ?'}
        </>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => this.submitBatch(this.props.t),
      onCancel: () => { },
    });
  };

  uploadFilesOnServer = async (t) => {
    let me = this;
    this.setState({ uploaded: false, isUploading: true, disableSelection: true });
    let availableFiles = await this.checkToBeUploaded();
    const {
      files,
      storageAccountName,
      sasToken,
      containerName,
      blockMainDirectoryName,
    } = this.state;

    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
      null,
    );
    const containerClient = await blobServiceClient.getContainerClient(containerName);

    let filesCanBeUploaded = Object.keys(this.state.fileToUpload).filter((fileName) => {
      let data = this.state.fileToUpload[fileName];
      if ((data.failed && data.retry) || !data.started) return true;
      else return false;
    });
    let commonFiles = intersectionWith(availableFiles, filesCanBeUploaded, isEqual);
    let shouldOverride = false;
    if (commonFiles.length > 0)
      shouldOverride = !(await awaitConfirm(
        `${commonFiles.length} ${t('files are already uploaded. Do you wish to override All')}`,
      ));
    let folderName = [
      blockMainDirectoryName,
    ]
      .filter((directory) => directory)
      .join('/');
    if (shouldOverride) {
      filesCanBeUploaded = filesCanBeUploaded.filter((item) => commonFiles.indexOf(item) === -1);
      let filesUploding = this.state.files.filter((item) => {
        let toUpload = availableFiles.indexOf(item.name) === -1;
        if (!toUpload) delete this.state.fileToUpload[item.name];
        return toUpload;
      });
      this.setState({ files: filesUploding });
    } else {
      availableFiles = availableFiles.filter((item) => commonFiles.indexOf(item) === -1);
      this.setState({ availableFiles });
    }
    if (filesCanBeUploaded.length == 0) {
      me.setState({ isUploading: false, disableSelection: false });
      me.showModal(t('Please Add atleast 1 file'), 'error');
      return;
    }
    Promise.allSettled(
      filesCanBeUploaded.map(async (fileName) => {
        const blobName = [folderName, fileName].filter((directory) => directory).join('/');
        // create blob client
        const blobClient = await containerClient.getBlockBlobClient(blobName);

        let data = this.state.fileToUpload[fileName];
        this.state.fileToUpload[fileName] = { started: true, ...data };
        return blobClient.uploadData(data.data, {
          onProgress: ({ loadedBytes }) => {
            this.setState({
              uploadProgress: { ...this.state.uploadProgress, [fileName]: loadedBytes },
            });
          },
          blobHTTPHeaders: {
            blobContentType: 'application/pdf',
          },
        });
      }),
    ).then((results) => {
      var fileJson = [];
      availableFiles.map((item) => {
        const blobName = [folderName, item].filter((directory) => directory).join('/');
        fileJson.push({
          pdfFilePath: blobName,
          fileName: item,
        });
      });
      let isFailed = false;
      results.forEach((result, index) => {
        const fileName = filesCanBeUploaded[index],
          data = this.state.fileToUpload[fileName];
        if (result.status === 'fulfilled') {
          this.state.fileToUpload[fileName] = { success: true, ...data };
          const blobName = [folderName, fileName].filter((directory) => directory).join('/');
          fileJson.push({
            pdfFilePath: blobName,
            fileName: fileName,
          });
        } else if (result.status === 'rejected') {
          isFailed = true;
          this.state.fileToUpload[fileName] = { failed: true, retry: true, ...data };
        }
        // if (response._response.status >= 400 && response._response.status < 500) {
        //   isFailed = true;
        //   this.state.fileToUpload[fileName] = { failed: true, retry: false, ...data };
        // } else if (response._response.status >= 500 && response._response.status < 600) {
        //   isFailed = true;
        //   this.state.fileToUpload[fileName] = { failed: true, retry: true, ...data };
        // } else this.state.fileToUpload[fileName] = { success: true, ...data };
      });

      if (isFailed) {
        this.setState({ isFailed, uploaded: true, isUploading: false, disableSelection: false });
      } else {
        this.setState({ showLoader: true });
        let params = {
          action: 'AddAllFiles',
          fileJson: JSON.stringify(fileJson),
        };
        API.triggerPost('DataUploader', params)
          .then((response) => {
            this.setState({
              showLoader: false,
              uploaded: true,
              isUploading: false,
              disableSelection: false,
              isFailed: false,
            });
            if (response.status === 200 && response.data.success) {
              me.showModal(t('Uploaded Successfully'), 'success');
            }
          })
          .catch((err) => {
            this.setState({ showLoader: false, uploaded: true });
            me.showModal(err.message, 'error');
          });
      }
    });
  };

  bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  deleteFile = async (fileToDelete, t) => {
    let me = this;

    const {
      blockMainDirectoryName,
    } = this.state;
    this.setState({ showLoader: true });
    let blobName = [
      blockMainDirectoryName,
      fileToDelete.name,
    ]
      .filter(directory => directory)
      .join('/');

    let params = {
      action: 'DeleteBatchFile',
      PDffilepath: blobName,
    };

    API.triggerPost('DataUploader', params)
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            me.deleteBlob(blobName);
            me.showModal(t('Deleted Successfully'), 'success');
            const files = me.state.files.filter(file => file.name !== fileToDelete.name);
            delete me.state.fileToUpload[fileToDelete.name];
            delete me.state.uploadProgress[fileToDelete.name];
            me.setState({ files, showLoader: false });
          } else {
            me.setState({ showLoader: false });
            me.showModal(response.data.error, 'error');
            /*me.deleteBlob(blobName);
            me.showModal(t('Deleted Successfully'), 'success');
            const files = me.state.files.filter(file => file.uid !== fileToDelete.uid);
            delete me.state.fileToUpload[fileToDelete.name];
            me.setState({ files, showLoader: false });*/
          }
        }
      })
      .catch(err => {
        me.setState({ showLoader: false });
        me.showModal(err.message, 'error');
      });
  };

  deleteBlob = async (blobName) => {
    const { storageAccountName, sasToken, containerName } = this.state;

    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
      null,
    );
    // create container client
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    // Create blob client from container client
    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

    const options = {
      deleteSnapshots: 'include', // or 'only'
    };
    await blockBlobClient.deleteIfExists(options);

    const { getUploadedFiles } = this.state || {};
    if (getUploadedFiles) {
      this.checkToBeUploaded();
    }
  };

  checkToBeUploaded = async (t) => {
    const {
      storageAccountName,
      sasToken,
      containerName,
      blockMainDirectoryName,
    } = this.state;
    let availableFiles = [];
    let blobDirectory = [
      blockMainDirectoryName,
    ]
      .filter((directory) => directory)
      .join('/');
    const maxPageSize = 10000;
    let marker;
    const listOptions = {
      includeMetadata: false,
      includeSnapshots: false,
      includeTags: false,
      includeVersions: false,
      prefix: blobDirectory,
    };

    const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
      null,
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let iterator = containerClient.listBlobsFlat(listOptions).byPage({ maxPageSize });
    let response = (await iterator.next()).value;
    for (const blob of response.segment.blobItems) {
      availableFiles.push(blob.name.replace(blobDirectory + '/', ''));
    }
    marker = response.continuationToken;
    while (response) {
      iterator = containerClient
        .listBlobsFlat(listOptions)
        .byPage({ maxPageSize, continuationToken: marker });
      response = (await iterator.next()).value;
      if (response) {
        for (const blob of response.segment.blobItems) {
          availableFiles.push(blob.name.replace(blobDirectory + '/', ''));
        }
        marker = response.continuationToken;
      }
    }
    this.setState({ availableFiles });
    return availableFiles;
  };

  showModal = (msg, type) => {
    modal.destroyAll();
    modal[type]({
      title: msg,
      okButtonProps: { style: { backgroundColor: '#c31d1d', border: 'none', display: 'none' } },
    });
    setTimeout(() => {
      modal.destroyAll();
    }, 2000);
  };

  totalFileSize = () => {
    const { files } = this.state;

    let totalFileSizeInBytes = 0;

    files.forEach((file) => {
      totalFileSizeInBytes += file.size;
    });

    const totalFileSize = this.bytesToSize(totalFileSizeInBytes);

    return totalFileSize;
  };

  fileSizeUploaded = () => {
    const { uploadProgress, fileToUpload } = this.state;
    let totalUploaded = 0;
    let filekeys = Object.keys(fileToUpload);
    Object.keys(uploadProgress)
      .filter((item) => filekeys.indexOf(item) !== -1)
      .map((val) => (totalUploaded += uploadProgress[val]));
    totalUploaded = this.bytesToSize(totalUploaded);
    return totalUploaded;
  };

  filesUploaded = () => {
    const { files, uploadProgress } = this.state;
    let filesUploaded = files.filter((item) => item.size === uploadProgress[item.name]);
    return filesUploaded.length;
  };

  getForm = () => {
    const {
      previewDialog,
      previewURL,
      files,
      showLoader,
      disableSelection,
      isFailed,
      isUploading,
      uploaded,
    } = this.state;
    let { t } = this.props;

    //const isUploadDisabled = files.length === 0 ? true : false;

    const isUploadDisabled =
      files.length === 0
        ? true
        : isUploading
          ? isUploading
          : isFailed
            ? false
            : uploaded;
    const isSubmitDisabled = files.length === 0 ? true : !uploaded;

    const { getUploadedFiles } = this.state || {};
    const panelProps = (text) => ({
      header: (
        <div className="header-collapse">
          <div className="header-title">{t(text)}</div>
        </div>
      ),
      key: disableSelection || uploaded ? 2 : 1,
      style: this.pannelStyles,
      disabled: disableSelection || uploaded,
      isActive: true,
    });
    const defaultActiveKey = disableSelection ? '' : 1;
    return (
      <Spin className="upload-spinner" spinning={showLoader}>
        {getUploadedFiles && (
          <div className="row m-2 mt-4 mb-4 p-2">
            <div className="col-12">
              <Collapse
                className="uploaded-files"
                defaultActiveKey={['1']}
                expandIconPosition="right"
              >
                <Panel
                  key={1}
                  header={
                    <div className="uploaded-files-header">
                      <p>Uploaded Files</p>
                    </div>
                  }
                >
                  <ul>
                    {this.state.availableFiles.map((item) => {
                      return (
                        <li className="pdfToPog-uploaded-item" key={item}>
                          <p className="uploaded-item-title">{item}</p>

                          <button
                            className="close-button"
                            onClick={() => this.deleteFile({ name: item }, t)}
                          >
                            <CloseIcon />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              </Collapse>
            </div>
          </div>
        )}
        <div className="row m-2 mt-4 mb-4 p-2">
          <div className="col-12">
            <Collapse
              className="uploaded-files"
              defaultActiveKey={['1']}
              expandIconPosition="right"
            >
              <Panel
                key={1}
                header={
                  <div className="uploaded-files-header">
                    <p>Selected PDF Files</p>
                  </div>
                }
              >
                <>
                  {files.length === 0 ? (
                    <p className="no-files-uploaded">{t('No Files Uploaded')}</p>
                  ) : (
                    <>
                      <ul>
                        {files.map((file) => (
                          <li className="pdfToPog-uploaded-item" key={file.name}>
                            <p className="uploaded-item-title">{file.name}</p>
                            <p className="uploaded-item-size">{this.bytesToSize(file.size)}</p>
                            <Progress
                              className="uploaded-item-progress"
                              percent={parseFloat(
                                ((this.state.uploadProgress[file.name] * 100) / file.size).toFixed(
                                  2,
                                ),
                              )}
                              size="small"
                              status="active"
                            />
                            {this.state.uploadProgress[file.name] === file.size &&
                              this.state.uploaded ? (
                              <button
                                className="close-button"
                                onClick={() => this.deleteFile(file, t)}
                              >
                                <CloseIcon />
                              </button>
                            ) : (
                              ''
                            )}
                          </li>
                        ))}
                      </ul>
                      <div className="pdfToPog-uploaded-item total-file-size">
                        <p className="uploaded-item-title">{t('Total File Size')}</p>
                        <p className="uploaded-item-size">{this.totalFileSize()}</p>
                        <p className="uploaded-item-size" style={{ width: 'auto' }}>
                          Total size uploaded: {this.fileSizeUploaded()}
                        </p>
                        {/* {this.state.isFailed && (
                          <Button onClick={() => this.uploadFilesOnServer()}>Retry</Button>
                        )} */}
                      </div>
                      <div className="pdfToPog-uploaded-item total-file-size">
                        <p className="uploaded-item-title">{t('Total Files Uploaded')}</p>
                        <p className="uploaded-item-size" style={{ width: 'auto' }}>
                          Files Uploaded: {this.filesUploaded()} / {files.length}
                        </p>
                      </div>
                    </>
                  )}
                </>
              </Panel>
            </Collapse>
          </div>
        </div>

        <div className="row m-2 p-2 drag-files-section">
          <div className="col-12" style={{ textAlign: 'center' }}>
            <Dragger
              name="file"
              multiple={true}
              accept="application/pdf"
              beforeUpload={(oldFile) => {
                if (oldFile?.type === 'application/pdf') {
                  let file = new File([oldFile], oldFile.name.replace(/[^.\w\s]/gi, ''), {
                    type: oldFile.type,
                  });
                  const found = files.some((fileItem) => fileItem.name === file.name);
                  if (!found) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      console.debug(e.target.result);
                      this.setState({
                        uploaded: false,
                        files: [...this.state.files, file],
                        fileToUpload: {
                          ...this.state.fileToUpload,
                          [file.name]: {
                            data: e.target.result,
                          },
                        },
                      });
                    };
                    reader.readAsArrayBuffer(file);
                  }
                } else {
                  this.showModal('Only PDF Files is accepted!', 'error');
                }
                return false;
              }}
              customRequest={(data) => { }}
            >
              <p className="ant-upload-drag-icon">{/* <Icon type="inbox" /> */}</p>
              <p className="ant-upload-text">{t('Click or drag file to this area to upload')}</p>
            </Dragger>
          </div>
        </div>

        <div className="row m-2 p-2">
          <div className="col-12" style={{ textAlign: 'center' }}>
            <Tooltip title={t('Upload')}>
              <Button
                variant="outlined"
                shape="round"
                className={isUploadDisabled ? '' : 'main-button-color'}
                size="large"
                style={{ marginBottom: 20, marginRight: 5 }}
                disabled={isUploadDisabled}
                onClick={() => this.uploadFilesOnServer(t)}
              >
                {this.state.isFailed ? t('Retry & Upload') : t('Upload')}
              </Button>
            </Tooltip>
            <Tooltip title="Sync Server">
              <Button
                variant="outlined"
                shape="round"
                className={isSubmitDisabled ? '' : 'main-button-color'}
                size="large"
                style={{ marginBottom: 20 }}
                disabled={isSubmitDisabled}
                onClick={() => this.showConfirm(t)}
              >
                {t('Sync Server')}
              </Button>
            </Tooltip>
          </div>
        </div>

        <Dialog open={previewDialog} fullWidth={450}>
          <div
            className="close-preview-button"
            onClick={() => this.setState({ previewDialog: false })}
          >
            <CloseIcon />
          </div>
          <DialogContent>
            <img src={previewURL} style={{ width: '100%' }} alt="Preview" />
          </DialogContent>
        </Dialog>
      </Spin>
    );
  };

  notify = () => {
    let { t } = this.props;
    return (
      <div className="pdf-to-pog-msg">
        <h1>{t('THANK YOU!')}</h1>
        <span>{t('Once your format is ready you will be Notified')}</span>
      </div>
    );
  };

  render() {
    const { showFormatMsg } = this.state;
    return showFormatMsg ? this.notify() : this.getForm();
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default withTranslation()(connect(mapStateToProps)(Layout(UploadPDF)));
