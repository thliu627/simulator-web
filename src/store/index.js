import Vue from 'vue'
import Vuex from 'vuex'
import '../lib/sockjs'
import '../lib/stomp'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
      userface: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface,
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      roles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles,
      state: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).state
    },
    //工程
    project: {
      //工程名
      name: '',
      //仿真类型
      simulatorType: '',
      //仿真软件(数组)
      software: [
        {
          //软件名
          softwareName: '',
          //模型(数组)
          model: [
            {
              //模型名称
              name: '',
              //模型文件(数组)
              file: [
                {
                  //文件标识
                  fileId: '',
                  //文件名称
                  fileName: '',
                  //文件路径
                  filePath: ''
                }
              ],
              //数据源
              dataSource: '',
              //模型DDS(数组)
              modelDDS: [
                {
                  //域
                  domain: '',
                  //角色
                  role: '',
                  //主题名称
                  topicName: '',
                  //QoS
                  QoS: ''
                }
              ],
              //模型参数(数组)
              params: [
                {
                  //输入参数(数组)
                  inputParam: [
                    {
                      //参数名
                      name: '',
                      //参数值
                      value: '',
                      //是否交互
                      isInteractive: ''
                    }
                  ],
                  //输出参数(数组)
                  outputParam: [
                    {
                      //输出类型
                      type: '',
                      //文件名称
                      fileName: '',
                      //输出参数
                      param: '',
                      //是否交互
                      isInteractive: ''
                    }
                  ]
                }
              ],
              //学科类型
              subjectType: '',
              //仿真优先级
              level: '',
              //仿真步长
              step: '',
              //仿真交互DDS(数组)
              subjectDDS: [
                {
                  //域
                  domain: '',
                  //角色
                  role: '',
                  //主题名称
                  topicName: '',
                  //QoS
                  QoS: ''
                }
              ]
            }
          ]
        }
      ]
    },
    routes: [],
    msgList: [],
    isDotMap: new Map(),
    currentFriend: {},
    // stomp: Stomp.over(new SockJS("sso-service/ws/endpointChat")),
    nfDot: false
  },
  mutations: {
    initMenu(state, menus){
      state.routes = menus;
    },
    login(state, user){
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      window.localStorage.removeItem('user');
      state.routes = [];
    },
  },
  actions: {
  }
});
