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

class PicturesWall extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentDidMount() {
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
    this.setState({fileList});
    if(this.props.onChange) {
      let file = [];
      // console.log(JSON.stringify(fileList));
      fileList.forEach(f => {
        if(f.status === 'done' && f.url){
          file.push(f.url)
        }
        if (f.status === 'done' && f.response && f.response.code == 0) {
          file.push(f.response.url)
        }
      })
      this.props.onChange(file.join(","))
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

export default PicturesWall
