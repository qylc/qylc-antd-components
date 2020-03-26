import {Upload, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import React, {Component} from "react";

const serverUrl = "http://127.0.0.1:8080/"
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class UploadImage extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentDidMount() {
    window.alert('123133x')
    console.log('UploadImage init')
    // 初始值
    if (this.props.value && this.props.value.length > 0) {
      let list = [];
      let value = this.props.value;
      if(value instanceof Array){
      }else{
        value = value.split(',');
      }
      value.forEach((f, index) => {
        let file = {};
        file.url = f;
        file.uid = index;
        file.name = 'image.png';
        file.status = 'done';
        list.push(file);
      })
      this.setState({fileList:list});
    }
  }



  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({fileList}) => {
    console.log('Upload Image onChange', fileList)
    this.setState({fileList});
    console.log(this.props)
    if(this.props.onChange) {
      let file = [];
      fileList.forEach(f => {
        if(f.status === 'done' && f.url){
          file.push(f.url)
        }
        if (f.status === 'done' && f.response && f.response.code == 0) {
          file.push(f.response.url)
        }
      })
      let fileValue = file.join(",");
      console.log("Upload Image trigger onChange", fileValue)
      this.props.onChange(fileValue)
    }
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <PlusCircleOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={serverUrl + 'common/upload'}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          headers={{'Authorization': localStorage.getItem("jwt")}}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

export default UploadImage
