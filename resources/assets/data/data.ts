export const data = {
    "tree":
        [
            {
                "x": 250,
                "y": 10,
                "id": "1",
                "name": "Nguyễn Đăng Điều",
                "surname": "",
                "sex": "m",
                "description": "",
                "isNode": true,
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["1-1", "1-2"] 
                    }
                ]
            },

            {
                "x": 100,
                "y": 260,
                "id": "1-1",
                "name": "Nguyễn Xuân Yên",
            },
            {
                "x": 400,
                "y": 260,
                "id": "1-2",
                "name": "Nguyễn Công Hinh",
                "surname": "tức Hương",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["1-2-1"] 
                    }
                ]
            },
            {
                "x": 400,
                "y": 510,
                "id": "1-2-1",
                "name": "Nguyễn Tú Trạc",
                "death":"09-22",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["1-2-1-1", "1-2-1-2", "1-2-1-3", "1-2-1-4", "1-2-1-5"]
                    }
                ]

            },
            {
                "x": 400,
                "y": 760,
                "id": "1-2-1-1",
                "name": "Nguyễn Năm Lập",
                "death":"",
            },
            {
                "x": 650,
                "y": 760,
                "id": "1-2-1-2",
                "name": "Nguyễn Tư Tiến",
                "death":"",
            },
            {
                "x": 900,
                "y": 760,
                "id": "1-2-1-3",
                "name": "Nguyễn Ba Hồng",
            },
            {
                "x": 1150,
                "y": 760,
                "id": "1-2-1-4",
                "name": "Nguyễn Hai Thế",
            },
            {
                "x": 1400,
                "y": 760,
                "id": "1-2-1-5",
                "name": "Nguyễn Sử Thì",
                "death":"04-12",
                "relationships": [
                    {
                        "direction": "to",
                        "child":true,
                        "children": ["1-2-1-5-1", "1-2-1-5-2", "1-2-1-5-3", "1-2-1-5-4", "1-2-1-5-5"]
                    }
                ]

            },
            {
                "x": 1400,
                "y": 1050,
                "id": "1-2-1-5-1",
                "name": "Nguyễn Xuân Cách",
                "surname": "ông Mãnh",
                "death":"01-17",
            },
            {
                "x": 1650,
                "y": 1050,
                "id": "1-2-1-5-2",
                "name": "Nguyễn Tri Ka",
                "death":"05-25",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["300e247c-5b0c-bdb8-ceef-aec5d636ac9b"]
                    }
                ]
            },
            {
                "x": 1650,
                "y": 1300,
                "id": "300e247c-5b0c-bdb8-ceef-aec5d636ac9b",
                "name": "Nguyễn Văn Kha",
                "death":"",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["17bf3117-38c5-06d0-7abb-a018f69e11a4", "bcb8-185b-8cff-d8e9-2d446d1cb785"]
                    }
                ]
            },
            {
                "x": 1650,
                "y": 1550,
                "id": "17bf3117-38c5-06d0-7abb-a018f69e11a4",
                "name": "Nguyễn Văn Khả",
                "death":"",
            },
            {
                "x": 1650,
                "y": 1550,
                "id": "ea28bcb8-185b-8cff-d8e9-2d446d1cb785",
                "name": "Nguyễn Văn Kỳ",
                "death":"",
            },
            {
                "x": 2150,
                "y": 1050,
                "id": "1-2-1-5-3",
                "name": "Phạm Thị Lý",
            },
            {
                "x": 2400,
                "y": 1050,
                "id": "1-2-1-5-4",
                "name": "Nguyễn Đội Thưởng",
                "death":"04-28",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["ffa4fe92-2133-4e4f-9832-95563500152e", "418feca7-7864-6595-9bef-fd613c7d3e84", "1-2-1-5-4-3"]
                    }
                ]
            },
            {
                "x": 2650,
                "y": 1050,
                "id": "1-2-1-5-5",
                "name": "Nguyễn Thị Tám",
                "death":"",
                "sex": "f",
            },
            {
                "x": 2400,
                "y": 1300,
                "id": "ffa4fe92-2133-4e4f-9832-95563500152e",
                "name": "Nguyễn Văn Ái",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["543da187-dcfa-73a7-988e-aedb6ac2eadd"]
                    }
                ]
            },
            {
                "x": 2400,
                "y": 1550,
                "id": "543da187-dcfa-73a7-988e-aedb6ac2eadd",
                "name": "Nguyễn Văn Vân",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["43c60ac0-d82e-fdbc-c2b9-542706f05207"]
                    }
                ]
            },
            {
                "x": 2400,
                "y": 1800,
                "id": "43c60ac0-d82e-fdbc-c2b9-542706f05207",
                "name": "Nguyễn Văn Cải",
            },
            {
                "x": 2650,
                "y": 1300,
                "id": "418feca7-7864-6595-9bef-fd613c7d3e84",
                "name": "Nguyễn Văn Vi",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["78673582-267a-b342-4448-1e3bee1b4fa4"]
                    }
                ]
            },
            {
                "x": 2650,
                "y": 1550,
                "id": "78673582-267a-b342-4448-1e3bee1b4fa4",
                "name": "Nguyễn Văn Lưu",
                "relationships": [
                    {
                        "direction": "to",
                        "children": ["d4dbbaab-ca75-b6c9-e375-560db4b5259b"]
                    }
                ]
            },
            {
                "x": 2650,
                "y": 1800,
                "id": "d4dbbaab-ca75-b6c9-e375-560db4b5259b",
                "name": "Nguyễn Văn Lộ",
                "note":"3 con gai"
            },
            {
                "x": 2900,
                "y": 1300,
                "id": "1-2-1-5-4-3",
                "name": "Nguyễn Văn Tước",
                "death":"11-13",
                "relationships": [
                    {
                        "partnerId": "1-2-1-5-4-33",
                        "direction": "to",
                        "children": ["1-2-1-5-4-3-1", "1-2-1-5-4-3-2", "1-2-1-5-4-3-3", "1-2-1-5-4-3-4", "1-2-1-5-4-3-5"]
                    }
                ]

            },
            
            {
                "x": 3250,
                "y": 1300,
                "id": "1-2-1-5-4-33",
                "name": "Dương Thị Hỉ",
                "death":"",
                "sex": "f",
                "relationships": [
                    {
                        "partnerId": "1-2-1-5-4-3",
                        "direction": "to",
                    }
                ]

            },

            {
                "x": 2900,
                "y": 1550,
                "id": "1-2-1-5-4-3-1",
                "name": "Nguyễn Văn Đáp ",
                "death":"",
                "sex": "m",
                "relationships": [
                ]
            },
            {
                "x": 3150,
                "y": 1550,
                "id": "1-2-1-5-4-3-2",
                "name": "Nguyễn Văn Sướng",
                "death":"10-14",
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
                "x": 3400,
                "y": 1550,
                "id": "1-2-1-5-4-3-3",
                "name": "Nguyễn Văn Tích",
                "death":"",
                "relationships": [
                ]
            },
            {
                "x": 3650,
                "y": 1550,
                "id": "1-2-1-5-4-3-4",
                "name": "Hà Thị Chỉ",
                "death":"",
                "sex": "f",
                "relationships": [
                ]
            },
            {
                "x": 3900,
                "y": 1550,
                "id": "1-2-1-5-4-3-5",
                "name": "Nguyễn Văn Rạng",
                "death":"",
                "sex": "m",
                "relationships": [
                ]
            },

            {
                "x": 3150,
                "y": 1800,
                "id": "68803e12-8790-c2d9-1dd1-68e1511ca694",
                "name": "Nguyễn Văn Quý",
                "death":"07-13",
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
                "x": 2770,
                "y": 2050,
                "id": "77ad6908-9683-49e4-3820-0aa7b539520c",
                "name": "Nguyễn Văn Đỏ",
                "death":"",
            },
            {
                "x": 3020,
                "y": 2050,
                "id": "c2677975-a554-909a-241f-cbb3f92f88f7",
                "name": "Nguyễn Tiến Dũng",
                "alive":true,
            },
            {
                "x": 3270,
                "y": 2050,
                "id": "c10ee252-9e7f-81f5-0775-8f4ec9a0b848",
                "name": "Nguyễn Xuân Toàn",
                "death":"",
            },
            {
                "x": 3520,
                "y": 2050,
                "id": "6d389160-1bc8-b1e1-f474-68b57f995b4a",
                "name": "Nguyễn Thị Oanh",
                "alive":true,
            },
           
            {
                "x": 3400,
                "y": 1800,
                "id": "f31a349c-4ddd-8ec2-930e-a1b08a18f00d",
                "name": "Nguyễn Văn Quán",
                "death":"",
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
                "x": 3400,
                "y": 2050,
                "id": "6af78c07-a61b-3e70-51e3-796508b6c0bd",
                "name": "Nguyễn Văn Tươi",
                "death":"",
            },
            {
                "x": 3400,
                "y": 2150,
                "id": "ce17e22d-aef5-db58-cf56-6edc4a3ed115",
                "name": "Nguyễn Văn Hoan",
                "death":"",
            },
            {
                "x": 3400,
                "y": 2150,
                "id": "abfdc0bd-4bb3-b93c-fed0-6f85f92b2de0",
                "name": "Nguyễn Văn Quang",
                "death":"",
            },
            {
                "x": 3400,
                "y": 2150,
                "id": "0d79b869-e654-cec5-1b04-c023ab2eeedc",
                "name": "Nguyễn Văn Phung",
                "death":"",
            },
            {
                "x": 3400,
                "y": 2150,
                "id": "cb97b3ab-1652-02e4-df7d-d4bde749ede6",
                "name": "Nguyễn Văn Toán",
                "death":"",
            },
            {
                "x": 3650,
                "y": 1800,
                "id": "20ab63f2-8220-96a7-4fa5-28baeaf7cb9b",
                "name": "Nguyễn Văn Quản",
                "death":"",
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
                "x": 3650,
                "y": 2050,
                "id": "cca31f29-6be3-3bf2-5487-03ff3724942a",
                "name": "Nguyễn Văn Thiệp",
                "alive":true,
            },
            {
                "x": 3650,
                "y": 2050,
                "id": "d1c4a50a-ea03-22db-7aa7-74a25da6c3fa",
                "name": "Nguyễn Văn Hữu",
                "alive":true,
            },
            {
                "x": 3900,
                "y": 1800,
                "id": "4f01dac4-f3fd-240f-2573-286e64877556",
                "name": "Nguyễn Văn Thiệu",
                "death":"",
            },
            {
                "x": 4150,
                "y": 1800,
                "id": "ab76f465-7f04-db57-cfb7-84370c872306",
                "name": "Nguyễn Văn Thuật",
                "alive":true,
                "relationships": [
                    {
                        
                        "direction": "to",
                        "children": ["8caf8e1d-3ff3-eb6b-5bec-a246ff6e8618"]
                    }
                ]
            },
            {
                "x": 4150,
                "y": 2050,
                "id": "8caf8e1d-3ff3-eb6b-5bec-a246ff6e8618",
                "name": "Nguyễn Văn Triển",
                "alive":true,
            },

        ]
};