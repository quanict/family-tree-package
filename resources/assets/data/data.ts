export const data = {
    "tree":
        [
            {
                "x": 350,
                "id": "1",
                "level": -3,
                "name": "Nguyễn Đăng Điều",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["1-1", "1-2"]
                    }
                ]
            },

            {
                "x": 300,
                "id": "1-1",
                "name": "Nguyễn Xuân Yên",
                "level": -2,
            },
            {
                "x": 400,
                "id": "1-2",
                "name": "Nguyễn Công Hinh",
                "surname": "tức Hương",
                "level": -2,
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["1-2-1"]
                    }
                ]
            },
            {
                "x": 400,
                "id": "1-2-1",
                "name": "Nguyễn Tú Trạc",
                "level": -1,
                "death": "09-22",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["1-2-1-1", "1-2-1-2", "1-2-1-3", "1-2-1-4", "1-2-1-5"]
                    }
                ]

            },
            {
                "x": 300,
                "id": "1-2-1-1",
                "level": 0,
                "name": "Nguyễn Năm Lập",
                "death": "",
            },
            {
                "x": 325,
                "id": "1-2-1-2",
                "level": 0,
                "name": "Nguyễn Tư Tiến",
                "death": "",
            },
            {
                "x": 390,
                "id": "1-2-1-3",
                "level": 0,
                "name": "Nguyễn Ba Hồng",
                "relationships": [
                    {
                        "direction": "to",
                        "child": true,
                        "children": ["1431c411-d47c-7fd3-62b6-c2e98c8543a2", "2a5c0517-4c32-befa-2c1b-541f247d89f7"]
                    }
                ]
            },
            {
                "x": 350,
                "id": "1431c411-d47c-7fd3-62b6-c2e98c8543a2",
                "level": 1,
                "name": "Nguyễn Văn Huyền",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["40efe839-b910-d642-1754-8af2868d8835"]
                    }
                ]
            },
            {
                "x": 350,
                "id": "40efe839-b910-d642-1754-8af2868d8835",
                "level": 2,
                "name": "Nguyễn Văn Thông",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["40efe839-b910-d642-1754-8af2868d8836"]
                    }
                ]
            },
            {
                "x": 350,
                "id": "40efe839-b910-d642-1754-8af2868d8836",
                "level": 3,
                "name": "Nguyễn Văn Tăng",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["40efe839-b910-d642-1754-8af2868d8837"]
                    }
                ]
            },
            {
                "x": 350,
                "id": "40efe839-b910-d642-1754-8af2868d8837",
                "level": 4,
                "name": "Nguyễn Văn Vực",
            },
            {
                "x": 425,
                "id": "2a5c0517-4c32-befa-2c1b-541f247d89f7",
                "level": 1,
                "name": "Nguyễn Văn Kích",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["2a5c0517-4c32-befa-2c1b-541f247d89f8"]
                    }
                ]

            },
            {
                "x": 425,
                "id": "2a5c0517-4c32-befa-2c1b-541f247d89f8",
                "level": 2,
                "name": "Nguyễn Văn Trác",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["2a5c0517-4c32-befa-2c1b-541f247d89f9"]
                    }
                ]

            },
            {
                "x": 425,
                "id": "2a5c0517-4c32-befa-2c1b-541f247d89f9",
                "level": 3,
                "name": "Nguyễn Văn Phác",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["vp1", "vp2", "vp3", "vp4"]
                    }
                ]

            },
            {
                "x": 387.5,
                "id": "vp1",
                "level": 4,
                "name": "Nguyễn Văn Chất",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["vp1-1", "vp1-2", "vp1-3", "vp1-4"]
                    }
                ]
            },
            {
                "x": 350,
                "id": "vp1-1",
                "level": 5,
                "name": "Nguyễn Văn Đặng",
            },
            {
                "x": 375,
                "id": "vp1-2",
                "level": 5,
                "name": "Nguyễn Văn Khoái",
            },
            {
                "x": 400,
                "id": "vp1-3",
                "level": 5,
                "name": "Nguyễn Văn Hiền",
            },
            {
                "x": 425,
                "id": "vp1-4",
                "level": 5,
                "name": "Nguyễn Văn Hiến",
            },
            {
                "x": 450,
                "id": "vp2",
                "level": 4,
                "name": "Nguyễn Văn Mỹ",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["vp2-1"]
                    }
                ]
            },
            {
                "x": 450,
                "id": "vp2-1",
                "level": 5,
                "name": "Nguyễn Văn Tuấn",
            },
            {
                "x": 475,
                "id": "vp3",
                "level": 4,
                "name": "Nguyễn Văn Hậu",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["vp3-1"]
                    }
                ]
            },
            {
                "x": 475,
                "id": "vp3-1",
                "level": 5,
                "name": "Nguyễn Văn Phương",
            },
            {
                "x": 500,
                "id": "vp4",
                "level": 4,
                "name": "Nguyễn Văn Hóa",

            },
            {
                "x": 525,
                "id": "1-2-1-4",
                "level": 0,
                "name": "Nguyễn Hai Thế",
            },
            {
                "x": 550,
                "id": "1-2-1-5",
                "level": 0,
                "name": "Nguyễn Sử Thì",
                "death": "04-12",
                "relationships": [
                    {
                        "direction": "to",
                        "child": true,
                        "children": ["1-2-1-5-1", "1-2-1-5-2", "1-2-1-5-4", "1-2-1-5-5", "1-2-1-5-6"]
                    }
                ]

            },
            {
                "x": 550,
                "id": "1-2-1-5-4",
                "level": 1,
                "name": "Nguyễn Đội Thưởng",
                "death": "04-28",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["ffa4fe92-2133-4e4f-9832-95563500152e", "418feca7-7864-6595-9bef-fd613c7d3e84", "1-2-1-5-4-3"]
                    }
                ]
            },

            {
                "x": 925,
                "id": "1-2-1-5-2",
                "level": 1,
                "name": "Nguyễn Tri Ka",
                "death": "05-25",
                "relationships": [
                    {
                        "partnerId": "1-2-1-5-3",
                        "direction": "to",
                        "children": ["300e247c-5b0c-bdb8-ceef-aec5d636ac9b"]
                    }
                ]
            },
            {
                "x": 950,
                "id": "1-2-1-5-3",
                "level": 1,
                "name": "Phạm Thị Lý",
                "sex": "f",
                "relationships": [
                    {
                        "partnerId": "1-2-1-5-2",
                        "direction": "to",
                    }
                ]
            },
            {
                "x": 937.5,
                "id": "300e247c-5b0c-bdb8-ceef-aec5d636ac9b",
                "level": 2,
                "name": "Nguyễn Văn Kha",
                "death": "",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["17bf3117-38c5-06d0-7abb-a018f69e11a4", "ea28bcb8-185b-8cff-d8e9-2d446d1cb785"]
                    }
                ]
            },
            {
                "x": 925,
                "id": "17bf3117-38c5-06d0-7abb-a018f69e11a4",
                "level": 3,
                "name": "Nguyễn Văn Khả",
                "death": "",
            },
            {
                "x": 950,
                "id": "ea28bcb8-185b-8cff-d8e9-2d446d1cb785",
                "level": 3,
                "name": "Nguyễn Văn Kỳ",
                "death": "",
            },


            {
                "x": 975,
                "id": "1-2-1-5-5",
                "level": 1,
                "name": "Nguyễn Thị Tám",
                "death": "",
                "sex": "f",
            },
            {
                "x": 1000,
                "id": "1-2-1-5-6",
                "level": 1,
                "name": "cụ Uyển",
                "sex": "f",

            },


            {
                "x": 1025,
                "id": "1-2-1-5-1",
                "level": 1,
                "name": "Nguyễn Xuân Cách",
                "surname": "ông Mãnh",
                "death": "01-17",
            },

            {
                "x": 550,
                "id": "ffa4fe92-2133-4e4f-9832-95563500152e",
                "level": 2,
                "name": "Nguyễn Văn Ái",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["543da187-dcfa-73a7-988e-aedb6ac2eadd"]
                    }
                ]
            },
            {
                "x": 550,
                "id": "543da187-dcfa-73a7-988e-aedb6ac2eadd",
                "level": 3,
                "name": "Nguyễn Văn Vân",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["43c60ac0-d82e-fdbc-c2b9-542706f05207"]
                    }
                ]
            },
            {
                "x": 550,
                "id": "43c60ac0-d82e-fdbc-c2b9-542706f05207",
                "level": 4,
                "name": "Nguyễn Văn Cải",
            },
            {
                "x": 575,
                "id": "418feca7-7864-6595-9bef-fd613c7d3e84",
                "level": 2,
                "name": "Nguyễn Văn Vy",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["78673582-267a-b342-4448-1e3bee1b4fa4"]
                    }
                ]
            },
            {
                "x": 575,
                "id": "78673582-267a-b342-4448-1e3bee1b4fa4",
                "level": 3,
                "name": "Nguyễn Văn Lưu",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["d4dbbaab-ca75-b6c9-e375-560db4b5259b"]
                    }
                ]
            },
            {
                "x": 575,
                "id": "d4dbbaab-ca75-b6c9-e375-560db4b5259b",
                "level": 4,
                "name": "Nguyễn Văn Lộ",
                "note": "3 con gai"
            },
            {
                "x": 750,
                "id": "1-2-1-5-4-3",
                "name": "Nguyễn Văn Tước",
                "level": 2,
                "death": "11-13",
                "relationships": [
                    {
                        "partnerId": "1-2-1-5-4-33",
                        "direction": "to",
                        "children": ["1-2-1-5-4-3-1", "1-2-1-5-4-3-2", "1-2-1-5-4-3-3", "1-2-1-5-4-3-4", "1-2-1-5-4-3-5"]
                    }
                ]

            },

            {
                "x": 800,
                "id": "1-2-1-5-4-33",
                "level": 2,
                "name": "Dương Thị Hỉ",
                "death": "",
                "sex": "f",
                "relationships": [
                    {
                        "partnerId": "1-2-1-5-4-3",
                        "direction": "to",
                    }
                ]

            },

            {
                "x": 725,
                "id": "1-2-1-5-4-3-1",
                "level": 3,
                "name": "Nguyễn Văn Đáp ",
                "death": "",
            },
            {
                "x": 750,
                "id": "1-2-1-5-4-3-2",
                "level": 3,
                "name": "Nguyễn Văn Sướng",
                "death": "10-14",
                "relationships": [
                    {

                        "direction": "to",
                        "children": [
                            "68803e12-8790-c2d9-1dd1-68e1511ca694",
                            "f31a349c-4ddd-8ec2-930e-a1b08a18f00d",
                            "20ab63f2-8220-96a7-4fa5-28baeaf7cb9b",
                            "4f01dac4-f3fd-240f-2573-286e64877556",
                            "ab76f465-7f04-db57-cfb7-84370c872306"
                        ]
                    }
                ]
            },
            {
                "x": 775,
                "id": "1-2-1-5-4-3-3",
                "level": 3,
                "name": "Nguyễn Văn Tích",
                "death": "",

            },
            {
                "x": 800,
                "id": "1-2-1-5-4-3-4",
                "level": 3,
                "name": "Hà Thị Chỉ",
                "death": "",
                "sex": "f",

            },
            {
                "x": 825,
                "id": "1-2-1-5-4-3-5",
                "level": 3,
                "name": "Nguyễn Văn Rạng",
                "death": "",
            },
            {
                "x": 637.5,
                "id": "68803e12-8790-c2d9-1dd1-68e1511ca694",
                "level": 4,
                "name": "Nguyễn Văn Quý",
                "death": "07-13",
                "relationships": [
                    {

                        "direction": "to",
                        "children": [
                            "77ad6908-9683-49e4-3820-0aa7b539520c",
                            "c2677975-a554-909a-241f-cbb3f92f88f7",
                            "c10ee252-9e7f-81f5-0775-8f4ec9a0b848",
                            "6d389160-1bc8-b1e1-f474-68b57f995b4a"
                        ]
                    }
                ]
            },
            {
                "x": 600,
                "id": "77ad6908-9683-49e4-3820-0aa7b539520c",
                "level": 5,
                "name": "Nguyễn Văn Đỏ",
                "death": "",
            },
            {
                "x": 625,
                "id": "c2677975-a554-909a-241f-cbb3f92f88f7",
                "level": 5,
                "name": "Nguyễn Tiến Dũng",
                "alive": true,
            },
            {
                "x": 625,
                "id": "ntd1",
                "level": 6,
                "name": "Aleš Velechovský",
                "alive": true,
            },
            {
                "x": 650,
                "id": "ntd2",
                "level": 6,
                "name": "Helča Velechovská",
                "alive": true,
            },
            {
                "x": 650,
                "id": "ntd3",
                "level": 6,
                "name": "Machec",
                "alive": true,
            },

            {
                "x": 650,
                "id": "c10ee252-9e7f-81f5-0775-8f4ec9a0b848",
                "level": 5,
                "name": "Nguyễn Xuân Toàn",
                "death": "",
            },
            {
                "x": 650,
                "id": "xnt1",
                "level": 6,
                "name": "Nguyễn Hồng Quân",
                "alive": true,
            },
            {
                "x": 650,
                "id": "xnt2",
                "level": 6,
                "name": "Nguyễn Mạnh Chiên",
                "alive": true,
            },
            {
                "x": 650,
                "id": "xnt2",
                "level": 6,
                "name": "Nguyễn Thị Lan Anh",
                "alive": true,
            },
            {
                "x": 675,
                "id": "6d389160-1bc8-b1e1-f474-68b57f995b4a",
                "level": 5,
                "name": "Nguyễn Thị Oanh",
                "alive": true,
            },

            {
                "x": 750,
                "id": "f31a349c-4ddd-8ec2-930e-a1b08a18f00d",
                "level": 4,
                "name": "Nguyễn Văn Quán",
                "death": "",
                "relationships": [
                    {

                        "direction": "to",
                        "children": [
                            "6af78c07-a61b-3e70-51e3-796508b6c0bd",
                            "ce17e22d-aef5-db58-cf56-6edc4a3ed115",
                            "abfdc0bd-4bb3-b93c-fed0-6f85f92b2de0",
                            "0d79b869-e654-cec5-1b04-c023ab2eeedc",
                            "cb97b3ab-1652-02e4-df7d-d4bde749ede6"
                        ]
                    }
                ]
            },
            {
                "x": 700,
                "id": "6af78c07-a61b-3e70-51e3-796508b6c0bd",
                "level": 5,
                "name": "Nguyễn Văn Tươi",
                "death": "",
            },
            {
                "x": 725,
                "id": "ce17e22d-aef5-db58-cf56-6edc4a3ed115",
                "level": 5,
                "name": "Nguyễn Văn Hoan",
                "death": "",
            },
            {
                "x": 750,
                "id": "abfdc0bd-4bb3-b93c-fed0-6f85f92b2de0",
                "level": 5,
                "name": "Nguyễn Văn Quang",
                "death": "",
            },
            {
                "x": 775,
                "id": "0d79b869-e654-cec5-1b04-c023ab2eeedc",
                "level": 5,
                "name": "Nguyễn Văn Phung",
                "death": "",
            },
            {
                "x": 800,
                "id": "cb97b3ab-1652-02e4-df7d-d4bde749ede6",
                "level": 5,
                "name": "Nguyễn Văn Toán",
                "death": "",
            },
            {
                "x": 837.5,
                "id": "20ab63f2-8220-96a7-4fa5-28baeaf7cb9b",
                "level": 4,
                "name": "Nguyễn Văn Quản",
                "death": "",
                "relationships": [
                    {

                        "direction": "to",
                        "children": [
                            "cca31f29-6be3-3bf2-5487-03ff3724942a",
                            "d1c4a50a-ea03-22db-7aa7-74a25da6c3fa"
                        ]
                    }
                ]
            },
            {
                "x": 825,
                "id": "cca31f29-6be3-3bf2-5487-03ff3724942a",
                "level": 5,
                "name": "Nguyễn Văn Thiệp",
                "alive": true,
            },
            {
                "x": 850,
                "id": "d1c4a50a-ea03-22db-7aa7-74a25da6c3fa",
                "level": 5,
                "name": "Nguyễn Văn Hữu",
                "alive": true,
            },
            {
                "x": 875,
                "id": "4f01dac4-f3fd-240f-2573-286e64877556",
                "level": 4,
                "name": "Nguyễn Văn Thiệu",
                "death": "",
            },
            {
                "x": 900,
                "id": "ab76f465-7f04-db57-cfb7-84370c872306",
                "level": 4,
                "name": "Nguyễn Văn Thuật",
                "alive": true,
                "relationships": [
                    {

                        "direction": "to",
                        "children": ["8caf8e1d-3ff3-eb6b-5bec-a246ff6e8618"]
                    }
                ]
            },
            {
                "x": 900,
                "id": "8caf8e1d-3ff3-eb6b-5bec-a246ff6e8618",
                "level": 5,
                "name": "Nguyễn Văn Triển",
                "alive": true,
            },

        ]
};