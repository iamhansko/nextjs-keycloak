# Next.JS - Keycloak

## Used
- [Keycloak](https://next-auth.js.org/getting-started/introduction)
- [NextAuth.js](https://next-auth.js.org/providers/keycloak)
- [Next.js](https://nextjs.org/docs)
- [Docker](https://docs.docker.com/language/nodejs/containerize/)

## Configuration
Provider : [Keycloak](https://next-auth.js.org/providers/keycloak)

1. Rename .env.sample -> .env

2. Set `NEXTAUTH_SECRET` using `openssl rand -base64 32` output (.env)

3. Keycloak Admin Console (Realms : master) > Clients > Create Client

    - Client type : OpenID Connect
    - Client ID : next-auth
    - Client Authentication : On
    - Authorization: On
    - Standard flow : On
    - Direct access grants: Off
    - Root URL : http://localhost:3000
    - Valid redirect URIs : http://localhost:3000/api/auth/callback/keycloak
    - Valid post logout redirect URIs : http://localhost:3000
    - Web origins : http://localhost:3000

4. Set `KEYCLOAK_ISSUER` = YOUR_KEYCLOAK_HOST/realms/master

5. Set `KEYCLOAK_ID`, `KEYCLOAK_SECRET` according to Keycloak Client 'next-auth' (.env)

## Run

#### Docker
```bash
docker build -t nextjs-keycloak .
docker run -d -p 3000:3000 nextjs-keycloak
```
Then, go to http://localhost:3000


#### Development Stage
```bash
npm install
npm run dev
```
Then, go to http://localhost:3000


#### Production Stage
```bash
npm install
npm run build
npm run start
```
Then, go to http://localhost:3000