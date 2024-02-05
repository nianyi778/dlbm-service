# 引用镜像
FROM node:16.17.1 As production

ENV TZ Asia/Shanghai

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

# 创建一个应用目录
WORKDIR /usr/src/app
# 这个星号通配符意思是复制package.json和package-lock.json,复制到当前应用目录
COPY package*.json ./
# 安装应用依赖
RUN npm install
# 安装完毕后复制当前目录所有文件到镜像目录里面
COPY dist/ . 

# 暴露应用程序运行的端口（根据您的应用程序的需求修改）
EXPOSE 3000

# 使用打包后的镜像
CMD ["node","main.js"]
