import { notification } from 'antd';
import './Notification.css'

const openNotificationWithIcon = (type,message,description)=> {
  notification[type]({
    message: message,
    description:description,
  });
};

export default openNotificationWithIcon 