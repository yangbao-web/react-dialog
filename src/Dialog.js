import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';
import Animate from 'rc-animate';
import './Dialog.css';

class AnimateRenderBox extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }
  render() {
    let className = this.props.className;
    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += ` ${this.props.hiddenClassName}`;
    }
    const {...props} = this.props;
    props.className = className;
    delete props.visible;
    delete props.hiddenClassName;
    return <div {...props} />;
  }
}
AnimateRenderBox.propTypes = {
  visible: PropTypes.bool
};

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: !!props.show,
      animateShow: !!props.show
    }
  }

  renderButton(buttons) {
    let t = this;
    let btns = buttons.map((btn, index) => {
      let callback = btn.callback || (() => true);
      return <div key={`button${index}`} className={classname('dialog-button t-FB1', {
        'dialog-primary': !!btn.primary,
        'dialog-secondary': !btn.primary
      })} onClick={t.clickHandle.bind(t, callback)}>{btn.content}</div>
    });
    return <div className="t-FBH">{btns}</div>
  }
  clickHandle(callback){
    if(callback() !== false){
      this.hide();
    }
  }
  hide(){
    this.setState({
      show: false
    })
  }
  onAnimateLeave = (animateShow) => {
    this.setState({
      [animateShow]: false
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      animateShow: nextProps.show
    })
  }
  render() {
    let t = this;
    let props = t.props;
    let style = t.state.animateShow ? null : {display: 'none'};
    return (
      <div>
        <Animate
          component=''
          showProp="visible"
          transitionName="mask-fade"
          transitionAppear={true}
        >
          <AnimateRenderBox 
            className="dialog-mask"
            hiddenClassName={classname({"dialog-mask-hidden": !t.state.show})}
            visible={t.state.show}>
          </AnimateRenderBox>
        </Animate>
        <div style={style} className={classname("dialog-wrap", {[props.className]: !!props.className})}>
          <Animate
            component=''
            showProp="visible"
            transitionName="dialog-slideDown"
            transitionAppear={true}
            onLeave={t.onAnimateLeave.bind(t, 'animateShow')}
          >
            <AnimateRenderBox className="dialog-container" visible={t.state.show}>
              <div className="dialog-body">
                {
                  props.title ? <div className="dialog-title">{props.title}</div> : null
                }
                {
                  props.content ? <div className="dialog-content">{props.content}</div> : null
                }
                <div className="dialog-buttons">
                  {
                    t.renderButton(props.buttons)
                  }
                </div>
              </div>
            </AnimateRenderBox>
          </Animate>
        </div>
      </div>
    );
  }
}
// 全局 Dialog 组件 render 的 DOM ID
const WRAPPER_ID = '__GlobalDialog__';
let wrapper = null;
Dialog.global = null;
const show = function(options = {}) {
  options.show = true;
  if(!wrapper){
    wrapper = document.createElement('div');
    wrapper.id = WRAPPER_ID;
    document.body.appendChild(wrapper);
  };
  Dialog.global = ReactDOM.render(<Dialog key={WRAPPER_ID} {...options} />, wrapper);
};
Dialog.confirm = function(options) {
  let confirmOptions = {...options}
  confirmOptions.buttons = [{
    content: confirmOptions.cancelText || '取消',
    callback: confirmOptions.onCancel
  }, {
    content: confirmOptions.confirmText || '确定',
    callback: confirmOptions.onConfirm,
    primary: true
  }];
  show(confirmOptions);
};
Dialog.alert = function(options) {
  let alertOptions = {...options}
  alertOptions.buttons = [{
    content: alertOptions.confirmText || '知道了',
    callback: alertOptions.onConfirm
  }];
  show(alertOptions);
};
Dialog.custom = function(options) {
  let customOptions = {...options}
  if(customOptions.buttons){
    return show(customOptions);
  }else if(customOptions.type && customOptions.type === 'confirm'){
    return Dialog.confirm(customOptions)
  }else{
    return Dialog.alert(customOptions)
  }
};
Dialog.hide = function() {
  if(Dialog.global){
    Dialog.global.hide();
  }
}
Dialog.defaultProps = {
  title: '',
  content: '',
  buttons: null,
  hasMask: true
};
Dialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  buttons: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    callback: PropTypes.func,
    primary: PropTypes.bool,
  })),
  hasMask: PropTypes.bool
};

export default Dialog;
