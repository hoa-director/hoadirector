// {
//   "/user/login": {
//     "target": "http://localhost:5000",
//     "secure": false,
//     "logLevel": "debug"
//   }
// }

// class ProxyConfig {
//   context: string[];
//   target: string;
//   secure: boolean;
//   logLevel: string;

//   constructor(
//     context: string[],
//     target: string,
//     secure: boolean,
//     logLevel: string
//   ) {
//     this.context = context,
//     this.target = target,
//     this.secure = secure,
//     this.logLevel = logLevel
//   }
// }

// const PROXY_CONFIG: ProxyConfig[] = [
//   new ProxyConfig(
//     ["/user/login"],
//     "http://localhost:3000",
//     false,
//     "debug"),
// ];

// module.exports = PROXY_CONFIG;


const PROXY_CONFIG = [
  {
      context: [
        "/user/login",
        "/users/logout",
        "/user",
        "/user/associations",
        "/users/forgotten",
        "/api/directory",
        "/api/documents",
        "/api/rules",
      ],
      target: "http://localhost:3000",
      secure: false,
      logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
