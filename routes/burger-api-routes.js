var db = require("../models")

module.exports = app => {
        app.get("/", (req, res) => {
            var query = [];
            if (req.query.CustomerId) {
                query.Customer = req.query.CustomerId
            }
            db.Burger.findAll({
                    include: db.Customer,
                    where: query
                })
                .then(data => {
                    var hbsObject = {
                        burgers: data
                    };
                    res.render("index", hbsObject)
                })
        })

        app.post("/api/burgers/", (req, res) => {
            db.Burger.create({
                burger_name: req.body.burger_name
            }).then(postData => {
                res.redirect("/")
            })
        })

        app.put("/api/dogs/:id", (req, res) => {
                    var customerName = req.body.customer;
                    var id0 = req.params.id
                 //   console.log(req.body.id)
                   // console.log(req.body)

                    db.Customer.findAll({
                            where: {
                                customer_name: customerName
                            }
                        })
                        .then(putData => {
                                if (putData.length > 0) {
                                    id1 = JSON.parse(putData[0].dataValues.id)
                                    console.log(id1)
                                    eat(id1)
                                } else {
                                    db.Customer.create({
                                        customer_name: customerName
                                    })
                                        .then((data)=>{ eat(data.id)})
                                           }
                                        })
                                    eat = (id) => {
                                        db.Burger.update({
                                                devoured: true,
                                                CustomerId: id
                                            },

                                            {
                                                where: {
                                                    id: id0
                                                }
                                            }

                                        ).then(res.redirect('/')
                                        )
                                    }
                                })

                        }