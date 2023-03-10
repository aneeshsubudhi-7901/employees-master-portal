module.exports={
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas:{
            Employee:{
                type:"Object",
                properties:{
                    _id: {
                        type:"string",
                        description:"GUID of an employee record",
                        example: "63d31b04838e0715315c5ebc"
                    },
                    id:{
                        type:"Number",
                        description:"Employee ID of an employee",
                        example: "1234"
                    },
                    name:{
                        type:"string",
                        description:"Name of the employee",
                        example:"Aneesh"
                    },
                    department:{
                        type:"string",
                        description:"Department of the employee",
                        example:"Information and Technology"
                    },
                    salary:{
                        type:"Number",
                        description:"Salary of an employee",
                        example:"20000"
                    }
                }

            },
            EmployeeError:{
                type: "object",
                properties: {
                    success:{
                        type: "boolean",
                        description: "Status of request",
                        example: false,
                    },
                    message:{
                        type:"string",
                        description: "Message regarding token",
                        example: "Authorization failed!"
                    },
                }
            },
        }
    }
}