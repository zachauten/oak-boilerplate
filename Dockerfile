# docker build . -t oak
# docker run -d --name oak -p 8080:8080 oak
FROM denoland/deno:1.11.0
COPY . .
RUN deno cache deps.ts
RUN deno info
CMD ["run", "--allow-net", "main.ts"]
EXPOSE 8080
