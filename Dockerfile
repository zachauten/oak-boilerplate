# docker build . -t oak
# docker run -d --name oak -p 8080:8080 oak
FROM denoland/deno:1.35.0
COPY deps.ts deps.ts
RUN deno cache deps.ts
RUN deno info
COPY . .
RUN deno test

CMD deno run --no-remote --allow-net --allow-read --allow-write --allow-env main.ts

EXPOSE 8080
HEALTHCHECK CMD deno run --allow-net --allow-env healthcheck.ts
