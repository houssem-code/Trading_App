import React, { useState,useRef, useEffect } from 'react'
import 'antd/dist/antd.css';

import {  Tag, Space,  } from 'antd';
import { SyncOutlined,PieChartOutlined,EyeOutlined } from '@ant-design/icons';
import { SearchOutlined,ExclamationCircleOutlined,EyeInvisibleOutlined,EllipsisOutlined   } from '@ant-design/icons';
import { Table,Button,Input, Checkbox,Col,Card,Row ,Tooltip} from 'antd';
import { DatePicker } from 'antd';
import AdminService from '../../../services/admin-Service';
const { Meta } = Card;
const { RangePicker } = DatePicker;
import { Typography } from 'antd';
import moment from 'moment';



const Audit = (props) => {
    const { Text, Link, Title } = Typography;
    const dateFormat = "YYYY-MM-DD";
    const [auditfolder, setAuditfolder] = useState();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [dates, setDates] = useState([]);
    const { Search } = Input;
    const onSearch = value => console.log(value);
    const disabledDate = current => {
      if (!dates || dates.length === 0) {
        return false;
      }
      const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
      const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
      return tooEarly || tooLate;
    };
    const [searchText] = useState("");
    const [searchedColumn] = useState("");
    const { searchInput } = Input;
    const [searchByAction, setSearchByAction]  = useState({
      searchText: "",
      searchedColumn: "",
    }) ;
    const [searchByActionDoc, setsearchDateActionDoc]  = useState({
      searchText: "",
      searchedColumn: "",
    }) ;
    
    const [reset, setReset] = useState("") ;  
    const[searchByUser, setSearchByUser] = useState({
      searchText: "",
      searchedColumn: "",
    }) ;
    const [searchDateAction, setsearchDateAction] = useState("");
    var dateFormatter = Intl.DateTimeFormat('sv-SE');


    const [startDate, setStartDate] = useState("2021-11-01");
    const [endDate, setEndDate] = useState(dateFormatter.format(new Date()));
    const [value, setValue] = React.useState(props.globalFilter)
    const dateFormat1 = "YYYY-MM-DD";
    const CheckboxGroup = Checkbox.Group;
    const [hideOlddata, setHideOlddata] = useState(false)
    const [FilterByAction,setFilterByAction]=useState({
      filteredInfo: "",
      sortedInfo: "",
    });
  
  
  
      const handleStartDate = (date) => {
       // console.log(date.format('LL'))
       
  if (date != null) {
    var myCurrentDate = new Date(date.format('LL'));
    var date_ = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();
    setStartDate(date_);
  
  } }
  
    //called when a user  filter end-date 
    const handleEndDate = (date) => {
     
      if (date!=null) {
        var myCurrentDate = new Date(date.format('LL'));
        console.log(myCurrentDate)
        var date_ = myCurrentDate.getFullYear() + '-' + ( myCurrentDate.getMonth()+1) + '-' +  myCurrentDate.getDate();
       
        setEndDate(date_);
  
      }
  
    
        
    }
   
    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>  (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              const searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                ({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
            
            
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
  
  
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput, 100);
        }
      },
  
  
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
        
    });
  
  
    const getColumnSearchUser = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              const searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearchUser(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearchUser(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            
            
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
  
  
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput, 100);
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
        
    });
  
  
  /*
    const findByaction = () => {
      AdminService.getAuditFolderByAction(searchAction)
          .then(response => {
            setSearchAction(response.data);
            setData2(response.data)
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
      */
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchByAction({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    const handleSearchUser = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchByUser({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
  
    const handleReset = clearFilters => {
      clearFilters();
      setReset({ searchText: '' });
    };
  
  
  const columns = [
    {
      title: 'Nom Audit',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    
    {
      title: 'Date de creation',
      dataIndex: 'date',
      key: 'date',
      render: text => <a>{text}</a>,
    },
   
    {
      title: 'Détails',
      dataIndex: 'operation',
      render: (_, record) =>
         
   <a className="fa fa-eye" onClick={() => handleDelete(record.key)} >  </a>  
   
    },
    {
      title: 'Statistiques',
      dataIndex: 'operation',
      render: (_, record) =>
         <>
         <div>
         <PieChartOutlined />
    </div>
      </>
    },
    
  ];
  const handleDelete = (key) => {
    
     if (key==0)
     { 
      setVisible1(false)
      setVisible(true)
     }
     else 
     {
      setVisible(false)
      setVisible1(true)
       }
      
   };
  
  const data = [
    /*{
      key: '0',
      name: 'Audit Document',
      date: '2021-11-16'
    },*/
    {
      key: '1',
      name: 'Audit Dossier',
      date: '2022-11-16'
  
    },
    
  ];

  const [columns2, setColumns2] =useState( [
    { title: 'Nom du dossier ', dataIndex: 'foldername', key: 'foldername',align:"center", }, 
    
    {
      dataIndex: 'DATA',
      filterIcon: filtered => <Tooltip title="Vous pouvez consulter les données modifiés "  ><EllipsisOutlined   style={{ color: filtered ? '#1890ff' : undefined }} /></Tooltip>,
      filters: [
        { text: 'Consulter les  données modifiées ', value: 'DATA' },
        
      ],
      width: '20%',
   
    },
    { title: 'Date action', dataIndex: 'dateaction', key: 'dateaction',align:"center" },
   
    { title: 'Action', dataIndex: 'action', key: 'action',align:"center",
    filters: [
      {
        text: 'Creation',
        value: 'Creation',
      },
      {
        text: 'Modification',
        value: 'Modification',
      },
      {
        text: 'Supression',
        value: 'Supression',
      },
    ],
    onFilter: (value, record) => record.action.includes(value),
   
  },
    { title: 'utilisateur', dataIndex: 'utilisateur', key: 'utilisateur' ,align:"center"},getColumnSearchUser('utilisateur'),
    { title: 'Activation', dataIndex: 'activation', key: 'activation' ,align:"center"},
    
   
  ]);
    
    
    const[columns1, setColumns1] =useState( [
      { title: 'Nom du document ', dataIndex: 'nomdocument', key: 'nomdocument',align:"center" },
      {
        filterIcon: filtered => <Tooltip title="Vous pouvez consulter les données modifiés "  ><EllipsisOutlined   style={{ color: filtered ? '#1890ff' : undefined }} /></Tooltip>,
  
        dataIndex: 'DATA',
        filters: [
            
          { text: 'Consulter les  données modifiées ', value: 'DATA' },
          
        ],
        width: '20%',
      },
      { title: 'Date action', dataIndex: 'dateaction', key: 'dateaction',align:"center" },
      { title: 'Action', dataIndex: 'action', key: 'action',align:"center",
      filters: [
        {
          text: 'upload',
          value: 'upload',
        },
        {
          text: 'download',
          value: 'download',
        },
       
      ],
      onFilter: (value, record) => record.action.includes(value),
     
    },
      { title: 'Taille en KO', dataIndex: 'taille', key: 'taille',align:"center" },
      { title: 'utilisateur', dataIndex: 'utilisateur', key: 'utilisateur' ,align:"center"},getColumnSearchUser('utilisateur'),
      { title: 'Dossier parent', dataIndex: 'dossierparent', key: 'dossierparent' ,align:"center"},
      { title: 'Client', dataIndex: 'client', key: 'client' ,align:"center"},getColumnSearchUser('client'),
    ]);
  
  
    useEffect(() => {
      
     
  
  
      getAllAuditFolder()
    
  }, [])
  
  
  useEffect(() => {
  
    getAllAuditDocument()
  
  }, [])
  
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(filters,"lmkkkkkk");
  if(columns2.length==7&&filters.DATA!=null) 
  
    setColumns2(oldColumns => [...oldColumns.slice(0, 4), { title: 'Données avant modification', dataIndex: 'olddata', key: 'olddata' ,align:"center" },
    { title: 'Données aprés modification', dataIndex: 'data', key: 'data' ,align:"center"}, ...oldColumns.slice(5,7)])  
  
    if(filters.DATA==null) 
  
    setColumns2(oldColumns => [{ title: 'Nom du dossier ', dataIndex: 'foldername', key: 'foldername',align:"center" }, {
      dataIndex: 'DATA',
      filterIcon: filtered => <Tooltip title="Vous pouvez consulter les données modifiés " ><EllipsisOutlined   style={{ color: filtered ? '#1890ff' : undefined }} /></Tooltip>,
      
      filters: [  
        { text: 'Consulter les  données modifiées ', value: 'DATA' },
        
      ],
      width: '20%',
    },
    { title: 'Date action', dataIndex: 'dateaction', key: 'dateaction',align:"center" },
   
    { title: 'Action', dataIndex: 'action', key: 'action',align:"center",
    filters: [
      {
        text: 'Creation',
        value: 'Creation',
      },
      {
        text: 'Modification',
        value: 'Modification',
      },
      {
        text: 'Supression',
        value: 'Supression',
      },
    ],
    onFilter: (value, record) => record.action.includes(value),
   
  },
    { title: 'utilisateur', dataIndex: 'utilisateur', key: 'utilisateur' ,align:"center"},getColumnSearchUser('utilisateur'),
    { title: 'Activation', dataIndex: 'activation', key: 'activation' ,align:"center"},
    ])  
     
  };
  
  
  const handleTableChangeDoc = (pagination, filters, sorter) => {
    console.log(filters,"aaa");
  
  
    if(columns1.length==10&&filters.DATA!=null  ) 
  
    setColumns1(oldColumns => [...oldColumns.slice(0, 6),  { title: 'Données avant modification', dataIndex: 'olddata', key: 'olddata' ,align:"center" },
     { title: 'Données aprés modification', dataIndex: 'data', key: 'data' ,align:"center"}, ...oldColumns.slice(6,9                                                                                                                                              )])    
  
    //if(columns1.length<10) 
    if(filters.DATA==null) 
  
    setColumns1(oldColumns => [{ title: 'Nom du document ', dataIndex: 'nomdocument', key: 'nomdocument',align:"center" },
    {
      dataIndex: 'DATA',
      filterIcon: filtered => <Tooltip title="Vous pouvez consulter les données modifiés "  ><EllipsisOutlined   style={{ color: filtered ? '#1890ff' : undefined }} /></Tooltip>,

      filters: [
        { text: 'Consulter les  données modifiées ', value: 'DATA' },
        
      ],
      width: '20%',
    },
    { title: 'Date action', dataIndex: 'dateaction', key: 'dateaction',align:"center" },
    { title: 'Action', dataIndex: 'action', key: 'action',align:"center",
    filters : [
      {
        text: 'upload',
        value: 'upload',
      },
      {
        text: 'download',
        value: 'download',
      },
     
    ],
    onFilter: (value, record) => record.action.includes(value),
   
  },
    { title: 'Taille', dataIndex: 'taille', key: 'taille',align:"center" },
    { title: 'utilisateur', dataIndex: 'utilisateur', key: 'utilisateur' ,align:"center"},getColumnSearchUser('utilisateur'),
    { title: 'Dossier parent', dataIndex: 'dossierparent', key: 'dossierparent' ,align:"center"},
    { title: 'Client', dataIndex: 'client', key: 'client' ,align:"center"},getColumnSearchUser('client'),
  ]) 
   
     
  
  };
  
  const getAllAuditFolder=()=> {
    AdminService.getAllAuditFolder().then(resp=> {
      console.log(resp)
      setData2(resp.data)   
  })
  .catch(err=> {
  console.log(err)
  })
  }
  
  
  const getAllAuditDocument=()=> {
    AdminService.getAllAuditDocument().then(resp=> {
      console.log(resp)
      setData1(resp.data)
      
  })
  .catch(err=> {
  console.log(err)
  })
  
  }
  const Reset =()=> {
    AdminService.getAllAuditFolder().then(resp=> {
      var dateFormatter = Intl.DateTimeFormat('sv-SE');
      setStartDate("2021-11-01");
      setEndDate(dateFormatter.format(new Date()));
      console.log(resp)
      setData2(resp.data)   
      
  
  })
  .catch(err=> {
  console.log(err)
  })
  } 
  const ResetDoc =()=> {
    AdminService.getAllAuditDocument().then(resp=> {
      var dateFormatter = Intl.DateTimeFormat('sv-SE');
      console.log(resp)
      setData1(resp.data)
      setStartDate("2021-11-01");
      setEndDate(dateFormatter.format(new Date()));
  
  })
  .catch(err=> {
  console.log(err)
  })
  } 
  const findBydateAction = () => {
    //console.log("tessssst")
    AdminService.getAuditFolderByDateAction(startDate,endDate)
        .then(response => {
          setsearchDateAction(response.data);
          setData2(response.data)
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
   
  
  
    const findDocumentBydateAction = () => {
      //console.log("tessssst")
      AdminService.getAuditDocumentByDateAction(startDate,endDate)
          .then(response => {
            setsearchDateActionDoc(response.data);
            setData1(response.data)
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
  return (
  <Row className="row-Container">  
  
  <div className="col-lg">
            
              <Table columns={columns} dataSource={data}
               />
               
         
            
  </div>
  <div>
  { (visible == true )?<div> 
    <Row className="justify-content-md-center" >
                
              
              <Col>
              {/** Datepicker and reset Button section */}
              <div className="filterParameters" id="filterParameters">
                      
                        <Col>
                        <Space>
  
  
    
                        <Text strong>De</Text>

                                 < DatePicker defaultValue={moment("2021-11-01", dateFormat)} format={dateFormat}   onChange={handleStartDate} value={moment(startDate, dateFormat)}   date={startDate}    />

                        <Text strong>à</Text>

                        
                              < DatePicker  defaultValue={moment()} format={dateFormat} onChange={handleEndDate} value={moment(endDate, dateFormat)} date={endDate}    />
                              
                              <Button type="primary" icon={<SearchOutlined />}  onClick={()=>findDocumentBydateAction(startDate,endDate)}        >
                              Chercher
                              </Button>
                              <Button type="primary" shape="circle" icon={<SyncOutlined /> } onClick={ResetDoc} />
                            </Space>
                            
                                
                          </Col>
                          
                      
                  
              </div>
              </Col>
              
           </Row>   
           

  <Title level={3}>Audit Documents</Title>
   <Table
    columns={columns1}
    onChange={handleTableChangeDoc}
    dataSource={data1}
    pagination={true} scroll={{ x: 550 }} sticky 
  />
  </div>:<></>}
  </div>
  
  <div>
  { (visible1 == true )?<div>
    <Row className="justify-content-md-center" >
                
              
              <Col>
              {/** Datepicker and reset Button section */}
              <div className="filterParameters" id="filterParameters">
                      
                        <Col>
                        <Space>

                        <Text strong>De</Text>
                                 < DatePicker defaultValue={moment("2021-11-01", dateFormat)} format={dateFormat}  onChange={handleStartDate} value={moment(startDate, dateFormat)}  date={startDate}   />

                                 <Text strong>à</Text>
                              < DatePicker  defaultValue={moment()} format={dateFormat} onChange={handleEndDate} value={moment(endDate, dateFormat)}  date={endDate}    />
                              <Button type="primary" icon={<SearchOutlined />}  onClick={()=>findBydateAction(startDate,endDate)}>
                              Chercher
                              </Button>
                              
                              <Button type="primary" shape="circle"  icon={<SyncOutlined /> } onClick={Reset} />
  
                              </Space>
                          </Col>
                          
                      
                  
              </div>
              </Col>
              
           </Row>   
           
    <Title level={3}>Audit Dossiers parents</Title>
     <Table
    columns={columns2}
    onChange={handleTableChange}
    dataSource={data2}
    pagination={true} scroll={{ x: 550 }} sticky 
  />
  </div>:<></>}
  </div>
  </Row>
  
  
  )
}


export default Audit
