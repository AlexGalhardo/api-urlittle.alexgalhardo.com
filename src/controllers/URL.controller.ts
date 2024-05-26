import prisma from "src/config/prisma";
import { randomUUID } from "node:crypto";

export default class URLController {
    static async create(request: any, reply: any) {
        try {
            let urlAlreadyRegistred = null;

            if (process.env.USE_JSON_DATABASE === "true") {
                try {
                    const file = await Bun.file("./src/repositories/urls.json").json();
                    urlAlreadyRegistred = file.find((url: any) => url.original === request.body.url);
                    console.log("urlAlreadyRegistred => ", urlAlreadyRegistred);
                } catch (error: any) {
                    throw new Error(error.message);
                }
            } else {
                try {
                    urlAlreadyRegistred = await prisma.urls.findFirst({ where: { original: request.body.url } });
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }

            if (urlAlreadyRegistred) {
                reply.send({
                    success: false,
                    message: "URL already registred. Please send other URL",
                    url_already_registred: urlAlreadyRegistred,
                });
            }

            let code = "";

            while (true) {
                code = Math.random().toString(36).substring(2, 10);
                let codeAlreadyRegistred = null;

                if (process.env.USE_JSON_DATABASE === "true") {
                    try {
                        const file = await Bun.file("./src/repositories/urls.json").json();
                        codeAlreadyRegistred = file.find((url: any) => url.code === code);
                    } catch (error: any) {
                        throw new Error(error.message);
                    }
                } else {
                    try {
                        codeAlreadyRegistred = await prisma.urls.findFirst({ where: { code: code } });
                    } catch (error: any) {
                        throw new Error(error.message);
                    }
                }

                if (!codeAlreadyRegistred) break;
            }

            let created = null;

            if (process.env.USE_JSON_DATABASE === "true") {
                try {
                    const file = await Bun.file("./src/repositories/urls.json").json();
                    const newUrl = {
                        id: randomUUID(),
                        original: request.body.url,
                        code,
                    };
                    file.push(newUrl);
                    await Bun.write("./src/repositories/urls.json", JSON.stringify(file, null, 4));
                    created = newUrl;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            } else {
                try {
                    created = await prisma.urls.create({
                        data: {
                            original: request.body.url,
                            code,
                        },
                    });
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }

            reply.send({
                success: true,
                data: created,
            });
        } catch (error: any) {
            reply.send({
                success: true,
                message: "Something went wrong",
                error: error.message,
            });
        }
    }

    static async redirect(request: any, reply: any) {
        try {
            let urlFound = null;

            if (process.env.USE_JSON_DATABASE === "true") {
                try {
                    const file = await Bun.file("./src/repositories/urls.json").json();
                    urlFound = file.find((url: any) => url.code === request.params.code);
                } catch (error: any) {
                    throw new Error(error.message);
                }
            } else {
                try {
                    urlFound = await prisma.urls.findFirst({
                        where: {
                            code: request.params.code,
                        },
                    });
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }

            reply.redirect(urlFound?.original);
        } catch (error: any) {
            reply.send({
                success: true,
                message: "Something went wrong",
                error: error.message,
            });
        }
    }
}
