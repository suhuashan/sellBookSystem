const config = {
    database: 'booksystem', // 使用哪个数据库
    dialect: "mysql",
    username: 'booksystem', // 用户名
    password: 'aa1234', // 口令
    host: 'localhost', // 主机名
    port: 3306, // 端口号，MySQL默认3306
    jwtsecret: "myjwttest"
  }
  module.exports = config;