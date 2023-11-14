import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import crypto from "crypto"
import db from "./_db.js"


// resolvers
const resolvers = { 
    Query: {
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find(r => r.id === args.id)
        },
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find(r => r.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(r => r.id === args.id)
        },
    },

    Game: {
        reviews(parent) {
            return db.reviews.filter(r => r.game_id === parent.id)
        },
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(r => r.author_id === parent.id)
        },
    },
    Review: {
        game(parent) {
            return db.games.find(g => g.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id)
        }
    },

    Mutation: {
        addGame(_, args) {
            const game = { ...args.game, id: crypto.randomUUID()/*Math.floor(Math.random(1000)).toString*/ }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            const gameIdx = db.games.findIndex(g => g.id === args.id)
            if (gameIdx < 0) return
            db.games[gameIdx] = { ...db.games[gameIdx], ...args.gameChanges }
            return db.games[gameIdx]
        },
        deleteGame(_, args) {
            const idx = db.games.findIndex(g => g.id === args.id)
            const game = db.games[idx]
            db.games.splice(idx, 1)
            return game
        },
    },
}

// server setup
const server = new ApolloServer({
    // typeDefs -- definitions of types of data
    typeDefs,

    // resolvers
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server ready at port ${4000}, url=${url}`)