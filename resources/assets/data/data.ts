export const data = {
    "tree":
        [
            {
                "x": 100,
                "y": 20,
                "id": "ff663b16-6d48-7712-412c-4f1df81eb15c",
                "name": "Nguyễn Đăng Điều",
                "surname": "",
                "sex": "f",
                "description": "Princess of France\r\n1401 - 1437",
                "isNode": true,
                "relationships": [{
                    "partnerId": "2279a9a9-fd2a-7d9f-2463-305f57faabd3",
                    "direction": "to",
                    "children": ["824fa647-8012-a425-5615-d30d9db62ca2"]
                }
                ]
            },

            {
                "x": 400,
                "y": 20,
                "id": "2279a9a9-fd2a-7d9f-2463-305f57faabd3",
                "name": "Nguyễn Xuân Yên",
                "surname": "",
                "sex": "m",
                "description": "executed 1461",
                "isNode": true,
                "relationships": [{
                    "partnerId": "ff663b16-6d48-7712-412c-4f1df81eb15c",
                    "direction": "from",
                    "children": ["824fa647-8012-a425-5615-d30d9db62ca2"]
                }
                ]
            },
            {
                "x": 250,
                "y": 150,
                "id": "824fa647-8012-a425-5615-d30d9db62ca2",
                "name": "Nguyễn Công Hinh",
                "surname": "tức Hương",
                "sex": "m",
                "description": "1430 - 1456",
                "isNode": true,
              
            }
        ]
};