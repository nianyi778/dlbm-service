# 引用镜像
FROM node:16.20.0 As production

ENV TZ Asia/Shanghai

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

# 创建一个应用目录
WORKDIR /usr/src/app
# 这个星号通配符意思是复制package.json和pnpm-lock.yaml,复制到当前应用目录
COPY package.json ./
COPY pnpm-lock.yaml ./
# 安装应用依赖
RUN npm install -g pnpm --registry=https://registry.npmmirror.com 

RUN pnpm get registry 

RUN pnpm  --registry https://registry.npmmirror.com install
RUN ls
# 安装完毕后复制当前目录所有文件到镜像目录里面
COPY . . 
RUN ls
# 使用打包后的镜像
CMD ["node","dist/src/main.js"]
