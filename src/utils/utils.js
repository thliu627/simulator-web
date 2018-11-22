import {getRequest} from './api'
import {Message} from 'element-ui'
import store from "../store";

export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store)=> {
  getRequest("sso-service", "/module/tree?applicationId=1").then(resp=> {
    console.log(resp);
    let fmtRoutes = formatRoutes(resp.data.children);
    router.addRoutes(fmtRoutes);
    store.commit('initMenu', fmtRoutes);
    store.state.user.name = '管理员';
    router.replace({path: '/Home',});
  });
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      requireAuth,
      keepAlive,
      iconUrl,
      children,
      location
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        require(['../components' + location + '/' + component + '.vue'], resolve)
      },
      name: name,
      iconUrl: iconUrl,
      meta: {
        requireAuth: requireAuth,
        keepAlive: keepAlive
      },
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
