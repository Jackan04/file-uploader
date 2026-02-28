import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../lib/prisma.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user || !user.password) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, {
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    user ? done(null, user) : done(null, null);
  } catch (err) {
    done(err);
  }
});

function configureAuth(app) {
  app.use(
    session({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      secret: process.env.SESSION_SECRET ?? "development-session-secret",
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

export { configureAuth };
