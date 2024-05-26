import Fastify from "fastify";
import URLController from "./controllers/URL.controller";

const fastify = Fastify({
    logger: true,
});

fastify
    .get("/", function (_, reply) {
        reply.send({ success: true, message: "Lets goo" });
    })
    .post("/create", (request, reply) => URLController.create(request, reply))
    .get("/:code", (request, reply) => URLController.redirect(request, reply))
    .listen({ port: Number(process.env.PORT) || 5555, host: "0.0.0.0" }, function (err, _) {
        console.log(`URL Little server is listening on http://localhost:${Number(process.env.PORT) || 5555}`);

        console.log(
            `${process.env.USE_JSON_DATABASE === "true" ? "...Using JSON database!" : "...Using POSTGRES DOCKER Database!"}`,
        );

        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
