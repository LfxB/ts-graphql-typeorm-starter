import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { pubSub } from './pubsub';
import { ExampleResolver } from './resolvers/Example.resolver';
import { UserResolver } from './resolvers/User.resolver';
import { MyContext } from './type/MyContext';
import session from './utils/express-session';
import { memoryStore } from './utils/global-store/session-memory-store';

dotenv.config();

const port = parseInt(process.env.PORT);

(async () => {
  try {
    let connection: Connection;
    try {
      const connectionOptions = await getConnectionOptions();
      Object.assign(connectionOptions, {
        type: 'postgres'
        // migrationsRun: process.env.DEV === 'true'
        // dropSchema: process.env.DEV === "true",
      });
      console.log('Connection Options', connectionOptions);

      // create connection with database
      // note that it's not active database connection
      // TypeORM creates connection pools and uses them for your requests
      connection = await createConnection(connectionOptions);
    } catch (error) {
      console.log('TypeORM connection error: ', error);
      // throw error;
    }

    // create express app
    const app = express();

    app.use(
      bodyParser.json({
        limit: '5mb'
      })
    );

    if (process.env.DEV === 'true') {
      app.use(
        cors({
          credentials: true,
          origin: ['http://localhost:3000', 'http://localhost:5000']
        })
      );
    }

    app.use('/public', express.static(path.join(__dirname, '../public')));

    const sessionMiddleware = session({
      store: memoryStore,
      name: 'sid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        // maxAge: 1000 * 60 * 60 * 24, // 24 hours
        maxAge: 1000 * 60 * 60 * 3, // 3 hours
        sameSite: 'lax'
      }
    });

    app.use(sessionMiddleware);

    // build GraphQL Schema from resolvers
    const gqlSchema = await buildSchema({
      resolvers: [ExampleResolver, UserResolver],
      pubSub
    });

    // create new apollo server
    const server = new ApolloServer({
      schema: gqlSchema,
      context: ({ req, res, connection }) => {
        const updatedRequest = connection ? connection.context.req : req;
        return {
          req,
          res,
          user: updatedRequest.session.user,
          roomId: updatedRequest.session.roomId
        };
      },
      subscriptions: {
        keepAlive: 10000,
        onConnect: (_, websocket: any) => {
          return new Promise((resolve) => {
            sessionMiddleware(websocket.upgradeReq, {} as any, () => {
              console.log('Subscription registered');
              resolve({ req: websocket.upgradeReq });
            });
          });
        },
        onDisconnect: async (websocket: any) => {
          if (
            !!websocket.upgradeReq.session.user &&
            !!websocket.upgradeReq.session.roomId
          ) {
            const context = websocket.upgradeReq.session as MyContext;
            const { roomId } = context;

            console.log(`Disconnected from room ${roomId}`);
          }
        }
      }
    });

    server.applyMiddleware({ app, cors: false });

    // create httpServer for websockets
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    const appBuild = __dirname + '/../client_dist';

    app.use(express.static(appBuild));

    // app.get("*", (req, res) => {
    //   res.sendFile("index.html", { root: appBuild });
    // });

    // run app
    httpServer.listen(port, '0.0.0.0', () =>
      console.log(`Express application is up and running on port ${port}`)
    );

    process.on('warning', (e) => console.warn(e.stack));

    process.on('unhandledRejection', (reason, promise) => {
      console.log(`unhandledRejection: ${reason} - Promise: ${promise}`);
    });

    process.on('uncaughtException', (err) => {
      console.log(`uncaughtException: ${err}`);
    });
  } catch (error) {
    console.log('An error occurred starting the server: ', error);
  }
})();
