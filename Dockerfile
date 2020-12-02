FROM docker.pkg.github.com/zachauten/docker-deno/deno:1.2.3
COPY . .
RUN deno cache deps.ts
RUN deno info
CMD ["run", "--allow-net", "app.ts"]
EXPOSE 8080
