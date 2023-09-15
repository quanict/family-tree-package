export const data = {
    "tree":
        [
            {
                "x": 100,
                "y": 20,
                "id": "1",
                "name": "Nguyễn Đăng Điều",
                "surname": "",
                "sex": "f",
                "description": "Princess of France\r\n1401 - 1437",
                "isNode": true,
                "relationships": [
                    
                ]
            },

            {
                "x": 400,
                "y": 20,
                "id": "1-1",
                "name": "Nguyễn Xuân Yên",
                "surname": "",
                "sex": "m",
                "description": "",
                "isNode": true,
                "relationships": [
                    {
                        "partnerId": "1",
                        "direction": "from",
                        "child":true,
                        "children": []
                    }
                ]
            },
            {
                "x": 400,
                "y": 200,
                "id": "1-2",
                "name": "Nguyễn Công Hinh",
                "surname": "tức Hương",
                "sex": "m",
                "description": "",
                "isNode": true,
                "relationships": [
                    {
                        "partnerId": "1",
                        "direction": "from",
                        "child":true,
                        "children": []
                    }
                ]

            }
        ]
};