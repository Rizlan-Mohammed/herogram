import React, { useState, useEffect } from 'react';
import { Upload, Drawer, Modal, Input, Tag, Table, Space, Button, Tooltip, Row, Col, Typography, message } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined, ShareAltOutlined } from '@ant-design/icons';
import './FileManager.css';
import axios from '../../config/axiosInstance';

const { Title, Paragraph } = Typography;

const FileManager = () => {
  const [fileList, setFileList] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [viewCount, setViewCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  const API_BASE_URL = `${process.env.REACT_APP_BaseUrl}/api/medias`;

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        withCredentials: true,
      });
      setFileList(response.data);
    } catch (error) {
      message.error('Failed to load media');
    }
  };

  const uploadProps = {
    accept: 'image/*,video/*',
    multiple: true,
    showUploadList: false,
    beforeUpload: (file) => {
      const newFile = {
        name: file.name,
        type: file.type,
        file,
        uploadDate: new Date(),
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      };

      setCurrentFile(newFile);
      setIsModalVisible(true);
      return false;
    },
  };

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleSaveFile = async () => {
    if (currentFile) {
      const formData = new FormData();
      formData.append('file', currentFile.file);
      formData.append('tags', tags.join(',')); 

      try {
        const response = await axios.post(`${API_BASE_URL}/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
          withCredentials: true,
        });

        setFileList([...fileList, response.data.media]);
        message.success('File uploaded successfully');
      } catch (error) {
        message.error('Error uploading file');
        console.error('Upload Error:', error); 
      }

      setTags([]);
      setIsModalVisible(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${fileId}`);
      setFileList(fileList.filter(file => file._id !== fileId));
      message.success('File deleted successfully');
    } catch (error) {
      message.error('Error deleting file');
    }
  };

  const handleShareFile = async (file) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/share/${file._id}`);
        const shareLink = response.data.shareLink; 
        message.success(`Share link created: ${shareLink}`);

        navigator.clipboard.writeText(shareLink).then(() => {
            message.success('Share link copied to clipboard!');
        });

        file.shares += 1;
        setShareCount(file.shares);
    } catch (error) {
        message.error('Error sharing file');
    }
};

  const handleSearch = (e) => {
    setSearchTag(e.target.value);
  };

  const handlePreview = (file) => {
    setViewCount(file.views);
    setPreviewFile(file);
    setDrawerVisible(true);
  };
  const filteredFiles = fileList.filter((file) =>
    searchTag ? file.tags.some(tag => tag.toLowerCase().includes(searchTag.toLowerCase())) : true
  );

  const columns = [
    {
      title: 'Preview',
      key: 'preview',
      render: (_, record) => (
        <Tooltip title="Preview">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
          />
        </Tooltip>
      ),
    },
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'File Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Tags',
      key: 'tags',
      render: (_, record) => (
        <Space>
          {record.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Share">
            <Button type="link" icon={<ShareAltOutlined />} onClick={() => handleShareFile(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteFile(record._id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="file-manager-container">
      <Row gutter={0} style={{ margin: 0 }}>
        <Col span={24}>
          <Title level={3}>File Manager</Title>
        </Col>

        <Col span={24} style={{ padding: 0 }}>
          <Upload.Dragger {...uploadProps} className="upload-dragger">
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Drag & Drop Images/Videos here or Click to Upload</p>
          </Upload.Dragger>
        </Col>

        <Col span={24} style={{ padding: 0 }}>
          <Input.Search
            placeholder="Search files by tag"
            onChange={handleSearch}
            value={searchTag}
            style={{ width: '100%' }}
          />
        </Col>

        <Col span={24} style={{ padding: 0 }}>
          <Table columns={columns} dataSource={filteredFiles} rowKey="_id" pagination={{ pageSize: 5 }} />
        </Col>
      </Row>

      <Modal
        title="Add Tags to File"
        visible={isModalVisible}
        onOk={handleSaveFile}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
      >
        <Input
          placeholder="Enter tag and press enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAddTag}
          style={{ marginBottom: 10 }}
        />
        <Button onClick={handleAddTag}>Add Tag</Button>
        <div style={{ marginTop: 10 }}>
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => setTags(tags.filter(t => t !== tag))}>
              {tag}
            </Tag>
          ))}
        </div>
      </Modal>

      <Drawer
    visible={drawerVisible}
    onClose={() => setDrawerVisible(false)}
    width={500}
    title="File Preview"
    placement="right"
>
    <Row>
        <Col span={24}>
            {previewFile?.type.startsWith('image/') && (
                <img
                    alt={previewFile?.name}
                    style={{ width: '100%', maxHeight: '500px' }}
                    src={`${process.env.REACT_APP_BaseUrl}${previewFile?.url}`} 
                />
            )}
            {previewFile?.type.startsWith('video/') && (
                <video style={{ width: '100%', maxHeight: '500px' }} controls>
                    <source src={`${process.env.REACT_APP_BaseUrl}${previewFile?.url}`} type={previewFile?.type} />
                    Your browser does not support the video tag.
                </video>
            )}
        </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '20px' }}>
        <Col span={24}>
            <Title level={4}>{previewFile?.name}</Title>
            <Paragraph><strong>Views:</strong> {previewFile?.views}</Paragraph>
            <Paragraph><strong>Shares:</strong> {previewFile?.shares}</Paragraph>
            <Paragraph>
                <strong>Uploaded:</strong>
                {previewFile?.uploadDate ? new Date(previewFile.uploadDate).toLocaleDateString() : 'N/A'}
            </Paragraph>
            <Paragraph><strong>Size:</strong> {previewFile?.size}</Paragraph>
        </Col>
    </Row>
</Drawer>
    </div>
  );
};

export default FileManager;
