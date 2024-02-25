"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "UKS Moklet - Backend",
            version: "1.0.0",
            description: "API for UKS Moklet Application",
            contact: {
                name: "Kusindra Aji Rabbany",
                url: "https://benspace.xyz",
                email: "me@benspace.xyz",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
            {
                url: "https://uks-moklet-be.benspace.xyz",
            },
        ],
        paths: {
            "/guru/login": {
                post: {
                    summary: "Login Guru",
                    tags: ["Account"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    $ref: "#/components/schemas/Login",
                                },
                            },
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Login",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Login success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Login",
                                    },
                                },
                            },
                        },
                        "422": {
                            description: "Unprocessable entity.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/422",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/register": {
                post: {
                    summary: "Create new register data",
                    tags: ["Register"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    $ref: "#/components/schemas/RegisterPost",
                                },
                            },
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/RegisterPost",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Create success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Login",
                                    },
                                },
                            },
                        },
                        "422": {
                            description: "Unprocessable entity.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/422",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/register/{id}": {
                delete: {
                    summary: "Delete register data",
                    tags: ["Register"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string",
                                minimum: 36,
                            },
                            description: "registration ID",
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Delete success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/200",
                                    },
                                },
                            },
                        },
                        "404": {
                            description: "Data not found.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/404",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
                get: {
                    summary: "Get register data",
                    tags: ["Register"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string",
                                minimum: 36,
                            },
                            description: "registration ID",
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Success find data.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/findRegister",
                                    },
                                },
                            },
                        },
                        "404": {
                            description: "Data not found.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/404",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
                put: {
                    summary: "Update register data",
                    tags: ["Register"],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: {
                                type: "string",
                                minimum: 36,
                            },
                            description: "registration ID",
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    $ref: "#/components/schemas/RegisterPost",
                                },
                            },
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/RegisterPost",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Update success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/200",
                                    },
                                },
                            },
                        },
                        "404": {
                            description: "Data not found.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/404",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/siswa/login": {
                post: {
                    summary: "Login Siswa",
                    tags: ["Account"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    $ref: "#/components/schemas/Login",
                                },
                            },
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Login",
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Login success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginSuccess",
                                    },
                                },
                            },
                        },
                        "401": {
                            description: "Unauthorized.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/401",
                                    },
                                },
                            },
                        },
                        "422": {
                            description: "Unprocessable entity.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/422",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/rujukan/{id}": {
                put: {
                    summary: "Update rujukan data",
                    tags: ["Rujukan"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "detail_register_id",
                                        "analisa_dokter",
                                        "nama_dokter",
                                    ],
                                    properties: {
                                        detail_register_id: {
                                            type: "date",
                                            description: "ID Register",
                                        },
                                        analisa_dokter: {
                                            type: "string",
                                            description: "Hasil analisa dokter",
                                        },
                                        nama_dokter: {
                                            type: "string",
                                            description: "Nama dokter pemeriksa",
                                        },
                                    },
                                },
                            },
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "detail_register_id",
                                        "analisa_dokter",
                                        "nama_dokter",
                                    ],
                                    properties: {
                                        detail_register_id: {
                                            type: "date",
                                            description: "ID data Register",
                                        },
                                        analisa_dokter: {
                                            type: "string",
                                            description: "Hasil analisa dokter",
                                        },
                                        nama_dokter: {
                                            type: "string",
                                            description: "Nama dokter pemeriksa",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Login success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginSuccess",
                                    },
                                },
                            },
                        },
                        "401": {
                            description: "Unauthorized.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/401",
                                    },
                                },
                            },
                        },
                        "422": {
                            description: "Unprocessable entity.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/422",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
                get: {
                    summary: "Update rujukan data",
                    tags: ["Rujukan"],
                    responses: {
                        "200": {
                            description: "Login success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginSuccess",
                                    },
                                },
                            },
                        },
                        "401": {
                            description: "Unauthorized.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/401",
                                    },
                                },
                            },
                        },
                        "422": {
                            description: "Unprocessable entity.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/422",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/rujukan": {
                post: {
                    summary: "Create new rujukan data",
                    tags: ["Rujukan"],
                    requestBody: {
                        required: true,
                        content: {
                            "application/x-www-form-urlencoded": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "detail_register_id",
                                        "analisa_dokter",
                                        "nama_dokter",
                                    ],
                                    properties: {
                                        detail_register_id: {
                                            type: "date",
                                            description: "ID Register",
                                        },
                                        analisa_dokter: {
                                            type: "string",
                                            description: "Hasil analisa dokter",
                                        },
                                        nama_dokter: {
                                            type: "string",
                                            description: "Nama dokter pemeriksa",
                                        },
                                    },
                                },
                            },
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "detail_register_id",
                                        "analisa_dokter",
                                        "nama_dokter",
                                    ],
                                    properties: {
                                        detail_register_id: {
                                            type: "date",
                                            description: "ID data Register",
                                        },
                                        analisa_dokter: {
                                            type: "string",
                                            description: "Hasil analisa dokter",
                                        },
                                        nama_dokter: {
                                            type: "string",
                                            description: "Nama dokter pemeriksa",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        "200": {
                            description: "Login success.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginSuccess",
                                    },
                                },
                            },
                        },
                        "401": {
                            description: "Unauthorized.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/401",
                                    },
                                },
                            },
                        },
                        "422": {
                            description: "Unprocessable entity.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/422",
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Some server error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                "200": {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                        status: {
                            type: "number",
                            example: 200,
                        },
                        success: {
                            type: "boolean",
                        },
                    },
                },
                "401": {
                    type: "object",
                    properties: {
                        message: "string",
                        status: "integer",
                        success: "boolean",
                    },
                },
                "404": {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                        status: {
                            type: "number",
                            example: 404,
                        },
                        success: {
                            type: "boolean",
                            example: false,
                        },
                    },
                },
                "422": {
                    type: "object",
                    properties: {
                        errors: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/422Props",
                            },
                            description: "list of error",
                        },
                    },
                },
                RegisterPost: {
                    type: "object",
                    required: ["tgl_periksa", "siswa_id"],
                    properties: {
                        tgl_periksa: {
                            type: "date",
                            description: "Tanggal periksa siswa",
                        },
                        siswa_id: {
                            type: "string",
                            description: "ID Siswa yang periksa",
                        },
                    },
                },
                findRegister: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                        status: {
                            type: "number",
                            example: 200,
                        },
                        success: {
                            type: "boolean",
                        },
                        data: {
                            type: "object",
                        },
                    },
                },
                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            description: "The email of your account",
                        },
                        password: {
                            type: "string",
                            description: "The password of your account",
                        },
                    },
                },
                LoginSuccess: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                        status: {
                            type: "number",
                            example: 200,
                        },
                        success: {
                            type: "boolean",
                        },
                        data: {
                            type: "object",
                            properties: {
                                id: "string",
                                token: "string",
                                name: "string",
                                akses: "string",
                            },
                        },
                    },
                },
                "422Props": {
                    type: "object",
                    properties: {
                        type: "string",
                        msg: "string",
                        path: "string",
                        location: "string",
                    },
                },
            },
        },
        tags: [
            {
                name: "Account",
                description: "Access to account",
            },
            {
                name: "Register",
                description: "Patient registration data",
            },
            {
                name: "Rujukan",
                description: "Patient referral data to doctor",
            },
        ],
    },
    apis: [],
    customOptions: {},
};
exports.default = options;
//# sourceMappingURL=swaggerOption.js.map