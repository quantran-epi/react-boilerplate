const path = require('path');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post("/auth/signin", (req, res) => {
    let body = req.body;
    let responseBody = {
        data: {
            token: "1234",
            type: "Bearer",
            user: {
                id: 1,
                username: "",
                fullname: "",
                email: "",
                localBranch: "",
                phone: "",
                status: "",
                expireDt: "",
                effectiveDt: "",
                roles: [
                    {
                        id: 2,
                        name: "test",
                        description: null,
                        createdBy: null,
                        createdAt: null,
                        modifiedAt: null,
                        status: 1,
                        menu: [
                            {
                                "id": 1,
                                "title": "Thẻ tín dụng",
                                "link": null,
                                "viewStatus": "1",
                                "parentId": null
                            },
                            {
                                "id": 2,
                                "title": "Tạo file thu nợ từ Intellect",
                                "link": "/credit/CreditCardDebtCollectionMaker",
                                "viewStatus": "1",
                                "parentId": 1
                            },
                            {
                                "id": 3,
                                "title": "Duyệt file thu nợ từ Intellect",
                                "link": "/credit/CreditCardDebtCollectionChecker",
                                "viewStatus": "1",
                                "parentId": 1
                            },
                            {
                                "id": 6,
                                "title": "ATM",
                                "link": null,
                                "viewStatus": "1",
                                "parentId": null
                            },
                            {
                                "id": 7,
                                "title": "Quản lý chu kỳ quỹ ATM",
                                "link": "/atm/updateAtmCycleMaker",
                                "viewStatus": "1",
                                "parentId": 6
                            },
                            {
                                "id": 8,
                                "title": "Quản lý chu kỳ quỹ ATM",
                                "link": "/atm/updateAtmCycleChecker",
                                "viewStatus": "1",
                                "parentId": 6
                            }
                        ]
                    }
                ]
            },
        }
    }

    if (body.username === "chungps" && body.password === "Tham@1999") {
        responseBody.data.user.username = body.username;
        res.json(responseBody);
    }
    else
        res.json({});
})

server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})