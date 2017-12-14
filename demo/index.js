import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../src/Dialog.js';
let props = {
  title: '标题',
  content: '内容',
  buttons: [{
  	content: '取消',
    callback: ()=>{alert('取消')},
    primary: false
  }],
  show: true
}

class Demo extends Component {
  constructor(props) {
    super(props);
  }
  showConfirmDialog(){
  	Dialog.confirm({
  	  title: '标题',
      content: '确认弹框',
      onConfirm: () => {
        console.log('确定');
        return false;
      },
      onCancel: () => {
        console.log('取消')
      }
  	})
  }
  showAlertDialog(){
  	Dialog.alert({
  	  title: '标题',
      content: '提示弹框',
      onConfirm: () => {
        console.log('知道了')
      }
  	})
  }
  showCustomDialog(){
  	Dialog.custom({
  	  title: '标题',
      content: '自定义弹框',
      buttons: [{
  	    content: '按钮一',
        callback: ()=>{console.log('按钮一')}
      }, {
  	    content: '按钮二',
        callback: ()=>{console.log('按钮二')}
      }, {
  	    content: '按钮三',
        callback: ()=>{console.log('按钮三')},
        primary: true
      }],
  	})
  }
  render() {
    let t = this;
    let props = t.props;
    return (
      <div>
        <button onClick={t.showConfirmDialog.bind(t)}>显示confirm</button>
        <button onClick={t.showAlertDialog.bind(t)}>显示alert</button>
        <button onClick={t.showCustomDialog.bind(t)}>显示custom</button>
      </div>
    );
  }
}
ReactDOM.render(<Demo/>, document.getElementById('root'));
