import React, {useState, useEffect} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts/modules/drilldown'
import AdminService from "../../../../services/admin-Service";
import {Select} from 'antd';
import './statistic.css'


function StatChild(props) {
    const {Option} = Select;
    const [client, setClient] = useState([]);
    const [clientNonActivated, setClientNonActivated] = useState([]);
    const [clientRejected, setClientRejected] = useState([]);
    const [totalStorage, setTotalStorage] = useState([]);
    const [totalStorage2, setTotalStorage2] = useState([]);
    const [totalStorage3, setTotalStorage3] = useState([]);
    const [chartType, setChartType] = useState('column')

    drilldown(Highcharts);

    const options = {
        chart: {
            type: chartType
        },
        title: {
            text: 'Taille de stockage par client'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Nombre de clients'
            }
        },


        series: [
            {
                name: 'clients',
                colorByPoint: true,
                data: [
                    {
                        name: client.length>0?client.length + ' Clients validés':'',
                        y: client.length,
                        drilldown: 'clientsId'
                    },
                    {
                        name: clientNonActivated.length>0?clientNonActivated.length + ' Clients Non validés':'',
                        y: clientNonActivated.length,
                        drilldown: 'clientNonActivatedId'
                    },
                    {
                        name: clientRejected.length>0?clientRejected.length + ' Clients rejetés':'',
                        y: clientRejected.length,
                        drilldown: 'clientRejectedId'
                    },
                ],
            },
        ],
        drilldown: {
            series: [
                {
                    id: 'clientsId',
                    data: totalStorage,
                    name:'clients validés',
                },
                {
                    id: 'clientNonActivatedId',
                    data: totalStorage2,
                    name:'clients non validés'
                },
                {
                    id: 'clientRejectedId',
                    data: totalStorage3,
                    name:'clients rejetés'
                },
            ]
        }
    }

    function getAllClient() {
        var list = [];
        var list2 = [];
        var list3 = [];
        AdminService.getAllClient().then(resp => {
            setClient(resp.data.filter(item=>item.activated===true))
            setClientNonActivated(resp.data.filter(item=>item.activated===false && item.refuseDesc==null))
            setClientRejected(resp.data.filter(item=>item.activated===false &&item.refuseDesc!=null))
            resp.data.filter(item=>item.activated===false&&item.refuseDesc!=null).forEach(item => list3.push([item.login, item.totalStorageSize]))
            resp.data.filter(item=>item.activated===false&& item.refuseDesc==null).forEach(item => list2.push([item.login, item.totalStorageSize]))
            resp.data.filter(item=>item.activated===true).forEach(item => list.push([item.login, item.totalStorageSize]))
            setTotalStorage(list)
            setTotalStorage2(list2)
            setTotalStorage3(list3)

        })
    }

    useEffect(() => {

        getAllClient()

    }, [])

    function handleChange(value) {
        setChartType(value)
    }

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
            <div className="row ">
                <div className='col-md-6'>
                <div>Choisir le type de graphique</div>
                <Select defaultValue="column" style={{ width: "100%"}} onChange={handleChange}>
                    <Option selected value="column">column</Option>
                    <Option value="pie">pie</Option>
                    <Option value="bar">bar</Option>
                </Select>
                </div>
            </div>
        </div>


    );
}

export default StatChild;
